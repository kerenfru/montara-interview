import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://montara-server.herokuapp.com'; //http://localhost:3000';

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.logout();
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        req.set('authorization', `Token ${commonStore.token}`);
    }
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    patch: (url, body) =>
        superagent
            .patch(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: (userId) =>
        requests.get(`/users?id=${userId}`),
    login: (email, password) =>
        requests.get(`/login/${email}/${password}`, {email, password}),
    register: (firstName, lastName, email, password) =>
        requests.post(`/register`, {firstName, lastName, email, password, sick: false, quarantine: false, log: []}),
    save: user =>
        requests.patch(`/users/${user.userId}`, user),
};

const UserActions = {
    in: user =>
        requests.patch(`/users/${user.userId}`, user),
    out: user =>
        requests.patch(`/users/${user.userId}`, user),
    healthy: user =>
        requests.patch(`/users/${user.userId}`, {sick: false, quarantine: false, quarantineDate: ''}),
    notifySick: user =>
        requests.patch(`/notifySick/${user.userId}`, {sick: true, quarantine: true, quarantineDate: new Date()}),
    getSickEmployeesInTouchWith: user =>
        requests.get(`/getSickEmployeesInTouchWith/${user.userId}`),
    setInQuarantine: user =>
        requests.patch(`/logQuarantine/${user.userId}`, {quarantine: true, quarantineDate: new Date()}),
    getQuarantineStartDate: user =>
        requests.get(`/getQuarantineStartDate/${user.userId}`),
};

export default {
    UserActions,
    Auth,
};
