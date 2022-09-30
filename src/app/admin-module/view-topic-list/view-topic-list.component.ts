import { animate, query, stagger, style, transition, trigger, group } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { TopicsService } from 'src/app/service/topics.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { ActivatedRoute } from '@angular/router';

export interface TopicElement {
  topic: string;
  country: string;
  language: string;
  grade: string;
  position: number;
  index: number;
  _id: number
}
@Component({
  selector: 'app-view-topic-list',
  templateUrl: './view-topic-list.component.html',
  styleUrls: ['./view-topic-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('150ms', [
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
export class ViewTopicListComponent implements AfterViewInit {
  displayedColumns: string[] = ['subject', 'topic', 'country', 'language', 'grade', 'view', 'edit', 'delete'];
  topic: TopicElement[] = [];
  topicId: any
  tpoicById: Array<any> = []
  dataSource: MatTableDataSource<TopicElement>;

  constructor(private topicService: TopicsService,
    private dialogueService: ConfirmDialogService, private snackbar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.topicService.getAllTopic().subscribe(res => {
      this.dataSource = new MatTableDataSource<TopicElement>(<any>res)
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)
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

  row: any;
  openDialogue(): void {
    const options = {
      title: 'Delete Topic?',
      message: 'Are you sure you want to delete Topic?',
      cancelCaption: 'No',
      confirmCaption: 'Yes'
    };
    this.dialogueService.open(options)
    this.dialogueService.confirmed().subscribe(confirm => {
      console.log('this is row')
      console.log(this.row + 'hello row')
      if (confirm) {
        this.topicService.deleteTopic(this.row?._id).subscribe(
          res => {
            this.snackbar.open(" Your Topic has been Deleted", "Ok", {
              duration: 5000,
              panelClass: ['blue-snackbar']
            });
            this.row = null
            window.location.reload()
          }, err => {
            console.log(err + 'I am error');
            this.snackbar.open("Failed to delete Topic", "Ok", {
              duration: 5000,
              panelClass: ['red-snackbar']
            });
            this.row = null
          }
        )
      }
      else return
    })
  }
}
