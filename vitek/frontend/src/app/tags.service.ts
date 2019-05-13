import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Tag} from "./models/tag";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<Tag[]>('/api/tags');
  }

  private selectedTagsSource = new Subject<number[]>();

  selectedTags$ = this.selectedTagsSource.asObservable();

  selectTags(tags: number[]) {
    this.selectedTagsSource.next(tags);
  }
}
