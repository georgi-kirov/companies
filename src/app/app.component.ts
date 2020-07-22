import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Company } from './services/dataModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  companies: Company[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }
}
