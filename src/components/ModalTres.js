import { useCookies } from 'react-cookie';
import { useState } from 'react';

const ModalTres = ({ setShowModalTres, item, getRoutine, language, serie, dayOfWeek, dayOfWeekEng }) => {

  const date = new Date();
  var [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];

  if (month < 10) {
    month = 0 + month.toString();
  }
  if (day < 10) {
    day = 0 + day.toString();
  }

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState({
    id: item.id,
    user_email: cookies.Email,
    date: `${day}-${month}-${year}`,
    exercise: item.exercise,
    repetitions: null,
    weight: null,
    type_of_weight: 'kg',
    num_of_serie: serie,
    exercise_english: item.exercise_english,
    day: dayOfWeek,
    day_eng: dayOfWeekEng
  });

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

  const postData = async (e) => {
    e.preventDefault();
    
    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/serie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setShowModalTres(false);
      getRoutine();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="modal-dos-cont">
      <div className="modal-dos-box">
        <div className="exit-container-dos">
          <p className='exercise-name'>{language ? item.exercise_english : item.exercise}</p>
          <button className="exit-button" onClick={() => setShowModalTres(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 
              8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        <form>
        <p>Serie: {serie}</p>
          <input
            type='number'
            required
            min='1'
            placeholder={language ? 'Repetitions' : 'Repeticiones'}
            name='repetitions'
            value={data.repetitions}
            onChange={handleChange}
          />
          <input
            type='number'
            required
            min='0'
            placeholder={language ? 'Weight' : 'Peso'}
            name='weight'
            value={data.weight}
            onChange={handleChange}
          />
            <div className="radio">
            <div className="typeof-box">
              <p>KG</p>
              <label className="switch">
                  <input 
                      type="checkbox" 
                      id="myCheck" 
                      name="type_of_weight" 
                      onChange={handleChangeRadio}
                      value={checked ? 'lb' : 'kg'}
                  />
                  <span className="slider round" ></span>
              </label>
              <p>LB</p>
            </div>  
          </div>
          <input 
            type='submit' 
            value={language ? 'add' : 'agregar'} 
            onClick={postData}
            className='submit-button'
          />
        </form>
      </div>
    </div>
  );
}
    
export default ModalTres;