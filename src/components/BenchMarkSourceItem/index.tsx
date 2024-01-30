import {Control, useFieldArray, UseFormRegister, UseFormWatch} from "react-hook-form";
import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import styled from "@emotion/styled";

interface DataItem {
    id: string;
    text: string;
}

interface BenchMarkSource {
    title: string;
    url: string;
    data: DataItem[];
}

interface FormData {
    name: string;
    description: string;
    benchMarkSource: BenchMarkSource[];
}

interface BenchMarkSourceFieldProps {
    control: Control<FormData>;
    register: UseFormRegister<FormData>;
    index: number;
    remove: (index: number) => void;
    watch: UseFormWatch<FormData>;
}

const BenchMarkSourceItem = ({control, register, index, remove, watch}: BenchMarkSourceFieldProps) => {
    const {append, remove: removeDataItem} = useFieldArray({
        control,
        name: `benchMarkSource.${index}.data`,
    });

    return (
        <BenchmarkSourceContainer>
            <LabelInput>
                <label htmlFor="">제목 : </label>
                <Input {...register(`benchMarkSource.${index}.title`)} />
            </LabelInput>
            <LabelInput>
                <label htmlFor="">URL : </label>
                <Input {...register(`benchMarkSource.${index}.url`)} />
            </LabelInput>
            {watch(`benchMarkSource.${index}.data`).map((dataItem: DataItem, dataIndex: number) => (
                <BenchmarkDataContainer key={dataItem.id}>
                    <label htmlFor="">벤치마크 데이터</label>
                    <TextArea {...register(`benchMarkSource.${index}.data.${dataIndex}.text`)} />
                    <Button style={{width: '5rem'}} danger type="primary" icon={<MinusOutlined/>}
                            onClick={() => removeDataItem(dataIndex)}>
                        삭제
                    </Button>
                </BenchmarkDataContainer>
            ))}
            <Button style={{width: '15rem'}} type="default" icon={<PlusOutlined/>}
                    onClick={() => append({id: '', text: ''})}>
                벤치마크 데이터 추가하기
            </Button>
            <Button style={{width: '5rem'}} danger type="primary" icon={<MinusOutlined/>}
                    onClick={() => remove(index)}>
                삭제
            </Button>
        </BenchmarkSourceContainer>
    )
};

export default BenchMarkSourceItem;

const LabelInput = styled.div`
    display: flex;
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