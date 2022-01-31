import { AppState } from './../../store/app.state';
import { getCounter } from './../state/counter.selectors';
import { CounterState } from './../state/counter.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  // counter$: Observable<number> | undefined;

  counter$: Observable<number> | undefined
  constructor(private store: Store<{ AppState: any }>) { }

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
    // this.store.select(getCounter).subscribe((data) => {
    //   console.log("counter observable called");
    //   this.counter = data;
    //   // this.counter = data.counter
    // });
  }

}
