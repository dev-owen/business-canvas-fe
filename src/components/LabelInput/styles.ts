import styled from "@emotion/styled";
import {Input} from "antd";

export const LabelInput = styled.div`
    display: flex;
    align-items: center;

    label {
        white-space: nowrap;
        margin-right: 8px;
    }
`
export const InputLengthLimitItem = styled(Input)`
    width: 20rem;
`