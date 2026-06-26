import './styles.js';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { FiEdit2, FiTrash2, FiCalendar, FiCheckSquare, FiX } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { RiMoneyDollarCircleLine, RiTumblrFill } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import { formatDate, getDaysRemaining } from './utils/dateUtils';
import Header from './components/header';
import ControlsPanel from './components/ControlsPanel';
import TotalTracker from './components/TotalTracker';
import StatsPanel from './components/statsPanel';
import Dashboard from './pages/dashboard';
import Scholarships from './pages/scholarships';
import Calendar from './pages/calendar';
import Analytics from './pages/analytics';
import Settings from './pages/settings';
import Notifications from "./pages/notifications";


function App() {
  // Create state to hold the input value
  const [scholarships, setScholarships] = useState(() => {
    const savedData = localStorage.getItem('tracked_scholarships');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('tracked_scholarships', JSON.stringify(scholarships));
  }, [scholarships]);

  // Hold all form data in a single object state 
  const [formData, setFormData] = useState({
    scholarshipName: '',
    amount: '',
    deadline: '',
    status: '',
    priority: '',
    notes: ''
  });

  const [editId, setEditId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState({ searchTerm: '', statusFilter: '', priorityFilter: '', sortBy: '' });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  // Universal function for every input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //Updates only the specifc field that triggered the change event
    setFormData({
      ...formData,  // Copies all existing fields first
      [name]: value // Overwrites just the one that changed
    });
  };

  // Triggered when clicking Edit button on a card
  const handleEdit = (scholarship) => {
    setEditId(scholarship.id); // Saves the ID of what is being edited
    setFormData({ ...scholarship });  // Fills the form fields with this data
    setIsFormOpen(true);

  }

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      scholarshipName: '',
      amount: '',
      deadline: '',
      status: '',
      priority: '',
      notes: ''
    });
    setIsFormOpen(false);
  }

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents browser from refreshing the page

    // Validation: prevents submit if fields are empty
    if (!formData.scholarshipName || !formData.amount || !formData.deadline || !formData.status || !formData.priority) {
      toast.error("Please fill out all fields!");
      return;
    }
    if (formData.status === 'Won') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#fbbf24', '#60a5fa', '#fffffe']
      });
      toast.success(`Congratulations! You won ${formData.scholarshipName} 🏆`, { duration: 5000 });
    } else {
      toast.success(editId ? "Scholarship updated!" : "Scholarship tracked successfully!");
    }

    if (editId) {
      setScholarships(scholarships.map(item =>
        item.id === editId
          ? { ...formData, id: editId, tasks: item.tasks || [] } // Preserves the tasks!
          : item
      ));
      setEditId(null);
    } else {
      setScholarships([
        ...scholarships,
        {
          ...formData,
          id: Date.now(),
          tasks: [
            { id: 1, text: "Write personal statement essay", completed: false },
            { id: 2, text: "Request letters of recommendation", completed: false },
            { id: 3, text: "Gather official academic transcripts", completed: false }
          ]
        }
      ]);
    }

    // Clear form fields after submitting
    setFormData({
      scholarshipName: '',
      amount: '',
      deadline: '',
      status: '',
      priority: '',
      notes: ''
    });
    setIsFormOpen(false);
  };

  // Define add scholarship button
  const handleAddButton = () => {
    setEditId(null);
    setFormData({
      scholarshipName: '',
      amount: '',
      deadline: '',
      status: '',
      priority: '',
      notes: ''
    })
    setIsFormOpen(true);
  };

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete the "${name}" scholarship?`);

    if (!confirmed) return;

    setScholarships(scholarships.filter((item) => item.id !== id));
    toast.success(`Deleted "${name}"`);
    if (editId === id) handleCancelEdit();
    setIsFormOpen(false);
  };

  const handleToggleTask = (scholarshipId, taskId) => {
    setScholarships(scholarships.map(item => {
      if (item.id === scholarshipId) {
        const currentTask = item.tasks || [];
        return {
          ...item,
          tasks: currentTask.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return item;
    }));
  };

  const filteredAndSortedScholarships = scholarships
    .filter((item) => {
      // Search filter
      const matchesSearch = item.scholarshipName
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = filters.statusFilter === '' || item.status === filters.statusFilter;

      // Priority filter
      const matchesPriority = filters.priorityFilter === '' || item.priority === filters.priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      // Sort Matrix
      if (filters.sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (filters.sortBy === 'amount') {
        return Number(b.amount) - Number(a.amount);
      }
      return 0;
    });

  const totalScholarshipMoney = filteredAndSortedScholarships.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <>

      {isFormOpen && (
        <div className='form-container' onClick={handleCancelEdit}>
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="form-close-btn" onClick={handleCancelEdit} title="Close Form">
              <FiX />
            </button>
            <div className='form-group'>
              <label className='form-label'>Scholarship Name</label>
              <input type="text" name="scholarshipName" className='form-input' value={formData.scholarshipName} onChange={handleInputChange} placeholder="e.g., STEM Merit Award" />
            </div>
            <div className='form-group'>
              <label className='form-label'>Amount</label>
              <input type="number" name="amount" className='form-input' value={formData.amount} onChange={handleInputChange} placeholder="e.g., 10000" />
            </div>
            <div className='form-group'>
              <label className='form-label'>Deadline</label>
              <input type="date" name="deadline" className='form-input' value={formData.deadline} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <label className='form-label'>Application Status</label>
              <select name="status" className='form-input' value={formData.status} onChange={handleInputChange}>
                <option value="" disabled hidden>-- Select Status --</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Won">Won 🏆</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Priority</label>
              <select name="priority" className='form-input' value={formData.priority} onChange={handleInputChange}>
                <option value="" disabled hidden>-- Select Priority --</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Application Notes</label>
              <textarea name="notes"
                className="form-input form-textarea"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder='Add links, login details, or essay hooks...'
                rows="3"
              />
            </div>
            <button type="submit" className='submit-btn'>
              {editId ? 'Update Scholarship' : 'Track Scholarship'}
            </button>
            {editId && (
              <button type='button' className='cancel-btn' onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </form>
        </div>
      )}
      <Header />
      <Toaster position='bottom-right' reverseOrder={false} />
      <Routes>
        <Route path="/" element={
          <Dashboard
            scholarships={scholarships}
            totalScholarshipMoney={totalScholarshipMoney}
            handleAddButton={handleAddButton}
          />
        }
        />

        <Route path="/scholarships" element={
          <Scholarships
            scholarships={scholarships}
            filteredAndSortedScholarships={filteredAndSortedScholarships}
            handleAddButton={handleAddButton}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleToggleTask={handleToggleTask}
            formatDate={formatDate}
            getDaysRemaining={getDaysRemaining}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        }
        />

        <Route path="/calendar"
          element={
            <Calendar
              scholarships={scholarships}
            />
          }
        />

        <Route path="/analytics" element={
          <Analytics
            scholarships={scholarships}
          />
        }
        />

        <Route path="/settings" element={
          <Settings 
            scholarships={scholarships}
            setScholarships={setScholarships}
          />
        } 
          />

        <Route
          path="/notifications" element={
            <Notifications
              scholarships={scholarships}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
