import { useState } from 'react';
import { Link } from 'react-router';

export function AnnuairePage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const schools = [
    {
      id: 'ensa-marrakech',
      name: 'ENSA Marrakech',
      fullName: 'École Nationale des Sciences Appliquées de Marrakech',
      city: 'Marrakech',
      type: 'Public',
      domain: 'Ingénierie',
      description: 'Formation d\'ingénieurs dans les domaines du génie informatique, civil et industriel',
      programs: 8,
      students: 1200,
    },
    {
      id: 'encg-casablanca',
      name: 'ENCG Casablanca',
      fullName: 'École Nationale de Commerce et de Gestion de Casablanca',
      city: 'Casablanca',
      type: 'Public',
      domain: 'Commerce',
      description: 'Formation en management, commerce et gestion d\'entreprise',
      programs: 6,
      students: 800,
    },
    {
      id: 'ensam-casablanca',
      name: 'ENSAM Casablanca',
      fullName: 'École Nationale Supérieure d\'Arts et Métiers de Casablanca',
      city: 'Casablanca',
      type: 'Public',
      domain: 'Ingénierie',
      description: 'Formation d\'ingénieurs généralistes en mécanique et électrique',
      programs: 5,
      students: 600,
    },
    {
      id: 'fst-mohammedia',
      name: 'FST Mohammedia',
      fullName: 'Faculté des Sciences et Techniques de Mohammedia',
      city: 'Mohammedia',
      type: 'Public',
      domain: 'Sciences',
      description: 'Formations scientifiques et techniques variées',
      programs: 12,
      students: 2000,
    },
    {
      id: 'ensa-rabat',
      name: 'ENSA Rabat',
      fullName: 'École Nationale des Sciences Appliquées de Rabat',
      city: 'Rabat',
      type: 'Public',
      domain: 'Ingénierie',
      description: 'École d\'ingénieurs spécialisée en technologies de pointe',
      programs: 7,
      students: 1000,
    },
    {
      id: 'encg-agadir',
      name: 'ENCG Agadir',
      fullName: 'École Nationale de Commerce et de Gestion d\'Agadir',
      city: 'Agadir',
      type: 'Public',
      domain: 'Commerce',
      description: 'Formation en commerce international et tourisme',
      programs: 5,
      students: 600,
    },
  ];

  const cities = ['all', ...Array.from(new Set(schools.map(s => s.city)))];
  const domains = ['all', ...Array.from(new Set(schools.map(s => s.domain)))];
  const types = ['all', 'Public', 'Privé'];

  const filteredSchools = schools.filter(school => {
    return (
      (selectedCity === 'all' || school.city === selectedCity) &&
      (selectedDomain === 'all' || school.domain === selectedDomain) &&
      (selectedType === 'all' || school.type === selectedType)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Annuaire des Écoles
          </h1>
          <p className="text-xl text-gray-600">
            Explore {schools.length} écoles et formations au Maroc
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-4">Filtrer par :</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Ville</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes les villes</option>
                {cities.filter(c => c !== 'all').map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Domaine</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les domaines</option>
                {domains.filter(d => d !== 'all').map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Tous les types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          {filteredSchools.length} école{filteredSchools.length > 1 ? 's' : ''} trouvée{filteredSchools.length > 1 ? 's' : ''}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Link
              key={school.id}
              to={`/ecole/${school.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-xl">
                    {school.name.charAt(0)}
                  </span>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                  {school.type}
                </span>
              </div>

              <h3 className="font-bold text-blue-900 mb-2">
                {school.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {school.fullName}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {school.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {school.city}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {school.programs} programmes
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {school.students} étudiants
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune école trouvée avec ces critères</p>
          </div>
        )}
      </div>
    </div>
  );
}