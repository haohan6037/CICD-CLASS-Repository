import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../constants";
import DetailNote from "./DetailNote";

function UpdateNote(props) {
    const [note_id, setNote_id] = useState(props.note_id)
    // const [note, setNote] = useState(props.detail_note)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const user = 1
    const refreshNotes = props.refreshNotes

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BASE_URL + 'notes/notes/' + note_id + '/',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setTitle(response.data.title)
                setContent(response.data.content)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    function updateNote() {
        let data = JSON.stringify({
            "title": title,
            "content": content,
            "user": user
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: BASE_URL + 'notes/notes/' + note_id + '/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                refreshNotes(note_id);
                // DetailNote({note_id: note_id});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleContentChange(e) {
        setContent(e.target.value)
    }

    return (
        <div>
            <h1>Update Node</h1>
            <p>Title: <input type="text" value={title} onChange={handleTitleChange}/></p>
            <p>Content:<textarea onChange={handleContentChange} value={content}></textarea></p>
            <button onClick={updateNote}>Update Node</button>
        </div>
    );
}

export default UpdateNote;