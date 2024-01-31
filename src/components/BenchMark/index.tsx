import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Input} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import * as $ from './styles.ts'
import {BenchMarkForm} from './types.ts'

const BenchMark = () => {
    const {control, handleSubmit, setValue} = useForm<BenchMarkForm>({
        defaultValues: {
            name: '',
            description: '',
            benchMarkSource: [{title: '', url: '', data: ['']}],
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

    const onSubmit = (data: BenchMarkForm) => {
        console.log(data);
        localStorage.setItem('formData', JSON.stringify(data));
    };

    const removeDataItem = (index: number, dataIndex: number) => {
        const data = control._formValues.benchMarkSource[index].data;
        const newData = [...data.slice(0, dataIndex), ...data.slice(dataIndex + 1)];
        setValue(`benchMarkSource.${index}.data`, newData);
    };


    return (
        <$.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <h2>벤치마크</h2>
            <$.BenchmarkContainer>
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <$.LabelInput>
                            <label htmlFor="">제목 : </label>
                            <Input {...field} />
                        </$.LabelInput>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <$.LabelInput>
                            <label htmlFor="">용어 설명 : </label>
                            <Input {...field}/>
                        </$.LabelInput>
                    )}
                />
                {benchMarkSourceFields.map((field, index) => (
                    <$.BenchmarkSourceContainer key={field.id}>
                        <$.TopContentWithDeleteButton>
                            <Controller
                                name={`benchMarkSource.${index}.title`}
                                control={control}
                                render={({field}) => (
                                    <$.LabelInput>
                                        <label htmlFor="">제목 : </label>
                                        <$.InputLengthLimitItem {...field} />
                                    </$.LabelInput>
                                )}
                            />
                            <$.DeleteButtonItem danger type="primary"
                                                icon={<MinusOutlined/>}
                                                onClick={() => removeBenchMarkSource(index)}>
                                삭제
                            </$.DeleteButtonItem>
                        </$.TopContentWithDeleteButton>
                        <Controller
                            name={`benchMarkSource.${index}.url`}
                            control={control}
                            render={({field}) => (
                                <$.LabelInput>
                                    <label htmlFor="">URL : </label>
                                    <$.InputLengthLimitItem {...field} />
                                </$.LabelInput>
                            )}
                        />
                        <Controller name={`benchMarkSource.${index}.data`} control={control} render={({field}) => (
                            <div>
                                {field.value.map((dataItem: string, dataIndex: number) => (
                                    <$.BenchmarkDataContainer key={dataIndex}>
                                        <$.TopContentWithDeleteButton>
                                            <label htmlFor="">벤치마크 데이터</label>
                                            <$.DeleteButtonItem danger type="primary"
                                                                icon={<MinusOutlined/>}
                                                                onClick={() => removeDataItem(index, dataIndex)}>
                                                삭제
                                            </$.DeleteButtonItem>
                                        </$.TopContentWithDeleteButton>
                                        <TextArea value={dataItem} onChange={e => {
                                            const newData = [...field.value];
                                            newData[dataIndex] = e.target.value;
                                            field.onChange(newData);
                                        }}/>
                                    </$.BenchmarkDataContainer>
                                ))}
                                <$.AppendButtonItem type="default" icon={<PlusOutlined/>}
                                                    onClick={() => field.onChange([...field.value, ""])}>
                                    벤치마크 데이터 추가하기
                                </$.AppendButtonItem>
                            </div>
                        )}/>
                    </$.BenchmarkSourceContainer>)
                )}

                <$.AppendButtonItem type="default" icon={<PlusOutlined/>}
                                    onClick={() => appendBenchMarkSource({
                                        title: '',
                                        url: '',
                                        data: ['']
                                    })}>
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