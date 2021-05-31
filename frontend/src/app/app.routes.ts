import { Routes } from '@angular/router';

import { PostListComponent } from './component/post/post-list/post-list.component';
import { PostCreateComponent } from './component/post/post-create/post-create.component';
import { PostEditComponent } from './component/post/post-edit/post-edit.component';
import { LogInComponent } from './component/auth/log-in/log-in.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';






export const appRoutes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate : [AuthGuard] },
  { path: 'edit/:postId', component: PostEditComponent, canActivate : [AuthGuard] },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LogInComponent },

]

