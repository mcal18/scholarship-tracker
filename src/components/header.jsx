import { useState } from 'react'; // Cleaned up unused 'act' import
import { NavLink } from 'react-router-dom';
import logoImg from '../imgs/logo.png';
import Modal from '../components/modal';
import NotificationCenter from './notifications/notificationCenter';
import { FaBell } from 'react-icons/fa';
import { FiSettings, FiUser } from 'react-icons/fi';
import { getDaysRemaining } from '../utils/dateUtils';
import ProfileSettings from './settings/profileSettings';

function Header({ 
  scholarships,
  profile,
  setProfile
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationOpen(true);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    setIsProfileOpen(true);
  }

  const activeScholarships = scholarships || [];

  const hasNotifications = activeScholarships.some((scholarship) => {
    const countdown = getDaysRemaining(scholarship.deadline);
    if (!countdown) return false;

    const isDueToday = countdown.text === "Due Today!";
    const isApproaching = countdown.text === "3 days left" || countdown.text === "7 days left";
    const isOverdue = countdown.text === "Overdue";

    // FIXED: Corrected 'scholars' to 'scholarship' and 'Not Starteds' to 'Not Started'
    const isHighPriorityUnstarted = scholarship.priority === "High" && scholarship.status === "Not Started";

    return isDueToday || isApproaching || isOverdue || isHighPriorityUnstarted;
  });

  return (
    <header className="app-header">
      <div className="logo-container">
        <img src={logoImg} alt="ScholarTrack Logo" className='app-logo' />
      </div>
      <p className='page-subtitle'>Track every scholarship in one place</p>

      {/* FIXED: The navigation links are now isolated to prevent layout bugs */}
      <nav className="main-nav">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/scholarships">Scholarships</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </nav>

      {/* FIXED: Pushed completely outside the nav container for precise top-right CSS grid targeting */}
      <div className="header-actions">
        <button
          onClick={handleNotificationClick}
          className="header-action-btn notification-bell-btn"
          aria-label="Open Notifications"
        >
          <FaBell />
          {hasNotifications && <span className="notification-badge" />}
        </button>

        <NavLink
          to="/settings"
          className="header-action-btn settings-icon-btn"
          aria-label="Open Settings"
        >
          <FiSettings />
        </NavLink>

        <button
          onClick={handleProfileClick}
          className="header-action-btn profile-btn"
          arial-label="Edit Profile"
        >
          <FiUser />
        </button>
      </div>

      {/* FIXED: Clean modal overlay breakout placement outside navigation layout flow */}
      <Modal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
        <h2 style={{ color: 'var(--heading-color)', marginBottom: '18px', fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          Notifications
        </h2>
        <NotificationCenter scholarships={scholarships} />
      </Modal>

      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} >
        <h2 className='modal-heading'>Update Profile Information</h2>
        <ProfileSettings
          profile={profile}
          setProfile={setProfile}
          closeModal={() => setIsProfileOpen(false)}
          isFormOnly={(true)}
        />
      </Modal>

    </header>
  );
}

export default Header;
