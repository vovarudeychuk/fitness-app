import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(private searchService: NbSearchService) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.searchService.activateSearch('rotate-layout')
  }

}
