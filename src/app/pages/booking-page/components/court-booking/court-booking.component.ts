import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Court } from 'app/models/Court';
import { EditCourtModalComponent } from 'app/shared/modals/edit-court-modal/edit-court-modal.component';
import { CourtType } from 'app/models/CourtType';
import { Booking } from 'app/models/Booking';

@Component({
  selector: 'app-court-booking',
  templateUrl: './court-booking.component.html',
  styleUrls: ['./court-booking.component.css']
})
export class CourtBookingComponent implements OnInit {

  imageSrc:String = '';

  @Input()court: Court = new Court();
  @Input()bookings: Booking[] = [];
  @Output()fecthDataEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    switch(this.court.type){
      case CourtType.OPEN: this.imageSrc = '../../../../assets/court-open.jpg'; break;
      case CourtType.INDOOR: this.imageSrc = '../../../../assets/court-indoor.jpg'; break;
      default : this.imageSrc = '../../../../assets/image.jpg'
    }
  }

  openBookingModal() {

    const options = {
      size: 'sm',
    };

    const modal = this.modalService.open(EditCourtModalComponent, options);

    modal.componentInstance.court = this.court;
    modal.hidden.subscribe({
      next:() => {
        this.fecthDataEvent.emit();
      }
    })
  }

}
