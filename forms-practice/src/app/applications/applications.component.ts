import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../shared-data/employee.model';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared-data/storage.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  applications: Employee[] = [];
  subscription!: Subscription;

  constructor(private dataService: StorageService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.employeesChanged.subscribe(
      (applications: Employee[]) => {
        this.applications = applications;
        console.log(applications);
        console.log('smth');
      }
    );

    this.applications = this.dataService.getEmployees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
