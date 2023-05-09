import { useEffect, useState } from "react";

const ModalDos = ({ setShowModalDos, data, setData, getRoutine, setShowModal, numOfSerie, language, item, nombre, nombreEng }) => {

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    data.exercise = nombre;
    data.exercise_english = nombreEng;
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    
    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setShowModalDos(false);
      setShowModal(false);
      getRoutine();
    } catch (err) {
      console.error(err);
    }
  }

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
    <div className="modal-dos-cont">
      <div className="modal-dos-box">
        <div className="exit-container-dos">
          <p className='exercise-name'>{language ? item.name_english : item.name}</p>
          <button className="exit-button" onClick={() => setShowModalDos(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 
              5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        <form>
          <p>Serie: {numOfSerie ? numOfSerie : 1}</p>
          <input
            type='number'
            required
            min='0'
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
  
export default ModalDos;