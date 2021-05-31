import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//reactive form
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator'


// httpClient
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './component/post/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/layouts/header/header.component';
import { PostListComponent } from './component/post/post-list/post-list.component';

import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { PostEditComponent } from './component/post/post-edit/post-edit.component';
import { LogInComponent } from './component/auth/log-in/log-in.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { AuthInterceptor } from './component/auth/auth-interceptor';

import { AuthGuard  } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    PostEditComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService,AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
