import {observable, action, computed} from 'mobx';
import agent from '../agent';
import commonStore from './commonStore';
import userStore from './userStore';
import {User} from '@/stores/User';
import {getQuarantineTimeLeft} from '@/shared/utils';

class UserStore {

    commonStore;

    @observable token;
    @observable currentUser;
    @observable isLoading;
    @observable logLoading;
    @observable exitLoading;
    @observable sickLoading;
    @observable userErrors;
    @observable hasInTouchWithSickEmployee;

    constructor(commonStore) {
        this.commonStore = commonStore;
        this.init();
    }

    async init() {
        if (UserStore.getToken()) {
            await this.pullUser();

            if (this.currentUser) {
                // Check if needs to quarantine
                this.loadSickEmployeesInTouchWith();
                // if so, get the logs
                if (this.currentUser.isQuarantine) {
                    this.getQuarantineStartDate();
                }
                // if 14 days passed
                if (this.currentUser.getQuarantineDate) {
                    if (getQuarantineTimeLeft(this.currentUser.getQuarantineDate) < 1) {
                        this.healthy();
                    }
                }
            }
        } else {
            this.commonStore.setAppLoaded()
        }
    }

    static getToken() {
        return window.localStorage.getItem('jwt');
    }

    @computed get canExit() {
        return this.currentUser.canExit;
    }

    @computed get canEntry() {
        return this.currentUser.canEntry;
    }

    @action setCanExit(val) {
        this.isUserCanExit = val;
    }

    @action setToken(token) {
        window.localStorage.setItem('jwt', token);
        this.token = token;
        this.commonStore.setAppLoaded();
    }

    @action pullUser() {
        const token = UserStore.getToken();
        this.isLoading = true;
        return agent.Auth.current(token)
            .then(action((user) => {
                    if (user[0]) {
                        this.currentUser = new User(user[0]);
                    } else {
                        this.userErrors = 'Something wrong happened. Please try again later.'
                    }
                    this.commonStore.setAppLoaded();
                })
            ).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action updateUser(newUser) {
        this.isLoading = true;
        return agent.Auth.save(new User({...this.currentUser, ...newUser}))
            .then(action((user) => {
                this.currentUser = new User(user);
            }))
            .finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action logEntryUser(newUser) {
        this.logLoading = true;
        return agent.Auth.save(new User({...this.currentUser, ...newUser}))
            .then(action((user) => {
                this.currentUser = new User(user);
            }))
            .finally(action(() => {
                this.logLoading = false;
            }))
    }

    @action exitEntryUser(newUser) {
        this.exitLoading = true;
        return agent.Auth.save(new User({...this.currentUser, ...newUser}))
            .then(action((user) => {
                this.currentUser = new User(user);
            }))
            .finally(action(() => {
                this.exitLoading = false;
            }))
    }

    @action notifySick() {
        this.sickLoading = true;
        return agent.UserActions.notifySick(this.currentUser)
            .then(action((user) => {
                this.currentUser = new User(user);
            }))
            .finally(action(() => {
                this.sickLoading = false;
            }))
    }

    @action loadSickEmployeesInTouchWith() {
        this.isLoading = true;
        return agent.UserActions.getSickEmployeesInTouchWith(this.currentUser)
            .then(action((log) => {
                this.hasInTouchWithSickEmployee = log && log.length > 0;
            }))
            .finally(action(() => {
                this.isLoading = false;
            }));
    }

    @action setInQuarantine() {
        this.isLoading = true;
        return agent.UserActions.setInQuarantine(this.currentUser)
            .then(action((user) => {
                this.currentUser = new User(user);
            }))
            .finally(action(() => {
                this.isLoading = false;
            }));
    }

    @action getQuarantineStartDate() {
        this.isLoading = true;
        return agent.UserActions.getQuarantineStartDate(this.currentUser)
            .then(action(({quarantineDate}) => {
                this.currentUser.quarantineDate = quarantineDate;
            }))
            .finally(action(() => {
                this.isLoading = false;
            }));
    }

    @action healthy() {
        this.isLoading = true;
        return agent.UserActions.healthy(this.currentUser)
            .then(action((user) => {
                this.currentUser = new User(user);
            }))
            .finally(action(() => {
                this.isLoading = false;
            }));
    }

    @action forgetUser() {
        this.currentUser = undefined;
        userStore.setToken(null);
    }

}

export default new UserStore(commonStore);
