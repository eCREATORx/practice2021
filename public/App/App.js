import * as React from "react";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ManagerSignatureEditor from "./Component/ManagerSignatureEditor/ManagerSignatureEditor";

export default class App extends React.Component {
    render() {
        return <div className={'app-container'}>
            <ReactNotification/>
            <ManagerSignatureEditor />
        </div>
    }
}