const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");

const app = express();

const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/keeperDB");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model("Note", noteSchema);

app.route("/")
  .get(function(req, res){
    Note.find({}, function(err, foundNotes){
      if(!err){
        res.send(foundNotes);
      }
      else{
        console.log(err);
      }
    })
  })
  .post(function(req, res){
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content
    });
    newNote.save(function(err){
      if (err) {
        console.log(err);
      }
      else {
        res.send(newNote);
      }
    });
  })
  .delete(function(req, res){
    const noteID = req.body._id;
    Note.deleteOne(
      {_id: noteID},
      function(err){
        if(err){
          console.log(err);
        }
        else{
          res.send({_id: noteID});
        }
    });
  });

const PORT = process.env.PORT || 3000

app.listen(PORT, function(){
  console.log(`Server started on port ${PORT}`);
});
