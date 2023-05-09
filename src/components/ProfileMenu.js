import { useCookies } from 'react-cookie';

const ProfileMenu = ({ language, name, lastName, userEmail, showProfileMenu, setColor }) => {

    const [cookies, setCookie, removeCookie] = useCookies(null);

    const signOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
    
        window.location.reload();
    }

    const changeColor = (e) => {
        if (e.target.value === 'green') {
            document.documentElement.style.setProperty('--base-color', 'rgba(12, 120, 124, 0.801)');
            document.documentElement.style.setProperty('--base-color-darkness', 'rgba(12, 120, 124, 0.932)');
            setColor('rgba(12, 120, 124, 0.801)');
        } else if (e.target.value === 'red') {
            document.documentElement.style.setProperty('--base-color', 'rgba(206, 0, 0, 0.801)');
            document.documentElement.style.setProperty('--base-color-darkness', 'rgba(206, 0, 0, 0.932)');
            setColor('rgba(206, 0, 0, 0.801)');
        } else if (e.target.value === 'pink') {
            document.documentElement.style.setProperty('--base-color', 'rgba(134, 10, 118, 0.801)');
            document.documentElement.style.setProperty('--base-color-darkness', 'rgba(134, 10, 118, 0.932)');
            setColor('rgba(134, 10, 118, 0.801)');
        } else if (e.target.value === 'blue') {
            document.documentElement.style.setProperty('--base-color', 'rgba(0, 72, 139, 0.801)');
            document.documentElement.style.setProperty('--base-color-darkness', 'rgba(0, 72, 139, 0.932)');
            setColor('rgba(0, 72, 139, 0.8011)');
        }
    }

    return (
        <div className={showProfileMenu ? "profile-box" : 'offprof'}>
            <div className='user'>
                <p className='name'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 
                        1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    {name} {lastName}
                </p>
                <p className='email'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 
                        0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 
                        0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                    </svg>
                    {userEmail}
                </p>
            </div>
            <div className='colors-box'>
                <p className='color-text'>{language ? 'Change the theme color:' : 'Cambia el color del tema:'}</p>
                <div className='colors'>
                    <button onClick={changeColor} value={'red'} id='red'></button>
                    <button onClick={changeColor} value={'green'} id='green'></button>
                    <button onClick={changeColor} value={'pink'} id='pink'></button>
                    <button onClick={changeColor} value={'blue'} id='blue'></button>
                </div>
            </div>
            <button onClick={signOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 
                    0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 
                    1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
                {language ? 'logout' : 'salir'}
            </button>
        </div>
    );
}
  
export default ProfileMenu;