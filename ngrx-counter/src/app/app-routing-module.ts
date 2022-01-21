import { NgModule } from '@angular/core';
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
    //   path: 'posts/details/:id',
    //   component: SinglePostComponent,
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
