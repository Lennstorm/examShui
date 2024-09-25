import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";

function EditNotePage() {
    const { id } = useParams();
    const [initialText, setInitialText] = useState("");
    const [initialUsername, setInitialUsername] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            fetch(`/api/notes/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setInitialText(data.text);
                    setInitialUsername(data.username);
                });
        }
    }, [id]);

    const handleFormSubmit = (text) => {
        const method = id ? "PUT" : "POST";
        const url = id ? `/api/notes/${id}` : `/api/notes`;

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, username }),
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
