const KorpaProizvod = ({ lista, setLista }) => {

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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default KorpaProizvod;