import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { OTPGeneratorComponent } from './otpgenerator/otpgenerator.component';
import { IdentComponent } from './ident/ident.component';
import { AuthGuard } from './auth.guard';
import { IdentPagePage } from './ident-page/ident-page.page';

const routes: Routes = [
  {path: '',component: AuthComponentComponent},
  {path: 'auth',component: AuthComponentComponent},
  {path: 'ident',component: IdentPagePage},
  {path: 'otp',component: OTPGeneratorComponent, canActivate: [AuthGuard]},
  {
    path: 'ident-page',
    loadChildren: () => import('./ident-page/ident-page.module').then( m => m.IdentPagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
