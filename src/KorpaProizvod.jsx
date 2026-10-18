import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const KorpaProizvod = ({ lista, setLista, korisnickoIme }) => {

    const promeniKolicinu = (indexZaPromenu, novaKolicina) => {
        if (novaKolicina < 1) return;
        const novaLista = lista.map((p, index) => {
            if (index === indexZaPromenu) {
                return { ...p, kolicina: Number(novaKolicina) };
            }
            return p;
        });
        setLista(novaLista);
    };
    const handleIzbaci = (indexZaIzbacivanje) => {
        const novaLista = lista.filter((p, index) => index !== indexZaIzbacivanje);
        setLista(novaLista);
    };
    return (
        <div style={{ textAlign: "center" }}>
            <table>
                <thead>
                    <tr className="tabelaNasloviRed">
                        <th>Slika</th>
                        <th>Proizvod</th>
                        <th>Cena</th>
                        <th>Količina</th>
                        <th>Ukupna Cena</th>
                        <th>Izbaci</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((p, index) => {
                        return (
                            <tr key={index} className="tabelaProizvodiRed">
                                <td><img className="korpaProizvodSlika" src={p.slika} alt="Logo" /></td>
                                <td><h3>{p.naziv}</h3></td>
                                <td><h3>{p.popust == null ? p.cena : p.popust} RSD</h3></td>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                                        <button
                                            className="korpaKolicinaDugme"
                                            onClick={() => promeniKolicinu(index, p.kolicina - 1)}
                                        >
                                            -
                                        </button>

                                        <input
                                            className="korpaKolicinaInput"
                                            value={p.kolicina}
                                            onChange={(e) => promeniKolicinu(index, e.target.value)}
                                            type="number"
                                            max={5}
                                            min={1}
                                        />
                                        <button
                                            className="korpaKolicinaDugme"
                                            onClick={() => promeniKolicinu(index, p.kolicina + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <h3>{p.popust == null ? p.cena * p.kolicina : p.popust * p.kolicina} RSD</h3>
                                </td>
                                <td><button onClick={() => { handleIzbaci(index) }} className="korpaIzbaci"><FontAwesomeIcon icon={faTrash} /></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default KorpaProizvod;