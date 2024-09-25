import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";

const API_URL = import.meta.env.VITE_API_URL;

function EditNotePage() {
    const { id } = useParams();
    const [initialText, setInitialText] = useState("");
    const [initialUsername, setInitialUsername] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/notes/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setInitialText(data.text);
                    setInitialUsername(data.username);
                });
        }
    }, [id]);

    const handleFormSubmit = ({ text, username }) => {
        const method = id ? "PUT" : "POST";
        const url = id ? `${API_URL}/notes/${id}` : `${API_URL}/notes`;

        fetch(url, {
            method: method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ text, username }),
            mode: 'cors'
        }).then(() => {
            navigate("/notes"); //Tillbaka till notes-sidan efter sparad note
        });
    };

    return (
        <div>
            <h1>{id ? "Redigera trams" : "Nytt trams"}</h1>
            <NoteForm initialText={initialText}
                initialUsername={initialUsername}
                isEditing={!!id}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}

export default EditNotePage;
