let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model('Pet',new mongoose.Schema({
	name:{type:String, required:[true, "Really? You didn't think to give your pet a name? Idiot..."],minlength:[3, "Quit being lazy and give your pet a name at least 3 character long!"],maxlength:[255, "Jesus, surely your pet doesn't need to have that long of a name... limit it to 255 characters!"]},
	description:{type:String,required:[true, "Even boring pets need a description..."],minlength:[3, "Wow, what a deep and meaningful description... try to make it at least 3 characters, ok?"],maxlength:[255, "Look, we don't want your pet's life story. Just limit it to 255 characters"]},
	type:{type:String,required:[true, "Seriously, we need to know what kind of pet this is..."],minlength:[3, "Erm... can you make this 3 characters long please?"],maxlength:[255, "Either you typed gibberish or put WAY too many adjectives here. Limit it to 255 characters, yeah?"]},
	likes:{type:Number},
	skills:{
		type: [{type:String, maxlength:255}],
		validate: [arrayLimit, "Okay okay, we get it, your pet has a bajillion skills... but please only list 3!"]
	}
},{timestamps:true}));

function arrayLimit(val){
	return val.length <= 3;
}