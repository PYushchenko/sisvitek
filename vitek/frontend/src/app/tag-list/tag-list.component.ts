import {Component, OnInit, ViewChild} from '@angular/core';
import {MatChipList, MatChipSelectionChange} from "@angular/material";
import {TagsService} from "../tags.service";
import {Tag} from "../models/tag";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  @ViewChild('tagsList')
  tagsList: MatChipList;
  public tags: Tag[] = [];

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.getTags()
  }

  private getTags() {
    this.tagsService.list().subscribe(data => this.tags = data);
  }

  changeSelected($event: MatChipSelectionChange, tag: any) {
    tag.selected = $event.selected;
    let selected_tags = this.tags.filter(tag => tag['selected']).map(tag => tag.id);
    this.tagsService.selectTags(selected_tags);
  }

}
