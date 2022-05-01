import logo from './logo.svg';
import './App.css';
import Mainpage from './components/Mainpage';
import LoginButton from './LoginButton';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="App">

      {isAuthenticated ? (
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route exact path="/mydash" element={<Mainpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    ) : (<BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<LoginButton/>} />
          {/* <Route exact path="/*" element={ <Navigate to="/" /> } /> */}
        </Routes>
      </div>
    </BrowserRouter>)}
    </div>
  );
}

export default App;
