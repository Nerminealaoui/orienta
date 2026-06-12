// src/composents/BlogPage.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: "Comment choisir sa filière après le bac ?",
      excerpt: "Découvrez les critères essentiels pour faire le bon choix d'orientation et réussir votre parcours académique.",
      date: "12 Juin 2026",
      category: "orientation",
      author: "Dr. Karim Benjelloun",
      readTime: "5 min",
      image: "/blog/orientation.jpg"
    },
    {
      id: 2,
      title: "Les métiers d'avenir au Maroc",
      excerpt: "Explorez les secteurs qui recrutent et les compétences recherchées pour les années à venir.",
      date: "10 Juin 2026",
      category: "carriere",
      author: "Sofia El Alami",
      readTime: "7 min",
      image: "/blog/metiers.jpg"
    },
    {
      id: 3,
      title: "IA et éducation : révolution dans l'orientation",
      excerpt: "Comment l'intelligence artificielle transforme la façon dont les étudiants choisissent leur parcours.",
      date: "8 Juin 2026",
      category: "ia",
      author: "Youssef Mansouri",
      readTime: "6 min",
      image: "/blog/ia.jpg"
    },
    {
      id: 4,
      title: "Top 10 des écoles d'ingénieurs au Maroc",
      excerpt: "Classement et présentation des meilleures écoles d'ingénieurs pour former votre avenir.",
      date: "5 Juin 2026",
      category: "ecoles",
      author: "Nadia Tazi",
      readTime: "8 min",
      image: "/blog/ecoles.jpg"
    },
    {
      id: 5,
      title: "Bourses d'études : comment les obtenir ?",
      excerpt: "Guide complet pour décrocher une bourse et financer vos études supérieures.",
      date: "3 Juin 2026",
      category: "bourses",
      author: "Mohamed Amine",
      readTime: "4 min",
      image: "/blog/bourses.jpg"
    },
    {
      id: 6,
      title: "Étudier à l'étranger : opportunités et démarches",
      excerpt: "Tout ce qu'il faut savoir pour préparer votre départ et réussir vos études à l'international.",
      date: "1 Juin 2026",
      category: "etranger",
      author: "Leila Benali",
      readTime: "10 min",
      image: "/blog/etranger.jpg"
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'orientation', label: 'Orientation' },
    { id: 'carriere', label: 'Carrière' },
    { id: 'ia', label: 'Intelligence Artificielle' },
    { id: 'ecoles', label: 'Écoles' },
    { id: 'bourses', label: 'Bourses' },
    { id: 'etranger', label: 'Étranger' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">📝</span>
            <span className="text-sm font-semibold text-blue-800">Blog & Actualités</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Conseils et actualités
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos articles pour mieux vous orienter et réussir votre parcours
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <div className="text-6xl">
                  {article.category === 'orientation' && '🎓'}
                  {article.category === 'carriere' && '💼'}
                  {article.category === 'ia' && '🤖'}
                  {article.category === 'ecoles' && '🏫'}
                  {article.category === 'bourses' && '💰'}
                  {article.category === 'etranger' && '🌍'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime} de lecture</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">Par {article.author}</span>
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    Lire plus
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ne manquez aucun conseil !
          </h2>
          <p className="text-blue-100 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir les derniers articles
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}