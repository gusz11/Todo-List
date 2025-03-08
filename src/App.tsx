import { Header } from './components/Header/Header';
import "./styles/global.css";
import { Tasks } from './components/Tasks/Tasks';
import { TasksProvider } from './context/TasksContext';

function App() {
  return(
  <TasksProvider >
     <Header />
     <Tasks />
  </TasksProvider>
  );
}

export default App;
