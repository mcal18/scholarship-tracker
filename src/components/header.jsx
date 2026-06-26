import { NavLink } from 'react-router-dom';
import logoImg from '../imgs/logo.png';

function Header() {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src={logoImg} alt="ScholarTrack Logo" className='app-logo'/>
      </div>
      <p className='page-subtitle'>Track every scholarship in one place</p>

      <nav className="main-nav">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/scholarships">Scholarships</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </header>
  );
}

export default Header;
