import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"  
import { api } from "../../config/api";
import style from "./style.module.css";

interface Form {
  username: string;
  password: string;
  confirmpassword: string;
}

function Sigin() {
  const navigate = useNavigate();
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
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("devem ser iguais");
    }
  }

  return (
    <>
    <div className={style.containerinside}>
      <div  >
        <h1 className={style.topo}>SigIn</h1>
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
        <p >O usu??rio deve ter no m??nimo 3 caracteres</p>
        <p>
          A senha deve conter no m??nimo 8 caracteres sendo pelo menos uma
          mai??scula, um caractere especial e um n??mero
        </p>
        <Link to="/"> Voltar para LogIn</Link>
      </div>
      </div>
    </>
  );
}

export default Sigin;
