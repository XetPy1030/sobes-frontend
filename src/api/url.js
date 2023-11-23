import {SERVER_URL} from "../consts";

class Url {
    constructor({route, serverUrl, queries, searchSettings}) {
        this.route = route;
        this.searchSettings = searchSettings;
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

    #setQueries(queries) {
        this.queries = queries;
    }

    #setRoute(route) {
        this.route = route;
    }
}

export default Url;
