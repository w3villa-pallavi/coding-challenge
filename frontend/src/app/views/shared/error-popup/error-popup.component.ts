import { Component, OnInit, OnChanges, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ErrorPopupComponent implements OnInit, OnChanges {

  @Input() errorData: any;
  @ViewChild('errorPopup', {static: false}) errorPopup: TemplateRef<ElementRef>;
 
  constructor(private modalService: NgbModal,
  						config: NgbModalConfig) {
  	config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
		console.log('error popup data', this.errorData, changes);

  	if (!!this.errorData && this.errorData.error && (this.errorData.error.errors.length > 0 || this.errorData.error.message)) {
  		this.modalService.open(this.errorPopup, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
	      console.log('modal closed, ', result);
	      this.errorData = {};
	    }, (reason) => {
	      console.log('modal closed, ', reason);
	      this.errorData = {};
    	});
  	}
  	
  }

}
