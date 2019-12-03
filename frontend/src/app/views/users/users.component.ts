import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UsersComponent implements OnInit {

	users: any = [];
	userForm;
	genders = [
		{text: 'Male', value: 'male'},
		{text: 'Female', value: 'female'},
		{text: 'Other', value: 'other'},
	];
	userPopupTitle: string;
	errorData: any;

  constructor(private userService: UserService,
  						private modalService: NgbModal,
  						private formBuilder: FormBuilder,
  						config: NgbModalConfig,) { 
  	this.loadUsers();
  	config.backdrop = 'static';
    config.keyboard = false;
  }

  loadUsers() {
  	this.userService.list().subscribe(res => {
  		this.users = res.data;
  	});
  }

  ngOnInit() {
  }

  addUser(content) {
  	this.userPopupTitle = 'Add New User';
  	this.userForm = this.formBuilder.group({
	    name: ['', Validators.required],
	    dateOfBirth: [null, Validators.required],
	    email: ['', Validators.required],
	    gender: ['', Validators.required],
	    hourlyRate: [null, Validators.required],
  	});

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('modal closed, ', result)
    }, (reason) => {
      console.log('modal closed, ', reason)
    });
  }

  onSubmit(userData) {
    // Process checkout data here
    console.warn('Your order has been submitted', userData, this.userForm);

    if (this.userForm.status === 'VALID') {
    	userData.dateOfBirth = `${userData.dateOfBirth.year}-${userData.dateOfBirth.month}-${userData.dateOfBirth.day}`;
    	if (!!userData.id) {
    		this.userService.update(userData.id, userData).subscribe(res => {
    			console.log('user updated ', res);
    			this.loadUsers();
    			this.userForm.reset();
    			this.modalService.dismissAll();
    		}, err => {
    			console.log('user update err ', err);
    			this.errorData = err;
	  		});
    	} else {
    		this.userService.create(userData).subscribe(res => {
    			console.log('user created ', res);
    			this.loadUsers();
    			this.userForm.reset();
    			this.modalService.dismissAll();
    		}, err => {
    			console.log('user create err ', err);
    			this.errorData = err;
	  		});
    	}
    }
  }

  editUser(user, content) {
  	user.dateOfBirth = new Date(user.dateOfBirth);
  	let dob = {
  		year: user.dateOfBirth.getFullYear(),
  		month: user.dateOfBirth.getMonth(),
  		day: user.dateOfBirth.getDay(),
  	}
  	this.userPopupTitle = 'Edit User';
  	this.userForm = this.formBuilder.group({
  		id: [user.id],
	    name: [user.name, Validators.required],
	    dateOfBirth: [dob, Validators.required],
	    email: [user.email, Validators.required],
	    gender: [user.gender, Validators.required],
	    hourlyRate: [user.hourlyRate, Validators.required],
  	});
  	console.log(this.userForm);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('modal closed, ', result)
    }, (reason) => {
      console.log('modal closed, ', reason)
    });
  }

  deleteUser(user) {
  	this.userService.delete(user.id).subscribe(res => {
			console.log('user deleted ', res);
			this.loadUsers();
		}, err => {
			console.log('user delete err ', err);
			this.errorData = err;
		});
  }

}
