const ONama =({ naslov, tekst ,ikonica})=>{
    return(
        <div className="tekstDiv">
            <div style={{width:"100%"}}>
            <h1 className="tekstNaslov">{ikonica}{"   "}{naslov}</h1>
<hr/>

<p className="tekstP">
    {tekst}
</p></div>
        </div>
    )
}
export default ONama;
