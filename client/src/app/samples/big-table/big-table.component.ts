import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ResultModel } from 'src/app/model/result.model';
import { BigTableModel } from 'src/app/model/big-table.model';
import { map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageModel } from 'src/app/model/page.model';

@Component({
  selector: 'app-big-table',
  templateUrl: './big-table.component.html',
  styleUrls: ['./big-table.component.sass'],
  animations: [
    trigger('openClose', [
      state('open', style({
        maxHeight: '300px',
      })),
      state('closed', style({
        height: '0px'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class BigTableComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  public dataResult: ResultModel<BigTableModel[]> = new ResultModel<BigTableModel[]>();
  public dataSearchResult: ResultModel<BigTableModel[]> = new ResultModel<BigTableModel[]>();
  public searchValue: string;
  public showSearchResult: boolean;
  public isLoading: boolean;
  public pagesInfo = [
    5,
    10,
    50,
    100
  ];
  public pageInfo: PageModel = new PageModel();
  public targetPage = 5;

  ngOnInit() {
    this.pageInfo.itemsPerPage = this.targetPage;
    this.getData();
  }

  onPageInfoChange() {
    this.pageInfo.itemsPerPage = this.targetPage;
    this.getData();
  }

  changePage(pi: any) {
    this.getData(pi);
  }

  getData(take?: number) {
    this.db.list('/big-table').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(x =>
            ({
              count: x.payload.numChildren(),
            })
          );
        })
      )
      .subscribe((r: any) => {
        const query = take ?
          this.db.list('/big-table', ref => ref.startAt(
            this.dataResult.data[this.dataResult.data.length - 1].key
            ).limitToFirst(this.pageInfo.itemsPerPage)) :
          this.db.list('/big-table', ref => ref.limitToFirst(this.pageInfo.itemsPerPage));
        query.snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(x =>
                ({
                  ...x.payload.val(),
                  key: x.key,
                })
              );
            })
          )
          .subscribe((res1: BigTableModel[]) => {
            this.dataResult.setData(res1);
            this.dataSearchResult.setData(res1);
            this.pageInfo.pageNumber = [];
            for (let index = 0; index < r.length / this.pageInfo.itemsPerPage; index++) {
              this.pageInfo.pageNumber.push(index + 1);
            }
          }, (error: any) => {
            this.dataResult.setError(error);
          });
      });
  }

  addItems(no: number) {
    let lastId =
      (this.dataResult.data && this.dataResult.data.length > 0) ?
        this.dataResult.data.length :
        0;
    for (let index = 0; index < no; index++) {
      const item = {
        key: '',
        id: ++lastId,
        insertDate: new Date().toString(),
        text: Math.random().toString(36).slice(-5)
      };
      this.db.list('big-table').push(item).then(res => {
        this.isLoading = false;
      }).catch((error: any) => {
        this.isLoading = false;
      });
    }


  }

  clearSearch() {
    this.searchValue = '';
    this.showSearchResult = false;
  }

  search(e: KeyboardEvent) {
    this.showSearchResult = true;
    this.dataSearchResult.setData([]);
    if (this.searchValue === '') {
      this.showSearchResult = false;
      return;
    }
    this.dataResult.data.forEach(element => {
      if (element.id.toString().toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        element.insertDate.toString().toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        element.text.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())) {
        this.dataSearchResult.data.push(element);
      }
    });
  }

  deleteItems(no: number) {
    for (let index = 0; index < no; index++) {
      if (!this.dataResult.data[this.dataResult.data.length - (index + 1)]) {
        // return;
      }
      const key = this.dataResult.data[this.dataResult.data.length - (index + 1)].key;
      debugger;
      this.db.list(`/big-table/${key}`).remove();
    }
  }
}
