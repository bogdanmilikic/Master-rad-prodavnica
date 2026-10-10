import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GornjiDeoSlideBar = ({
    handleSideBar,
    setScroll,
    setTrenutnaPozicija,
    oNamaScroll,
    kontaktScroll,
    setAktivno,
    aktivno,
    prviId,
    drugiId,
    handleProdavnica,
    otvoren }) => {
    const handleInfo = () => {
        setScroll(false);
        setTrenutnaPozicija(oNamaScroll);
        setAktivno(1);

        document.getElementById(prviId).scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            setScroll(true);
        }, 700);
    };

    const handleKontakt = () => {
        setScroll(false);
        setTrenutnaPozicija(kontaktScroll);
        setAktivno(2);
        document.getElementById(drugiId).scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            setScroll(true);
        }, 700);
    };
    return (

        <div className={`sideBarContainer ${otvoren ? "sideBarOtvoren" : ""}`}>
            <div className="sideBarDiv" style={{ width: "60%" }}>
                <div className="sideBarGornjiDeo" >
                    <button className="gasiSideBar" onClick={handleSideBar}><FontAwesomeIcon icon={faX} /></button> <div><p>Meni  <FontAwesomeIcon icon={faBars} /></p></div></div>
                <button className={aktivno === 1 ? "gornjiDeoButtonAktivno" : "gornjiDeoButton"} onClick={() => { handleInfo(); handleSideBar(); }} style={{ width: "100%", height: "6%", textAlign: "center", justifyContent: "center", marginTop: "15px" }}>O nama</button>
                <button className={aktivno === 2 ? "gornjiDeoButtonAktivno" : "gornjiDeoButton"} onClick={() => { handleKontakt(); handleSideBar() }} style={{ width: "100%", height: "6%", textAlign: "center", justifyContent: "center" }}>Kontakt </button>
                <button className="gornjiDeoButton" onClick={handleProdavnica} style={{ width: "100%", height: "6%", textAlign: "center", justifyContent: "center" }}>Prodavnica</button>

            </div>
        </div >
    );
}
export default GornjiDeoSlideBar;