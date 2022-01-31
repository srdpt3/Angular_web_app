import { AppState } from './../../store/app.state';
import { Observable } from 'rxjs';
import { getChannelName } from './../state/counter.selectors';
import { changeChannelName } from './../state/counter.actions';
import { CounterState } from './../state/counter.state';
import { Component, OnInit } from '@angular/core';
import { customIncrement } from '../state/counter.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css']
})
export class CounterInputComponent implements OnInit {
  value: number = 0;
  channelName$: Observable<String> | undefined;

  constructor(private store: Store<{ AppState: any }>) { }

  ngOnInit(): void {

    this.channelName$ = this.store.select(getChannelName);
    // this.store.select(getChannelName).subscribe(data => {
    //   console.log("channel observable called");

    //   this.channelName = data
    // })
  }


  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }));
  }



  onChangeChannelName() {
    this.store.dispatch(changeChannelName())
  }
}
