// src/composents/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Shield, 
  UserCog, 
  GraduationCap,
  TrendingUp,
  Activity,
  Calendar,
  Clock,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    superAdmins: 0,
    admins: 0,
    students: 0,
    newUsersThisMonth: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    lastUpdate: new Date(),
    usersByMonth: [],
    recentActivities: [],
    userGrowth: 0,
    averageUsersPerDay: 0,
    mostActiveRole: '',
    completionRate: 0,
    totalCourses: 0,
    totalLessons: 0,
    averageScore: 0
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    is_active: true,
    phone: '',
    address: '',
    bio: ''
  });

  const currentUser = {
    id: 1,
    role: 'super_admin',
    first_name: 'Admin',
    last_name: 'Principal',
    email: 'admin@example.com'
  };

  const isAdmin = true;

  // Données statiques des utilisateurs
  const staticUsers = [
    {
      id: 1,
      first_name: 'Jean',
      last_name: 'Dupont',
      email: 'jean.dupont@example.com',
      role: 'super_admin',
      is_active: true,
      created_at: '2026-01-15 10:30:00',
      phone: '+33 6 12 34 56 78',
      address: 'Paris, France',
      bio: 'Super Administrateur principal',
      last_login: '2026-06-30 14:20:00',
      courses_enrolled: 12,
      completed_courses: 8,
      average_score: 92
    },
    {
      id: 2,
      first_name: 'Marie',
      last_name: 'Martin',
      email: 'marie.martin@example.com',
      role: 'admin',
      is_active: true,
      created_at: '2026-02-20 09:15:00',
      phone: '+33 6 23 45 67 89',
      address: 'Lyon, France',
      bio: 'Administratrice expérimentée',
      last_login: '2026-06-29 16:45:00',
      courses_enrolled: 8,
      completed_courses: 6,
      average_score: 88
    },
    {
      id: 3,
      first_name: 'Pierre',
      last_name: 'Bernard',
      email: 'pierre.bernard@example.com',
      role: 'student',
      is_active: true,
      created_at: '2026-03-10 11:00:00',
      phone: '+33 6 34 56 78 90',
      address: 'Marseille, France',
      bio: 'Étudiant en informatique',
      last_login: '2026-06-28 10:30:00',
      courses_enrolled: 5,
      completed_courses: 3,
      average_score: 76
    },
    {
      id: 4,
      first_name: 'Sophie',
      last_name: 'Petit',
      email: 'sophie.petit@example.com',
      role: 'student',
      is_active: true,
      created_at: '2026-03-25 14:45:00',
      phone: '+33 6 45 67 89 01',
      address: 'Bordeaux, France',
      bio: 'Étudiante en design',
      last_login: '2026-06-27 09:15:00',
      courses_enrolled: 4,
      completed_courses: 4,
      average_score: 95
    },
    {
      id: 5,
      first_name: 'Lucas',
      last_name: 'Robert',
      email: 'lucas.robert@example.com',
      role: 'student',
      is_active: false,
      created_at: '2026-04-05 08:30:00',
      phone: '+33 6 56 78 90 12',
      address: 'Toulouse, France',
      bio: 'Étudiant en mathématiques',
      last_login: '2026-06-15 11:20:00',
      courses_enrolled: 3,
      completed_courses: 1,
      average_score: 65
    },
    {
      id: 6,
      first_name: 'Emma',
      last_name: 'Richard',
      email: 'emma.richard@example.com',
      role: 'admin',
      is_active: true,
      created_at: '2026-04-20 16:20:00',
      phone: '+33 6 67 89 01 23',
      address: 'Nice, France',
      bio: 'Administratrice pédagogique',
      last_login: '2026-06-29 13:40:00',
      courses_enrolled: 10,
      completed_courses: 7,
      average_score: 90
    },
    {
      id: 7,
      first_name: 'Thomas',
      last_name: 'Dubois',
      email: 'thomas.dubois@example.com',
      role: 'student',
      is_active: true,
      created_at: '2026-05-01 10:00:00',
      phone: '+33 6 78 90 12 34',
      address: 'Strasbourg, France',
      bio: 'Étudiant en physique',
      last_login: '2026-06-28 15:10:00',
      courses_enrolled: 6,
      completed_courses: 5,
      average_score: 82
    },
    {
      id: 8,
      first_name: 'Léa',
      last_name: 'Moreau',
      email: 'lea.moreau@example.com',
      role: 'student',
      is_active: true,
      created_at: '2026-05-15 13:30:00',
      phone: '+33 6 89 01 23 45',
      address: 'Lille, France',
      bio: 'Étudiante en biologie',
      last_login: '2026-06-30 08:45:00',
      courses_enrolled: 7,
      completed_courses: 4,
      average_score: 70
    },
    {
      id: 9,
      first_name: 'Antoine',
      last_name: 'Simon',
      email: 'antoine.simon@example.com',
      role: 'student',
      is_active: false,
      created_at: '2026-06-01 09:45:00',
      phone: '+33 6 90 12 34 56',
      address: 'Rennes, France',
      bio: 'Étudiant en histoire',
      last_login: '2026-06-20 14:30:00',
      courses_enrolled: 2,
      completed_courses: 0,
      average_score: 0
    },
    {
      id: 10,
      first_name: 'Julie',
      last_name: 'Lefevre',
      email: 'julie.lefevre@example.com',
      role: 'student',
      is_active: true,
      created_at: '2026-06-10 11:15:00',
      phone: '+33 6 01 23 45 67',
      address: 'Montpellier, France',
      bio: 'Étudiante en économie',
      last_login: '2026-06-29 17:00:00',
      courses_enrolled: 4,
      completed_courses: 2,
      average_score: 78
    },
    {
      id: 11,
      first_name: 'Michel',
      last_name: 'Garcia',
      email: 'michel.garcia@example.com',
      role: 'admin',
      is_active: true,
      created_at: '2026-06-15 15:00:00',
      phone: '+33 6 12 34 56 78',
      address: 'Nantes, France',
      bio: 'Administrateur technique',
      last_login: '2026-06-30 10:20:00',
      courses_enrolled: 9,
      completed_courses: 6,
      average_score: 85
    },
    {
      id: 12,
      first_name: 'Sarah',
      last_name: 'Lopez',
      email: 'sarah.lopez@example.com',
      role: 'student',
      is_active: true,
      created_at: '2026-06-20 16:30:00',
      phone: '+33 6 23 45 67 89',
      address: 'Angers, France',
      bio: 'Étudiante en psychologie',
      last_login: '2026-06-29 11:50:00',
      courses_enrolled: 3,
      completed_courses: 1,
      average_score: 68
    }
  ];

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    // Initialiser avec les données statiques
    initializeDashboard();
  }, [isAdmin]);

  const initializeDashboard = () => {
    setUsers(staticUsers);
    updateStatistics(staticUsers);
    setLoading(false);
  };

  const updateStatistics = (userData) => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);

    // Nouveaux utilisateurs ce mois
    const newUsersThisMonth = userData.filter(user => {
      const createdAt = new Date(user.created_at);
      return createdAt >= monthStart;
    }).length;

    // Utilisateurs actifs/inactifs
    const activeUsers = userData.filter(user => user.is_active !== false).length;
    const inactiveUsers = userData.filter(user => user.is_active === false).length;

    // Croissance des utilisateurs (simulée)
    const userGrowth = 12.5;

    // Utilisateurs par mois (pour le graphique)
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const usersByMonth = monthNames.map((month, index) => {
      const count = userData.filter(user => {
        const date = new Date(user.created_at);
        return date.getMonth() === index && date.getFullYear() === now.getFullYear();
      }).length;
      return { month, count };
    });

    // Rôle le plus actif
    const roleCount = {
      super_admin: userData.filter(u => u.role === 'super_admin').length,
      admin: userData.filter(u => u.role === 'admin').length,
      student: userData.filter(u => u.role === 'student').length
    };
    const mostActiveRole = Object.keys(roleCount).reduce((a, b) => 
      roleCount[a] > roleCount[b] ? a : b
    );

    // Taux de complétion
    const completedProfiles = userData.filter(user => 
      user.first_name && user.last_name && user.email && user.phone
    ).length;
    const completionRate = userData.length > 0 
      ? Math.round((completedProfiles / userData.length) * 100)
      : 0;

    // Activités récentes
    const activities = [
      { user: 'Jean Dupont', action: 'S\'est inscrit au cours "React Avancé"', timestamp: 'Il y a 5 min' },
      { user: 'Marie Martin', action: 'A complété le module "JavaScript"', timestamp: 'Il y a 15 min' },
      { user: 'Pierre Bernard', action: 'A reçu une certification', timestamp: 'Il y a 1 heure' },
      { user: 'Sophie Petit', action: 'A téléchargé ses résultats', timestamp: 'Il y a 2 heures' },
      { user: 'Emma Richard', action: 'A ajouté un nouveau cours', timestamp: 'Il y a 3 heures' }
    ];

    setStats({
      totalUsers: userData.length,
      superAdmins: userData.filter(u => u.role === 'super_admin').length,
      admins: userData.filter(u => u.role === 'admin').length,
      students: userData.filter(u => u.role === 'student').length,
      newUsersThisMonth,
      activeUsers,
      inactiveUsers,
      userGrowth,
      usersByMonth,
      recentActivities: activities,
      mostActiveRole,
      completionRate,
      averageUsersPerDay: Math.round(userData.length / 30),
      totalCourses: 24,
      totalLessons: 156,
      averageScore: 78,
      lastUpdate: new Date()
    });
  };

  // Filtrer les utilisateurs
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

  // Tri
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    setUsers(users.filter(user => user.id !== id));
    setSuccess('Utilisateur supprimé avec succès');
    updateStatistics(users.filter(user => user.id !== id));
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'student',
      is_active: user.is_active !== false,
      phone: user.phone || '',
      address: user.address || '',
      bio: user.bio || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUser) {
      // Modifier l'utilisateur existant
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { 
              ...user, 
              ...formData,
              id: user.id,
              created_at: user.created_at,
              last_login: user.last_login,
              courses_enrolled: user.courses_enrolled,
              completed_courses: user.completed_courses,
              average_score: user.average_score
            }
          : user
      );
      setUsers(updatedUsers);
      setSuccess('Utilisateur modifié avec succès');
      updateStatistics(updatedUsers);
    } else {
      // Ajouter un nouvel utilisateur
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        last_login: new Date().toISOString().replace('T', ' ').slice(0, 19),
        courses_enrolled: 0,
        completed_courses: 0,
        average_score: 0
      };
      setUsers([...users, newUser]);
      setSuccess('Utilisateur créé avec succès');
      updateStatistics([...users, newUser]);
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
      phone: '',
      address: '',
      bio: ''
    });
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'student',
      is_active: true,
      phone: '',
      address: '',
      bio: ''
    });
  };

  const getRoleBadge = (role) => {
    const colors = {
      super_admin: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-purple-200',
      admin: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-blue-200',
      student: 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-green-200'
    };
    const labels = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      student: 'Étudiant'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${colors[role] || 'bg-gray-500 text-white'}`}>
        {labels[role] || role}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle, progress }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {progress !== undefined && (
        <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full ${color} transition-all duration-1000`} 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );

  const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Détails de l'utilisateur</h2>
              <p className="text-gray-500 text-sm">Informations complètes</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.first_name} {user.last_name}</h3>
                <p className="text-gray-500">{user.email}</p>
                {getRoleBadge(user.role)}
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Téléphone</p>
              <p className="font-medium">{user.phone || 'Non renseigné'}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Adresse</p>
              <p className="font-medium">{user.address || 'Non renseignée'}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Statut</p>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {user.is_active ? 'Actif' : 'Inactif'}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Date d'inscription</p>
              <p className="font-medium text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Dernière connexion</p>
              <p className="font-medium text-sm">{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Jamais'}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Cours inscrits</p>
              <p className="font-medium">{user.courses_enrolled || 0}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Cours complétés</p>
              <p className="font-medium">{user.completed_courses || 0}</p>
            </div>
            <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Score moyen</p>
              <p className={`text-2xl font-bold ${getScoreColor(user.average_score)}`}>
                {user.average_score || 0}%
              </p>
            </div>
            {user.bio && (
              <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Biographie</p>
                <p className="font-medium">{user.bio}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={() => {
                onClose();
                handleEdit(user);
              }}
              className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Modifier
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent">
              Tableau de bord Admin
            </h1>
            <p className="text-gray-500 mt-1 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Dernière mise à jour: {stats.lastUpdate.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => { initializeDashboard(); }}
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Ajouter</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl animate-slide-down">
            <p className="text-emerald-600 text-center flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {success}
            </p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-slide-down">
            <p className="text-red-600 text-center flex items-center justify-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </p>
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            title="Total Utilisateurs"
            value={stats.totalUsers}
            color="bg-gradient-to-r from-indigo-500 to-indigo-600"
            subtitle={`+${stats.newUsersThisMonth} ce mois-ci`}
            progress={(stats.totalUsers / 50) * 100}
          />
          <StatCard
            icon={Shield}
            title="Super Admins"
            value={stats.superAdmins}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            subtitle="Administrateurs principaux"
            progress={(stats.superAdmins / (stats.totalUsers || 1)) * 100}
          />
          <StatCard
            icon={UserCog}
            title="Admins"
            value={stats.admins}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            subtitle={`${stats.admins} administrateurs`}
            progress={(stats.admins / (stats.totalUsers || 1)) * 100}
          />
          <StatCard
            icon={GraduationCap}
            title="Étudiants"
            value={stats.students}
            color="bg-gradient-to-r from-emerald-500 to-emerald-600"
            subtitle={`${stats.activeUsers} actifs`}
            progress={(stats.students / (stats.totalUsers || 1)) * 100}
          />
        </div>

        {/* Statistiques avancées */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Croissance</h3>
              <TrendingUp className={`w-5 h-5 ${stats.userGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <p className={`text-2xl font-bold ${stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.userGrowth >= 0 ? '+' : ''}{stats.userGrowth}%
            </p>
            <p className="text-xs text-gray-400">vs mois dernier</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Rôle principal</h3>
              <Award className="w-5 h-5 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800 capitalize">
              {stats.mostActiveRole === 'super_admin' ? 'Super Admin' : 
               stats.mostActiveRole === 'admin' ? 'Admin' : 'Étudiant'}
            </p>
            <p className="text-xs text-gray-400">Majorité des utilisateurs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Complétion</h3>
              <BarChart3 className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.completionRate}%</p>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-emerald-500 transition-all duration-1000" 
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Score moyen</h3>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</p>
            <p className="text-xs text-gray-400">Tous utilisateurs confondus</p>
          </div>
        </div>

        {/* Graphique et activités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique des inscriptions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-indigo-500" />
              Évolution des inscriptions
            </h3>
            <div className="flex items-end h-40 space-x-2">
              {stats.usersByMonth.map((data, index) => {
                const maxCount = Math.max(...stats.usersByMonth.map(d => d.count), 1);
                const height = (data.count / maxCount) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t transition-all duration-500 hover:from-indigo-600 hover:to-indigo-400"
                      style={{ 
                        height: `${Math.max(height * 0.8, 4)}px`,
                        minHeight: '4px'
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">{data.month}</p>
                    <p className="text-xs font-semibold text-gray-700">{data.count}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activités récentes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-500" />
              Activités récentes
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {stats.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
              >
                <option value="all">Tous les rôles</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="student">Étudiant</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {['ID', 'Prénom', 'Nom', 'Email', 'Rôle', 'Statut', 'Score', 'Actions'].map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
                      onClick={() => handleSort(['id', 'first_name', 'last_name', 'email', 'role', 'is_active', 'average_score'][index])}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{header}</span>
                        {sortField === ['id', 'first_name', 'last_name', 'email', 'role', 'is_active', 'average_score'][index] && (
                          <span className="text-indigo-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="mt-2 text-gray-500">Chargement des utilisateurs...</p>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <Users className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                ) : (
                  currentItems.map((user) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-indigo-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserDetails(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.first_name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.last_name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.is_active !== false 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {user.is_active !== false ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.average_score > 0 ? (
                          <span className={`font-bold ${getScoreColor(user.average_score)}`}>
                            {user.average_score}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                            title="Supprimer"
                            disabled={user.role === 'super_admin' && currentUser.id !== user.id}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && sortedUsers.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, sortedUsers.length)} sur {sortedUsers.length} utilisateurs
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
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'hover:bg-indigo-50 text-gray-600'
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
      </div>

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
              </h2>
              <button
                onClick={handleModalClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                    placeholder="Jean"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                    placeholder="Dupont"
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
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="email@example.com"
                  required
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
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder={editingUser ? 'Laisser vide pour ne pas changer' : '••••••••'}
                  {...(!editingUser && { required: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="Ville, Pays"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="Courte biographie..."
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                >
                  <option value="student">Étudiant</option>
                  <option value="admin">Admin</option>
                  {currentUser.role === 'super_admin' && (
                    <option value="super_admin">Super Admin</option>
                  )}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-700">Utilisateur actif</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal des détails utilisateur */}
      {showUserDetails && selectedUser && (
        <UserDetailsModal 
          user={selectedUser} 
          onClose={() => {
            setShowUserDetails(false);
            setSelectedUser(null);
          }} 
        />
      )}

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}