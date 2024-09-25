import { useState, useEffect } from 'react';

function NoteForm({ initialText = "", initialUsername = "", onSubmit, isEditing = false }) {
    const [text, setText] = useState(initialText);
    const [username, setUsername] = useState(initialUsername);

    useEffect(() => {
        setText(initialText);  // Uppdatera om initialText ändras
        setUsername(initialUsername);
    }, [initialText, initialUsername]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text, username);  // Skicka tillbaka texten till föräldern vid submit
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                tupe="text"
                value={username}
                readOnly={isEditing} // read-only vid redigering av note
                placeholder='Användarnamn'
                onChange={(e) => setUsername(e.target.value)}
            />
            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Skriv trams här!"
            />
            <button type="submit">{initialText ? "Uppdatera trams!" : "Publicera trams!"}</button>
        </form>
    );
}

export default NoteForm;
