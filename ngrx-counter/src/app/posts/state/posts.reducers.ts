import { Action, createReducer, on } from "@ngrx/store";
import { addPost, addPostSuccess, updatePost } from "./posts.actions";
import { initialState, PostsState } from "./posts.state";

const _postsReducer = createReducer(
    initialState,
    on(addPost, (state: any, action: any,) => {

        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();

        return {
            ...state,
            posts: [...state.posts, post],
        };

        // return postsAdapter.addOne(action.post, {
        //     ...state,
        //     count: state.count + 1,
        // });
    }),
    on(updatePost, (state: any, action: any,) => {
        const updatedPosts = state.posts.map((post: { id: any; }) => {
            return action.post.id === post.id ? action.post : post;
        })
        return {
            ...state,
            posts: updatedPosts,
        };
    }),
    // on(deletePostSuccess, (state, { id }) => {
    //     return postsAdapter.removeOne(id, state);
    // }),
    // on(loadPostsSuccess, (state, action) => {
    //     return postsAdapter.setAll(action.posts, {
    //         ...state,  
    //         count: state.count + 1,
    //     });
    // })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state, action);
}