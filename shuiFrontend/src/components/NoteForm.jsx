/* Component som exporterar formuläret för att lägga in en note */
import { useState, useEffect } from 'react';
import './NoteForm.css'

function NoteForm({ initialText = "", initialUsername = "", onSubmit, isEditing = false }) {
    const [text, setText] = useState(initialText);
    const [username, setUsername] = useState(initialUsername);

    useEffect(() => {
        setText(initialText);  // Uppdatera om initialText ändras
        setUsername(initialUsername);
    }, [initialText, initialUsername]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && username.trim()) {
            onSubmit({ text, username });  // Skicka tillbaka texten till föräldern vid submit
        }
    };

    return (
        <form className='inputForm' onSubmit={handleSubmit}>
            <input className='userNameField'
                type="text"
                value={username}
                readOnly={isEditing} // read-only vid redigering av note
                placeholder='Användarnamn'
                onChange={(e) => setUsername(e.target.value)}
            />
            <textarea className='inputForm_textArea'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Skriv trams här!"
            />
            <button className='.inputForm_btn' type="submit">{isEditing ? "Uppdatera trams!" : "Publicera trams!"}</button>
        </form>
    );
}

export default NoteForm;
