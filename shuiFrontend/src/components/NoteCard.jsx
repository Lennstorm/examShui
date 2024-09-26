/* Component som exporterar pratbubblorna. */
import { Link } from "react-router-dom";

function NoteCard({ note, onDelete }) {
    const [noteText, editedTime] = note.text.split("\n\n(Edited at:");

    return (
        <div className="note-card">
            <p className="noteCard-text">{note.text}</p>
            <h3 className="noteCard-userName">{note.username}</h3>
            {editedTime && (
                <p className="edited-time">(Redigerad: {editedTime.trim()})</p>
            )}
            <Link to={`/edit/${note.id}`}>Ändra trams</Link>
            <button onClick={() => onDelete(note.id)}>Ta bort</button>
        </div>
    );
}

export default NoteCard;