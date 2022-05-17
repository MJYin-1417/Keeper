import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import {Fab, Zoom} from '@mui/material';


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [zoomed, setZoomed] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function handleZoom(){
    setZoomed(true);
  }

  return (
    <div>
      <form className="create-note">
        {zoomed && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={handleZoom}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={zoomed ? 3 : 1}
        />
        <Zoom in={zoomed}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
