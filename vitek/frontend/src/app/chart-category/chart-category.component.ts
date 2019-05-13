import { Component, OnInit } from '@angular/core';
import {ChartService} from "../chart.service";
import {TagsService} from "../tags.service";

@Component({
  selector: 'app-chart-category',
  templateUrl: './chart-category.component.html',
  styleUrls: ['./chart-category.component.scss']
})
export class ChartCategoryComponent implements OnInit {

  category_data: any;

  constructor( private chartService: ChartService, private tagsService: TagsService) {
    this.tagsService.selectedTags$.subscribe(selectedTags => this.getCategoryChart(selectedTags));
  }

  ngOnInit() {
    this.getCategoryChart();
  }

    colors = [
    '#3f51b5',
    '#884bb3',
    '#bd42a6',
    '#e53d90',
    '#ff4874',
    '#ff6355',
    '#ff8433',
    '#ffa600']

  private getCategoryChart(selectedTags: number[] = []) {
    this.chartService.get_category(selectedTags).subscribe(data => {
      let labels = [];
      let dataset = [];
      for (let x of data) {
        labels.push(x.category.name + " " + x.amount + " RUB");
        dataset.push(x.amount);
      }
      this.category_data = {labels: labels, datasets: [{data: dataset, backgroundColor: this.colors}]}
    });
  }

}
