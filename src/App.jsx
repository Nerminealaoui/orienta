import { Routes, Route } from 'react-router-dom'
import Navbar from './composents/Navbar'
import HeroSection from './composents/HeroSection'
import SchoolsSection from './composents/SchoolsSection'
import QuestionnaireSection from './composents/QuestionnaireSection'
import ConnexionPage from './composents/ConnexionPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/annuaire" element={<SchoolsSection />} />
        <Route path="/questionnaire" element={<QuestionnaireSection />} />
        <Route path="/connexion" element={<ConnexionPage />} />
      </Routes>
    </>
  )
}

export default App