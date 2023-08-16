import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OTPGeneratorComponent } from './otpgenerator/otpgenerator.component';
import { AuthGuard } from './auth.guard';
import { IdentPagePage } from './ident-page/ident-page.page';
import { AuthPagePage } from './auth-page/auth-page.page';

const routes: Routes = [
  {path: 'otp',component: OTPGeneratorComponent, canActivate: [AuthGuard]},
  {path: '',loadChildren: () => import('./auth-page/auth-page.module').then( m => m.AuthPagePageModule)},
  {path: 'ident',loadChildren: () => import('./ident-page/ident-page.module').then( m => m.IdentPagePageModule)},
  {path: 'auth', redirectTo: ''},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
