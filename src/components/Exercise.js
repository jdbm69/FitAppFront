import { useState } from "react";
import { useCookies } from 'react-cookie';
import ModalDos from './ModalDos';

const Exercise = ({ mode, item, getRoutine, setShowModal, numOfSerie, language, dayOfWeek, dayOfWeekEng, nombre, setNombre, nombreEng, setNombreEng  }) => {
  
  const date = new Date();
  var [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];

  if (month < 10) {
    month = 0 + month.toString();
  }
  if (day < 10) {
    day = 0 + day.toString();
  }

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModalDos, setShowModalDos] = useState(false);
  const [data, setData] = useState({
    user_email: cookies.Email,
    date: `${day}-${month}-${year}`,
    exercise: null,
    repetitions: null,
    weight: null,
    type_of_weight: 'kg',
    num_of_serie: numOfSerie ? numOfSerie : 1,
    exercise_english: null,
    day: dayOfWeek,
    day_eng: dayOfWeekEng
  });

  const routineMode = mode === 'routine' ? true : false;

  const handleModalDos = (e) => {
    setShowModalDos(true);
    setNombre(item.name);
    setNombreEng(item.name_english)
  }

  return ( 
    <div className="exercise-box">
      {!routineMode && 
        <div className="exercise">
          <button 
            onClick={handleModalDos}
            value={language ? item.name_english : item.name}
            className='add-button'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>  
          </button>
          <p className="exercise-name">
            {language ? item.name_english  : item.name}
          </p>
          <p className="exercise-category">
            {language ? item.category_english  : item.category}
          </p>
        </div>
      }
      {routineMode &&
        <button
          value={language ? item.name_english : item.name} 
          onClick={handleModalDos}
          className='exercise-button'
        >
          {language ? item.name_english : item.name}
        </button>
      }
      {showModalDos && 
        <ModalDos 
          setShowModalDos={setShowModalDos} 
          data={data} 
          setData={setData} 
          getRoutine={getRoutine}  
          setShowModal={setShowModal} 
          numOfSerie={numOfSerie}
          language={language}
          item={item}
          nombre={nombre}
          nombreEng={nombreEng}
        />
      }
    </div>
  );
}
  
export default Exercise;