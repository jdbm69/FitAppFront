import { useState } from "react";
import { useCookies } from 'react-cookie';

const ModalCinco = ({ setShowModalCinco, serieToEdit, language, getEspecificRoutine }) => {

  const [checked, setChecked] = useState(serieToEdit.type_of_weight === 'lb' ? true : false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [data, setData] = useState({
    user_email: cookies.Email,
    date: serieToEdit.date,
    exercise: serieToEdit.exercise,
    repetitions: serieToEdit.repetitions,
    weight: serieToEdit.weight,
    type_of_weight: serieToEdit.type_of_weight,
    num_of_serie: serieToEdit.num_of_serie,
    exercise_english: serieToEdit.exercise_english,
    day: serieToEdit.day,
    day_eng: serieToEdit.day_eng
  });

  const editData = async (e) => {
    e.preventDefault();
    
    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/editroutine/${serieToEdit.id}/${serieToEdit.num_of_serie}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      getEspecificRoutine();
      setShowModalCinco(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      
    setData(data => ({
      ...data,
      [name] : value
    }));
  };
    
  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true);
    }
    
    setData(data => ({
      ...data,
      [name] : value
    }));
  }

  return ( 
    <div className="modal-cont">
      <div className="modal-box">
        <div className="exit-container">
          <button className="exit-button" onClick={() => setShowModalCinco(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 
              5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        <form>
          <input 
            type='number'
            required
            min='0'
            name='repetitions'
            onChange={handleChange}
            value={data.repetitions}
          />
          <input 
            type='number'
            required
            min='0'
            name='weight'
            onChange={handleChange}
            value={data.weight}
          />
          <div className="radio">
            <div className="typeof-box">
              <p>KG</p>
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="myCheck" 
                  name="type_of_weight" 
                  value={checked ? 'kg' : 'lb'}
                  onChange={handleChangeRadio}
                  checked={checked}
                />
                <span className="slider round" ></span>
              </label>
              <p>LB</p>
            </div>  
          </div>
          <input 
            type='submit' 
            value={language ? 'edit' : 'editar'} 
            className='submit-button'
            onClick={editData}
          />
        </form>
      </div>
    </div>
  );
}
  
export default ModalCinco;