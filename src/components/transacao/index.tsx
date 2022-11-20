import React, { useState, useEffect } from "react";
import { api } from "../../config/api";
import style from "./style.module.css";
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let sendform = { ...form, value: parseInt(form.valor) };
      await api.put("/transacao", sendform);
      setForm({
        username: "",
        valor: "",
      });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className={style.flex}>
        <h3>Realizar transferência </h3>
      <form className={style.flex} onSubmit={handleSubmit}>
        <div className={style.flex2}>
        <label className={style.label}>Nome para credito</label>
        <input
          type="text"
          value={form.username}
          name="username"
          pattern="\w{3,}"
          onChange={Handlechange}
          className={style.input}
        />
        </div>
        <div className={style.flex2}>
        <label className={style.label}>Valor</label>
        <input
          type="number"
          value={form.valor}
          name="valor"
          onChange={Handlechange}
          className={style.input}
          
        />
        <button className={style.botao} type="submit">Enviar</button>
        </div>
        
      </form>
      </div>
    </>
  );
}

export default Transacao;
