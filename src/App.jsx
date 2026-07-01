import './styles.js';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import { FiX } from 'react-icons/fi';

import AuthPage from './pages/auth';
import ProtectedRoute from './components/protectedRoute';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import Scholarships from './pages/scholarships';
import Calendar from './pages/calendar';
import Analytics from './pages/analytics';
import Settings from './pages/settings';
import Notifications from "./pages/notifications";

import { useScholarshipContext } from './context/scholarshipContext.jsx';
import { db } from './config/firebase';
import { useAuth } from './context/authContext';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const { scholarships, setScholarships } = useScholarshipContext();
  const { user } = useAuth(); 

  // Local component states dedicated solely to handling the popup modal form window
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

  // Universal input tracking handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Opens modal form in a clean state for a new tracking item
  const handleAddButton = () => {
    setEditId(null);
    setFormData({ scholarshipName: '', amount: '', deadline: '', status: '', priority: '', notes: '' });
    setIsFormOpen(true);
  };

  // Populates and triggers the form modal window for modification
  const handleEdit = (scholarship) => {
    setEditId(scholarship.id);
    setFormData({ ...scholarship });
    setIsFormOpen(true);
  };

  // Resets and minimizes the modal form interface safely
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ scholarshipName: '', amount: '', deadline: '', status: '', priority: '', notes: '' });
    setIsFormOpen(false);
  };

  // Intercepts and filters item removals prior to database sync triggers
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete the "${name}" scholarship?`);
    if (!confirmed) return;

    try {
      if (!user) return;
      // Remotely destroys document from cloud tables
      await deleteDoc(doc(db, `users/${user.uid}/scholarships`, id));
      toast.success(`Deleted "${name}"`);
      if (editId === id) handleCancelEdit();
      setIsFormOpen(false);
    } catch (err) {
      console.error("Deletion failed:", err);
      toast.error("Could not complete deletion.");
    }
  };

  // Form persistence submission processor
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.scholarshipName || !formData.amount || !formData.deadline || !formData.status || !formData.priority) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      if (!user) return;
      const userScholarshipsCollection = collection(db, `users/${user.uid}/scholarships`);

      if (formData.status === 'Won') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#22c55e', '#fbbf24', '#60a5fa', '#fffffe'] });
        toast.success(`Congratulations! You won ${formData.scholarshipName} 🏆`, { duration: 5000 });
      } else {
        toast.success(editId ? "Scholarship updated!" : "Scholarship tracked successfully!");
      }

      if (editId) {
        // Update existing item in the cloud
        const docRef = doc(db, `users/${user.uid}/scholarships`, editId);
        await updateDoc(docRef, {
          scholarshipName: formData.scholarshipName,
          amount: Number(formData.amount),
          deadline: formData.deadline,
          status: formData.status,
          priority: formData.priority,
          notes: formData.notes || ''
        });
      } else {
        // Add completely fresh item into user collection
        await addDoc(userScholarshipsCollection, {
          scholarshipName: formData.scholarshipName,
          amount: Number(formData.amount),
          deadline: formData.deadline,
          status: formData.status,
          priority: formData.priority,
          notes: formData.notes || '',
          tasks: [
            { id: 1, text: "Write personal statement essay", completed: false },
            { id: 2, text: "Request letters of recommendation", completed: false },
            { id: 3, text: "Gather official academic transcripts", completed: false }
          ]
        });
      }

      setFormData({ scholarshipName: '', amount: '', deadline: '', status: '', priority: '', notes: '' });
      setIsFormOpen(false);
      setEditId(null);
    } catch (err) {
      console.error("Form submit failed:", err);
      toast.error("An issue occurred while saving your data.");
    }
  };

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
              <textarea name="notes" className="form-input form-textarea" value={formData.notes} onChange={handleInputChange} placeholder='Add links, login details, or essay hooks...' rows="3" />
            </div>
            <button type="submit" className='submit-btn'>
              {editId ? 'Update Scholarship' : 'Track Scholarship'}
            </button>
            {editId && (
              <button type='button' className='cancel-btn' onClick={handleCancelEdit}> Cancel </button>
            )}
          </form>
        </div>
      )}

      <Header />
      <Toaster position='bottom-right' reverseOrder={false} />

      <Routes>
        <Route path='/login' element={<AuthPage />} />
        
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/scholarships" element={
          <ProtectedRoute>
            <Scholarships handleAddButton={handleAddButton} handleEdit={handleEdit} handleDelete={handleDelete} />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
