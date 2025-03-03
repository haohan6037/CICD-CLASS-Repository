import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../constants";
import UpdateNote from "./UpdateNote";

function DetailNote(props) {
    const note_id = props.note_id;
    const [note, setNote] = useState({})

    const getNote = (note_id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BASE_URL + 'notes/notes/' + note_id + '/',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setNote(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getNote(note_id)
    }, []);
    return (
        <div>

            <h1>Title:{note.title}</h1>
            <p>Content:{note.content}</p>
            <UpdateNote note_id={note_id} refreshNotes={getNote}/>
        </div>

    );
}

export default DetailNote;