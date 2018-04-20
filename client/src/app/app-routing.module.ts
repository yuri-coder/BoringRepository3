import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllpetsComponent } from "./allpets/allpets.component";
import { AddpetComponent } from "./addpet/addpet.component";
import { PetinfoComponent } from "./petinfo/petinfo.component";
import { EditpetComponent } from "./editpet/editpet.component";


const routes: Routes = [
	{path:"", pathMatch: "full", component:AllpetsComponent},
	{path:"new", component:AddpetComponent},
	{path:"details/:id", component:PetinfoComponent},
	{path:"edit/:id", component:EditpetComponent},
	{path:"**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
