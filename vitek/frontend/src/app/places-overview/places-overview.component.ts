import { Component, OnInit } from '@angular/core';
import {PlaceService} from "../place.service";
import {Place} from "../models/place";

@Component({
  selector: 'app-places-overview',
  templateUrl: './places-overview.component.html',
  styleUrls: ['./places-overview.component.scss']
})
export class PlacesOverviewComponent implements OnInit {

  placeArray: Place[] = [];

  total: any;
  total_rub: any;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces()
  }

  private getPlaces() {
    this.placeService.list().subscribe(data => {
      this.placeArray = data.places;
      this.total = data.total;
      this.total_rub = data.total_rub;
    })
  }
}
