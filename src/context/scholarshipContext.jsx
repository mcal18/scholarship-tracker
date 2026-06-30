import { createContext, useContext, useState, useMemo } from 'react';

const ScholarshipContext = createContext();

export function ScholarshipProvider({ children }) {
    // Scholarships Core State
    const [scholarships, setScholarships] = useState([
        {
            id: '1',
            scholarshipName: 'STEM Leadership Award',
            amount: 15000,
            deadline: '2026-07-07',
            priority: 'Medium',
            status: 'Submitted',
            tasks: [
                { id: 1, text: "Write personal statement essay", completed: false },
                { id: 2, text: "Request letters of recommendation", completed: false },
                { id: 3, text: "Gather official academic transcripts", completed: false }
            ],
            notes: "Requires recommendation letters signed by a faculty advisor."
        }
    ]);

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

    // Shared Handlers / Operations
    const handleAddButton = () => {
        console.log("Add button clicked");
        // MODAL STATE TRIGGER LOGIC GOES HERE
    };

    const handleEdit = (scholarship) => {
        console.log("Editing:", scholarship);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            setScholarships(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleToggleTask = (scholarshipId, taskId) => {
        setScholarships(prev => prev.map(s => {
            if (s.id !== scholarshipId) return s;
            return {
                ...s,
                tasks: (s.tasks || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
            };
        }));
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Shared Utilities
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Array(dateString);
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
                const matchesSearch = s.scholarshipName.toLowerCase().includes(filters.search.toLowerCase());
                const matchesStatus = filters.status === 'all' || s.status.toLowerCase() === filters.status.toLowerCase();
                const matchesPriority = filters.priority === 'all' || s.priority.toLowerCase() === filters.priority.toLowerCase();
                return matchesSearch && matchesStatus && matchesPriority;
            })
            .sort((a, b) => {
                if (filters.sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
                if (filters.sortBy === 'amount') return b.amount - a.amount;
                return 0;
            });
    }, [scholarships, filters]);

    const totalScholarshipMoney = useMemo(() => {
        return scholarships.reduce((sum, s) => sum + Number(s.amount || 0), 0);
    }, [scholarships]);

    return (
        <ScholarshipContext.Provider value={{
            scholarships, setScholarships,
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