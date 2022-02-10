import { updatePost } from './../state/posts.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Post } from '../models/posts.model';
import { getPostById } from '../state/posts.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postForm!: FormGroup;

  postSubscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const id = params.get('id');
      this.store.select(getPostById, { id }).subscribe(data => {
        this.post = data;
        console.log(this.post)
        this.createForm()

      })

    })
  }


  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post?.description, [Validators.required, Validators.minLength(10)])
    })

  }

  onSubmit() {
    if (!this.postForm.valid) {
      return
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post?.id,
      title,
      description,

    };
    //dispatch the action

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts'])


  }


  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

  }





}
