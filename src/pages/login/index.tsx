import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../config/api";
import { Link } from "react-router-dom";
import  style from "./style.module.css"


interface Form {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await api.post("/login", form);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
    } catch (error: any) {
      console.log(error);
      window.alert(error.response.data.message);
    }
    navigate("/principal");
  }
  return (
    <>
     
     <h1 className={style.h1}> NG.CASHER</h1>
     <div className={style.bg}>
        <div className={style.bgimage}>

     
        <div className={style.formcontainer}>
      <form className={style.flex} onSubmit={handleSubmit}>
        <label className={style.label}>UserName</label>
        <input
          type="text"
          name="username"
          pattern="\w{3,}"
          onChange={handleChange}
          className={style.input}
          required
        />
        <label  className={style.label}>Password</label>
        <input
          type="password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$"
          onChange={handleChange}
          name={"password"}
          className={style.input}
          required
        />
        <button className={style.botao} type="submit">Entrar</button>
      </form>
      </div>

      <Link className={style.abiriconta} to="/sigin">Abra sua conta</Link>
      </div>
      </div>
    </>
  );
}

export default Login;
