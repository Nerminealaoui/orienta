// src/composents/AdminSchools.jsx
import { useState } from 'react';
import { Search, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight, Building2, Mail, Phone, MapPin, Globe, BookOpen, Users, Star, Plus, Calendar, XCircle } from 'lucide-react';
export default function AdminSchools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const itemsPerPage = 6;

  const [schools, setSchools] = useState([
    {
      id: 1,
      name: 'Université Mohammed V',
      city: 'Rabat',
      type: 'Université',
      students: 45000,
      rating: 4.5,
      programs: 120,
      email: 'contact@um5.ac.ma',
      phone: '+212 5 37 77 40 00',
      website: 'www.um5.ac.ma',
      address: 'Avenue Ibn Battouta, Rabat',
      established: '1957',
      description: 'Plus grande université du Maroc avec une excellence académique reconnue'
    },
    {
      id: 2,
      name: 'Université Hassan II',
      city: 'Casablanca',
      type: 'Université',
      students: 38000,
      rating: 4.3,
      programs: 95,
      email: 'contact@uh2c.ac.ma',
      phone: '+212 5 22 45 10 00',
      website: 'www.uh2c.ac.ma',
      address: 'Route d\'El Jadida, Casablanca',
      established: '1975',
      description: 'Université publique d\'excellence à Casablanca'
    },
    {
      id: 3,
      name: 'École Nationale Supérieure d\'Informatique',
      city: 'Rabat',
      type: 'École d\'ingénieurs',
      students: 1200,
      rating: 4.8,
      programs: 8,
      email: 'contact@ensia.ac.ma',
      phone: '+212 5 37 77 42 00',
      website: 'www.ensia.ac.ma',
      address: 'Avenue Allal El Fassi, Rabat',
      established: '1998',
      description: 'École d\'ingénieurs spécialisée en informatique et technologies'
    },
    {
      id: 4,
      name: 'EMI - École Mohammadia d\'Ingénieurs',
      city: 'Rabat',
      type: 'École d\'ingénieurs',
      students: 2000,
      rating: 4.7,
      programs: 12,
      email: 'contact@emi.ac.ma',
      phone: '+212 5 37 77 40 00',
      website: 'www.emi.ac.ma',
      address: 'Avenue Ibn Sina, Rabat',
      established: '1959',
      description: 'L\'une des meilleures écoles d\'ingénieurs au Maroc'
    },
    {
      id: 5,
      name: 'Université Cadi Ayyad',
      city: 'Marrakech',
      type: 'Université',
      students: 28000,
      rating: 4.2,
      programs: 80,
      email: 'contact@uca.ma',
      phone: '+212 5 24 43 38 00',
      website: 'www.uca.ma',
      address: 'Boulevard Abdelkrim Khattabi, Marrakech',
      established: '1978',
      description: 'Université publique de la région de Marrakech-Safi'
    },
    {
      id: 6,
      name: 'ISCAE - Institut Supérieur de Commerce',
      city: 'Casablanca',
      type: 'École de commerce',
      students: 3500,
      rating: 4.6,
      programs: 15,
      email: 'contact@iscae.ma',
      phone: '+212 5 22 45 20 00',
      website: 'www.iscae.ma',
      address: 'Avenue Moulay Hassan, Casablanca',
      established: '1971',
      description: 'Prestigieuse école de commerce et de management'
    },
    {
      id: 7,
      name: 'Faculté de Médecine de Casablanca',
      city: 'Casablanca',
      type: 'Faculté',
      students: 8000,
      rating: 4.4,
      programs: 6,
      email: 'contact@fmpc.ma',
      phone: '+212 5 22 45 30 00',
      website: 'www.fmpc.ma',
      address: 'Boulevard Moulay Youssef, Casablanca',
      established: '1962',
      description: 'Faculté de médecine de renom au Maroc'
    },
    {
      id: 8,
      name: 'Université Sidi Mohammed Ben Abdellah',
      city: 'Fès',
      type: 'Université',
      students: 32000,
      rating: 4.1,
      programs: 70,
      email: 'contact@usmba.ac.ma',
      phone: '+212 5 35 64 30 00',
      website: 'www.usmba.ac.ma',
      address: 'Route d\'Imouzzer, Fès',
      established: '1975',
      description: 'Université publique de la ville de Fès'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    type: 'Université',
    students: '',
    rating: '',
    programs: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    established: '',
    description: ''
  });

  const stats = {
    total: schools.length,
    universities: schools.filter(s => s.type === 'Université').length,
    engineering: schools.filter(s => s.type === 'École d\'ingénieurs').length,
    commerce: schools.filter(s => s.type === 'École de commerce').length,
    faculty: schools.filter(s => s.type === 'Faculté').length,
    totalStudents: schools.reduce((acc, s) => acc + s.students, 0),
    avgRating: (schools.reduce((acc, s) => acc + s.rating, 0) / schools.length).toFixed(1)
  };

  const cities = ['Toutes les villes', ...new Set(schools.map(s => s.city))];
  const types = ['Tous les types', ...new Set(schools.map(s => s.type))];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = 
      school.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filterCity === 'all' || school.city === filterCity;
    const matchesType = filterType === 'all' || school.type === filterType;
    
    return matchesSearch && matchesCity && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSchools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  const getTypeBadge = (type) => {
    const colors = {
      'Université': 'bg-blue-100 text-blue-800',
      'École d\'ingénieurs': 'bg-purple-100 text-purple-800',
      'École de commerce': 'bg-emerald-100 text-emerald-800',
      'Faculté': 'bg-yellow-100 text-yellow-800',
      'Institut': 'bg-indigo-100 text-indigo-800'
    };
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${colors[type] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars ? 'text-yellow-400 fill-yellow-400' :
              i === fullStars && halfStar ? 'text-yellow-400 fill-yellow-400' :
              'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
      </div>
    );
  };

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette école ?')) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  const handleEdit = (school) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      city: school.city,
      type: school.type,
      students: school.students,
      rating: school.rating,
      programs: school.programs,
      email: school.email,
      phone: school.phone,
      website: school.website,
      address: school.address,
      established: school.established,
      description: school.description
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schoolData = {
      ...formData,
      students: parseInt(formData.students),
      rating: parseFloat(formData.rating),
      programs: parseInt(formData.programs)
    };
    
    if (editingSchool) {
      setSchools(schools.map(s => 
        s.id === editingSchool.id 
          ? { ...s, ...schoolData }
          : s
      ));
    } else {
      const newSchool = {
        id: Math.max(...schools.map(s => s.id)) + 1,
        ...schoolData
      };
      setSchools([...schools, newSchool]);
    }
    setShowModal(false);
    setEditingSchool(null);
    setFormData({
      name: '',
      city: '',
      type: 'Université',
      students: '',
      rating: '',
      programs: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      established: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Annuaire des écoles</h1>
          <p className="text-gray-500 text-sm">Gérez toutes les écoles et établissements</p>
        </div>
        <button
          onClick={() => {
            setEditingSchool(null);
            setFormData({
              name: '',
              city: '',
              type: 'Université',
              students: '',
              rating: '',
              programs: '',
              email: '',
              phone: '',
              website: '',
              address: '',
              established: '',
              description: ''
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter une école</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Total" value={stats.total} color="bg-indigo-500" icon={Building2} />
        <StatCard title="Universités" value={stats.universities} color="bg-blue-500" icon={Building2} />
        <StatCard title="Écoles d\'ingé" value={stats.engineering} color="bg-purple-500" icon={Building2} />
        <StatCard title="Écoles de commerce" value={stats.commerce} color="bg-emerald-500" icon={Building2} />
        <StatCard title="Étudiants" value={stats.totalStudents.toLocaleString()} color="bg-green-500" icon={Users} />
        <StatCard title="Note moyenne" value={`⭐ ${stats.avgRating}`} color="bg-yellow-500" icon={Star} />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une école..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map(city => (
                <option key={city} value={city === 'Toutes les villes' ? 'all' : city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type === 'Tous les types' ? 'all' : type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grille des écoles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((school) => (
          <div key={school.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{school.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{school.city}</span>
                    {getTypeBadge(school.type)}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(school)}
                    className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(school.id)}
                    className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{school.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{school.students.toLocaleString()} étudiants</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{school.programs} programmes</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{school.established}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(school.rating)}
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                <a href={`mailto:${school.email}`} className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <a href={`tel:${school.phone}`} className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
                <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredSchools.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredSchools.length)} sur {filteredSchools.length} écoles
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-indigo-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-indigo-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingSchool ? 'Modifier l\'école' : 'Ajouter une école'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'école</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Université">Université</option>
                    <option value="École d'ingénieurs">École d'ingénieurs</option>
                    <option value="École de commerce">École de commerce</option>
                    <option value="Faculté">Faculté</option>
                    <option value="Institut">Institut</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre d'étudiants</label>
                  <input
                    type="number"
                    value={formData.students}
                    onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de programmes</label>
                  <input
                    type="number"
                    value={formData.programs}
                    onChange={(e) => setFormData({ ...formData, programs: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="www.exemple.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Année de création</label>
                  <input
                    type="text"
                    value={formData.established}
                    onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1957"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description de l'école..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg"
                >
                  {editingSchool ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}