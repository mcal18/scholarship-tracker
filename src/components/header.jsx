import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../imgs/logo.png';
import Modal from '../components/modal';
import NotificationCenter from './notifications/notificationCenter';
import { FaBell } from 'react-icons/fa';
import { FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import { getDaysRemaining } from '../utils/dateUtils';
import ProfileSettings from './settings/profileSettings';
import { useAuth } from '../context/authContext';
import { useScholarshipContext } from '../context/scholarshipContext';

function Header() {
  const { logout, user } = useAuth();
  const { scholarships, profile, setProfile } = useScholarshipContext();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setIsNotificationOpen(true);
  };

  const activeScholarships = scholarships || [];

  const hasNotifications = activeScholarships.some((scholarship) => {
    const countdown = getDaysRemaining(scholarship.deadline);
    if (!countdown) return false;

    const isDueToday = countdown.text === "Due Today!";
    const isApproaching = countdown.text === "3 days left" || countdown.text === "7 days left";
    const isOverdue = countdown.text === "Overdue";

    const isHighPriorityUnstarted = scholarship.priority === "High" && scholarship.status === "Not Started";

    return isDueToday || isApproaching || isOverdue || isHighPriorityUnstarted;
  });

  return (
    <header className="app-header">
      <div className="logo-container">
        <img src={logoImg} alt="ScholarTrack Logo" className='app-logo' />
      </div>
      <p className='page-subtitle'>Track every scholarship in one place</p>

      <nav className="main-nav">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/scholarships">Scholarships</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </nav>

      <div className="header-actions" ref={dropdownRef}>
        <button
          onClick={handleNotificationClick}
          className="header-action-btn notification-bell-btn"
          aria-label="Open Notifications"
        >
          <FaBell />
          {hasNotifications && <span className="notification-badge" />}
        </button>

        {user && (
          <div className="profile-menu-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`header-action-btn profile-btn ${isDropdownOpen ? 'active' : ''}`}
              aria-label='Toggle Account Profile Dropdown'
            >
              <FiUser />
            </button>

            {isDropdownOpen && (
              <div className="profile-dropdown-menu">
                <div className="dropdown-user-info">
                  <span className="user-email-label">{user?.email}</span>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={() => { setIsDropdownOpen(false); setIsProfileOpen(true); }} >
                  <FiUser /> <span>Edit Profile</span>
                </button>
                <Link
                  to='/settings'
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiSettings /> <span>Account Settings</span>
                </Link>
                <button
                  className="dropdown-item"
                  onClick={() => { setIsDropdownOpen(false); logout(); }}
                >
                  <FiLogOut /> <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
        <h2>
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
