import { Component, OnInit } from '@angular/core';
import { PetService } from "../pet.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editpet',
  templateUrl: './editpet.component.html',
  styleUrls: ['./editpet.component.css']
})
export class EditpetComponent implements OnInit {
	
	private pet:any;
	private errors:any;

	constructor(private ps:PetService, private router:Router, private route:ActivatedRoute) { }

	ngOnInit() {
		this.pet = {};
		this.errors = [];

		this.route.params.subscribe(params => this.ps.findById(params["id"], (data)=>{
			if(data.errors){
				this.router.navigate([""]);
			}
			else{
				//this.pet = data;
				this.pet = {
					_id: data._id,
					name: data.name,
					description: data.description,
					type: data.type,
					skill1: data.skills[0],
					skill2: data.skills[1],
					skill3: data.skills[2]
				}
			}
		}));
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
			_id: this.pet._id,
			name: this.pet.name,
			description: this.pet.description,
			type: this.pet.type,
			skills: skillList
		};

		this.ps.update(petToCreate, (data)=>{
			if(data.errors){
				console.log(data.errors);
				for(let error in data.errors){
					this.errors.push(data.errors[error].message);
				}
			}
			else{
				this.router.navigate(["/details/" + this.pet._id]);
			}
		});
	}

	cancel(){
		this.router.navigate(["/details/" + this.pet._id]);
	}
}
