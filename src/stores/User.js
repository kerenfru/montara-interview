import {observable, computed} from 'mobx';

export class User {

    @observable id;
    @observable firstName;
    @observable lastName;
    @observable email;
    @observable sick;
    @observable log;
    @observable quarantine;
    @observable quarantineDate;

    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.sick = user.sick;
        this.log = user.log;
        this.quarantine = user.quarantine;
        this.quarantineDate = user.quarantineDate;
    }

    @computed get userId() {
        return this.id;
    }

    @computed get fname() {
        return this.firstName;
    }

    @computed get lname() {
        return this.lastName;
    }

    @computed get getEmail() {
        return this.email;
    }

    @computed get isSick() {
        return this.sick;
    }

    @computed get isQuarantine() {
        return this.quarantine;
    }

    @computed get getQuarantineDate() {
        return this.quarantineDate;
    }

    @computed get canExit() {
        return !this.canEntry;
    }

    @computed get canEntry() {
        return this.log && this.log[this.log.length - 1] && !this.log[this.log.length - 1].exit;
    }
}