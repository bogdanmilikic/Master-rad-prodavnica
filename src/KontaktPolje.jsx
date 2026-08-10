const KontaktPolje=({ikonica,tekst})=>{
    return(
        <div className="kontaktPoljeContainer">
        <div className="kontaktPoljeDiv">
            <div className="kontaktPoljeIkonica">
{ikonica}
            </div>
         </div>
            <p className="kontaktPoljeTekst">
                {tekst}
            </p>
            
        </div>
    )
}
export default KontaktPolje;