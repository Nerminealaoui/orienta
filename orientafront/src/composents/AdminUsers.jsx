// src/composents/AdminUsers.jsx
import { useState } from 'react';
import { Search, Filter, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight, Shield, UserCog, GraduationCap, Mail, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 8;

  // Données statiques des utilisateurs
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: 'Jean',
      last_name: 'Dupont',
      email: 'jean.dupont@example.com',
      role: 'super_admin',
      is_active: true,
      phone: '+33 6 12 34 56 78',
      created_at: '2026-01-15',
      last_login: '2026-06-30 14:20:00'
    },
    {
      id: 2,
      first_name: 'Marie',
      last_name: 'Martin',
      email: 'marie.martin@example.com',
      role: 'admin',
      is_active: true,
      phone: '+33 6 23 45 67 89',
      created_at: '2026-02-20',
      last_login: '2026-06-29 16:45:00'
    },
    {
      id: 3,
      first_name: 'Pierre',
      last_name: 'Bernard',
      email: 'pierre.bernard@example.com',
      role: 'student',
      is_active: true,
      phone: '+33 6 34 56 78 90',
      created_at: '2026-03-10',
      last_login: '2026-06-28 10:30:00'
    },
    {
      id: 4,
      first_name: 'Sophie',
      last_name: 'Petit',
      email: 'sophie.petit@example.com',
      role: 'student',
      is_active: true,
      phone: '+33 6 45 67 89 01',
      created_at: '2026-03-25',
      last_login: '2026-06-27 09:15:00'
    },
    {
      id: 5,
      first_name: 'Lucas',
      last_name: 'Robert',
      email: 'lucas.robert@example.com',
      role: 'student',
      is_active: false,
      phone: '+33 6 56 78 90 12',
      created_at: '2026-04-05',
      last_login: '2026-06-15 11:20:00'
    },
    {
      id: 6,
      first_name: 'Emma',
      last_name: 'Richard',
      email: 'emma.richard@example.com',
      role: 'admin',
      is_active: true,
      phone: '+33 6 67 89 01 23',
      created_at: '2026-04-20',
      last_login: '2026-06-29 13:40:00'
    },
    {
      id: 7,
      first_name: 'Thomas',
      last_name: 'Dubois',
      email: 'thomas.dubois@example.com',
      role: 'student',
      is_active: true,
      phone: '+33 6 78 90 12 34',
      created_at: '2026-05-01',
      last_login: '2026-06-28 15:10:00'
    },
    {
      id: 8,
      first_name: 'Léa',
      last_name: 'Moreau',
      email: 'lea.moreau@example.com',
      role: 'student',
      is_active: true,
      phone: '+33 6 89 01 23 45',
      created_at: '2026-05-15',
      last_login: '2026-06-30 08:45:00'
    },
    {
      id: 9,
      first_name: 'Antoine',
      last_name: 'Simon',
      email: 'antoine.simon@example.com',
      role: 'student',
      is_active: false,
      phone: '+33 6 90 12 34 56',
      created_at: '2026-06-01',
      last_login: '2026-06-20 14:30:00'
    },
    {
      id: 10,
      first_name: 'Julie',
      last_name: 'Lefevre',
      email: 'julie.lefevre@example.com',
      role: 'student',
      is_active: true,
      phone: '+33 6 01 23 45 67',
      created_at: '2026-06-10',
      last_login: '2026-06-29 17:00:00'
    }
  ]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    is_active: true,
    phone: ''
  });

  // Statistiques
  const stats = {
    total: users.length,
    superAdmins: users.filter(u => u.role === 'super_admin').length,
    admins: users.filter(u => u.role === 'admin').length,
    students: users.filter(u => u.role === 'student').length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length
  };

  // Filtrage
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && user.is_active) ||
      (filterStatus === 'inactive' && !user.is_active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getRoleBadge = (role) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800'
    };
    const labels = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      student: 'Étudiant'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[role] || 'bg-gray-100 text-gray-800'}`}>
        {labels[role] || role}
      </span>
    );
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'super_admin': return <Shield className="w-4 h-4" />;
      case 'admin': return <UserCog className="w-4 h-4" />;
      default: return <GraduationCap className="w-4 h-4" />;
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: '',
      role: user.role,
      is_active: user.is_active,
      phone: user.phone || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        created_at: new Date().toISOString().split('T')[0],
        last_login: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'student',
      is_active: true,
      phone: ''
    });
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

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h1>
          <p className="text-gray-500 text-sm">Gérez tous les utilisateurs de la plateforme</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setFormData({
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              role: 'student',
              is_active: true,
              phone: ''
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-md"
        >
          <UserPlus className="w-5 h-5" />
          <span>Ajouter un utilisateur</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Total" value={stats.total} color="bg-indigo-500" icon={UserCog} />
        <StatCard title="Super Admins" value={stats.superAdmins} color="bg-purple-500" icon={Shield} />
        <StatCard title="Admins" value={stats.admins} color="bg-blue-500" icon={UserCog} />
        <StatCard title="Étudiants" value={stats.students} color="bg-green-500" icon={GraduationCap} />
        <StatCard title="Actifs" value={stats.active} color="bg-emerald-500" icon={CheckCircle} />
        <StatCard title="Inactifs" value={stats.inactive} color="bg-red-500" icon={XCircle} />
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les rôles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="student">Étudiant</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-gray-500 flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{user.phone || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      {getRoleBadge(user.role)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.is_active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                        title="Supprimer"
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
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredUsers.length)} sur {filteredUsers.length} utilisateurs
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? 'Nouveau mot de passe' : 'Mot de passe'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={editingUser ? 'Laisser vide pour ne pas changer' : '••••••••'}
                  {...(!editingUser && { required: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Étudiant</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Utilisateur actif</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg"
                >
                  {editingUser ? 'Modifier' : 'Créer'}
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