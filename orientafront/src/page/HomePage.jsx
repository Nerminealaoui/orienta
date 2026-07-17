import { HeroSection } from '../components/HeroSection';
import { SchoolsSection } from '../components/SchoolsSection';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <SchoolsSection />

      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Pas sûr de ta voie ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Notre IA d'orientation analyse tes réponses et te recommande les meilleures formations adaptées à ton profil
          </p>
          <Link
            to="/questionnaire"
            className="inline-block px-8 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Commencer le questionnaire IA
          </Link>
        </div>
      </section>
    </div>
  );
}