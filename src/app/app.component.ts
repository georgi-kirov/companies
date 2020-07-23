import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Company, Employee } from './services/dataModels';
import { combineLatest } from 'rxjs';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  companies: MenuItem[] = [];
  companiesIdsEmployees: { [key: string]: Employee[] };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const companies$ = this.dataService.getCompanies();
    const employees$ = this.dataService.getEmployees();

    combineLatest(companies$, employees$)
      .subscribe(([companies, employees]) => {
        const tmpCompanies = this.createCompaniesMenu(companies);
        this.companiesIdsEmployees = this.mapEmployeesToCompaniesIds(employees);
        tmpCompanies.map(c => {
          if (!this.companiesIdsEmployees[c.id]) {
            return;
          }

          const companyEmployees = this.companiesIdsEmployees[c.id];
          // helper to check if we already have this jobsArea
          const currentJobAreas = [];
          c.items = companyEmployees.reduce((result, empl) => {
            if (currentJobAreas.includes(empl.jobArea)) {
              const jobArea = result.find(item => item.label === empl.jobArea);
              jobArea.items.push({ label: `${empl.firstName} ${empl.lastName}` });
            } else {
              currentJobAreas.push(empl.jobArea);
              result.push({
                label: `${empl.jobArea}`,
                items: [{ label: `${empl.firstName} ${empl.lastName}` }],
              });
            }
            return result;
          }, []);
        });
        this.companies = tmpCompanies;
      });
  }

  createCompaniesMenu(companies: Company[]): any {
    return companies.reduce((result, company) => {
      result.push({
        label: company.name,
        id: company.id,
        items: [],
      });
      return result;
    }, []);
  }

  mapEmployeesToCompaniesIds(employees: Employee[]): any {
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
