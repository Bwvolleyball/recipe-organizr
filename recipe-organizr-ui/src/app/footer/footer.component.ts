import { Component, OnInit } from '@angular/core';
import {faCopyright} from '@fortawesome/free-regular-svg-icons/faCopyright';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faCopyright = faCopyright;

  constructor() { }

  ngOnInit() {
  }

}
