import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { db } from '../config/firebase';
import { useAuth } from './authContext';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'; 

const ScholarshipContext = createContext();

export function ScholarshipProvider({ children }) {
  const { user } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile State
  const [profile, setProfile] = useState({
    name: "Student",
    major: "Computer Science",
    goal: 50000
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    deadlineReminders: true
  });

  // Filtering & Sorting States
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'deadline'
  });

  // Firebase Sync Stream Hook Listener
  useEffect(() => {
    if (!user) {
      setScholarships([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const userScholarshipsCollection = collection(db, `users/${user.uid}/scholarships`);

    const unsubscribe = onSnapshot(userScholarshipsCollection, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setScholarships(items);
      setLoading(false);
    }, (error) => {
      console.error("Firestore loading error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Shared Handlers / Operations
  const handleAddButton = () => {
    console.log("Add button clicked");
  };

  const handleEdit = (scholarship) => {
    console.log("Editing:", scholarship);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setScholarships(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggleTask = async (scholarshipId, taskId) => {
    try {
      const card = scholarships.find(s => s.id === scholarshipId); 
      if (!card || !user) return;

      const updatedTasks = (card.tasks || []).map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );

      const docRef = doc(db, `users/${user.uid}/scholarships`, scholarshipId);
      await updateDoc(docRef, { tasks: updatedTasks });
    } catch (err) {
      console.error("Error toggling item task:", err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Shared Utilities
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const getDaysRemaining = (deadlineStr) => {
    if (!deadlineStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineStr + 'T00:00:00');
    
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', className: 'countdown-overdue' };
    if (diffDays === 0) return { text: 'Due Today!', className: 'countdown-urgent' };
    if (diffDays <= 7) return { text: `${diffDays} Days Left`, className: 'countdown-urgent' };
    return { text: `${diffDays} Days Left`, className: 'countdown-normal' };
  };

  // Computed States (Filtering/Sorting Engine)
  const filteredAndSortedScholarships = useMemo(() => {
    return scholarships
      .filter(s => {
        const name = s.scholarshipName || '';
        const status = s.status || '';
        const priority = s.priority || '';

        const matchesSearch = name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesStatus = filters.status === 'all' || status.toLowerCase() === filters.status.toLowerCase();
        const matchesPriority = filters.priority === 'all' || priority.toLowerCase() === filters.priority.toLowerCase();
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
        if (filters.sortBy === 'amount') return Number(b.amount || 0) - Number(a.amount || 0);
        return 0;
      });
  }, [scholarships, filters]);

  const totalScholarshipMoney = useMemo(() => {
    return scholarships.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  }, [scholarships]);

  return (
    <ScholarshipContext.Provider value={{
      scholarships,
      setScholarships,
      loading,
      profile, setProfile,
      notificationSettings, setNotificationSettings,
      filters, handleFilterChange,
      filteredAndSortedScholarships,
      totalScholarshipMoney,
      handleAddButton, handleEdit, handleDelete, handleToggleTask,
      formatDate, getDaysRemaining
    }}>
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarshipContext() {
  const context = useContext(ScholarshipContext);
  if (!context) throw new Error('useScholarshipContext must be used within a ScholarshipProvider');
  return context;
}
