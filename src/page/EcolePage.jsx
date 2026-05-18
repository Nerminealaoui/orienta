import { useParams, Link } from 'react-router';

export function EcolePage() {
  const { id } = useParams();

  const schoolsData = {
    'ensa-marrakech': {
      name: 'ENSA Marrakech',
      fullName: 'École Nationale des Sciences Appliquées de Marrakech',
      city: 'Marrakech',
      type: 'Public',
      domain: 'Ingénierie',
      description: 'L\'ENSA de Marrakech est une école d\'ingénieurs publique formant des ingénieurs d\'état dans plusieurs spécialités',
      address: 'Avenue Abdelkrim Khattabi, BP 575, Marrakech',
      phone: '+212 5 24 43 47 45',
      email: 'contact@ensa.ac.ma',
      website: 'www.ensa.ac.ma',
      students: 1200,
      founded: 2000,
      programs: [
        { name: 'Génie Informatique', duration: '5 ans', diplome: 'Ingénieur d\'État' },
        { name: 'Génie Civil', duration: '5 ans', diplome: 'Ingénieur d\'État' },
        { name: 'Génie Industriel', duration: '5 ans', diplome: 'Ingénieur d\'État' },
        { name: 'Génie Électrique', duration: '5 ans', diplome: 'Ingénieur d\'État' },
      ],
      admission: {
        niveau: 'Bac+2 (Classes préparatoires ou équivalent)',
        concours: 'Concours National Commun (CNC)',
        criteres: 'Notes du concours + Étude de dossier',
      },
    },
    'encg-casablanca': {
      name: 'ENCG Casablanca',
      fullName: 'École Nationale de Commerce et de Gestion de Casablanca',
      city: 'Casablanca',
      type: 'Public',
      domain: 'Commerce',
      description: 'L\'ENCG de Casablanca forme des cadres supérieurs en management et commerce',
      address: 'Quartier Oasis, Casablanca',
      phone: '+212 5 22 23 00 00',
      email: 'contact@encg-casa.ac.ma',
      website: 'www.encg-casa.ac.ma',
      students: 800,
      founded: 1995,
      programs: [
        { name: 'Management', duration: '5 ans', diplome: 'Diplôme National' },
        { name: 'Finance', duration: '5 ans', diplome: 'Diplôme National' },
        { name: 'Marketing', duration: '5 ans', diplome: 'Diplôme National' },
        { name: 'Commerce International', duration: '5 ans', diplome: 'Diplôme National' },
      ],
      admission: {
        niveau: 'Bac toutes séries avec mention',
        concours: 'Concours d\'accès',
        criteres: 'Test écrit + Entretien oral',
      },
    },
  };

  const school = schoolsData[id || ''];

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">École non trouvée</h1>
          <Link to="/annuaire" className="text-blue-700 hover:underline">
            Retour à l'annuaire
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/annuaire" className="inline-flex items-center text-blue-700 hover:underline mb-6">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à l'annuaire
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-12 text-white">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm mb-3 inline-block">
                  {school.type}
                </span>
                <h1 className="text-4xl font-bold mb-2">{school.name}</h1>
                <p className="text-blue-100 text-lg">{school.fullName}</p>
                <div className="flex items-center mt-4 space-x-4 text-blue-100">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {school.city}
                  </span>
                  <span>•</span>
                  <span>Fondée en {school.founded}</span>
                  <span>•</span>
                  <span>{school.students} étudiants</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">À propos</h2>
              <p className="text-gray-700 leading-relaxed">{school.description}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Programmes de formation</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {school.programs.map((program, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <h3 className="font-semibold text-blue-900 mb-2">{program.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Durée : {program.duration}</p>
                      <p>Diplôme : {program.diplome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Conditions d'admission</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-900">Niveau requis :</span>
                    <span className="ml-2 text-gray-700">{school.admission.niveau}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-900">Concours :</span>
                    <span className="ml-2 text-gray-700">{school.admission.concours}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-900">Critères :</span>
                    <span className="ml-2 text-gray-700">{school.admission.criteres}</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Coordonnées</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-700 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-700">{school.address}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{school.phone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">{school.email}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-gray-700">{school.website}</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link
                to="/questionnaire"
                className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Cette école m'intéresse - Faire le questionnaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}