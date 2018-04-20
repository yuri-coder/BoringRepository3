import { Component, OnInit } from '@angular/core';
import { PetService } from "../pet.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-addpet',
	templateUrl: './addpet.component.html',
	styleUrls: ['./addpet.component.css']
})
export class AddpetComponent implements OnInit {

	private pet:any;
	private errors:any;


	constructor(private ps:PetService, private router:Router) { }

	init(){
		this.pet = {
			name:"",
			description:"",
			type:"",
			skill1:"",
			skill2:"",
			skill3:""
		};

		this.errors = [];
	}

	ngOnInit() {
		this.init();
	}

	create(){
		this.errors = [];
		let skillList = [];
		if(this.pet.skill1 != "" && !(skillList.includes(this.pet.skill1))){
			skillList.push(this.pet.skill1);
		}
		if(this.pet.skill2 != "" && !(skillList.includes(this.pet.skill2))){
			skillList.push(this.pet.skill2);
		}
		if(this.pet.skill3 != "" && !(skillList.includes(this.pet.skill3))){
			skillList.push(this.pet.skill3);
		}

		let petToCreate = {
			name: this.pet.name,
			description: this.pet.description,
			type: this.pet.type,
			skills: skillList
		};

		this.ps.create(petToCreate, (data)=>{
			if(data.errors){
				console.log(data.errors);
				for(let error in data.errors){
					this.errors.push(data.errors[error].message);
				}
			}
			else{
				this.router.navigate([""]);
			}
		});
	}

	cancel(){
		this.router.navigate([""]);
	}

}
