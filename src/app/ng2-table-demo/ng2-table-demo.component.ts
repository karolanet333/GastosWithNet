import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { TableData } from './table-data';
import * as _ from "lodash";
declare var $:any;

@Component({
  selector: 'app-ng2-table-demo',
  templateUrl: './ng2-table-demo.component.html',
  styleUrls: ['./ng2-table-demo.component.css']
})
export class Ng2TableDemoComponent implements OnInit, OnChanges {

  public rows:Array<any> = [];
  @Input() columns:Array<any> = null;
  @Input() data:Array<any> = null;//TableData;
  @Input() controllerPath:string = null;
  @Input() dataOrig:Array<any> = null;
  @Input() filterAllColumns:boolean = null;
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    //filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  public constructor(private router: Router) {

  }

  public ngOnInit():void {
    if (this.columns == null){
      this.columns = [
        {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
        {
          title: 'Position',
          name: 'position',
          sort: false,
          filtering: {filterString: '', placeholder: 'Filter by position'}
        },
        {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
        {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
        {title: 'Start date', className: 'text-warning', name: 'startDate'},
        {title: 'Salary ($)', name: 'salary'}
      ];
    }
    if (this.data == null){
      this.data = TableData;
    }
    this.length = this.data.length;

    if (this.filterAllColumns == null){
      this.filterAllColumns = true;
    }

    this.onChangeTable(this.config);

  }

  public ngOnChanges(){
    /*if (this.data == null){
      this.data = TableData;
    }*/   
    
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if(previous[columnName].toLowerCase == undefined){
          if (previous[columnName] > current[columnName]) {
            return sort === 'desc' ? -1 : 1;
          } else if (previous[columnName] < current[columnName]) {
            return sort === 'asc' ? -1 : 1;
          }
      } else {
          if (previous[columnName].toLowerCase() > current[columnName].toLowerCase()) {
            return sort === 'desc' ? -1 : 1;
          } else if (previous[columnName].toLowerCase() < current[columnName].toLowerCase()) {
            return sort === 'asc' ? -1 : 1;
          }
      }

      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(new RegExp(column.filtering.filterString, "i"));
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(new RegExp(this.config.filtering.filterString, "i")));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(new RegExp(this.config.filtering.filterString, "i"))) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;

    setTimeout(()=> {
      $('.edit-button').parent().css('width', "70px");
      $('.edit-button').parent().css('text-align', "right");
      $('.delete-button').parent().css('width', "70px");
      $('.id-column').parent().css('width', "50px");
    });

    if (this.filterAllColumns == false){
      setTimeout(()=> {
          $('tbody>tr:first').remove();
      });
    }

  }

  public onCellClick(data: any): any {
    console.log(data);

    var selectedRow = data.row;
    var Id: number;

      // If Button Edit
      if (data.column == "EditButton") {
        if (selectedRow.Id2 != undefined){
          Id = selectedRow.Id2;
        } else {
          Id = selectedRow.Id;
        }

        this.router.navigate(['/' + this.controllerPath + '/edit', Id]);

      } else if (data.column == "DeleteButton") {
        if (selectedRow.Id2 != undefined){
          Id = selectedRow.Id2;
        } else {
          Id = selectedRow.Id;
        }

        this.router.navigate(['/' + this.controllerPath + '/delete', Id]);

      }
  }
}
