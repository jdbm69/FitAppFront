import { useState } from 'react';
import {  useCookies } from 'react-cookie';
import Icon from '../components/Icon';
import Footer from '../components/Footer';

const Auth = ({ language, setLanguage }) => {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const viewLogin = (status) => {
    setIsLogIn(status);
    setError(null);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('Passwords do not match');
      return
    }

    const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password, name, lastName})
    })

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    }
  }

  const handleClean = (bool) => {
    viewLogin(bool);
    setShowPassword(true);
    setShowConfirmPassword(true);
    const collection = document.getElementsByTagName('input');
    for (let i = 0; i < collection.length; i++) {
      collection[i].value = '';
    }
  };

  return (
    <>
    <div className='auth-container'>
      <div className="auth-box">
        <div className='title-box'>
          <h1>FIT<Icon />APP</h1>  
        </div>
        <form>
          <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          {!isLogIn && 
            <>
              <input 
                type='name' 
                placeholder={language ? 'Name' : 'Nombre'} 
                onChange={(e) => setName(e.target.value)} 
              />
              <input 
                type='lastName' 
                placeholder={language ? 'Last name' : 'Apellido'} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </>
          }
          <div className='ip'>
            <input 
              type={showPassword ? 'password' : 'text'} 
              placeholder={language ? 'Password' : 'Contraseña'} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {!showPassword && 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" 
                className="bi bi-eye-fill" 
                viewBox="0 0 16 16" 
                onClick={() => setShowPassword(true)}
              >
                <path 
                  d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                />
                <path 
                  d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                />
              </svg>
            }
            {showPassword && 
              <svg 
                xmlns="http://www.w3.org/2000/svg"  
                fill="currentColor" 
                className="bi bi-eye-slash-fill" 
                viewBox="0 0 16 16" 
                onClick={() => setShowPassword(false)}
              >
                <path 
                  d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 
                  0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 
                  0 0 0-4.474-4.474L5.21 3.089z"
                />
                <path 
                  d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 
                  6-12-12 .708-.708 12 12-.708.708z"
                />
              </svg>
            }
          </div>
          {!isLogIn && 
            <div className='ipconfirm'>
              <input 
                type={showConfirmPassword ? 'password' : 'text'} 
                placeholder={language ? 'Confirm Password' : 'Confirmar Contraseña'} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              {!showConfirmPassword && 
                <svg 
                  xmlns="http://www.w3.org/2000/svg"  
                  fill="currentColor" 
                  className="bi bi-eye-fill" 
                  viewBox="0 0 16 16" 
                  onClick={() => setShowConfirmPassword(true)}
                >
                  <path 
                    d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                  />
                  <path 
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                  />
                </svg>
              }
              {showConfirmPassword && 
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  className="bi bi-eye-slash-fill" 
                  viewBox="0 0 16 16" 
                  onClick={() => setShowConfirmPassword(false)}
                >
                  <path 
                    d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 
                    2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                  />
                  <path 
                    d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 
                    6-12-12 .708-.708 12 12-.708.708z"
                  />
                </svg>
              }
            </div>
          }
          <input 
            type='submit' 
            className='submit-button' 
            value={isLogIn ? language ? 'Log In' : 'Iniciar Sesion' : language ? 'Sign Up' : 'Registrarse'} 
            onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
          />
          {error && 
            <p className='error'>{error}</p>
          }
        </form>
        {isLogIn && 
          <p>{language ? 'Not member yet? ' : 'No eres miembro? '} 
            <a 
              onClick={() => handleClean(false)}>
                {language ? 'Sign up now! ' : 'Registrate ahora! '}
            </a>
          </p>
        }
        {!isLogIn && 
          <p>{language ? 'Are you a member? ' : 'Eres miembro? '} 
            <a onClick={() => handleClean(true)}>
              {language ? 'Log in! ' : 'Inicia sesion! '}
            </a>
          </p>
        }
      </div>
    </div>
    <Footer 
      language={language}
      setLanguage={setLanguage}
    />
    <>
  );
}
  
export default Auth;
