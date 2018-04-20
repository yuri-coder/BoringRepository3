import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from "../pet.service";

@Component({
  selector: 'app-petinfo',
  templateUrl: './petinfo.component.html',
  styleUrls: ['./petinfo.component.css']
})
export class PetinfoComponent implements OnInit {

	private pet:any;
	private liked:any;

	constructor(private ps:PetService, private router:Router, private route:ActivatedRoute) { }

	ngOnInit() {
		this.liked = false;
		this.pet = {};

		this.route.params.subscribe(params => this.ps.findById(params["id"], (data)=>{
			if(data.errors){
				this.router.navigate([""]);
			}
			else{
				this.pet = data;
			}
		}));

	}

 	like(){
 		this.ps.like(this.pet._id, (data)=>{
 			if(data.errors){
 				console.log(data.errors);
 			}
 			else{
 				this.pet = data;
 				this.liked = true;
 			}
 		});
	}

	adopt(){
		this.ps.destroy(this.pet._id, (data)=>{
			console.log(data);
			this.router.navigate([""]);
		});
	}

}
