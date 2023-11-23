import {makeAutoObservable} from "mobx";

class AppStore {
    constructor() {
        this.resetState();
        makeAutoObservable(this);
    }

    resetState() {
        this.todos = [];
        this.token = localStorage.getItem('user_token');
        this.modal = {
            show: false,
            title: '',
            body: '',
        };
    }

    setTodos(todos) {
        this.todos = todos;
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('user_token', token);
    }

    setModal(modal) {
        this.modal = modal;
    }
}

const appStore = new AppStore();
export default appStore;