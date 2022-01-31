import { getPosts } from './../state/posts.selector';
import { Observable } from 'rxjs';
import { AppState } from './../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../models/posts.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]> | undefined
  constructor(private store: Store<{ AppState: any }>) { }



  ngOnInit(): void {

    this.posts = this.store.select(getPosts);
  }

}
