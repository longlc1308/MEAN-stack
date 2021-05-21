import { Routes } from '@angular/router';

import { PostListComponent } from './component/post/post-list/post-list.component';
import { PostCreateComponent } from './component/post/post-create/post-create.component';
import { PostEditComponent } from './component/post/post-edit/post-edit.component';






export const appRoutes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostEditComponent },

]
