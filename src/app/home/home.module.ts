import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterVersusComponent } from './character-versus/character-versus.component';
import { CharacterService } from './services/character.service';

@NgModule({
  declarations: [
    CharacterCardComponent,
    CharacterVersusComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [CharacterService]
})
export class HomeModule { }
