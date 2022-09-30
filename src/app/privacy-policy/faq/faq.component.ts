// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  // animations: [
  //   trigger('collapseExpand', [
  //     state('collapsed', style({height: 0, overflow: 'hidden'})),
  //     state('expanded', style({height: '*', overflow: 'auto'})),
  //     transition('collapsed => expanded', [
  //       animate('5s ease-out')
  //     ]),
  //     transition('expanded => collapsed', [
  //       animate('5s ease-in')
  //     ])
  //   ])
  // ]
})
export class FaqComponent implements OnInit {
  links = ['All', 'General', 'Account', 'Payment'];
  activeLink = this.links[0];
  panelOpenState = false;
  isExpanded = true
  constructor() { }

  ngOnInit(): void {
  }

}
