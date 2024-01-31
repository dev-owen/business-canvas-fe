import './App.css'
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Button, Input} from 'antd';
import styled from "@emotion/styled";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

export interface BenchMarkSource {
    title: string;
    url: string;
    data: string[];
}

export interface FormData {
    name: string;
    description: string;
    benchMarkSource: BenchMarkSource[];
}

function App() {
    const {register, control, handleSubmit} = useForm<FormData>({
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

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const removeDataItem = (index: number, dataIndex: number) => {
        const data = control._formValues.benchMarkSource[index].data;
        const newData = [...data.slice(0, dataIndex), ...data.slice(dataIndex + 1)];
        control.setValue(`benchMarkSource.${index}.data`, newData);
    };


    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <h2>벤치마크</h2>
            <BenchmarkContainer>
                <LabelInput>
                    <label htmlFor="">제목 : </label>
                    <Input {...register('name')} />
                </LabelInput>
                <LabelInput>
                    <label htmlFor="">용어 설명 : </label>
                    <Input {...register('description')}/>
                </LabelInput>
                {benchMarkSourceFields.map((field, index) => (
                    <BenchmarkSourceContainer key={field.id}>
                        <TopContentWithDeleteButton>
                            <LabelInput>
                                <label htmlFor="">제목 : </label>
                                <Input {...register(`benchMarkSource.${index}.title`)} style={{width: '20rem'}}/>
                            </LabelInput>
                            <Button style={{width: '5rem', position: 'relative', right: '0'}} danger type="primary"
                                    icon={<MinusOutlined/>}
                                    onClick={() => removeBenchMarkSource(index)}>
                                삭제
                            </Button>
                        </TopContentWithDeleteButton>
                        <LabelInput>
                            <label htmlFor="">URL : </label>
                            <Input {...register(`benchMarkSource.${index}.url`)} style={{width: '20rem'}}/>
                        </LabelInput>
                        <Controller name={`benchMarkSource.${index}.data`} control={control} render={({field}) => (
                            <div>
                                {field.value.map((dataItem: string, dataIndex: number) => (
                                    <BenchmarkDataContainer key={dataIndex}>
                                        <TopContentWithDeleteButton>
                                            <label htmlFor="">벤치마크 데이터</label>
                                            <Button style={{width: '5rem'}} danger type="primary"
                                                    icon={<MinusOutlined/>}
                                                    onClick={() => removeDataItem(index, dataIndex)}>
                                                삭제
                                            </Button>
                                        </TopContentWithDeleteButton>
                                        <TextArea value={dataItem} onChange={e => {
                                            const newData = [...field.value];
                                            newData[dataIndex] = e.target.value;
                                            field.onChange(newData);
                                        }}/>
                                    </BenchmarkDataContainer>
                                ))}
                                <Button style={{width: '15rem'}} type="default" icon={<PlusOutlined/>}
                                        onClick={() => field.onChange([...field.value, ""])}>
                                    벤치마크 데이터 추가하기
                                </Button>
                            </div>
                        )}/>
                    </BenchmarkSourceContainer>)
                )}

                <Button style={{width: '15rem'}} type="default" icon={<PlusOutlined/>}
                        onClick={() => appendBenchMarkSource({
                            title: '',
                            url: '',
                            data: ['']
                        })}>
                    벤치마크 출처 추가하기
                </Button>

                <Button color="green" style={{width: '5rem', backgroundColor: 'forestgreen'}} type="primary"
                        htmlType="submit">
                    저장
                </Button>
            </BenchmarkContainer>
        </FormContainer>
    )
        ;
}

export default App

const FormContainer = styled.form`
    width: 600px;
`

const LabelInput = styled.div`
    display: flex;
    align-items: center;

    label {
        white-space: nowrap;
        margin-right: 8px;
    }
`

const BenchmarkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem
`

const BenchmarkSourceContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding: 0.5rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
`

const BenchmarkDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    background-color: lightgray;
    border-radius: 0.5rem;
    gap: 0.5rem;
    padding: 0.5rem;
`

const TopContentWithDeleteButton = styled.div`
    display: flex;
    justify-content: space-between;
`