import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

const API_URL = import.meta.env.VITE_API_URL;

function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading]  = useState(true);
    const navigate = useNavigate();

    // hämta alla notes från backend    
    useEffect(() => {
        fetch(`${API_URL}/api/notes`)
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.data)){
                    setNotes(data.data);
                    if (data.data.length === 0) {
                        navigate("/"); // Omdirigera till landningssidan om tomt
                    }
                } else {
                    console.error("Invalid data format:", data);
                    navigate("/");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
                setLoading(false);
                navigate("/");
            });
    }, [navigate]);

    const handleDelete = (id) => {
        fetch(`${API_URL}/api/notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                setNotes((prevNotes) => {
                    const updatedNotes = prevNotes.filter(note => note.id !== id);
                    if (updatedNotes.length === 0) {
                        navigate("/"); // Omdirigera om allt tas bort
                    }
                    return updatedNotes;
                });
            })
            .catch((error) => {
                console.error("Error deleting note:", error);
            });
    };

    if (loading) {
        return <div className="loadingDataMessage">Laddar data...</div>;
    }

    return (
        <div>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
            <Link to="/new">Skapa nytt trams!</Link>
        </div>
    );
}

export default NotesPage;