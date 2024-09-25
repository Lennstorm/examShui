import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotesPage from "./pages/NotesPage";
import EditNotePage from "./pages/EditNotePage";
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path= "/edit/:id" element={<EditNotePage />} />
        <Route path= "/new" element={<EditNotePage />} />
      </Routes>
    </Router>    
  );
}

export default App
