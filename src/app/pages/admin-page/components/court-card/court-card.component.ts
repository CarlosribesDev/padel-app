import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Court } from 'app/models/Court';
import { EditCourtModalComponent } from 'app/shared/modals/edit-court-modal/edit-court-modal.component';

@Component({
  selector: 'app-court-card',
  templateUrl: './court-card.component.html',
  styleUrls: ['./court-card.component.css']
})
export class CourtCardComponent implements OnInit {

  imageSrc:String = '';

  @Input()court: Court = new Court();
  @Output()fecthDataEvent: EventEmitter<void> = new EventEmitter();


  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    switch(this.court.type){
      case "OPEN": this.imageSrc = '../../../../assets/court-open.jpg'; break;
      case "INDOOR" : this.imageSrc = '../../../../assets/court-indoor.jpg'; break;
      default : this.imageSrc = '../../../../assets/image.jpg'
    }
  }

  openEditCourtModal(){
    this.modalService.open(EditCourtModalComponent, {size: 'sm'}).hidden.subscribe({
      next:() => {
        this.fecthDataEvent.emit();
      }
    })
  }

}
