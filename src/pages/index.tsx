import React, { useState } from "react";
import { api } from "../config/api";
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
      <form onSubmit={Handlesubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="username"
          pattern="\w{3,}"
          onChange={Handlechange}
        />
        <label>Password</label>
        <input
          type={versenha ? "text" : "password"}
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$"
          onChange={Handlechange}
          name={"password"}
        />
        <label> Conforme a Senha</label>
        <input
          type={versenha ? "text" : "password"}
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$"
          onChange={Handlechange}
          name={"confirmpassword"}
        />
        <button onClick={see}>Olho</button>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Sigin;
