import LineChart from "../components/LineChart";
import { useState } from 'react';
import ModalSeis from "../components/ModalSeis";

const Progress = ({ setShowNavBarDos, shownavBarDos, showProfileMenu, setShowProfileMenu, language, userEmail, color }) => {

  const [dates, setDates] = useState([]);
  const [weights, setWeights] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [title, setTitle] = useState(null);
  const [titleEng, setTitleEng] = useState(null);
  const [showModalSeis, setShowModalSeis] = useState(false);

  const closeNavAndProfile = () => {
    if (shownavBarDos) {
      setShowNavBarDos(false);
    }
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  return (
    <div className="progress-box" onClick={closeNavAndProfile}> 
      <div className='progress-title'>
        <div className='title'>
          <p>{language ? 'Progress' : 'Progreso'}</p>
          <p className="explain">
            {language ? 'Here you can see the charts of the exercise of your choice' : 'Aqui podras ver los graficos del ejercicio de tu eleccion'}
          </p>
        </div>
        <button onClick={() => setShowModalSeis(true)} className="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" id="lupa">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 
            1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          {language ? 'search' : 'buscar'}
        </button>
      </div>
      {!showChart && 
        <p className="text">{language ? 'Select an exercise to watch the chart ' : 'Selecciona un ejercicio para ver la grafica '}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" id="lupa">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 
            1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </p>
      }
      {showModalSeis && 
        <ModalSeis 
          setShowModalSeis={setShowModalSeis} 
          language={language} 
          setDates={setDates} 
          setWeights={setWeights} 
          setTitle={setTitle} 
          setTitleEng={setTitleEng} 
          setShowChart={setShowChart}
          userEmail={userEmail}
        />
      }
      {showChart && 
        <LineChart 
          dates={dates} 
          weights={weights} 
          title={title} 
          titleEng={titleEng} 
          language={language}
          color={color}
        />
      }
    </div>
  );
}

export default Progress;