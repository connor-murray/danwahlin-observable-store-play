import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';

export enum ManagerStoreActions {
  InitState = 'init_state'
}

export interface ManagerStoreState {
  bing: string;
}

@Injectable({providedIn: 'root'})
export class ManagerService extends ObservableStore<ManagerStoreState> {

  constructor() {
    super({trackStateHistory: true});
    this.setState({bing: `boom`}, ManagerStoreActions.InitState);
  }
}
