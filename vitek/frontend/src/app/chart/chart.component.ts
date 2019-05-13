import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {UIChart} from "primeng/chart";
import {ChartService} from "../chart.service";

import {Chart} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') chart: UIChart;

  lineChart = [];

  public chartData: any = {
    labels: ['2017-07-07',
      '2017-07-08',
      '2017-07-09'],
    datasets: [
      {
        data: [65, 59, 80], label: 'Total:', yAxisID: 'left-y-axis', backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)", fill: false,
      },
      // {
      //   data: [65, 59, 80], label: 'Rate:', yAxisID: 'right-y-axis', backgroundColor: "rgb(54, 162, 235)",
      //   borderColor: "rgb(54, 162, 235)", fill: false,
      // },
      // {data: [65, 59, 80], label: 'Total:'},
      // {data: [65, 59, 80], label: 'Total:'},
      // {data: [65, 59, 80], label: 'Total:'}
    ]
  };

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            'millisecond': 'MMM DD',
            'second': 'MMM DD',
            'minute': 'MMM DD',
            'hour': 'MMM DD',
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
            'quarter': 'MMM DD',
            'year': 'MMM DD',
          }
        }
      }],
      yAxes: [{
        id: 'left-y-axis',
        type: 'linear',
        position: 'left'
      },
      ]
    }
  };

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    this.lineChart = new Chart('lineChart', { type: 'line', data: this.chartData, options: this.chartOptions});
    this.getChart();
  }

  ngOnChanges() {
    this.getChart();
  }

  getChart() {
    this.chartData.labels = [];
    this.chartData.datasets[0].data = [];
    // this.chartData.datasets[1].data = [];
    if (this.chart) {
      this.chart.reinit();
    }
    this.chartService.get().subscribe(data => {
      for (const i of data['index']) {
        this.chartData.labels.push(i);
      }
      for (const i of data['data']) {
        this.chartData.datasets[0].data.push(i[data['columns'].indexOf('total')]);
        // this.chartData.datasets[1].data.push(i[data['columns'].indexOf('rate')]);
        // this.chartData.datasets[2].data.push(i[2]);
        // this.chartData.datasets[3].data.push(i[3]);
        // this.chartData.datasets[4].data.push(i[4]);
      }
      if (this.chart) {
        this.chart.reinit();
      }
    });
  }
}
