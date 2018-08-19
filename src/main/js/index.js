import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {HashRouter as Router} from 'react-router-dom'
import {HistoryBlocker, modalClosingConfirmation} from "./modals";

ReactDOM.render(
    <Router getUserConfirmation={modalClosingConfirmation}>
        <HistoryBlocker>
            <App/>
        </HistoryBlocker>
    </Router>

, document.getElementById('app'));



