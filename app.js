const PORT = process.env.PORT || 3100;

const express = require("express");
const app = express();
// const images = require('./modules/images');
const path = require("path");
const { Console } = require("console");
const bodyParser = require('body-parser');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false }));
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

const views = path.join(__dirname, './views');
app.set('views', views);



var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mongodbnodejs");
let mySchema = new mongoose.Schema({
 firstname: String,
 lastname: String,
 email:String,
 phone:Number
});
let Form = mongoose.model("Form", mySchema);
app.get('/form4', (req, res) => {
    let myPersonalData = new Form(req.query);
    myPersonalData.save()
    console.log(req.query);
    res.render('form4');
});

// app.post('/form4', (req, res) => {
//     let myPersonalData = new Form(req.body);
//     myPersonalData.save()
    
//     console.log(req.body);
//     res.render('form4');
// });


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})
