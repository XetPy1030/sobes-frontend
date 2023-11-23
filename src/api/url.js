import {SERVER_URL} from "../consts";

class Url {
    constructor({route, serverUrl, queries}) {
        this.route = route;
        this.queries = queries;
        this.serverUrl = serverUrl || SERVER_URL;
    }

    #formattedUrlQueriesFromPatternsArray(patternsArray, symbol = '&') {
        return patternsArray.join(symbol);
    }

    #formattedUrlQueriesFromQueriesObject(queries, symbol = '&') {
        return this.#formattedUrlQueriesFromPatternsArray(
            Object.entries(queries).map(([key, value]) => {
                return `${key}=${value}`;
            }),
            symbol,
        );
    }

    get formattedUrlWithQuery() {
        return this.getDefaultUrl(`${this.route}?${this.#formattedUrlQueriesFromQueriesObject(this.queries)}`);
    }

    getDefaultUrl(route) {
        return this.serverUrl + route;
    }

    get defaultUrl() {
        return this.serverUrl + this.route;
    }
}

export default Url;
