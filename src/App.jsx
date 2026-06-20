import './styles.js';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { FiEdit2, FiTrash2, FiCalendar, FiCheckSquare, FiX } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import TotalTracker from './components/TotalTracker';


function App() {
// Create state to hold the input value
const [scholarships, setScholarships] = useState(() => {
  const savedData = localStorage.getItem('tracked_scholarships');
  return savedData ? JSON.parse(savedData) : [];
});

useEffect(() => {
  localStorage.setItem('tracked_scholarships', JSON.stringify(scholarships));
},[scholarships]);

// Hold all form data in a single object state 
const [formData, setFormData] = useState({
  scholarshipName: '',
  amount: '',
  deadline: '',
  status: '', 
  priority: ''
});

const [editId, setEditId] = useState(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [filters, setFilters] = useState({searchTerm: '', statusFilter:'', priorityFilter:'', sortBy: ''});

const formatDate = (dateString) => {
  if (!dateString) return 'No Deadline';
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month-1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

const getDaysRemaining = (dateString) => {
  if (!dateString) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = dateString.split('-');
  const deadlineDate = new Date(year, month-1, day);
  const differenceInTime = deadlineDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays < 0) {
    return { text: 'Overdue', className: 'countdown-overdue' };
  } else if (differenceInDays === 0) {
    return { text: 'Due Today!', className: 'countdown-urgent'};
  } else if (differenceInDays === 1) {
    return { text: '1 day left', className: 'countdown-urgent'};
  } else {
    return { text: `${differenceInDays} days left`, className: 'countdown-normal'};
  }
};

const handleFilterChange = (event) => {
  const { name, value } = event.target;
  setFilters({ ...filters, [name]: value});
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
  setFormData({...scholarship});  // Fills the form fields with this data
  setIsFormOpen(true);

}

const handleCancelEdit = () => {
  setEditId(null);
  setFormData({scholarshipName: '', 
    amount: '', 
    deadline: '', 
    status: '', 
    priority: '' });
    setIsFormOpen(false);
}

// Handle the form submission
const handleSubmit = (event) => {
  event.preventDefault(); // Prevents browser from refreshing the page

    // Validation: prevents submit if fields are empty
    if( !formData.scholarshipName || !formData.amount || !formData.deadline || !formData.status || !formData.priority){
      alert("Please fill out all fields!");
      return;
    }
    if (formData.status === 'Won') {
      confetti ({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#fbbf24', '#60a5fa', '#fffffe']
      })
    }

    if(editId) {
      // Updates existing fields
      setScholarships(scholarships.map(item => item.id === editId ? { ...formData, id: editId} : item));
      setEditId(null);
    } else {
      // Creates new field
      setScholarships([ ...scholarships, { ...formData, id: Date.now()}]);
    }

  // Clear form fields after submitting
  setFormData({scholarshipName: '', 
    amount: '', 
    deadline: '', 
    status: '', 
    priority: '' });
    setIsFormOpen(false);
};

  // Define add scholarship button
  const handleAddButton = () => {
    setEditId(null);
    setFormData({scholarshipName: '', 
    amount: '', 
    deadline: '', 
    status: '', 
    priority: '' })
    setIsFormOpen(true);
  };

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete the "${name}" scholarship?`);

    if (!confirmed) return;

    setScholarships(scholarships.filter((item) => item.id !== id));
    if(editId === id) handleCancelEdit();
    setIsFormOpen(false);
  };

  const filterAndSortedScholarships = scholarships
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

  const totalScholarshipMoney = filterAndSortedScholarships.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);


  return (
    <>
      <Header />

      <ControlsPanel filters={filters} onFilterChange={handleFilterChange} />

      <button className='add-btn' onClick={handleAddButton}>Add Scholarship</button>

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

      <TotalTracker totalMoney={totalScholarshipMoney} />

        <h2>Tracked Scholarships</h2>
        <div className='scholarship-grid'>
            {filterAndSortedScholarships.map((scholarship) => (
            <div key={scholarship.id} className='scholarship-card'>

            <div className='card-header'>
              <h3 className='card-title'>{scholarship.scholarshipName}</h3>
              <div className="header-actions">
                <span className={`priority-badge priority-${scholarship.priority?.toLowerCase()}`}>
                  <FaFire /> {scholarship.priority}
                </span>
                <button className="edit-btn" onClick={() => handleEdit(scholarship)} title='Edit Scholarship'>
                  <FiEdit2 />
                </button>
                <button className='delete-btn' onClick={() => handleDelete(scholarship.id, scholarship.scholarshipName)} title='Delete Scholarship'>
                  <FiTrash2 />
                </button>
              </div>

              </div>  

              <hr className='card-divider'/>
            
              <div>
                <span className='info-label'>Amount</span>
                <span className='amount-value'>
                  ${Number(scholarship.amount).toLocaleString()}
                </span>
              </div>

                <div className='metadata-grid'>
                  <div>
                    <span className='info-label'><FiCalendar/> Deadline</span>
                    <div>
                      <span className='meta-value'>{formatDate(scholarship.deadline)}</span>
                      {getDaysRemaining(scholarship.deadline) && (
                        <span className={`countdown-badge ${getDaysRemaining(scholarship.deadline).className}`}>
                        {getDaysRemaining(scholarship.deadline).text}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className='info-label'><FiCheckSquare/> Status</span>
                    <span className={`meta-value ${scholarship.status === 'Won' ? 'status-won' : ''}`}>
                      {scholarship.status}
                    </span>
                  </div>
                  </div>
            </div>
        ))}
        </div> 
    </>
  );
}

export default App;
 