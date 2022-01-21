import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as EventEmitter from 'events';


@Component({
  selector: 'shared-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()
  headers: string[] = [];

  @Output()
  deleteEntity = new EventEmitter();
  searchEntity = new EventEmitter();
  limitEntity = new EventEmitter();

  entities: any[] = [];
  keys: string[] = [];
  inputValue: string = "";

  constructor(private activated: ActivatedRoute, private router, Router) { }

  ngOnInit(): void {
    this.activated.data.subscribe((value) => {
      this.entities = value['entities'];
    });

    this.keys = Object.keys(this.entities[0]);
  }

  search(): void {
    const obj = {
      query: this.inputValue,
      callback: this.setEntities
    };
    this.searchEntity.emit(obj);
  }

  gotToAdd(): void {
    this.router.navigate(['add'], { relativeTo: this.activated });
  }

  editEntity(id: number): void {
    this.router.navigate([id], { relativeTo: this.activated });
  }

  onDeleteEntity(id: number): void {
    const obj = {
      id,
      callback: this.setEntities
    };
    this.deleteEntity.emit(obj);
  }

  toLimit(): void {
    const limitTo = 3;

    const obj = {
      limit: limitTo,
      callback: (entities: any) => {
        this.setEntities(entities);
      }
    };

    this.limitEntity.emit(obj);
  }

  private setEntities(entities: any) {
    this.entities = entities;
  }
}
