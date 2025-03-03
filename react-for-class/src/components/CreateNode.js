import React, {useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../constants";

function CreateNode(props) {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [user, setUser] = useState()

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }
    function handleContentChange(e) {
        setContent(e.target.value)
    }
    function createNode() {
        // const axios = require('axios');
        setUser(1);
        let data = JSON.stringify({
          "title": title,
          "content": content,
          "user": 1
        });

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: BASE_URL + 'notes/notes/',
          headers: {
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          props.refreshNotes();
        })
        .catch((error) => {
          console.log(error);
        });

    }



    return (
        <div>
            <h1>Create Node</h1>
            <p>Title: <input type="text" onChange={handleTitleChange}/></p>
            <p>Content:<textarea  onChange={handleContentChange}/></p>
            <button onClick={createNode}>Create Node</button>
        </div>
    );
}

export default CreateNode;