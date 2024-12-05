import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tictactoe-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class TictactoeSquareComponent{

    @Input() value!: 'X' | 'O';

}
