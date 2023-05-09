import { useLocalStorage } from "../useLocalStorage";

const Language = ({ setLanguage }) => {
    
    const [check, setCheck] = useLocalStorage('check', true);

    const handleChange = () => {
        var checkbox = document.getElementById('myCheck');
        if (checkbox.checked === true) {
            setLanguage(false);
            setCheck(true);
        } else {
            setLanguage(true);
            setCheck(false);
        }
    }

    return (
        <div className="language-box">
            <p>ENG</p>
            <label className="switch">
                <input 
                    type="checkbox" 
                    id="myCheck" 
                    checked={check} 
                    onChange={handleChange}
                />
                <span className="slider round" ></span>
            </label>
            <p>ESP</p>
        </div>
    )
};

export default Language;