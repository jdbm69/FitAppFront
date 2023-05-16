import Auth from './pages/Auth';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import Routine from './pages/Routine';
import Records from './pages/Records';
import Progress from './pages/Progress';
import NavBar from './components/NavBar';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { useLocalStorage } from './useLocalStorage';
import { useState, useEffect } from 'react';
import NavBarDos from './components/NavBarDos';
import ProfileMenu from './components/ProfileMenu';

const App = () => {
  
  const [language, setLanguage] = useLocalStorage('boolean', true);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [dateOf, setDateOf] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [dayOfWeekEng, setDayOfWeekEng] = useState(null);
  const [shownavBarDos, setShowNavBarDos] = useState(false);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [color, setColor] = useState('rgba(12, 120, 124, 0.801)');

  const handleDate = () => {
    var today = new Date();
    var [month, day, year] = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
    if (month < 10) {
      month = 0 + month.toString();
    }
    if (day < 10) {
      day = 0 + day.toString();
    }
    if (today.getDay() === 0) {
      setDayOfWeek('Domingo');
      setDayOfWeekEng('Sunday');
    } else if (today.getDay() === 1) {
      setDayOfWeek('Lunes');
      setDayOfWeekEng('Monday');
    } else if (today.getDay() === 2) {
      setDayOfWeek('Martes');
      setDayOfWeekEng('Tuesday');
    } else if (today.getDay() === 3) {
      setDayOfWeek('Miercoles');
      setDayOfWeekEng('Wednesday');
    } else if (today.getDay() === 4) {
      setDayOfWeek('Jueves');
      setDayOfWeekEng('Thursday');
    } else if (today.getDay() === 5) {
      setDayOfWeek('Viernes');
      setDayOfWeekEng('Friday');
    } else if (today.getDay() === 6) {
      setDayOfWeek('Sabado');
      setDayOfWeekEng('Saturday');
    }
    
    setDateOf(`${day}-${month}-${year}`);
  }

  const getName = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/name/${userEmail}`);
      const json = await response.json();
      setName(json)
    } catch (err) {
      console.error(err);
    }
  };

  const getLastName = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/lastName/${userEmail}`);
      const json = await response.json();
      setLastName(json)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getName();
      getLastName();
    }
    handleDate();
  }, []);

  return (
    <div className="app-box">
      {!authToken && 
        <Auth 
          language={language}
          setLanguage={setLanguage}
          showProfileMenu={showProfileMenu} 
          setShowProfileMenu={setShowProfileMenu} 
          setShowNavBarDos={setShowNavBarDos} 
          shownavBarDos={shownavBarDos}
        />
      }
      {authToken && 
        <BrowserRouter>
          <NavBarDos 
            setShowNavBarDos={setShowNavBarDos} 
            shownavBarDos={shownavBarDos} 
            language={language}
          />
          <NavBar 
            language={language} 
            setShowNavBarDos={setShowNavBarDos} 
            shownavBarDos={shownavBarDos} 
            name={name} 
            showProfileMenu={showProfileMenu} 
            setShowProfileMenu={setShowProfileMenu}
          />
          <ProfileMenu 
            language={language} 
            name={name} 
            lastName={lastName} 
            userEmail={userEmail} 
            showProfileMenu={showProfileMenu}
            setColor={setColor}
          />
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  showProfileMenu={showProfileMenu} 
                  setShowProfileMenu={setShowProfileMenu} 
                  etShowNavBarDos={setShowNavBarDos} 
                  shownavBarDos={shownavBarDos}
                  language={language} 
                />
              }
            />
            <Route 
              path="/exercises" 
              element={
                <Exercises 
                language={language} 
                dayOfWeek={dayOfWeek} 
                dayOfWeekEng={dayOfWeekEng} 
                showProfileMenu={showProfileMenu} 
                setShowProfileMenu={setShowProfileMenu} 
                setShowNavBarDos={setShowNavBarDos} 
                shownavBarDos={shownavBarDos}
                />
              }
            />
            <Route 
              path="/routine" 
              element={
                <Routine 
                  userEmail={userEmail} 
                  language={language} 
                  dateOf={dateOf} 
                  dayOfWeek={dayOfWeek} 
                  dayOfWeekEng={dayOfWeekEng} 
                  showProfileMenu={showProfileMenu} 
                  setShowProfileMenu={setShowProfileMenu} 
                  setShowNavBarDos={setShowNavBarDos} 
                  shownavBarDos={shownavBarDos}
                />
              }
            />  
            <Route 
              path="/records" 
              element={
                <Records 
                  userEmail={userEmail} 
                  language={language} 
                  showProfileMenu={showProfileMenu} 
                  setShowProfileMenu={setShowProfileMenu} 
                  setShowNavBarDos={setShowNavBarDos} 
                  shownavBarDos={shownavBarDos}
                />
              }
            />  
            <Route 
              path="/progress" 
              element={
                <Progress 
                  showProfileMenu={showProfileMenu} 
                  setShowProfileMenu={setShowProfileMenu} 
                  setShowNavBarDos={setShowNavBarDos} 
                  shownavBarDos={shownavBarDos} 
                  language={language} 
                  userEmail={userEmail}
                  color={color}
                />
              }
            />  
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
