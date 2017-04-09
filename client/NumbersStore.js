import { observable } from 'mobx';

export default class NumbersStore {
  @observable rounds = false;

  load() {
  	// TODO: find out how to mock me
  	this.rounds = [{}, {}, {}];
  }
}