import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';
import {of} from 'rxjs';
import {Employee} from './employee.service';

export class Customer {
  name: string;
}

export interface StoreState {
  customers: Customer[];
  customer: Customer;
  employees: Employee[];
  employee: Employee;
}

export enum CustomersStoreActions {
  AddCustomer = 'add_customer',
  RemoveCustomer = 'remove_customer',
  InitState = 'init_state'
}

@Injectable({providedIn: 'root'})
export class CustomerService extends ObservableStore<StoreState> {

  constructor() {
    const initialState = {customers: [{name: `connor`}], customer: null};

    super({
      trackStateHistory: true, stateSliceSelector: state => {
        return {customers: state ? state.customers : []};
      }
    });

    this.setState(initialState, CustomersStoreActions.InitState);
  }

  get() {
    const customers = this.getState().customers;
    return customers ? of(customers) : of(null);
  }

  add(customer: Customer) {
    const state = this.getState();
    state.customers.push(customer);
    this.setState({customers: state.customers}, CustomersStoreActions.AddCustomer);
  }

  remove() {
    const state = this.getState();
    state.customers.splice(state.customers.length - 1, 1);
    this.setState({customers: state.customers}, CustomersStoreActions.RemoveCustomer);
  }
}
