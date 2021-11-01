import { useRef, useState } from "react";
import "./App.css";
import api from "./services/api";

function App() {
  const [user, setUser] = useState("");
  const userInput = useRef(null);

  function searchUser() {
    let url = userInput.current.value;
    api
      .get(url)
      .then((response) => {
        if (!response.data.error) {
          let obj = {
            login: response.data.login,
            id: response.data.id,
            url: response.data.url,
          };
          setUser(JSON.stringify(obj, null, "\t"));
        } else {
          setUser("Usuário não encontrado!");
        }
      })
      .catch((err) => {
        setUser("Usuário não encontrado!");
      });
  }

  return (
    <section>
      <h1>Login</h1>
      <input type="text" ref={userInput} />
      <button onClick={() => searchUser()}>Buscar</button>
      <div className="dados">
        <pre>{user}</pre>
      </div>
    </section>
  );
}

export default App;
