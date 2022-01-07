import { useState } from "react";
import deleteImage from "./assets/delete.svg";

function Tasks(props) {
  return (
    <li>
      <span
        onClick={() => props.handleComplete(props.id)}
        style={{ textDecoration: props.status && "line-through" }}
        className={props.status ? "complete": ""}
      >
        {props.children}
      </span>
      <img
        className="close"
        src={deleteImage}
        onClick={() => props.handleDelete(props.id)}
      ></img>
    </li>
  );
}
function App() {
  const [tarefas, setTarefas] = useState([]);
  const [complete, setComplete] = useState(false);
  const [ativas, setAtivas] = useState(false);

  function handleKeyDown(event) {
    if (event.key !== "Enter") return;
    const newTasks = [
      ...tarefas,
      { id: Math.random(), texto: event.target.value, status: false },
    ];
    setTarefas(newTasks);
    event.target.value = "";
  }

  function handleDelete(id) {
    const newTasks = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(newTasks);
  }
  function handleComplete(id) {
    const newTasks = [...tarefas];
    const completedTasks = newTasks.find((tarefa) => tarefa.id === id);
    completedTasks.status = !completedTasks.status;
    setTarefas(newTasks);
  }
  function handleCountNot() {
    const newTasks = [...tarefas];
    const unCompletedTasks = newTasks.filter((item) => {
      if (complete) {
        return item.status === complete;
      }
      return item.status === false;
    });
    return unCompletedTasks.length;
  }
  function handleAtivas() {
    setComplete(false);
    setAtivas(true);
  }
  function handleCompletas() {
    setComplete(true);
    setAtivas(false);
  }
  function handleClean() {
    const newTasks = tarefas.filter((tarefa) => tarefa.status !== true);
    setTarefas(newTasks);
  }
  function handleTodas() {
    setComplete(false);
    setAtivas(false);
  }

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="task-card">
        <h1 className="title">TAREFAS</h1>
        <input
          type="text"
          placeholder="Criar uma nova tarefa"
          onKeyDown={handleKeyDown}
        />
        <div className="menu-info">
          <ul>
            {tarefas
              .filter((item) => {
                if (complete) {
                  return item.status === true;
                } else if (ativas) {
                  return item.status === false;
                }
                return item;
              })
              .map((tarefa) => {
                return (
                  <Tasks
                    key={tarefa.id}
                    id={tarefa.id}
                    handleDelete={handleDelete}
                    handleComplete={handleComplete}
                    status={tarefa.status}
                  >
                    {tarefa.texto}
                  </Tasks>
                );
              })}
          </ul>
          <div className="footer-menu">
            <div className="count">
              <span>
                {handleCountNot()}
                {complete ? " itens completos" : " itens restantes"}
              </span>
            </div>
            <div className="options">
              <span className={(!complete && !ativas) ? "enfase" : "no-enfase"} onClick={handleTodas}>Todas</span>
              <span className={ativas ? "enfase" : "no-enfase"} onClick={handleAtivas}>Ativas</span>
              <span className={complete ? "enfase" : "no-enfase"} onClick={handleCompletas}>Completas</span>
            </div>
            <div className="clean-completed">
              <span onClick={handleClean}>Limpar Completas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
