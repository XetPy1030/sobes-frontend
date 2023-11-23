import BaseApi from "./baseApi";
import Url from "./url";

class ServerApi extends BaseApi {
    async getTodos({
                       page = 1, per_page = 3, sort_field = 'id',
                   }) {
        const route = '/todo/';
        const url = new Url({route, queries: {page, per_page, sort_field}});
        const response = await this.sendGet(url.formattedUrlWithQuery, {}, {});
        return response?.data;
    }

    async addTodo(data) {
        const route = '/todo/';
        const url = new Url({route});
        return await this.sendPost(url, data, {});
    }

    async signIn(data) {
        const route = '/auth/login/';
        const url = new Url({route});
        return await this.sendPost(url, data, {});
    }

    async signOut() {
        const route = '/auth/logout/';
        const url = new Url({route});
        return await this.sendPost(url, {}, {});
    }

    async editTodo({id, text}) {
        const route = `/todo/${id}/`;
        const url = new Url({route});
        return await this.sendPut(url, {text}, {});
    }

    async completeTodo({id}) {
        const route = `/todo/${id}/complete/`;
        const url = new Url({route});
        return await this.sendPost(url, {}, {});
    }
}

const serverApi = new ServerApi();
export default serverApi;
