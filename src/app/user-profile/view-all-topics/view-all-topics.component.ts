import { animate, query, stagger, style, transition, trigger, group, animateChild } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { TopicsService } from 'src/app/service/topics.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

export interface TopicElement {
  topic: string;
  country: string;
  language: string;
  grade: string;
  position: number;
  index: number
  subId: any
  access: any
}
export interface Subject {
  subject: string
}
@Component({
  selector: 'app-view-all-topics',
  templateUrl: './view-all-topics.component.html',
  styleUrls: ['./view-all-topics.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('250ms', [
            animate('500ms', style({ opacity: 1, transform: "translateX(10px)" }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('viewAnimation', [
      transition(':enter', [
        group([
          query('h2', [
            style({ transform: 'translateY(-20px' }),
            animate(1000)
          ])
        ])
      ])
    ])
  ]
})

export class ViewAllTopicsComponent implements AfterViewInit {

  displayedColumns: string[] = ['subject', 'topic', 'country', 'language', 'grade', 'action'];
  topic: TopicElement[] = [];
  dataSource: MatTableDataSource<TopicElement>;
  subjSource: MatTableDataSource<Subject>;
  accessCode: any
  constructor(private topicService: TopicsService) { }

  ngOnInit(): void {
    function filterByAccess(obj: { access: boolean; }) {
      if (obj.access === false) 
      {
        return true
      } 
      return false;
    }
    this.topicService.getAllTopicByAccess().subscribe((res: any) => {
      // res = res.filter(filterByAccess) // filter data on frontend
      this.dataSource = new MatTableDataSource<TopicElement>(<any>res)
      this.dataSource.paginator = this.paginator;
    })
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.ngOnInit()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

 // trigger('viewAnimation', [
    //   transition(':enter', [
    //     group([
    //       query('h2', [
    //         style({ transform: "translateX(10px)" }),
    //         animate(1000)
    //       ]),
    //       query('@fadeIn', [
    //         stagger(2000, animateChild())
    //       ], {optional:true})
    //     ])
    //   ])
    // ]),
    // trigger('fadeIn', [
    //   transition(':enter', [
    //     style({opacity: 0}),
    //     animate(2000)
    //   ])
    // ])