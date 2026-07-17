// src/composents/AdminStudents.jsx
import { useState } from 'react';
import { Search, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight, GraduationCap, Mail, Phone, Calendar, Award, BookOpen, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const itemsPerPage = 8;

  const [students, setStudents] = useState([
    {
      id: 1,
      first_name: 'Pierre',
      last_name: 'Bernard',
      email: 'pierre.bernard@example.com',
      phone: '+33 6 34 56 78 90',
      level: 'Licence 3',
      status: 'active',
      enrolled_courses: 5,
      completed_courses: 3,
      average_score: 76,
      registered_at: '2026-03-10',
      last_active: '2026-06-28'
    },
    {
      id: 2,
      first_name: 'Sophie',
      last_name: 'Petit',
      email: 'sophie.petit@example.com',
      phone: '+33 6 45 67 89 01',
      level: 'Master 1',
      status: 'active',
      enrolled_courses: 4,
      completed_courses: 4,
      average_score: 95,
      registered_at: '2026-03-25',
      last_active: '2026-06-27'
    },
    {
      id: 3,
      first_name: 'Lucas',
      last_name: 'Robert',
      email: 'lucas.robert@example.com',
      phone: '+33 6 56 78 90 12',
      level: 'Licence 2',
      status: 'inactive',
      enrolled_courses: 3,
      completed_courses: 1,
      average_score: 65,
      registered_at: '2026-04-05',
      last_active: '2026-06-15'
    },
    {
      id: 4,
      first_name: 'Thomas',
      last_name: 'Dubois',
      email: 'thomas.dubois@example.com',
      phone: '+33 6 78 90 12 34',
      level: 'Master 2',
      status: 'active',
      enrolled_courses: 6,
      completed_courses: 5,
      average_score: 82,
      registered_at: '2026-05-01',
      last_active: '2026-06-28'
    },
    {
      id: 5,
      first_name: 'Léa',
      last_name: 'Moreau',
      email: 'lea.moreau@example.com',
      phone: '+33 6 89 01 23 45',
      level: 'Licence 3',
      status: 'active',
      enrolled_courses: 7,
      completed_courses: 4,
      average_score: 70,
      registered_at: '2026-05-15',
      last_active: '2026-06-30'
    },
    {
      id: 6,
      first_name: 'Antoine',
      last_name: 'Simon',
      email: 'antoine.simon@example.com',
      phone: '+33 6 90 12 34 56',
      level: 'Licence 1',
      status: 'inactive',
      enrolled_courses: 2,
      completed_courses: 0,
      average_score: 0,
      registered_at: '2026-06-01',
      last_active: '2026-06-20'
    },
    {
      id: 7,
      first_name: 'Julie',
      last_name: 'Lefevre',
      email: 'julie.lefevre@example.com',
      phone: '+33 6 01 23 45 67',
      level: 'Licence 3',
      status: 'active',
      enrolled_courses: 4,
      completed_courses: 2,
      average_score: 78,
      registered_at: '2026-06-10',
      last_active: '2026-06-29'
    },
    {
      id: 8,
      first_name: 'Sarah',
      last_name: 'Lopez',
      email: 'sarah.lopez@example.com',
      phone: '+33 6 23 45 67 89',
      level: 'Master 1',
      status: 'active',
      enrolled_courses: 3,
      completed_courses: 1,
      average_score: 68,
      registered_at: '2026-06-20',
      last_active: '2026-06-29'
    }
  ]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    level: 'Licence 1',
    status: 'active'
  });

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    inactive: students.filter(s => s.status === 'inactive').length,
    avgScore: Math.round(students.reduce((acc, s) => acc + s.average_score, 0) / students.length),
    levels: {
      'Licence 1': students.filter(s => s.level === 'Licence 1').length,
      'Licence 2': students.filter(s => s.level === 'Licence 2').length,
      'Licence 3': students.filter(s => s.level === 'Licence 3').length,
      'Master 1': students.filter(s => s.level === 'Master 1').length,
      'Master 2': students.filter(s => s.level === 'Master 2').length
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
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
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone: student.phone,
      level: student.level,
      status: student.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { ...s, ...formData }
          : s
      ));
    } else {
      const newStudent = {
        id: Math.max(...students.map(s => s.id)) + 1,
        ...formData,
        enrolled_courses: 0,
        completed_courses: 0,
        average_score: 0,
        registered_at: new Date().toISOString().split('T')[0],
        last_active: new Date().toISOString().split('T')[0]
      };
      setStudents([...students, newStudent]);
    }
    setShowModal(false);
    setEditingStudent(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      level: 'Licence 1',
      status: 'active'
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des étudiants</h1>
          <p className="text-gray-500 text-sm">Gérez tous les étudiants inscrits</p>
        </div>
        <button
          onClick={() => {
            setEditingStudent(null);
            setFormData({
              first_name: '',
              last_name: '',
              email: '',
              phone: '',
              level: 'Licence 1',
              status: 'active'
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-md"
        >
          <UserPlus className="w-5 h-5" />
          <span>Ajouter un étudiant</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Total" value={stats.total} color="bg-indigo-500" icon={GraduationCap} />
        <StatCard title="Actifs" value={stats.active} color="bg-green-500" icon={CheckCircle} />
        <StatCard title="Inactifs" value={stats.inactive} color="bg-red-500" icon={XCircle} />
        <StatCard title="Score moyen" value={`${stats.avgScore}%`} color="bg-yellow-500" icon={Star} />
      </div>

      {/* Niveaux */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Répartition par niveau</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {Object.entries(stats.levels).map(([level, count]) => (
            <div key={level} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">{level}</span>
              <span className="font-bold text-blue-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Licence 1">Licence 1</option>
              <option value="Licence 2">Licence 2</option>
              <option value="Licence 3">Licence 3</option>
              <option value="Master 1">Master 1</option>
              <option value="Master 2">Master 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {student.first_name?.charAt(0)}{student.last_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</p>
                        <p className="text-xs text-gray-500 flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{student.email}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{student.enrolled_courses}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-700">{student.completed_courses}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-bold ${getScoreColor(student.average_score)}`}>
                      {student.average_score || '-'}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredStudents.length)} sur {filteredStudents.length} étudiants
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
      </div>

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingStudent ? 'Modifier l\'étudiant' : 'Ajouter un étudiant'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

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
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg"
                >
                  {editingStudent ? 'Modifier' : 'Créer'}
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