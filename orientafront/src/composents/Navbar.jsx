import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/annuaire', label: 'Annuaire' },
    { path: '/questionnaire', label: 'IA' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isConnexionActive = location.pathname === '/connexion';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg"></div>
              <span className="font-semibold text-xl text-blue-900">OrientaMaroc</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/connexion"
              className={`px-6 py-2 rounded-lg transition-all transform hover:scale-105 ${
                isConnexionActive
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Connexion
            </Link>
          </div>

          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer">
                <button className="text-gray-600 hover:text-blue-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/connexion"
                  className={`block px-4 py-2 transition-colors ${
                    isConnexionActive
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                >
                  Connexion
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}