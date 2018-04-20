let Pet = require("mongoose").model("Pet");

class PetController{
	all(req,res){
		console.log("In PetController all");
		Pet.find({},(err, pets)=>{
			if(pets){
				return res.json(pets);
			}
			else{
				return res.json({errors:"Failed to get pets"});
			}
		});
	}

	findById(req,res){
		console.log("In PetController findById");
		Pet.findOne({_id:req.params.id}, (err, pet)=>{

			if(pet){
				return res.json(pet);
			}
			else{
				return res.json({errors: "Failed to retrieve pet!"});
			}
		});
	}

	create(req,res){
		console.log("In PetController create");

		Pet.findOne({name:req.body.name}, (err,pet)=>{
			if(pet){
				return res.json({errors:{err:{message:"A pet with this name already exists!"}}});
			}
			else{
				let newPet = new Pet(req.body);
				newPet.likes = 0;

				newPet.save((err)=>{
					if(err){
						return res.json({errors:newPet.errors});
					}
					else{
						return res.json(newPet);
					}
				});	
			}
		});

	}

	update(req,res){
		console.log("In PetController udpate");
		Pet.findOne({_id:req.params.id}, (err, pet)=>{
			if(err){
				return res.json({errors:"Failed to retrieve pet!"});
			}
			else{

				Pet.findOne({name:req.body.name}, (err,pet2)=>{
					if(pet2 && (pet2._id != req.params.id)){
						console.log(pet2._id);
						console.log(pet._id);
						return res.json({errors:{err:{message:"A pet with this name already exists!"}}});
					}
					else{
						pet.name = req.body.name;
						pet.type = req.body.type;
						pet.description = req.body.description;
						pet.skills = req.body.skills;

						pet.save(err=>{
							if(err){
								return res.json({errors:err});
							}
							else{
								return res.json(pet);
							}
						});
					}
				});
			}
		});
	}

	destroy(req,res){
		console.log("Goodbye, Mitty");
		Pet.remove({_id:req.params.id}, (err)=>{
			if(err){
				return res.json(false);
			}
			else{
				return res.json("Miiiiiiii~!");
			}
		});
	}

	like(req,res){
		Pet.findOne({_id:req.params.id}, (err,pet)=>{
			if(err){
				return res.json({errors:"Failed to retrieve pet!"});
			}
			else{
				pet.likes = Number(pet.likes) + 1;
				pet.save(err=>{
					if(err){
						return res.json({errors:err});
					}
					else{
						return res.json(pet);
					}
				});
			}
		});
	}
}

// class UserController{
// 	all(req,res){
// 		User.find({},(err,users)=>{
// 			if(users){
// 				return res.json(users);
// 			}else{
// 				return res.json({errors:"Failed to retrieve users"});
// 			}
// 		});
// 	}

// 	register(req,res){
// 		User.findOne({email:req.body.email},(err,user)=>{
// 			if(user){
// 				return res.json({errors:"A user with this email already exists!"});
// 			}else{
// 				let newUser = new User(req.body);

// 				newUser.save((err)=>{
// 					if(err){
// 						return res.json({errors:newUser.errors});
// 					}else{
// 						req.session.user_id = newUser._id;
// 						return res.json(newUser);
// 					}
// 				});
// 			}
// 		});
// 	}

// 	login(req,res){
// 		User.findOne({email:req.body.email},(err,user)=>{
// 			if(!user){
// 				return res.json({errors:"No user with this email was found."});
// 			}else{
// 				if(req.body.password == user.password){
// 					req.session.user_id = user._id;
// 					return res.json(user);
// 				}else{
// 					return res.json({errors:"Invalid Credentials."});
// 				}
// 			}
// 		});
// 	}
// }

// class ListingController{
// 	all(req,res){
// 		Listing.find({})
// 		.populate({
// 			path:"user",
// 			model:"User"
// 		})
// 		.exec((err,listings)=>{
// 			if(listings){
// 				return res.json(listings);
// 			}else{
// 				return res.json({errors:"Failed to retrieve listings."});
// 			}
// 		});
// 	}

// 	findById(req,res){
// 		Listing.findOne({_id:req.params.id})
// 		.populate({
// 			path:"user",
// 			model:"User"
// 		})
// 		.exec((err,listing)=>{
// 			if(listing){
// 				return res.json(listing);
// 			}else{
// 				return res.json({errors:"Failed to populate listing."});
// 			}
// 		});
// 	}

// 	create(req,res){
// 		let listing = new Listing(req.body);

// 		listing.user = req.session.user_id;

// 		listing.save((err)=>{
// 			if(err){
// 				return res.json({errors:listing.errors});
// 			}else{
// 				User.findOne({_id:req.session.user_id},(err,user)=>{
// 					if(user){
// 						user.listings.push(listing);

// 						user.save(err=>{
// 							if(err){
// 								return res.json({errors:user.errors});
// 							}else{
// 								return res.json(listing);
// 							}
// 						})
// 					}else{
// 						return res.json({errors:"Failed to lookup user."});
// 					}
// 				});

// 			}
// 		});
// 	}

// 	update(req,res){
// 		Listing.findOne({_id:req.params.id},(err,listing)=>{
// 			if(err){
// 				return res.json({errors:err});
// 			}else{
// 				listing.title = req.body.title;
// 				listing.description = req.body.description;
// 				listing.price = req.body.price;
// 				listing.location = req.body.location;
// 				listing.src = req.body.src;

// 				listing.save(err=>{
// 					if(err){
// 						return res.json({errors:err});
// 					}else{
// 						return res.json(listing);
// 					}
// 				});
// 			}
// 		});
// 	}

// 	destroy(req,res){
// 		Listing.remove({_id:req.params.id},(err)=>{
// 			if(err){
// 				return res.json(false);
// 			}else{
// 				return res.json(true);
// 			}
// 		});
// 	}

// 	lotd(req,res){
// 		Listing.find({})
// 		.populate({
// 			path:"user",
// 			model:"User"
// 		})
// 		.exec((err,listings)=>{
// 			if(listings){
// 				let index = Math.floor(Math.random() * listings.length);
// 				let listing = listings[index];

// 				return res.json(listing);
// 			}else{
// 				return res.json({errors:"Failed to retrieve listings."});
// 			}
// 		});
// 	}
// }

module.exports = new PetController();