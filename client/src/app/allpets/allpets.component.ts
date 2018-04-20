import { Component, OnInit } from '@angular/core';
import { PetService } from "../pet.service";
import {Router} from '@angular/router';

@Component({
	selector: 'app-allpets',
	templateUrl: './allpets.component.html',
 	styleUrls: ['./allpets.component.css']
})
export class AllpetsComponent implements OnInit {

	private pets:any;
	private petsDict:any;

	constructor(private ps:PetService, private router:Router) { }

	ngOnInit() {
		this.pets = [];
		this.petsDict = {};
		this.ps.all((data)=>{
			this.pets = data;
			this.sortPets();
		});
	}

	sortPets(){
		for(let pet of this.pets){
			if(this.petsDict[pet.type.toLowerCase()]){
				this.petsDict[pet.type.toLowerCase()].push(pet);
			}
			else{
				this.petsDict[pet.type.toLowerCase()] = [pet];
			}
		}
		console.log(this.petsDict);
		this.pets = [];
		console.log("Before for");
		for(let i in this.petsDict){
			console.log("In i");
			console.log(i);
			for(let j of this.petsDict[i]){
				console.log("in j");
				console.log(j);
				this.pets.push(j);
			}
		}
		console.log(this.pets);
	}

	details(id){
		this.router.navigate(["/details/" + id]);
	}

	edit(id){
		this.router.navigate(["/edit/"+id]);
	}

}
