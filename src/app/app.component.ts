import {Component, OnInit} from '@angular/core';
import {CustomerService, StoreState} from './customer.service';
import {Subscription} from 'rxjs';
import {EmployeeService} from './employee.service';
import {ManagerService} from './manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dan-wahlin-observable-store';
  storeSubscription: Subscription;

  constructor(private customersService: CustomerService, private employeeService: EmployeeService, private managerService: ManagerService) {
  }

  ngOnInit() {
    this.customersService.globalStateChanged.subscribe((state: StoreState) => {
      console.log(`global state changed`);
    });

    this.customersService.stateChanged.subscribe((state: StoreState) => {
      console.log(`state slice from customer subscription triggered ${JSON.stringify(state)}`);
    });

    this.employeeService.stateChanged.subscribe((state: StoreState) => {
      console.log(`all state from employee subscription triggered ${JSON.stringify(state)}`);
    });

    this.storeSubscription = this.managerService.stateChanged.subscribe((state: StoreState) => {
      console.log(`all state from manager subscription triggered ${JSON.stringify(state)}`);
    });

    console.log(`add cust`);
    this.customersService.add({name: 'hello'});

    console.log(`add emp`);
    this.employeeService.add({name: 'hello'});
  }
}
