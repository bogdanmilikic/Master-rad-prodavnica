import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Proizvodi = ({ naziv, slika, cena, handleIzabraniProizvod, popust, handleDodaj }) => {
    const [kolicina, setKolicina] = useState(1);
    const handleKolicina = (e) => {
        setKolicina(e.target.value);
    }
    return (
        <div className="proizvodiDiv">
            {popust !== null ? <img className="proizvodiPopustSlika" src="/Popust.png" alt="Na popustu" /> : undefined}
            <img className="proizvodiSlika" src={slika} onClick={handleIzabraniProizvod} alt={"proizvod"} />
            <p className="proizvodiNaslov">{naziv}</p>

            {popust !== null ? <menu className="proizvodiCena"><div><p className="proizvodiCenaBezPopusta">{cena} RSD</p></div><div><p className="proizvodiCena">{popust} RSD</p></div>
            </menu> : <p className="proizvodiCena">{cena} RSD</p>
            }

            <hr />
            <menu className="proizvodiMeni">
                <button className="proizvodiButton" onClick={() => handleDodaj({
                    naziv: naziv,
                    slika: slika,
                    cena: cena,
                    kolicina: Number(kolicina)
                })}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Dodaj u korpu</button>
                <input onChange={handleKolicina} type="number" value={kolicina} className="proizvodiKolicina" max={5} min={1} /></menu>
        </div>
    )
}
export default Proizvodi;