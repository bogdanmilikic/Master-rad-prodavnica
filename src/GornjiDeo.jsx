import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDown from "./DropDown";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const GornjiDeo = ({ aktivno,
  setAktivno,
  kontaktScroll,
  oNamaScroll,
  setTrenutnaPozicija,
  setScroll,
  prviId,
  drugiId,
  handleProdavnica,
  handleSlika,
  vidjliviDugmici,
  aktivnoDugme,
  korisnickoIme,
  setKorisnickoIme,
  setOpenPrijava,
  setGornjiDeoSideBarOpen,
  setOpenRegistracija,
}
) => {

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
    <div className="gornjiDeoDiv">
      <img src="/Logo.png" alt="Logo" className="logo" onClick={handleSlika} />
      {vidjliviDugmici ? (
        window.innerWidth > 651 ? <menu className="gornjiDeoMeni">
          <button className={aktivno === 1 ? "gornjiDeoButtonAktivno" : "gornjiDeoButton"} onClick={handleInfo}>O nama</button>
          <button className={aktivno === 2 ? "gornjiDeoButtonAktivno" : "gornjiDeoButton"} onClick={handleKontakt}>Kontakt </button>
          <button className="gornjiDeoButton" onClick={handleProdavnica}>Prodavnica</button>
        </menu> : <button className="gornjiDeoSlideBarDugme" onClick={() => setGornjiDeoSideBarOpen(true)}><FontAwesomeIcon icon={faBars} /></button>
      ) : <DropDown korisnickoIme={korisnickoIme} handleOdjava={() => setKorisnickoIme("")} handlePrijava={() => { setOpenPrijava(true) }} handleRegistracija={() => { setOpenRegistracija(true) }} />}

    </div>
  );
};
export default GornjiDeo;