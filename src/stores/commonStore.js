import { observable, action, reaction, computed } from 'mobx';
import agent from '../agent';

class CommonStore {

  @observable appName = 'Montara Interview';
  @observable appLoaded = false;

  @computed get isAppLoaded() {
    return this.appLoaded;
  }
  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
