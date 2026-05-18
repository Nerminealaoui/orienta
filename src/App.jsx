import { Routes, Route } from 'react-router-dom'
import RootLayout from './composents/RootLayout'
import HeroSection from './composents/HeroSection'
import SchoolsSection from './composents/SchoolsSection'
import QuestionnaireSection from './composents/QuestionnaireSection'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}/>
        <Route index element={<HeroSection />} />
        <Route path="annuaire" element={<SchoolsSection />} />
        <Route path="questionnaire" element={<QuestionnaireSection />} />
    </Routes>
  )
}

export default App