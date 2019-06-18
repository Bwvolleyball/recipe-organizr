import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CookbookService} from '../cookbook/cookbook.service';
import {Cookbook} from '../cookbook/cookbook';

@Component({
  selector: 'cookbook-add-to-cookbook-btn',
  templateUrl: './add-to-cookbook-btn.component.html',
  styleUrls: ['./add-to-cookbook-btn.component.scss']
})
export class AddToCookbookBtnComponent implements OnInit {

  @Input() recipeId: string;

  @Output() enabled = new EventEmitter<boolean>();

  private isEnabled: boolean;

  private cookbook: Cookbook;
  btnText = '';
  tooltipText = '';

  constructor(private cookbookService: CookbookService) {
  }

  ngOnInit() {
    this.cookbookService.getCookbook().subscribe(cookbook => this.receiveCookbook(cookbook));
  }

  addToCookbook() {
    if (this.isEnabled) {
      this.cookbook.recipes.push(this.recipeId);
      this.cookbookService.saveCookbook(this.cookbook).subscribe(cookbook => this.receiveCookbook(cookbook));
    }
  }

  private receiveCookbook(cookbook: Cookbook) {
    this.cookbook = cookbook;
    const recipes = cookbook.recipes;
    if (recipes.includes(this.recipeId)) {
      this.btnText = 'Already in Cookbook ✓';
      this.tooltipText = 'This recipe has already been added to your cookbook!';
      this.isEnabled = false;
    } else {
      this.btnText = 'Add to Cookbook';
      this.tooltipText = 'Add this recipe to your cookbook!';
      this.isEnabled = true;
    }
    this.enabled.emit(this.isEnabled);
  }
}
