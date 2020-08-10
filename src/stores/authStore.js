import {observable, action} from 'mobx';
import agent from '../agent';
import userStore from './userStore';

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    constructor(userStore){
        this.userStore = userStore;
    }

    @action login(data) {
        this.inProgress = true;
        this.errors = undefined;
        return agent.Auth.login(data.get('email'), data.get('password'))
            .then((user) => {
                if (user[0]) {
                    this.userStore.setToken(user[0].id)
                } else {
                    throw err;
                }
            })
            .then(() => this.userStore.pullUser())
            .catch(action((err) => {
                this.errors = 'Email or password are not correct';
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));
    }

    @action register(data) {
        this.inProgress = true;
        this.errors = undefined;
        return agent.Auth.register(data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password'))
            .then((user) => {
                if (user) {
                    this.userStore.setToken(user.id);
                } else {
                    this.errors = 'Registration has failed. Please try again.';
                }
            })
            .then(() => this.userStore.pullUser())
            .catch(action((err) => {
                this.errors = 'Something wrong happened...';
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));
    }

    @action logout() {
        this.userStore.forgetUser();
        return Promise.resolve();
    }
}

export default new AuthStore(userStore);
