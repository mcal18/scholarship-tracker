import logoImg from '../imgs/logo.png';

function Header() {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src={logoImg} alt="ScholarTrack Logo" className='app-logo'/>
      </div>
      <p className='page-subtitle'>Track every scholarship in one place</p>
    </header>
  );
}

export default Header;
