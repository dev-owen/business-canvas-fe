import './App.css'
import BenchMark from "./components/BenchMark";
import Preview from "./components/Preview";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState<string | null>(null);
    useEffect(() => {
        const localStorageData = localStorage.getItem('formData');
        if (localStorageData) setData(localStorageData)
    }, [])
    return (<AppContainer>
        <BenchMark setData={setData}/>
        {data && <Divider/>}
        {data ? <Preview formData={JSON.parse(data)}/> : null}
    </AppContainer>)
}

export default App

const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Divider = styled.div`
    width: 1px;
    height: 578px;
    margin-left: 10px;

    opacity: 0.1;
    background: #000;
`