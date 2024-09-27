/* Component som exporterar pratbubblorna. */
import { Link } from "react-router-dom";
import './NoteCard.css'

function NoteCard({ note, onDelete }) {
    const [noteText, editedTime] = note.text.includes("--Edited at:")
        ? note.text.split("\n\n--Edited at:")
        : [note.text, null];

    return (
        <article className="noteCard-wrapper">
            <div className="noteCard-body">
                <p className="created-time">{note.createdAt}</p>
                <p className="noteCard-text">{noteText.trim()}</p>
                {editedTime && (
                    <p className="edited-time">Redigerad {editedTime.trim()}</p>
                )}
                <h3 className="noteCard-userName">{note.username}</h3>
            </div>
            <Link to={`/edit/${note.id}`}>Ändra trams</Link>
            <button onClick={() => onDelete(note.id)}>Ta bort</button>
        </article>
    );
}

export default NoteCard;