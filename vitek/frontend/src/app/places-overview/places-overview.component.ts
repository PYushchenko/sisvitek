import { Component, OnInit } from '@angular/core';
import {PlaceService} from "../place.service";

@Component({
  selector: 'app-places-overview',
  templateUrl: './places-overview.component.html',
  styleUrls: ['./places-overview.component.scss']
})
export class PlacesOverviewComponent implements OnInit {

  placeArray: any = [];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces()
  }

  private getPlaces() {
    this.placeService.list().subscribe(data => {
      this.placeArray = data;
    })
  }
}
