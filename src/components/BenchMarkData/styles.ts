import styled from "@emotion/styled";
import {Button} from "antd";

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

export const DeleteButtonItem = styled(Button)`
    width: 5rem;
`
