import './App.css'
import BenchMark from "./components/BenchMark";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import * as localForage from "localforage";
import Preview from "./components/Preview";

function App() {
    const [data, setData] = useState<string | null>(null);
    useEffect(() => {
        localForage.getItem('formData').then((localStorageData) => {
            if (localStorageData) setData(localStorageData as string);
        }).catch((err) => {
            console.error("Failed to load data from localForage", err);
        });
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