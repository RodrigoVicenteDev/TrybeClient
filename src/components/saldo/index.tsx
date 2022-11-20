import React, { useState, useEffect } from "react";
import { api } from "../../config/api";

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
  return <> {loading&& <h1>{user.accounts.balance}</h1>} </>;
}

export default Saldo;
