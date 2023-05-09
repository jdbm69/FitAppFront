import { useEffect, useState } from "react";
import ModalCuatro from '../components/ModalCuatro';

const Records = ({ language, userEmail, setShowNavBarDos, shownavBarDos, showProfileMenu, setShowProfileMenu }) => {

    const [records, setRecords] = useState(null);
    const [recordsDos, setRecordsDos] = useState(null);
    const [showModalCuatro, setShowModalCuatro] = useState(false);
    const [item, setItem] = useState(null);
    const [specificId, setSpecificId] = useState(null);
    const [dateInput, setDateInput] = useState(null);

    useEffect(() => {
        getRecords();
    }, []);

    const getRecords = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVERURL}/records/${userEmail}`);
          const json = await response.json();
          if (json.length > 0) {
            setRecords(json);  
            setRecordsDos(json);
          }
        } catch (err) {
          console.error(err);
        }
    };

    const handleDelete = async (i) => {
        setItem(i);
    
        try {
            await fetch(`${process.env.REACT_APP_SERVERURL}/routine/${i.id}`, {
                method: 'DELETE'
            });
            setRecordsDos(null);
            setRecords(null);
            getRecords();
        } catch (err) {
          console.error(err);
        }    
    };

    const selectId = (i) => {
        setSpecificId(i.id);
        setItem(i);
        setTimeout(() => {
          setShowModalCuatro(true);
        }, 200);
    }

    const filter = (dateContent) => {
        var dateResult = records.filter((element) => {
            if (element.date.includes(dateContent)) {
                return element
            }
        })
        setRecordsDos(dateResult);
        if (dateContent === '--') {
            getRecords();
        }
    }

    const handleDate = (e) => {
        const date = e.target.value;
        const day = date.slice(-2)
        const month = date.slice(5, 7)
        const year = date.slice(0, 4)
        const dateToSearch = `${day}-${month}-${year}`
        setDateInput(dateToSearch);
        filter(dateToSearch);
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
        <div className="records-box" onClick={closeNavAndProfile}>
            <div className="records-title">
                <div className="title">
                    <p>{language ? 'Records' : 'Registros'}</p>
                    <p className="info">
                        {language ? 'Here you can see all your old workout records' : 'Aqui podras ver todos tus registros de antiguos entrenamientos'}
                    </p>
                </div>
                <form> 
                    <input type='date' onChange={handleDate}></input>
                </form>
            </div>
            <div className="records">
                {recordsDos?.map((item) =>
                    <div key={item.id} className='routine-item'>
                        <p className="dateof"><span className="day">{language ? item.day_eng : item.day} </span>{item.date}</p>
                        <div className="name-delete">
                            <button className='item-title' onClick={() => selectId(item)}>{language ? item.exercise_english : item.exercise}</button>
                            <button className="delete" onClick={() => handleDelete(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 
                                    1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 
                                    2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 
                                    1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 
                                    5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 
                                    4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {!records &&
                <p className='msg'>
                    { language ? 'There is no records, go to "routine" to add one' : 'No hay registros, slecciona "rutina" para agregar una'}
                </p> 
            }
            {showModalCuatro && 
                <ModalCuatro 
                specificId={specificId}
                setShowModalCuatro={setShowModalCuatro}
                item={item}
                language={language}
                mode={'records'}
                />
            }
        </div>
    );
}
  
export default Records;