import styled from "@emotion/styled";
import {Button, Input} from "antd";

export const FormContainer = styled.form`
    width: 600px;
`

export const LabelInput = styled.div`
    display: flex;
    align-items: center;

    label {
        white-space: nowrap;
        margin-right: 8px;
    }
`

export const BenchmarkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem
`

export const BenchmarkSourceContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding: 0.5rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
`

export const BenchmarkDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    background-color: lightgray;
    border-radius: 0.5rem;
    gap: 0.5rem;
    padding: 0.5rem;
`

export const TopContentWithDeleteButton = styled.div`
    display: flex;
    justify-content: space-between;
`

export const InputLengthLimitItem = styled(Input)`
    width: 20rem;
`

export const AppendButtonItem = styled(Button)`
    width: 15rem
`

export const DeleteButtonItem = styled(Button)`
    width: 5rem;
`

export const SubmitButtonItem = styled(Button)`
    width: 5rem;

    &.ant-btn-primary {
        background-color: forestgreen;
    }
`

export const BottomWrapper = styled.div`
    display: flex;
    justify-content: end;
`
