import { Component, OnInit } from '@angular/core';
import {CookbookService} from '../cookbook/cookbook.service';
import {Cookbook} from '../cookbook/cookbook';

@Component({
  selector: 'cookbook-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.scss']
})
export class CookbookViewComponent implements OnInit {

  cookbook: Cookbook;

  constructor(private cookbookService: CookbookService) { }

  ngOnInit() {
    this.cookbookService.getCookbook().subscribe(cookbook => this.cookbook = cookbook);
  }

}
