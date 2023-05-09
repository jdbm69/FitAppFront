import Exercise from "../components/Exercise";
import { useEffect, useState } from "react";

const Exercises = ({ language, dayOfWeek, dayOfWeekEng, setShowNavBarDos, shownavBarDos, showProfileMenu, setShowProfileMenu }) => {

  const [list, setList] = useState(null);
  const [search, setSearch] = useState(null);
  const [listDos, setListDos] = useState(null);
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

  const closeNavAndProfile = () => {
    if (shownavBarDos) {
      setShowNavBarDos(false);
    }
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  return (
    <div className="list-box" onClick={closeNavAndProfile}>
      <div className="input-cont">
        <div className="input-box">
          <input 
            placeholder={language ? 'Search by exercises or category' : 'Buscar por ejercicios o categoria'}
            type="text"
            onChange={handleSearch}
            id="search"
            value={search}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" id="lupa">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 
            1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
        <select name="select" onChange={handleSearch}>
          <option value='' selected>{language ? 'All' : 'Todos'}</option>
          <option value={language ? 'Chest' : 'Pecho'}>{language ? 'Chest' : 'Pecho'}</option>
          <option value={language ? 'Back' : 'Espalda'}>{language ? 'Back' : 'Espalda'}</option>
          <option value={language ? 'Shoulders' : 'Hombros'}>{language ? 'Shoulders' : 'Hombros'}</option>
          <option value={language ? 'Arms' : 'Brazos'}>{language ? 'Arms' : 'Brazos'}</option>
          <option value={language ? 'Legs' : 'Piernas'}>{language ? 'Legs' : 'Piernas'}</option>
        </select>
      </div>
      {listDos?.map((item) => 
        <Exercise 
          mode={'view'} 
          item={item}
          language={language}
          nombre={nombre}
          setNombre={setNombre}
          nombreEng={nombreEng}
          setNombreEng={setNombreEng}
          dayOfWeek={dayOfWeek}
          dayOfWeekEng={dayOfWeekEng}
        />)
      }
    </div>
  );
}

export default Exercises;