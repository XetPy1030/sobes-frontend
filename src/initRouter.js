import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    RouterStore,
} from 'mobx-state-router';

const notFound = createRouterState('notFound');

export const routes = [
    {
        name: 'home',
        pattern: '/',
    },
    {
        name: 'todo_create',
        pattern: '/todo/create',
    },
    {
        name: 'sign_in',
        pattern: '/sign-in',
    },
    {
        name: 'notFound',
        pattern: '/not-found',
    },
];

export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);

    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}