import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: any = [];
	jobForm;
	jobPopupTitle: string;
	errorData: any;

  constructor(private jobService: JobService,
  						private modalService: NgbModal,
  						private formBuilder: FormBuilder,
  						config: NgbModalConfig,) { 
  	this.loadJobs();
  	config.backdrop = 'static';
    config.keyboard = false;
  }

  loadJobs() {
  	this.jobService.list().subscribe(res => {
  		this.jobs = res.data;
  	});
  }

  ngOnInit() {
  }

  addJob(content) {
  	this.jobPopupTitle = 'Add New Job';
  	this.jobForm = this.formBuilder.group({
	    title: ['', Validators.required],
	    description: ['', Validators.required],
  	});

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('modal closed, ', result)
    }, (reason) => {
      console.log('modal closed, ', reason)
    });
  }

  onSubmit(jobData) {
    // Process checkout data here
    console.warn('Your order has been submitted', jobData, this.jobForm);

    if (this.jobForm.status === 'VALID') {
    	if (!!jobData.id) {
    		this.jobService.update(jobData.id, jobData).subscribe(res => {
    			console.log('job updated ', res);
    			this.loadJobs();
    			this.jobForm.reset();
    			this.modalService.dismissAll();
    		}, err => {
    			console.log('job update err ', err);
    			this.errorData = err;
	  		});
    	} else {
    		this.jobService.create(jobData).subscribe(res => {
    			console.log('jon created ', res);
    			this.loadJobs();
    			this.jobForm.reset();
    			this.modalService.dismissAll();
    		}, err => {
    			console.log('job create err ', err);
    			this.errorData = err;
	  		});
    	}
    }
  }

  editJob(job, content) {
  	this.jobPopupTitle = 'Edit Job';
  	this.jobForm = this.formBuilder.group({
  		id: [job.id],
	    title: [job.title, Validators.required],
	    description: [job.description, Validators.required]
  	});
  	console.log(this.jobForm);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('modal closed, ', result)
    }, (reason) => {
      console.log('modal closed, ', reason)
    });
  }

  deleteJob(job) {
  	this.jobService.delete(job.id).subscribe(res => {
			console.log('job deleted ', res);
			this.loadJobs();
		}, err => {
			console.log('job delete err ', err);
			this.errorData = err;
		});
  }

}
