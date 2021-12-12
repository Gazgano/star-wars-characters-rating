import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterVersusComponent } from './character-versus/character-versus.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterVersusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
