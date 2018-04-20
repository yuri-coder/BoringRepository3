//let CommentController    = require("../controllers/CommentController.js");
//let ListingController = require("../controllers/ListingController.js");

let PetController = require("../controllers/PetController.js");

let path = require("path");

module.exports =(app)=>{

	app.get("/api/pets",PetController.all);
	app.get("/api/pets/:id",PetController.findById);
	app.post("/api/pets/new",PetController.create);
	app.put("/api/pets/:id/update",PetController.update);
	app.delete("/api/pets/:id/destroy",PetController.destroy);
	app.get("/api/pets/:id/like",PetController.like);




// ********************************************************
// Users
// ********************************************************
	//app.post("/api/register",UserController.register);
	//app.post("/api/login",UserController.login);
// ********************************************************
// Listings
// ********************************************************
	//app.get("/api/listings",ListingController.all);
	//app.post("/api/listings/new",ListingController.create);
	//app.get("/api/listings/:id",ListingController.findById);
	//app.get("/api/listings/lotd",ListingController.lotd);
	//app.get("/api/listings/:id",ListingController.findById);
	//app.put("/api/listings/:id/update",ListingController.update);
	//app.delete("/api/listings/:id/destroy",ListingController.destroy);

// ********************************************************
// Comments
// ********************************************************
	//app.get("/api/comments",CommentController.all);
	//app.post("/api/comments/:id/new",CommentController.create);
	//app.get("/api/comments/:id",CommentController.findById);
// ********************************************************
// Angular
// ********************************************************
	app.all("*", (req,res,next) => {
		res.sendFile(path.resolve("./client/dist/index.html"))
	});
}