import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import * as m from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Company, Employee, Project } from './dataModels';

describe('DataService', () => {
  let service: DataService;
  let http: HttpClient;

  beforeEach(() => {
    http = m.mock(HttpClient);

    service = new DataService(m.instance(http));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCompanies() should return array of companies', async(() => {
    const companies: Company[] = [
      { id: '1', name: 'company 1', business: 'streamline', slogan: 'Profit-focused' },
      { id: '2', name: 'company 2', business: 'development', slogan: 'People-focused' },
    ];
    m.when(http.get<Company[]>('../../assets/data/companies.json'))
      .thenReturn(of(companies));

    service.getCompanies()
      .subscribe(data => expect(data).toEqual(companies));
    m.verify(http.get('../../assets/data/companies.json')).once();
  }));

  it('getEmployees() should return array of employees', async(() => {
    const employee1 = {
      id: 'c9b8f7a3-65a6-409c-ba8e-c770e34bc57c',
      firstName: 'Fanny',
      lastName: 'Crona',
      dateOfBirth: '1965-01-10T20:48:37.953Z',
      companyId: '2bc28cea-36d4-4938-9081-42c8d4ab50af',
      jobTitle: 'District Web Technician',
      jobArea: 'Web',
      jobType: 'Manager'
    };
    const employee2 = {
      id: 'ecdd37cd-6463-44c7-be9b-78d6f52cde2b',
      firstName: 'Brandy',
      lastName: 'Cormier',
      dateOfBirth: '1969-06-26T20:59:44.615Z',
      companyId: '8cd78042-6990-483f-8d22-7a32e5c75606',
      jobTitle: 'Investor Assurance Strategist',
      jobArea: 'Implementation',
      jobType: 'Analyst'
    };
    const employees: Employee[] = [employee1, employee2];
    m.when(http.get<Employee[]>('../../assets/data/employees.json'))
      .thenReturn(of(employees));

    service.getEmployees()
      .subscribe(data => expect(data).toEqual(employees));
    m.verify(http.get('../../assets/data/employees.json')).once();
  }));

  it('getProjects() should return array of projects', async(() => {
    const project1 = {
      id: 'eec9dfc5-3e34-4992-9751-f7d8c650f1de',
      name: 'Unbranded Frozen Car',
      department: 'Garden',
      employeesId: ['1504fe2c-325d-445b-9278-cdd23f6a1317'],
      companyId: '8cd78042-6990-483f-8d22-7a32e5c75606'
    };
    const project2 = {
      id: '0b08928d-4244-4d76-b7ac-72e17183247a',
      name: 'Sleek Concrete Shoes',
      department: 'Kids',
      employeesId: [],
      companyId: '3c26ed77-821c-4fc8-91d3-034ccfdc2179'
    };
    const projects: Project[] = [project1, project2];
    m.when(http.get<Project[]>('../../assets/data/projects.json'))
      .thenReturn(of(projects));

    service.getProjects()
      .subscribe(data => expect(data).toEqual(projects));
    m.verify(http.get('../../assets/data/projects.json')).once();
  }));
});
