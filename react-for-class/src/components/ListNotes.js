import React, {useEffect, useState} from 'react';
import axios from "axios";
import CreateNode from "./CreateNode";
import DetailNote from "./DetailNote";
import {BASE_URL} from "../constants";

function ListNotes(props) {
    const [notes, setNotes] = useState([]);

    function deleteNote(note_id) {
        let data = '';

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: BASE_URL + '/notes/notes/' + note_id + '/',
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (notes.length > 0) {
                    setNotes(notes.filter(note => note.id !== note_id));
                } else {
                    setNotes([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const refreshNotes = () => {
        console.log("start get list data")
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BASE_URL + 'notes/notes/',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setNotes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        refreshNotes();
    }, []);
    return (
        <div>
            <h1>Notes</h1>
            {notes.map(note => <div key={note.id}>
                    <DetailNote note_id={note.id} />
                    <button onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
            )}
            <CreateNode refreshNotes={refreshNotes}/>


        </div>
    )
        ;
}

export default ListNotes;