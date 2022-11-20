import { cp } from "fs/promises";
import { parse } from "node:path/win32";
import React, { useState, useEffect } from "react";
import { api } from "../../config/api";
interface Props {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Form {
  username: string;
  valor: string;
}

function Transacao({ reload, setReload }: Props) {
  const [form, setForm] = useState<Form>({
    username: "",
    valor: "",
  });

  const Handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

 async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
        let sendform = {...form, value:parseInt(form.valor)}
        await api.put("/transacao", sendform)
        setForm({
            username: "",
            valor: "",
          })
        setReload(!reload)
          console.log(sendform)
    } catch (error) {
        console.log(error)
    }
   
   
  

  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Nome para credito</label>
        <input type="text" value={form.username} name="username" pattern="\w{3,}" onChange={Handlechange} />
        <label>Valor</label>
        <input type="number" value={form.valor} name="valor" onChange={Handlechange}/>
        <button type="submit">Enviar</button>


      </form>
    </>
  );
}

export default Transacao;
