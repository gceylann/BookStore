import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Publisher } from 'src/app/models/entities/publisher';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {

  publishers:Publisher[];

  constructor(private publisherService:PublisherService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getPublishers();
  }

  getPublishers(){
    this.publisherService.getPublishers().subscribe((response) => {
      this.publishers=response.data;
    })
  }

  deletePublisher(publisher:Publisher){
    this.publisherService.deletePublisher(publisher).subscribe((response) => {
      this.toastrService.error("Bu Yayınevi Silindi");
      setTimeout(()=> {window.location.reload();},1500);
    })
  }
}
