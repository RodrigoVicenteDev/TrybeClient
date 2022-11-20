import { useState } from "react";
import Extrato from "../../components/extrato";
import Saldo from "../../components/saldo";
import Transacao from "../../components/transacao";



function Paginaprincipal() {

const[reload, setReload] = useState(false)

    return ( <>

    <Saldo reload={reload} setReload={setReload} />
    <Transacao reload={reload} setReload={setReload}/>
    <Extrato reload={reload} setReload={setReload}/>
    </> );
}

export default Paginaprincipal;