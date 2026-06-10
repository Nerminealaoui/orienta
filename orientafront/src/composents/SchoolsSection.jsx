export default function SchoolsSection() {
  const schools = [
    {
      name: 'ENSA',
      fullName: 'École Nationale des Sciences Appliquées',
      description: 'Formation d\'ingénieurs dans divers domaines technologiques',
      locations: '12 villes',
      domains: ['Génie Informatique', 'Génie Civil', 'Génie Industriel'],
      color: 'blue',
    },
    {
      name: 'ENCG',
      fullName: 'École Nationale de Commerce et de Gestion',
      description: 'Formation en management et commerce',
      locations: '10 villes',
      domains: ['Commerce', 'Finance', 'Management'],
      color: 'emerald',
    },
    {
      name: 'ENSAM',
      fullName: 'École Nationale Supérieure d\'Arts et Métiers',
      description: 'Formation d\'ingénieurs généralistes',
      locations: '2 villes',
      domains: ['Mécanique', 'Électrique', 'Industriel'],
      color: 'indigo',
    },
    {
      name: 'FST',
      fullName: 'Faculté des Sciences et Techniques',
      description: 'Formations scientifiques et techniques',
      locations: '8 villes',
      domains: ['Sciences', 'Informatique', 'Biologie'],
      color: 'violet',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Grandes Écoles du Maroc
          </h2>
          <p className="text-xl text-gray-600">
            Découvre les meilleures institutions d'enseignement supérieur
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schools.map((school) => (
            <div
              key={school.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-${school.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <span className={`text-${school.color}-700 font-bold text-xl`}>
                  {school.name.charAt(0)}
                </span>
              </div>

              <h3 className="font-bold text-blue-900 mb-1">
                {school.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {school.fullName}
              </p>
              <p className="text-gray-600 mb-4 text-sm">
                {school.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {school.locations}
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {school.domains.slice(0, 2).map((domain) => (
                    <span
                      key={domain}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
