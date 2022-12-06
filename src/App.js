import "./App.css";
import { Allroutes } from "./Routes/Allroutes";
import { Routes, Route } from "react-router-dom";
import { ContextAPI } from "./Context/ContextAPI"



function App() {
  return (
    <div className="App">
      <ContextAPI>
        <Routes>
          {Allroutes.map((val, i) => (
            <Route key={i} path={val.path} element={val.component} exact></Route>
          ))}
        </Routes>
      </ContextAPI>
    </div>
  );
}

export default App;
