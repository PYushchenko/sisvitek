import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Place} from "./models/place";

interface PlacesList {
  places: Place[]
  total: any
  total_rub: string
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<PlacesList>('/api/places');
  }
}
