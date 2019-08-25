import {Component, OnInit} from '@angular/core';
import {faCopyright} from '@fortawesome/free-regular-svg-icons/faCopyright';
import {VersionService} from '../version/version.service';
import {VersionInfo} from '../version-info';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faCopyright = faCopyright;

  versionInfo: VersionInfo;

  constructor(private versionService: VersionService) {
  }

  ngOnInit() {
    this.versionService.versionInfo()
      .subscribe(versionInfo => {console.log('version info %o', versionInfo); this.versionInfo = versionInfo; },
        error => console.warn('Failed to retrieve version info. %o', error));
  }

}
