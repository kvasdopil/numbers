import { observable } from 'mobx';

// FIXME: decorators only work with legacy plugin until babel 7
// this breaks 'env' preset, and only works with 'es2015' + 'stage-0' presets
// i.e. docorators work only when transpiling to es5

export default class NumbersStore {
  @observable rounds = false;

  load() {
  	// TODO: find out how to mock me
  	this.rounds = [{}, {}, {}];
  }
}