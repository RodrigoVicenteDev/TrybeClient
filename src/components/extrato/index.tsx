import { useEffect, useState } from "react";
import { api } from "../../config/api";
import Filtro from "../filtro";
import { useForm } from "react-hook-form";
import style from "./style.module.css";
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

function Extrato({ reload, setReload }: Props) {
  const [extrato, setExtrato] = useState([]);
  const [user, setUser] = useState<User>({} as User);
  const [loading, setloading] = useState(false);
  const [queryBuilder, setQueryBuilder] = useState("");
  const [filtro, setFiltro] = useState(false);
  const { reset } = useForm();
  const [query, setQuery] = useState({
    credito: "",
    debito: "",
    data: "",
  });

  useEffect(() => {
    setloading(false);
    async function fetchuextrato() {
      try {
        const response = await api.get("/extrato");
        setExtrato(response.data);
      } catch (error) {
        console.log(error);
      }
      setloading(true);
    }
    fetchuextrato();
  }, [reload]);

  useEffect(() => {
    setloading(false);
    async function fetchuser() {
      try {
        const response = await api.get("/usuario");
        setUser(response.data[0]);
      } catch (error) {
        console.log(error);
      }
      setloading(true);
    }
    fetchuser();
  }, []);

  function handleChangeradio(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked === true) {
      setQuery({ ...query, [e.target.id]: e.target.value });
    } else {
      setQuery({ ...query, [e.target.id]: "" });
    }
  }

  function handleChangedata(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery({ ...query, data: e.target.value });
  }

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.data === "" && query.credito === "true" && query.debito === "") {
      setQueryBuilder(`credito=${query.credito}`);
    }

    if (query.data === "" && query.credito === "" && query.debito === "true") {
      setQueryBuilder(`debito=${query.debito}`);
    }

    if (query.data !== "" && query.credito === "" && query.debito === "") {
      setQueryBuilder(`data=${query.data}`);
    }

    if (query.data !== "" && query.credito === "true" && query.debito === "") {
      setQueryBuilder(`data=${query.data}&credito=${query.credito}`);
    }

    if (query.data !== "" && query.credito === "" && query.debito === "true") {
      setQueryBuilder(`data=${query.data}&debito=${query.debito}`);
    }

    if (query.credito === "true" && query.debito === "true") {
      window.alert("Limpe os filtros");
    }

    setFiltro(true);
  }

  function limpar() {
    setQuery({
      credito: "",
      debito: "",
      data: "",
    });
    reset();

    setFiltro(false);
  }

  return (
    <>
      <h3> Extratos</h3>
      <form className={style.flex} onSubmit={HandleSubmit}>
        <div>
          <input
            type="checkbox"
            value="true"
            id="credito"
            name="query"
            onChange={handleChangeradio}
          />
          <label className={style.label}>Creditos</label>
          <input
            type="checkbox"
            id="debito"
            value="true"
            name="query"
            onChange={handleChangeradio}
          />
          <label className={style.label}>Debitos</label>
        </div>
        <div className={style.flex}>
          <div>
            <label className={style.label}>Data</label>
            <input
              type="date"
              value={query.data}
              name="data"
              onChange={handleChangedata}
              className={style.input}
            />
          </div>

          <button className={style.botao} type="submit">
            {" "}
            Filtrar{" "}
          </button>
        </div>
      </form>

      <div className={style.flex}>
        <button className={style.botao} onClick={limpar}>
          Limpar Filtros
        </button>
        {filtro && <Filtro queryBuilder={queryBuilder} />}
        {!filtro && (
          <div>
            <table>
              <tr>
                <th>Conta</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>

              {loading &&
                extrato.map((element) => {
                  const date = new Date(element.createdAt);
                  let dd = date.getDate();
                  let mm = date.getMonth();
                  let yyy = date.getFullYear();
                  let data = `${dd + 1}/${mm + 1}/${yyy}`;
                  let conta = 0;
                  let valor = "";

                  if (element.creditedAccountId.id === user.id) {
                    conta = element.debitedAccountId.id;
                    valor = `+ ${element.value}`;
                  }

                  if (element.debitedAccountId.id === user.id) {
                    conta = element.creditedAccountId.id;
                    valor = `- ${element.value}`;
                  }

                  return (
                    <>
                      <tr key={element.id}>
                        <td>{conta}</td>
                        <td
                          style={{ color: valor[0] === "+" ? "blue" : "red" }}
                        >
                          {valor}
                        </td>
                        <td>{data}</td>
                      </tr>
                    </>
                  );
                })}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Extrato;
