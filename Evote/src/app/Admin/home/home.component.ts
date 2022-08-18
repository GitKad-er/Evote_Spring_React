import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import {
  BarChartOption,
  ChartData,
  ChartOption,
  ChartView,
  PieChartView,
} from 'ngx-chart';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  template: `
    <!-- Page Content -->
    <!-- <div class="clr-row">
      <div class="clr-col-12"> -->
        <!-- <div class="clr-row">
          <div class="clr-col-lg-5 clr-col-md-12 clr-col-sm-12 hardware-grid" *ngIf="resulst.length > 0">
            <h2>Matériels</h2>
            <ngx-pie-chart
              [chartData]="resulst"
              [chartOptions]="chartOptions"
            ></ngx-pie-chart>
          </div>
          <div class="clr-col-lg-2 vertical-line"></div>
          <div class="clr-col-lg-5 clr-col-md-12 clr-col-sm-12 task-grid" *ngIf="resulst2.length > 0">
            <h2>Tâches</h2>
            <ngx-pie-chart
              [chartData]="resulst2"
              [chartOptions]="chartOptions"
            ></ngx-pie-chart>
          </div>
        </div> -->
        <!-- [view]="pieView" -->
        <!-- <div class="clr-col-12">
        <table class="table table-vertical">
          <tr>
            <th>Matérielfxvfxbvxfbxgcbc</th>
            <td>{{ etat.Material_nb }}</td>
          </tr>
          <tr>
            <th>Prestataires</th>
            <td>
              {{ etat.Provider_nb }}
            </td>
          </tr>
          <tr>
            <th>Taches</th>
            <td>{{ etat.Tasks_nb }}</td>
          </tr>

          <tr>
            <th>Utilisateurs</th>
            <td>{{ etat.Users_nb }}</td>
          </tr>
        </table>
      </div> -->
      <!-- </div>
    </div> -->
  `,
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: HomeService) {}
  data: any;
  etat: any;
  nbe?: any;

  resulst: any = [];
  resulst2: any = [];

  pieView: PieChartView = {
    height: 400,
    width: 400,
    radius: 100,
  };
  chartOptions: ChartOption = {
    showLegend: true,
    legendTitle: 'Total',
  };

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getDataS1().subscribe((res) => {
      this.data = res;
      this.resulst = res;

      // this.etat = this.data
      //  this.chartData.push(this.resulst)
      // console.log(this.chartData)
      // this.chartData = [...this.chartData]
      console.log(this.resulst);
    });

    this.service.getDataS2().subscribe((res) => {
      this.data = res;
      this.resulst2 = res;

      // this.etat = this.data
      //  this.chartData.push(this.resulst)
      // console.log(this.chartData)
      // this.chartData = [...this.chartData]
      console.log(this.resulst);
    });
  }
}
