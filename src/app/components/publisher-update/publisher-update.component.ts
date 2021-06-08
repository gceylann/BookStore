import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Publisher } from 'src/app/models/entities/publisher';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
  styleUrls: ['./publisher-update.component.css']
})
export class PublisherUpdateComponent implements OnInit {

  publishers:Publisher[];
  publisher:Publisher;
  publisherUpdateForm:FormGroup;

  
  constructor(private publisherService:PublisherService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["publisherId"]) {
        this.getPublisherById(params["publisherId"]);
        this.createPublisherUpdateForm();
        this.getPublishers();
      }
    })
  }

  createPublisherUpdateForm(){
    this.publisherUpdateForm=this.formBuilder.group({
      publisherId:["",Validators.required],
      publisherName:["",Validators.required]
    })
  }

  updatePublisher(){
    if(this.publisherUpdateForm.valid){
      let updatePublisherModel=Object.assign({},this.publisherUpdateForm.value);

      this.publisherService.updatePublisher(updatePublisherModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Başarılı")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      (responseError)=>{
        console.log(responseError);
        if(responseError.error.ValidationErrors.lengh>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      }
      );
    }
    else{
      this.toastrService.error("Formunuz eksiktir. Kontrol ediniz.","Dikkat");
    }
  }

  getPublisherById(authorId:number){
    this.publisherService.getPublisherById(authorId).subscribe(response=>{
      this.publisher=response.data;

      this.publisherUpdateForm.get("publisherId")?.setValue(this.publisher.publisherId);
      this.publisherUpdateForm.get("publisherName")?.setValue(this.publisher.publisherName);
    })
  }

  getPublishers(){
    this.publisherService.getPublishers().subscribe(response=>{
      this.publishers=response.data;
    })
  }
}
