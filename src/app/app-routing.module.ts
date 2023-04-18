import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KreditComponent } from './components/kredit/kredit.component';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';

const routes: Routes = [
    { path: 'kredit', component: KreditComponent },
    { path: 'klijent', component: KlijentComponent },
    { path: 'racun', component: RacunComponent},
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'author', component: AuthorComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
