import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Company } from '../../../../app/services/dataModels';
import { ActivatedRoute, Router, ActivationStart } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent {
  company: Company;
  companyProjects: { [key: string]: any };
  companyAddress: { [key: string]: any };

  constructor(
    private router: Router,
    private dataService: DataService,
    private cdf: ChangeDetectorRef,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        this.dataService.getCompanyDetails(event.snapshot.params.id)
          .subscribe(companyDetails => {
            this.company = companyDetails[0];
            this.companyAddress = companyDetails[1];
            this.companyProjects = companyDetails[2];
            this.companyProjects.forEach(project => {
              this.dataService.getProjectEmployees(project.employeesId);
            });
          });
        this.cdf.detectChanges();
      }
    });
  }
}
