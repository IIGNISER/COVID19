var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/pawan',{ useNewUrlParser: true },(err)=>{
	if(!err){
		console.log("connection succeeded hurray!");
	}else{
		console.log("connection error: " + err);
	}
});

var registerSchema = new mongoose.Schema({
	country: String,
	totalCases: String,
	activeCases:String,
	recoveredCases: String,
	created:{type: Date,default: Date.now}
});

var Register = mongoose.model("Register",registerSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
	res.render("index");
});

app.get("/precautions",(req,res)=>{
	res.render("precautions");
});

app.get("/register",(req,res)=>{
	res.render("register");
});
 app.get("/country",(req,res)=>{
	res.render("country");
});

app.get("/symptoms",(req,res)=>{
	res.render("symptoms");
});

app.get("/about",(req,res)=>{
	res.render("about");
});

app.get("/home",(req,res)=>{
	res.render("home");
});

app.get("/script",(req,res)=>{
	res.render("script");
});

app.post("/participants",(req,res)=>{
	var country = req.body.fname;
	var totalCases = req.body.lname;
	var activeCases = req.body.classes;
	var recoveredCases = req.body.stream;
	var participant = {
		country : country,
		totalCases : totalCases,
		activeCases : activeCases,
		recoveredCases : recoveredCases,
	};
	Register.create(participant);
	res.redirect("/cases");
});

app.get("/cases",(req,res)=>{
	Register.find({}).then(registers =>{
		res.render("cases",{registers : registers});
	}).catch(err=>{
		console.log(err);
	});	
});

app.listen(3000,()=>{
	console.log("server is running at port 3000");
});