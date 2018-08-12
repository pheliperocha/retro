import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-retrospective-thumb',
  templateUrl: './retrospective-thumb.component.html',
  styleUrls: ['./retrospective-thumb.component.scss']
})
export class RetrospectiveThumbComponent {
  @Input() id: number;
  @Input() title: string;
  @Input() image: string;
  @Input() date: string;

  constructor() {}
}
