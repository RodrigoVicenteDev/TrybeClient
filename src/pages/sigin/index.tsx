import React, { useState } from "react";
import {Link} from "react-router-dom"  
import { api } from "../../config/api";
import style from "./style.module.css";

interface Form {
  username: string;
  password: string;
  confirmpassword: string;
}

function Sigin() {
  const [versenha, setVersenha] = useState(false);
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
    confirmpassword: "",
  });

  const Handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const see = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVersenha(!versenha);
  };

  async function Handlesubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.password === form.confirmpassword) {
      try {
        delete form.confirmpassword;
        await api.post("/sigin", { ...form });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("devem ser iguais");
    }
  }

  return (
    <>
      <div className={style.cabacalho}>
        <h1>SigIn</h1>
      </div>
      <form className={style.flex} onSubmit={Handlesubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="username"
          pattern="\w{3,}"
          className={style.input}
          onChange={Handlechange}
          required
        />
        <label>Password</label>
        <input
          type={versenha ? "text" : "password"}
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$"
          onChange={Handlechange}
          name={"password"}
          className={style.input}
          required
        />
        <label> Confirme a Senha</label>
        <input
          type={versenha ? "text" : "password"}
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$"
          onChange={Handlechange}
          name={"confirmpassword"}
          className={style.input}
          required
        />
        <button className={style.olho} onClick={see}>
          Mostrar senha
        </button>
        <button className={style.botao} type="submit">
          Enviar
        </button>
      </form>
      <div className={style.p}>
        <p >O usuário deve ter no mínimo 3 caracteres</p>
        <p>
          A senha deve conter no mínimo 8 caracteres sendo pelo menos uma
          maiúscula, um caractere especial e um número
        </p>
        <Link to="/"> Voltar para LogIn</Link>
      </div>
    </>
  );
}

export default Sigin;
