import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";

function NotesPage() {
    const [notes, setNotes] = useState([]);

    // hämta alla notes från backend
    useEffect(() => {
        fetch("/api/notes")
        .then((response) => response.json())
        .then((data) => setNotes(data));
    }, []);

    if (notes.length === 0) {
        return <div>Inget trams publicerat ännu</div>;
    }
    
    return(
        <div>
        {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
        ))}
        <Link to="/new">Skapa nytt trams!</Link>
    </div>
);
}

export default NotesPage;