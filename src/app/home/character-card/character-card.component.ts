import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FileService } from '@app/core/services/file.service';
import { Observable, Subject } from 'rxjs';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnChanges {

  @Input() character!: Character;
  @Output() like = new EventEmitter<number>();

  image$ = new Subject<HTMLImageElement>();
  
  constructor(private fileService: FileService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.character.currentValue != null) {
      this.fileService.imageFromURL(changes.character.currentValue.pic).subscribe(image => this.image$.next(image));
    }
  }

}
