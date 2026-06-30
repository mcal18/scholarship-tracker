import { useState, useMemo } from "react"; // Added useMemo
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import { useScholarshipContext } from '../context/scholarshipContext.jsx';

function Calendar() {
  const { scholarships } = useScholarshipContext();
  const [selectedDate, setSelectDate] = useState(new Date());

  const formatCalendarDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Optimization: Pre-index deadlines into an object dictionary lookup map
  const deadlinesMap = useMemo(() => {
    const map = {};
    scholarships.forEach(s => {
      if (s.deadline) {
        // Keeps the highest priority scholarship on that day if multiple exist
        map[s.deadline] = s; 
      }
    });
    return map;
  }, [scholarships]);

  const selectedDateString = formatCalendarDate(selectedDate);
  const deadlinesToday = scholarships.filter(
    scholarship => scholarship.deadline === selectedDateString
  );

  return (
    <>
      <h1>Calendar</h1>
      <div className="calendar-layout">
        <ReactCalendar 
          onChange={setSelectDate} 
          value={selectedDate} 
          tileContent={({ date }) => {
            const formatted = formatCalendarDate(date);
            // Instant O(1) hash table lookup instead of looping through all items
            const scholarship = deadlinesMap[formatted]; 
            
            if (!scholarship) return null;
            return (
              <div className={`calendar-dot priority-${scholarship.priority?.toLowerCase()}`} />
            );
          }} 
        />
        <div className="calendar-events">
          <h2>Deadlines</h2>
          {deadlinesToday.length === 0 ? (
            <p>No deadlines.</p>
          ) : (
            deadlinesToday.map(scholarship => (
              <div key={scholarship.id} className="deadline-card">
                <strong>{scholarship.scholarshipName}</strong>
                <p>${Number(scholarship.amount).toLocaleString()}</p>
                <p>Status: {scholarship.status}</p>
                <p>Priority: {scholarship.priority}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;
