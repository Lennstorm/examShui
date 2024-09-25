import { Link } from "react-router-dom";

function NoteCard({ note }) {
    return (
        <div>
            <h2>{note.text}</h2>
            <Link to={`/edit/${note.id}`}>Ändra trams</Link>
        </div>
    );
}

export default NoteCard;