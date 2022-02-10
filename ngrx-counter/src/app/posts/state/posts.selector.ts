import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { PostsState } from './posts.state';



const getPostState = createFeatureSelector<PostsState>('posts');


export const getPosts = createSelector(getPostState, (state) => {
    return state.posts;
});


export const getPostById = createSelector(getPostState, (state: any, props: any) => {
    // return state.posts[props.id] ? state.posts[props.id] : null;

    return state.posts.find((post: { id: any; }) => post.id === props.id);


})