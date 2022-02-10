import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter/counter.component';
import { HomeComponent } from './home/home.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'counter',
        component: CounterComponent,
    },
    {
        path: 'posts',
        component: PostsListComponent,
        children: [
            { path: 'add', component: AddPostComponent },
            { path: 'edit/:id', component: EditPostComponent }

        ],
    },
    // {
    //     path: 'counter',
    //     loadChildren: () =>
    //         import('./counter/counter.module').then((m) => m.CounterModule),
    // },
    // {
    // path: 'posts',
    // loadChildren: () =>
    //     import('./posts/posts.module').then((m) => m.PostsModule),
    // canActivate: [AuthGuard],
    // },
    // {
    //     path: 'posts/details/:id',
    //     component: EditPostComponent,
    // },
    // {
    //   path: 'auth',
    //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
