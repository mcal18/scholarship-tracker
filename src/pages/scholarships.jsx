import Sidebar from '../components/sidebar';
import ControlsPanel from '../components/ControlsPanel';
import {
    FiEdit2,
    FiTrash2,
    FiCalendar,
    FiCheckSquare
} from 'react-icons/fi';

import { FaFire } from 'react-icons/fa';

function Scholarships({
    filteredAndSortedScholarships,
    handleAddButton,
    handleEdit,
    handleDelete,
    handleToggleTask,
    formatDate,
    getDaysRemaining,
    filters,
    handleFilterChange
}) {
    return (
        <>
            <h1>Scholarships</h1>
            <ControlsPanel
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            <h2>Tracked Scholarships</h2>
            <button className='add-btn' onClick={handleAddButton}>Add Scholarship</button>
            <div className='scholarship-grid'>
                {filteredAndSortedScholarships.map((scholarship) => {
                    const countdown = getDaysRemaining(scholarship.deadline);
                    return (
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

                            <hr className='card-divider' />

                            <div>
                                <span className='info-label'>Amount</span>
                                <span className='amount-value'>
                                    ${Number(scholarship.amount).toLocaleString()}
                                </span>
                            </div>

                            <div className='metadata-grid'>
                                <div>
                                    <span className='info-label'><FiCalendar /> Deadline</span>
                                    <div>
                                        <span className='meta-value'>{formatDate(scholarship.deadline)}</span>
                                        {countdown && (
                                            <span className={`countdown-badge ${countdown.className}`}>
                                                {countdown.text}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <span className='info-label'><FiCheckSquare /> Status</span>
                                    <span className={`meta-value ${scholarship.status === 'Won' ? 'status-won' : ''}`}>
                                        {scholarship.status}
                                    </span>
                                </div>

                                <hr className='task-divider' />
                                <div className="task-list-container">
                                    <div className="task-section-header">
                                        <span>Requirements Checklist</span>
                                        <span> {((scholarship.tasks || []).filter(t => t.completed).length)} / {((scholarship.tasks || []).length || 3)} </span>
                                    </div>
                                    {(scholarship.tasks || [
                                        { id: 1, text: "Write personal statement essay", completed: false },
                                        { id: 2, text: "Request letters of recommendation", completed: false },
                                        { id: 3, text: "Gather official academic transcripts", completed: false }
                                    ]).map(task => (
                                        <div key={task.id} className="task-item">
                                            <input type="checkbox" className='task-checkbox' checked={task.completed} onChange={() => handleToggleTask(scholarship.id, task.id)} />
                                            <span className={task.completed ? 'task-text-completed' : ''}>
                                                {task.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {scholarship.notes && (
                                    <div className='card-notes-section'>
                                        <hr className='task-divider' />
                                        <span className="info-label">Notes</span>
                                        <p className="card-notes-text">{scholarship.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Scholarships;