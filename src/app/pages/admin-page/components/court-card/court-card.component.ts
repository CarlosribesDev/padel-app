import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Court } from 'app/models/Court';
import { EditCourtModalComponent } from 'app/shared/modals/edit-court-modal/edit-court-modal.component';
import { CourtType } from 'app/models/CourtType';

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

  openEditCourtModal() {

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
