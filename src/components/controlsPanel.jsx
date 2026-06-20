function ControlsPanel({ filters, onFilterChange }) {
  return (
    <div className="controls-panel">
      {/* Search Input */}
      <input 
        type="text" 
        name='searchTerm' 
        placeholder='Search scholarships' 
        value={filters.searchTerm} 
        onChange={onFilterChange} 
      />

      {/* Status Filter */}
      <select name="statusFilter" value={filters.statusFilter} onChange={onFilterChange}>
        <option value="">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Submitted">Submitted</option>
        <option value="Won">Won</option>
      </select>

      {/* Priority Filter */}
      <select name="priorityFilter" value={filters.priorityFilter} onChange={onFilterChange}>
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Sort Order */}
      <select name="sortBy" value={filters.sortBy} onChange={onFilterChange}>
        <option value="">No Sorting</option>
        <option value="deadline">Sort by Deadline</option>
        <option value="amount">Sort by Amount</option>
      </select>
    </div>
  );
}

export default ControlsPanel;
