import styles from "./App.module.scss";
import { Header } from "./components";
import { StudyMode } from "./pages/StudyMode/StudyMode";
import { AllCards } from "./pages/AllCards/AllCards";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      
      <Routes>
        <Route path="/" element={<StudyMode />} />
        <Route path="/all-cards" element={<AllCards />} />
        {/* Redirection par défaut si route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
