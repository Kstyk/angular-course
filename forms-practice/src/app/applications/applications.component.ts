import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../shared-data/employee.model';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared-data/storage.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit {
  applications: Employee[] = [];
  subscription!: Subscription;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.onFetchEmployees();
  }

  onFetchEmployees() {
    // not deprecated
    this.storageService.fetchEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.applications = res;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // deprecated
    // this.storageService.fetchEmployees().subscribe(
    //   (resData) => {
    //     this.applications = resData;
    //     console.log(resData);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
