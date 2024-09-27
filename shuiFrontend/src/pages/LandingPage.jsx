import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LandingPage.css'

const API_URL = import.meta.env.VITE_API_URL;

function LandingPage() {
    const [notesExist, setNotesExist] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/api/notes`)
            .then((response)  => response.json())
            .then((data) =>  {
                if (data.data && data.data.length > 0) {
                    setNotesExist(true);
                    navigate("/notes");
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
                setLoading(false);
            });
    }, [navigate]);

    if (loading) {
        return <div className="loadingDataMessage">Laddar data...</div>
    }

    return (
        <div className="landingPage-wrapper">
            <h1 className="landingPage-headline">Välkommen till tramstavlan!</h1>
            {!notesExist && <h2 className="landingPage-underline">Ingen har tramsat ännu</h2>}
            {!notesExist && <Link className="editButton" to="/new">Tramsa!</Link>}
        </div>
    );
}

export default LandingPage;