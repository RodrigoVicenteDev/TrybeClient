import { useState } from "react";
import Extrato from "../../components/extrato";
import Saldo from "../../components/saldo";
import Transacao from "../../components/transacao";
import style from "./style.module.css";



function Paginaprincipal() {

const[reload, setReload] = useState(false)

    return ( 
        <>
        <div className={style.saldocontainer}>
        <Saldo reload={reload} setReload={setReload} />
        </div>
    <div className={style.container}>
        <div className={style.containerinside}>
        
    <Transacao reload={reload} setReload={setReload}/>
    </div>
    <div className={style.containerinside}>
    <Extrato reload={reload} setReload={setReload}/>
    </div>
    </div> 
    </>);
}

export default Paginaprincipal;