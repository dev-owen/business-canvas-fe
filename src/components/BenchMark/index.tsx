import {Controller, useFieldArray, useForm} from "react-hook-form";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import * as $ from './styles.ts'
import {BenchMarkForm, BenchMarkSource} from './types.ts'
import BenchMarkData from "../BenchMarkData";
import {useCallback} from "react";
import LabelInput from "../LabelInput";
import * as localforage from "localforage";

const INIT_BENCHMARK_SOURCE: BenchMarkSource = {title: '', url: '', data: ['']}

interface BenchMarkProps {
    setData: (data: string) => void;
}

const BenchMark = ({setData}: BenchMarkProps) => {
    const {control, handleSubmit, setValue} = useForm<BenchMarkForm>({
        defaultValues: {
            name: '',
            description: '',
            benchMarkSources: [INIT_BENCHMARK_SOURCE],
        },
    });

    const {
        fields: benchMarkSourceFields,
        append: appendBenchMarkSource,
        remove: removeBenchMarkSource
    } = useFieldArray({
        control,
        name: 'benchMarkSources',
    });

    const onSubmit = useCallback(async (data: BenchMarkForm) => {
        await localforage.setItem('formData', JSON.stringify(data)).then(() => {
            setData(JSON.stringify(data));
        }).catch((err) => {
            console.error("Failed to load data from localForage", err);
        });


    }, []);

    const removeDataItem = useCallback((index: number, dataIndex: number) => {
        const data = control._formValues.benchMarkSources[index].data;
        const newData = [...data.slice(0, dataIndex), ...data.slice(dataIndex + 1)];
        setValue(`benchMarkSources.${index}.data`, newData);
    }, [control, setValue]);

    return (
        <$.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <h2>벤치마크</h2>
            <$.BenchmarkContainer>
                <LabelInput label={'제목 : '} control={control} name={"name"}/>
                <LabelInput label={'용어 설명 : '} control={control} name={"description"}/>
                {benchMarkSourceFields.map((field, index) => (
                    <$.BenchmarkSourceContainer key={field.id}>
                        <$.TopContentWithDeleteButton>
                            <LabelInput label={'제목 : '} control={control}
                                        name={`benchMarkSources.${index}.title`} isLengthLimit/>
                            <$.DeleteButtonItem danger type="primary"
                                                icon={<MinusOutlined/>}
                                                onClick={() => removeBenchMarkSource(index)}>
                                삭제
                            </$.DeleteButtonItem>
                        </$.TopContentWithDeleteButton>
                        <LabelInput label={'URL : '} control={control}
                                    name={`benchMarkSources.${index}.url`} isLengthLimit/>
                        <Controller name={`benchMarkSources.${index}.data`} control={control} render={({field}) => (
                            <>
                                {field.value.map((dataItem: string, dataIndex: number) => (
                                    <BenchMarkData key={dataIndex} index={index} dataIndex={dataIndex} field={field}
                                                   dataItem={dataItem}
                                                   removeDataItem={removeDataItem}/>
                                ))}
                                <$.AppendButtonItem type="default" icon={<PlusOutlined/>}
                                                    onClick={() => field.onChange([...field.value, ""])}>
                                    벤치마크 데이터 추가하기
                                </$.AppendButtonItem>
                            </>
                        )}/>
                    </$.BenchmarkSourceContainer>)
                )}

                <$.AppendButtonItem type="default" icon={<PlusOutlined/>}
                                    onClick={() => appendBenchMarkSource(INIT_BENCHMARK_SOURCE)}>
                    벤치마크 출처 추가하기
                </$.AppendButtonItem>
                <$.BottomWrapper>
                    <$.SubmitButtonItem type="primary"
                                        htmlType="submit">
                        저장
                    </$.SubmitButtonItem>
                </$.BottomWrapper>
            </$.BenchmarkContainer>
        </$.FormContainer>
    )
        ;
};

export default BenchMark;