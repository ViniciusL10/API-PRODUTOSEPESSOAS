import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output()
  submit = new EventEmitter();
  keys: string[] = [];

  @Input()
  formEntity!: FormGroup;

  constructor(private activated: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.keys = Object.keys(this.formEntity?.value).filter(
      (keys) => keys !=='id'
    )
    this.activated.data.subscribe((value) => {
      if(value['entity']){
        this.formEntity?.patchValue(value['entity'])
      }
    });
  }
  goBack(){
    this.router.navigate(['..'], {relativeTo: this.activated});
  }
  clickOnSubmit(){
    if(this.formEntity.valid){
      this.submit.emit(this.formEntity?.value);
    }
  }
}
