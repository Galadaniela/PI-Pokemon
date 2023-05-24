// import './App.css';
import { Landing , Home ,Form,Detail} from './views';
import { Route , useLocation} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <h1></h1>
      <Route path="/" exact component={Landing}/>
      
      <Route path="/Home" render= {() => <Home/>} />

      <Route path="/Form" render= {() => <Form />}  />
      < Route path="/pokemon:id" render= {() => <Detail />} />
    </div>
  );
}

export default App;
