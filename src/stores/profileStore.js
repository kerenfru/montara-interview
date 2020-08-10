import { observable, action } from 'mobx';
import agent from '../agent';

class ProfileStore {

  @observable profile = undefined;
  @observable isLoadingProfile = false;

  @action loadProfile(username) {
    this.isLoadingProfile = true;
    agent.Profile.get(username)
      .then(action(( profile ) => { this.profile = profile[0]; }))
      .finally(action(() => { this.isLoadingProfile = false; }))
  }
}

export default new ProfileStore();
