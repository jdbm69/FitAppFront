import Exercise from "./Exercise";
import { useEffect, useState } from "react";

const Modal = ({ setShowModal, getRoutine, numOfSerie, language, dayOfWeek, dayOfWeekEng }) => {

  const [list, setList] = useState(null);
  const [listDos, setListDos] = useState(null);
  const [search, setSearch] = useState('');
  const [nombre, setNombre] = useState(null);
  const [nombreEng, setNombreEng] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/list`);
      const json = await response.json();
      setList(json);
      setListDos(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (searchContent) => {
    var searchResult = list.filter((element) => {
      if (language) {
        if (element.name_english.toLowerCase().includes(searchContent.toLowerCase()) || 
        element.category_english.toLowerCase().includes(searchContent.toLowerCase())) {
          return element;
        }
      } else {
        if (element.name.toLowerCase().includes(searchContent.toLowerCase()) || 
        element.category.toLowerCase().includes(searchContent.toLowerCase())) {
          return element;
        }
      }

    });
    setListDos(searchResult);
  }
    
  return (
    <div className='modal-cont'>
      <div className='modal-box'>
        <div className="exit-container-uno">
          <button className="exit-button" onClick={() => setShowModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 
              1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        <div className="input-box">
          <input 
            placeholder={language ? 'Search exercises' : 'Buscar ejercicios'}
            onChange={handleSearch}
            value={search}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" id="lupa">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 
            1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
        <div className="modal-exercises">
        {listDos?.map((item) => 
          <Exercise 
            mode={'routine'} 
            item={item} 
            getRoutine={getRoutine} 
            setShowModal={setShowModal} 
            numOfSerie={numOfSerie} 
            language={language} 
            dayOfWeek={dayOfWeek}
            dayOfWeekEng={dayOfWeekEng}
            nombre={nombre}
            setNombre={setNombre}
            nombreEng={nombreEng}
            setNombreEng={setNombreEng}
          />)
        }
        </div>
      </div>
    </div>
  );
}
  
export default Modal;