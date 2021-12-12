import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HelperService } from "@app/core/services/helper.service";
import { Observable } from "rxjs";
import { map, shareReplay, take } from "rxjs/operators";
import { CharacterBattle } from "../models/character-battle.model";
import { Character } from "../models/character.model";

@Injectable()
export class CharacterService {
    
    characterList$!: Observable<Character[]>;
    
    constructor(private http: HttpClient, private helperService: HelperService) {
        this.characterList$ = this.getCharacterList().pipe(
            shareReplay(1)
        );
    }

    private getCharacterList(): Observable<Character[]> {
        return this.http.get<{ characters: Character[] }>('assets/datasets/star_wars_characters.json').pipe(
            map(x => x.characters),
        );
    }

    getCharacterBattle(): Observable<CharacterBattle> {
        return this.characterList$.pipe(
            take(1),
            map(characterList => {
                const leftIndex = this.helperService.getRandomIndex(characterList);
                const left = characterList.splice(leftIndex, 1)[0];
                const rightIndex = this.helperService.getRandomIndex(characterList);
                const right = characterList.splice(rightIndex, 1)[0];
                return { left, right };
            }),
        );
    }
}