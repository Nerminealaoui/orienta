import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function RootLayout() {
  return (
    <>
    <Navbar/>
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 leading-tight">
          Trouve ton avenir<br />avec l'IA
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Découvre les meilleures écoles et formations au Maroc grâce à notre plateforme d'orientation intelligente
        </p>
        <Link
          to="/questionnaire"
          className="inline-block px-8 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg"
        >
          Commencer mon orientation
        </Link>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">500+</div>
            <div className="text-gray-600 mt-2">Écoles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">100+</div>
            <div className="text-gray-600 mt-2">Formations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">10k+</div>
            <div className="text-gray-600 mt-2">Étudiants</div>
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
}