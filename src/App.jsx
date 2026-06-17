import { useState } from 'react';

function App() {
// Create state to hold the input value
const [scholarships, setScholarshipst] = useState([]);

// Hold all form data in a single object state 
const [formData, setFormData] = useState({
  scholarshipName: '',
  amount: '',
  deadline: '',
  status: '', 
  priority: ''
});

// Universal function for every input
const handleInputChange = (event) => {
  const { name, value } = event.target;

    //Updates only the specifc field that triggered the change event
    setFormData({
      ...formData,  // Copies all existing fields first
      [name]: value // Overwrites just the one that changed
    });
};
 
// Handle the form submission
const handleSubmit = (event) => {
  event.preventDefault(); // Prevents browser from refreshing the page

    // Validation: prevents submit if fields are empty
    if( !formData.scholarshipName || !formData.amount || !formData.deadline || !formData.status || !formData.priority){
      alert("Please fill out all fields!");
      return;
    }


  setScholarships([
    ...scholarships,
    { ...formData, id: Date.now() }
  ]);

  // Clear form fields after submitting
  setFormData({
    scholarshipName: '',
    amount: '',
    deadline: '',
    status: '',
    priority: '',
  })
};

  // Define add scholarship button
  const handleAddButton = () => {
    
  };

  return (
    <>
      <h1>My Scholarships</h1>
      <h3>Welcome!</h3>

      <button onClick={handleAddButton}>Add Scholarship</button>

      <div style={{padding: '20px'}}>
        <h2>Add New Scholarship</h2>

        <form onSubmit={handleSubmit}>
          <label>Scholarship Name:
            <input type="text" 
            name="scholarshipName"
            value={formData.scholarshipName} // Force input to mirror state
            onChange={handleInputChange} // Listen for typing events
            placeholder="e.g., STEM Merit Award"
            />
          </label>
          <label>
            Amount:
            <input type="number" 
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="e.g., 10000" />
          </label>
          <label>
            Deadline:
            <input type="date" 
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            placeholder="e.g., 10000" />
          </label>
          <label>
            Application Status:
            <select 
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            >
              <option value="" disabled hidden>-- Select Status --</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Won">Won 🏆</option>
            </select>
          </label>
          <label>
            Priority:
            <select 
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            >
              <option value="" disabled hidden>-- Select Priority --</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <button type="submit">Track Scholarship</button>
        </form>

        <h2>Tracked Scholarships</h2>

        {scholarshipsList.map((scholarship) => (
          <div key={scholarship.id}>
            <h3>{scholarship.scholarshipName}</h3>
            <p>Amout: ${scholarship.amount}</p>
            <p>Deadline: {scholarship.deadline}</p>
            <p>Status: {scholarship.status}</p>
            <p>Priority: {scholarship/priority}</p>
            </div>
        ))}
      </div>
    </>
  );
}

export default App;
 