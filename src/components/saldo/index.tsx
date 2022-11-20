import React, { useState, useEffect } from "react";
import { api } from "../../config/api";
import  style from "./style.module.css"

interface Props {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: number;
  username: String;
  accounts: {
    id: number;
    balance: number;
  };
}

function Saldo({ reload, setReload }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setloading] = useState(false);

  useEffect(() => {
       setloading(false);
    async function fetchuser() {
      
      try {
        const response = await api.get("/usuario");
        setUser(response.data[0]);
      } catch (error) {
        console.log(error);
      }setloading(true);
    }
    fetchuser();
    
  }, [reload]);

  console.log(user);
  return <> {loading&& 
    <>
    <h1>Bem-vindo, {user.username}</h1>

  <h2 className={style.saldo}>Saldo: {user.accounts.balance}</h2></>} </>;
}

export default Saldo;
