import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Category} from "./models/category";

interface CategoryReport {
  category: Category
  amount: string
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  get(selectedTags: string[] = []) {
    let params = new HttpParams();
    selectedTags.forEach(tag => params = params.append("tags", tag));
    return this.http.get('/api/chart',{params: params});
  }

  get_category(selectedTags: number[] = []) {
    let params = new HttpParams();
    selectedTags.forEach(tag => params = params.append("tags", tag.toString()));

    return this.http.get<CategoryReport[]>('/api/chart_category',{params: params});
  }
}
