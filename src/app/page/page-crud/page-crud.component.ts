import { Component, OnInit } from '@angular/core';
import Idata from 'src/app/shared/interfaces/Idata';

@Component({
  selector: 'app-page-crud',
  templateUrl: './page-crud.component.html',
  styleUrls: ['./page-crud.component.css'],
})
export class PageCrudComponent implements OnInit {
  public dataSource: Idata[] = [{
    id: 1,
    name: 'John',
    phone: '3525-35841'
  }]
  public name: string
  public phone: string
  public oldData: Idata
  constructor() { }

  ngOnInit() {

  }

  addData() {
    if (this.oldData) {
      const dataChange = this.dataSource.find(x => x.id === this.oldData.id)
      if (dataChange) {
        this.updateData(dataChange);
        return;
      }
    }

    const isDupliPhone = this.dataSource.findIndex(x => { return x.phone === this.phone }) > -1;

    if (isDupliPhone) {
      console.log('Phone Duplicated')
      return;
    }

    this.dataSource.push({ id: this.addID(), name: this.name, phone: this.phone });
    this.dataSource = [...this.dataSource];
    this.clearInput()
  }

  updateData(data: Idata) {
    data.name = this.name;
    data.phone = this.phone;
    this.dataSource = [...this.dataSource];
    this.oldData = null;
    this.clearInput()
  }

  addID(): number {
    return this.dataSource ? this.dataSource.length + 1 : 1;
  }

  deleteData(data: Idata) {
    const index = this.dataSource.findIndex(x => x.id === data.id);
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];

  }

  editData(data) {
    this.name = data.name;
    this.phone = data.phone;
    this.oldData = data;
  }

  clearInput() {
    this.name = ""
    this.phone = ""
  }

  isSave(): boolean {
    return this.name && this.phone ? false : true;
  }

}
