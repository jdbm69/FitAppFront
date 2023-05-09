const NavBar = ({ language, setShowNavBarDos, shownavBarDos, name, setShowProfileMenu, showProfileMenu }) => {

  const closeNavAndProfile = () => {
    if (shownavBarDos) {
      setShowNavBarDos(false);
    }
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  return (
    <div className='navbar-box' onClick={closeNavAndProfile}>
      <button className='menu' onClick={() => shownavBarDos ? setShowNavBarDos(false) : setShowNavBarDos(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 
          1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </button>
      <button className="arrow" onClick={() => showProfileMenu ? setShowProfileMenu(false) : setShowProfileMenu(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 
          5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <p>
          {language ? ' Hello ' : ' Hola '} {name}
        </p>
        {!showProfileMenu && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>}
        {showProfileMenu && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>}
      </button>
    </div>
  );
}

export default NavBar;