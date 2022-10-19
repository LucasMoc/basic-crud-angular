import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Idata from 'src/app/shared/interfaces/Idata';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-cliente',
  templateUrl: './table-cliente.component.html',
  styleUrls: ['./table-cliente.component.css'],
})
export class TableClienteComponent implements OnInit {
  public dataSource = new MatTableDataSource<Idata>();
  displayedColumns: string[] = ['id', 'name', 'phone', 'buttons'];

  private _data: Idata[];
  @Input()
  set data(data: Idata[]) {
    this._data = data;
    this.dataSource.data = this._data
  };

  @Output() delDataEvent = new EventEmitter<Idata>();
  @Output() editDataEvent = new EventEmitter<Idata>();

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  constructor() { }

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(data: Idata) {
    this.delDataEvent.emit(data)
  }

  edit(data: Idata) {
    this.editDataEvent.emit(data)
  }

}
