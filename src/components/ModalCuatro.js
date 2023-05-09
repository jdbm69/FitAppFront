import { useEffect, useState } from "react";
import ModalCinco from "./ModalCinco";

const ModalCuatro = ({ specificId, setShowModalCuatro, item, language, mode, getRoutine, setRoutine }) => {

  const [data, setData] = useState(null);
  const [serieToEdit, setSerieToEdit] = useState(null);
  const routineMode = mode === 'routine' ? true : false;
  const [showModalCinco, setShowModalCinco] = useState(null);

  useEffect(() => {
    getEspecificRoutine();
  }, []);

  const getEspecificRoutine = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/specificroutine/${specificId}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (i) => {
    setSerieToEdit(i);
    setShowModalCinco(true);
  }

  const handleDelete = async (i) => {
    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/routine/${i.id}/${i.num_of_serie}`, {
        method: 'DELETE'
      });
      if (data.length === 1) {
        setRoutine(null);
        getRoutine();
        setShowModalCuatro(false);
      }
      getEspecificRoutine();
    } catch (err) {
      console.error(err);
    }    
  };

  return (
    <div className="modal-cont">
      <div className="modal-box-4">
        <div className="exit-container-4">
          <p className='exercise-name'>{language ? item.exercise_english : item.exercise}</p>
          <button className="exit-button" onClick={() => setShowModalCuatro(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        {data?.map((item) =>
        <div className="series">
          <p className="modal-info">
            <span className="serie">{`Serie ${item.num_of_serie}`}</span>
            <span className="reps">{language ? `${item.repetitions} repetitions` : `${item.repetitions} repeticiones`}</span>
            <span className="weight">{`${item.weight} ${item.type_of_weight}`}</span>
          </p>
          {routineMode && <div className="options">
            <button onClick={() => handleChange(item)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 
                1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 
                1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 
                0 1-.468-.325z"/>
              </svg>
            </button>
            <button onClick={() => handleDelete(item)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 
                1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 
                0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 
                1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 
                1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
            </button>
          </div>}
        </div>  
        )}
      </div>
      {showModalCinco &&
        <ModalCinco 
          setShowModalCinco={setShowModalCinco}
          serieToEdit={serieToEdit}
          language={language}
          getEspecificRoutine={getEspecificRoutine}
        />
      }
    </div>
  );
}
  
export default ModalCuatro;