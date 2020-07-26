import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinService {

  constructor() { }

  private loadingSource = new BehaviorSubject<any>({});
  public loading = this.loadingSource
    .asObservable()
    .pipe(distinctUntilChanged());


  setLoading(status){
    this.loadingSource.next(status);
  }
}