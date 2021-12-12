import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharacterBattle } from '../models/character-battle.model';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-character-versus',
  templateUrl: './character-versus.component.html',
  styleUrls: ['./character-versus.component.scss']
})
export class CharacterVersusComponent implements OnInit {

  characterBattle$ = new Subject<CharacterBattle>();
  
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    // battle init
    this.nextBattle();
  }

  private nextBattle(): void {
    this.characterService.getCharacterBattle().subscribe(x => this.characterBattle$.next(x));
  }

  like(id: number): void {
    // like
    this.nextBattle();
  }
}
