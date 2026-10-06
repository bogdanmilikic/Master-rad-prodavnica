import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pretraga = ({ vrednost, setVrednost, handlePretraga }) => {

    const handleInput = (e) => {
        setVrednost(e.target.value);
    };

    return (
        <div>
            <input
                onChange={handleInput}
                value={vrednost}
                placeholder="Pretraga"
                className="pretragaInput"
                onKeyDown={(e) => {
        if (e.key === "Enter")
            handlePretraga();
        }}
            />
            <button
                className="pretragaDugme"
                onClick={handlePretraga}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
};

export default Pretraga;