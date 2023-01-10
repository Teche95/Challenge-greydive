import './App.css';
import Encuesta from './components/Encuesta';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Respuestas from './components/Respuestas';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Encuesta} />
          <Route exact path="/respuestas" component={Respuestas} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
