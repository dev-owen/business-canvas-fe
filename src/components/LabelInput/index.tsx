import {Control, Controller} from "react-hook-form";
import {BenchMarkForm} from "../BenchMark/types.ts";
import * as $ from './styles.ts';
import {Input} from "antd";

interface LabelInputProps {
    name: string;
    label: string;
    isLengthLimit?: boolean;
    control: Control<BenchMarkForm>;
}

const LabelInput = ({control, name, label, isLengthLimit = false}: LabelInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <$.LabelInput>
                    <label htmlFor="">{label}</label>
                    {isLengthLimit ? <$.InputLengthLimitItem {...field} /> : <Input {...field} />}
                </$.LabelInput>
            )}
        />
    );
};

export default LabelInput;