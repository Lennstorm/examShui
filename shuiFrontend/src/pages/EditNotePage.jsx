import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import './EditNotepage.css'

const API_URL = import.meta.env.VITE_API_URL;

function EditNotePage() {
    const { id } = useParams();
    const [initialText, setInitialText] = useState("");
    const [initialUsername, setInitialUsername] = useState("")
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/api/notes/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.data) {
                        setInitialText(data.data.text);
                        setInitialUsername(data.data.username);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching note", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleFormSubmit = ({ text, username }) => {
        const method = id ? "PUT" : "POST";
        const url = id ? `${API_URL}/api/notes/${id}` : `${API_URL}/api/notes`;

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ text, username }),
            mode: 'cors'
        }).then(() => {
            navigate("/notes"); //Tillbaka till notes-sidan efter sparad note
        });
    };

    const handleDelete = () => {
        fetch(`${API_URL}/api/notes/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                navigate("/notes");
            })
            .catch((error) => console.error("Error deleting trams:", error));
    };

    const handleCancel = () => {
        navigate("/notes"); // avbryt, gå tillbaka till notes-sidan
    }

    if (loading) {
        return <div className="loadingDataMessage">Laddar data...</div>;
    }

    return (
        <div>
            <h1>{id ? "Redigera trams" : "Nytt trams"}</h1>
            <NoteForm initialText={initialText}
                initialUsername={initialUsername}
                isEditing={!!id}
                onSubmit={handleFormSubmit}
            />
            {id ? (
                <>
                    <button onClick={handleDelete} className="deleteButton">Ta bort</button>
                </>
            ) : (
                <button onClick={handleCancel} className="cancelButton">Avbryt</button>
            )}
        </div>
    );
}

export default EditNotePage;
