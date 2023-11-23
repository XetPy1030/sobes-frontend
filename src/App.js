import './App.css';
import {initRouter} from "./initRouter";
import {RouterView, RouterContext} from "mobx-state-router";
import {viewMap} from "./viewMap";

import 'bootstrap/dist/css/bootstrap.min.css';
import {observer} from "mobx-react";
import Modal from "./components/Modal";
import Header from "./components/Header";

function App() {
    const routerStore = initRouter();

    return (
        <div className="App">
            <RouterContext.Provider value={routerStore}>
                <Modal/>
                <Header/>
                <RouterView viewMap={viewMap}/>
            </RouterContext.Provider>
        </div>
    );
}

export default observer(App);
