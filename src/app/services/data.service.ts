import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Company, Employee, Project } from './dataModels';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<Company[]>('../../assets/data/companies.json');
  }

  getEmployees(): Observable<any> {
    return this.http.get<Employee[]>('../../assets/data/employees.json');
  }

  getProjects(): Observable<any> {
    return this.http.get<Project[]>('../../assets/data/projects.json');
  }
}
