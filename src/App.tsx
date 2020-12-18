import React from 'react';
import style from './styles/App.module.css'
import BuildingsTable from "./components/BuildingsTable";


function App() {
    return (
        <div className={style.App}>
            <BuildingsTable />
        </div>
    );
}

export default App;
