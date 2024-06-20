import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService} from '../services/auth.service'
import { ModelComponent } from '../model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { User } from '../interfaces/auth';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  isModelOpen = false;
  employees: User[] = [];
  employee!: User;

  constructor(
    private employeeService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {
        if (response.data) {
          this.employees = response.data;
        }
      },
    });
  }

  loadEmployee(employee: User) {
    this.employee = employee;
    this.openModel();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllEmployee();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }
}
