import { useEffect, useState } from "react";
import { api } from "../../config/api";

type Props = { queryBuilder: string };

interface User {
  id: number;
  username: String;
  accounts: {
    id: number;
    balance: number;
  };
}
function Filtro({ queryBuilder }: Props) {
  const [extrato, setExtrato] = useState([]);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState<User>({} as User);

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

  useEffect(() => {
    setloading(false);
    async function fetchuextrato() {
      try {
        const response = await api.get(`/search/?${queryBuilder}`);
        setExtrato(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setloading(true);
    }
    fetchuextrato();
  }, [queryBuilder]);

  
  return (
    <>
      <div>
        <table>
          <tr>
            <td>Conta</td>
            <td>valor</td>
            <td>Data</td>
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
                  <tr>
                    <td>{conta}</td>
                    <td style={{ color: valor[0] === "+" ? "blue" : "red" }}>
                      {valor}
                    </td>
                    <td>{data}</td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </>
  );
}

export default Filtro;
