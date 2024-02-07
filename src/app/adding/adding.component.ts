import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Department {
  id: number;
  name: string;
}

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css']
})
export class AddingComponent implements OnInit {
  student = {
    name: '',
    surname: '',
    department_id: null
  };
  departments: Department[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.http.get<Department[]>('http://localhost:9090/department/all').subscribe(departments => {
      this.departments = departments;
    });
  }

  addStudent() {
    this.http.post('http://localhost:9090/student/add', this.student).subscribe({
      next: (response) => console.log('Student added successfully', response),
      error: (error) => console.error('Error adding student', error)
    });
  }
}
