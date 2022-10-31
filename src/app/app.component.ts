import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder,ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formsDynamic';
  fields:any[]=[];
  formgroup = new FormGroup({});
  constructor(private formBuilder:UntypedFormBuilder,private httpClient:HttpClient){}
  ngOnInit():void{
    this.httpClient.get<any[]>('/assets/formDatas.json').subscribe((formFields:any[])=>{
      for(const formField of formFields){
        this.formgroup.addControl(formField.name,new FormControl('',this.validator(formField)))
      }
      this.fields = formFields;   
    })
   
  }
  submit():void{    
    if (this.formgroup.valid){
      console.log(this.formgroup.value);
    }
  }

  private validator(formField:any):any{

    var array:any[]=[];
    for(var i=0;i<formField.validation.length;i++){      
      switch(formField.validation[i]){
        case 'email':
          array.push(Validators.email)
          break;
        case 'required':
          array.push(Validators.required)
          break;
        default:
          return null;
      }
    }    
    return (array)
  }

}
