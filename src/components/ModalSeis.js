import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

const ModalSeis = ({ setShowModalSeis, language, setDates, setWeights, setTitle, setTitleEng, setShowChart, userEmail }) => {

  const [list, setList] = useState(null);
  const [listDos, setListDos] = useState(null);
  const [search, setSearch] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(null);

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

  const getProgress = async (i) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/progress/${i.name}/${userEmail}`);
      const json = await response.json();
      var array = [];
      var arrayDos = [];
      json.map((value) =>
        array.push(value.date),
      )
      json.map((value) =>
        arrayDos.push(value.weight),
      )
      setDates(array);
      setWeights(arrayDos);
      setTitle(i.name);
      setTitleEng(i.name_english)
    } catch (err) {
      console.error(err);
    }
    setShowChart(true);
    setShowModalSeis(false);
  }

  return (
    <div className='modal-cont'>
      <div className='modal-box'>
        <div className="exit-container-uno">
          <button className="exit-button" onClick={() => setShowModalSeis(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 
              8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
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
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 
            1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
        <div className="modal-exercises">
          {listDos?.map((item) =>
            <button className='exercise-button' onClick={() => getProgress(item)}>{language ? item.name_english : item.name}</button>
          )}
        </div>
      </div>
    </div>
  );
}
  
export default ModalSeis;