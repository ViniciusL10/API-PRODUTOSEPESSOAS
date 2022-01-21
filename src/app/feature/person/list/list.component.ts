import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from 'src/app/core/model/deleteEvent';
import { SearchEvent } from 'src/app/core/model/searchEvent';
import { PeopleService } from 'src/app/core/services/people/people.service';

@Component({
  selector: 'shared-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headers: string[] = ['Id', 'Name', 'Age', 'Email', 'Phone', 'Actions'];

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
  }

  deletePerson(event: DeleteEvent): void{
    this.peopleService.delete(event.id).subscribe(() => {
      this.peopleService.all().subscribe(event.callback);
    });
  }

  searchPerson(event: SearchEvent): void{
    this.peopleService.all(event.query).subscribe(event.callback);
  }
}
