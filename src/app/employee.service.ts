import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';
import {of} from 'rxjs';
import {StoreState} from './customer.service';

export class Employee {
  name: string;
}

export enum EmployeeStoreActions {
  AddEmployee = 'add_customer',
  RemoveEmployee = 'remove_customer',
  InitState = 'init_state'
}

@Injectable({providedIn: 'root'})
export class EmployeeService extends ObservableStore<StoreState> {

  constructor() {
    const initialState = {employees: [], employee: null};
    super({trackStateHistory: true});
    this.setState(initialState, EmployeeStoreActions.InitState);
  }

  get() {
    const customers = this.getState().employees;
    return customers ? of(customers) : of(null);
  }

  add(customer: Employee) {
    const state = this.getState();
    state.employees.push(customer);
    this.setState({employees: state.employees}, EmployeeStoreActions.AddEmployee);
    console.log(this.stateHistory);
  }

  remove() {
    const state = this.getState();
    state.employees.splice(state.employees.length - 1, 1);
    this.setState({employees: state.employees}, EmployeeStoreActions.RemoveEmployee);
  }
}
