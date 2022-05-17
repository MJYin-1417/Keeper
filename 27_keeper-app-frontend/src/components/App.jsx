import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";



function App() {
  //states
  const [notes, setNotes] = useState([]);

  //functions
  function dbGetNotes(){
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(data => {
        setNotes(data);
      });
  }

  function dbPostNote(note) {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setNotes(prevNotes => {
          return [...prevNotes, data];
        })
      })
  }

  function dbDeleteNote(id) {
    fetch('http://localhost:3000/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id: id})
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("called delete on " + data._id);
        setNotes(prevNotes => {
          return prevNotes.filter((noteItem) => {
            return noteItem._id != data._id;
          });
        });
      })
  }

  //render
  useEffect(() => {
    dbGetNotes();
  }, []);


  //return
  return (
    <div >

    <Header / >
    <CreateArea onAdd = {dbPostNote}/>
    {
      notes.map((noteItem) => {
        return (
          <Note
            key = {noteItem._id}
            id = {noteItem._id}
            title = {noteItem.title}
            content = {noteItem.content}
            onDelete = {dbDeleteNote}
          />
        );
      })
    }

    <Footer / >
    </div>
  );
}

export default App;
