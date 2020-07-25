import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of, combineLatest } from 'rxjs';
import { Company, Employee, Project } from './dataModels';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

  getCompanyDetails(id: string): Observable<any> {
    const company = this.http.get<Company[]>('../../assets/data/companies.json')
      .pipe(map(companies => companies.find(comp => comp.id === id)));
    const companyAddress = this.http.get<any>('../../assets/data/company-addresses.json')
      .pipe(map(addresses => addresses.filter(address => address.companyId === id)));
    const companyProjects = this.http.get<Project[]>('../../assets/data/projects.json')
      .pipe(map(projects => projects.filter(project => project.companyId === id)));

    return combineLatest(company, companyAddress, companyProjects);
  }

  getProjectEmployees(employee: string[]): any {
    return this.getEmployees()
      .subscribe(employees => {
        const mappedEmployees = this.mapEmployeesToCompaniesIds(employees)
        const projectEmployees = employee.reduce((result, employeeId) => {
          result.push(mappedEmployees[employeeId]);
          return result;
        }, []);
      });
  }

  private mapEmployeesToCompaniesIds(employees: Employee[]): any {
    return employees.reduce((result, employee) => {
      if (result[employee.companyId]) {
        result[employee.companyId].push(employee);
      } else {
        result[employee.companyId] = [employee];
      }

      return result;
    }, {});
  }
}
