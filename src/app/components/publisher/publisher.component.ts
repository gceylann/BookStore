import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/models/entities/publisher';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  publishers:Publisher[]=[];
  currentPublisher:Publisher;


  constructor(private publisherService:PublisherService) { }

  ngOnInit(): void {
    this.getPublishers();
  }

  getPublishers() {
    this.publisherService.getPublishers().subscribe(response=> {
      this.publishers=response.data
    })
  }
  setCurrentPublisher(publisher:Publisher){
    this.currentPublisher=publisher;

  }

  getCurrentPublisherClass(publisher:Publisher){
    if (publisher==this.currentPublisher) {
      return "list-group-item active list-group-item-dark"
    }else{
      return "list-group-item"
    }
  }

}
