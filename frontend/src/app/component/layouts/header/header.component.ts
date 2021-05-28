import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isUserAuthenticated = false;
  private authSubscription: Subscription;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe(
      isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

  onLogout(){
    this.authService.logOut();
  }

}
