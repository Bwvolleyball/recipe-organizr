import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VersionInfo} from '../version-info';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }


  public versionInfo(): Observable<VersionInfo> {
    return this.http.get<VersionInfo>('/actuator/info');
  }

}
