import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../shared-data/storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  roles = ['Admin', 'Junior', 'Senior', 'Mid'];
  angularKnowledge = ['None', 'Begineer', 'Mid', 'Advanced', 'Master'];
  form: FormGroup;

  constructor(private dataService: StorageService) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      role: new FormControl(this.roles[1], [Validators.required]),
      advanced: new FormControl(this.angularKnowledge[0], [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.dataService.addEmployee(this.form.value);
  }

  ngOnInit(): void {}
}
