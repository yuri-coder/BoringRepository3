import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class PetService {

  constructor(private http:HttpClient) { }

  all(cb){
  	this.http.get("/api/pets")
  	.subscribe(data=>cb(data));
  }

  create(pet, cb){
  	this.http.post("/api/pets/new", pet)
  	.subscribe(data=>cb(data));
  }

  findById(id, cb){
  	this.http.get("/api/pets/"+id)
  	.subscribe(data=>cb(data));
  }

  update(pet, cb){
  	this.http.put("/api/pets/"+pet._id+"/update", pet)
  	.subscribe(data=>cb(data));
  }	

  destroy(id, cb){
    this.http.delete("/api/pets/"+id+"/destroy")
    .subscribe(data=>cb(data));
  }

  like(id, cb){
    this.http.get("/api/pets/"+id+"/like")
    .subscribe(data=>cb(data));
  }

}
