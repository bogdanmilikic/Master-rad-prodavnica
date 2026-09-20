import { useEffect, useRef, useState } from "react";

const ComboBox = ({ opcije, vrednost, setVrednost }) => {
    const [otvoren, setOtvoren] = useState(false);
    const comboBoxRef = useRef(null);

    const handleKlik = () => {
        setOtvoren(!otvoren);
    };

    useEffect(() => {
        const handleKlikVan = (e) => {
            if (
                comboBoxRef.current &&
                !comboBoxRef.current.contains(e.target)
            ) {
                setOtvoren(false);
            }
        };

        window.addEventListener("click", handleKlikVan);

        return () => {
            window.removeEventListener("click", handleKlikVan);
        };
    }, []);

    return (
        <div className="comboBox" ref={comboBoxRef}>
            <input
                className="comboInput"
                readOnly={true}
                onClick={handleKlik}
                placeholder="Izaberite opciju"
                value={vrednost==="Otkaži"?"":vrednost}
            >
            </input>

            <div className={`comboOpcije ${otvoren ? "show" : ""}`}>
                {opcije.map((opcija, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setVrednost(opcija);
                            setOtvoren(false);
                        }}
                    >
                        {opcija === "" ? "Otkaži" : opcija}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComboBox;