import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-publisher-add',
  templateUrl: './publisher-add.component.html',
  styleUrls: ['./publisher-add.component.css']
})
export class PublisherAddComponent implements OnInit {

  publisherAddForm:FormGroup;


  constructor(private publisherService:PublisherService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              ) { }

  ngOnInit(): void {
    this.createPublisherAddForm();
  }

  createPublisherAddForm(){
    this.publisherAddForm=this.formBuilder.group({
      publisherName:["",Validators.required],
    })
  }

  addPublisher(){
    if (this.publisherAddForm.valid) {
      let publisherModel= Object.assign({},this.publisherAddForm.value);
      this.publisherService.addPublisher(publisherModel).subscribe(
        response => {
          this.toastrService.success(response.message,"Başarılı")
        },
        responseError => {
          if (responseError.error.ValidationError.length>0) {
            for (let i = 0; i < responseError.error.ValidationError.length; i++) {
              this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage,"Doğrulama Hatası")
              
            }
          }
        }
      )
    } else {
      this.toastrService.error("Eksik form!","Lütfen boş alan bırakmayınız")
    }
  }
}

