import './App.css'
import {useFieldArray, useForm} from "react-hook-form";
import {Button, Input} from 'antd';
import styled from "@emotion/styled";
import {PlusOutlined} from "@ant-design/icons";
import BenchMarkSourceItem from './components/BenchMarkSourceItem';

interface BenchMarkSource {
    title: string;
    url: string;
    data: string[];
}

interface FormData {
    name: string;
    description: string;
    benchMarkSource: BenchMarkSource[];
}

function App() {
    const {register, control, handleSubmit, watch} = useForm<FormData>({
        defaultValues: {
            benchMarkSource: [{title: '', url: '', data: []}],
        },
    });

    const {fields: benchMarkFields, append: appendBenchMark, remove: removeBenchMark} = useFieldArray({
        control,
        name: 'benchMarkSource',
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
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
                {benchMarkFields.map((field, index) => (
                    <BenchMarkSourceItem key={index} control={control} register={register} index={index}
                                         watch={watch}
                                         remove={removeBenchMark}/>
                ))}

                <Button style={{width: '15rem'}} type="default" icon={<PlusOutlined/>}
                        onClick={() => appendBenchMark({
                            title: '',
                            url: '',
                            data: []
                        })}>
                    벤치마크 출처 추가하기
                </Button>

                <input type="submit"/>
            </BenchmarkContainer>
        </FormContainer>
    );
}

export default App

const FormContainer = styled.form`
    width: 600px;
`

const LabelInput = styled.div`
    display: flex;
`

const BenchmarkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem
`