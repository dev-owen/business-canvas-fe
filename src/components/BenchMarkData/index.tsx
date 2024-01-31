import * as $ from "./styles.ts";
import {MinusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {ControllerRenderProps} from "react-hook-form";
import {BenchMarkForm} from "../BenchMark/types.ts";

interface BenchMarkDataProps {
    index: number;
    dataIndex: number;
    removeDataItem: (index: number, dataIndex: number) => void;
    dataItem: string;
    field: ControllerRenderProps<BenchMarkForm, `benchMarkSources.${number}.data`>;
}

const BenchMarkData = ({index, dataIndex, removeDataItem, field, dataItem}: BenchMarkDataProps) => {
    return (
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
    );
};

export default BenchMarkData;