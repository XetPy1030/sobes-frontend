import axios from 'axios';
import appStore from "../store/AppStore";
import Url from "./url";

class BaseApi {
    get #defaultRequestHeaders() {
        return {
            Authorization: `Bearer ${appStore.token}`,
            'Content-Type': 'application/json',
        };
    }

    async sendRequest({method, params = {}, data, url}) {
        if (url instanceof Url) {
            url = url.defaultUrl;
        }
        if (!params.headers) {
            params.headers = {};
        }
        for (const [key, value] of Object.entries(this.#defaultRequestHeaders)) {
            if (!params.headers) {
                params.headers = {};
            }
            if (!params.hasOwnProperty(key)) {
                params.headers[key] = value;
            }
        }
        let response;
        try {
            if (data === undefined) {
                response = await method(url, params);
            } else {
                response = await method(url, data, params);
            }
        } catch (error) {
            console.error('Error in response:', error);
            response = error.response;
        }

        return response;
    }

    async sendGet(url, params, isAuth) {
        return await this.sendRequest({
            method: axios.get,
            url,
            params,
            isAuth,
        });
    }

    async sendPost(url, data, params) {
        if (!data) {
            data = null;
        }
        return await this.sendRequest({
            method: axios.post,
            url,
            data,
            params,
        });
    }

    async sendPut(url, data, params) {
        if (!data) {
            data = null;
        }
        return await this.sendRequest({
            method: axios.put,
            url,
            data,
            params,
        });
    }
}

export default BaseApi;

