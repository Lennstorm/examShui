import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <h1>Välkommen till tramstavlan!</h1>
            <h2>Ingen har tramsat ännu</h2>
            <Link to="/new">Publicera trams</Link>
        </div>
    );
}

export default LandingPage;