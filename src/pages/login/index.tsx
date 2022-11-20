import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../config/api";
import { Link } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="username"
          pattern="\w{3,}"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$"
          onChange={handleChange}
          name={"password"}
        />
        <button type="submit">Enviar</button>
      </form>
      <Link to="/sigin">Criar Usuario</Link>
    </>
  );
}

export default Login;
