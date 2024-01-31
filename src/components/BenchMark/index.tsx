import {Controller, useFieldArray, useForm} from "react-hook-form";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import * as $ from './styles.ts'
import {BenchMarkForm, BenchMarkSource} from './types.ts'
import BenchMarkData from "../BenchMarkData";
import {useCallback} from "react";
import LabelInput from "../LabelInput";

const INIT_BENCHMARK_SOURCE: BenchMarkSource = {title: '', url: '', data: ['']}

const BenchMark = () => {
    const {control, handleSubmit, setValue} = useForm<BenchMarkForm>({
        defaultValues: {
            name: '',
            description: '',
            benchMarkSource: [INIT_BENCHMARK_SOURCE],
        },
    });

    const {
        fields: benchMarkSourceFields,
        append: appendBenchMarkSource,
        remove: removeBenchMarkSource
    } = useFieldArray({
        control,
        name: 'benchMarkSource',
    });

    const onSubmit = useCallback((data: BenchMarkForm) => {
        console.log(data);
        localStorage.setItem('formData', JSON.stringify(data));
    }, []);

    const removeDataItem = useCallback((index: number, dataIndex: number) => {
        const data = control._formValues.benchMarkSource[index].data;
        const newData = [...data.slice(0, dataIndex), ...data.slice(dataIndex + 1)];
        setValue(`benchMarkSource.${index}.data`, newData);
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
                                        name={`benchMarkSource.${index}.title`} isLengthLimit/>
                            <$.DeleteButtonItem danger type="primary"
                                                icon={<MinusOutlined/>}
                                                onClick={() => removeBenchMarkSource(index)}>
                                삭제
                            </$.DeleteButtonItem>
                        </$.TopContentWithDeleteButton>
                        <LabelInput label={'URL : '} control={control}
                                    name={`benchMarkSource.${index}.url`} isLengthLimit/>
                        <Controller name={`benchMarkSource.${index}.data`} control={control} render={({field}) => (
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