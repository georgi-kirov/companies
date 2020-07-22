import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';
import { Company, Employee, Project } from './dataModels';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private companies$: Subject<Company[]> = new BehaviorSubject([]);
  private employees$: Subject<Employee[]> = new BehaviorSubject([]);
  private projects$: Subject<Project[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.companies$;
  }

  getEmployees(): Observable<any> {
    return this.employees$;
  }

  getProjects(): Observable<any> {
    return this.projects$;
  }

}
