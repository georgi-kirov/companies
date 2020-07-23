import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';
import { Company } from '../../../../app/services/dataModels';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  @Input() company: Company;

  constructor() { }

  ngOnInit() { }

}
