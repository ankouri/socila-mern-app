import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/auth/AuthContext";
import { useContext } from "react";
import Messanger from "./pages/Messanger";

function App() {

  const { user } = useContext(AuthContext);

  return (
      <Router>
        <Switch>
          <Route path="/" exact>
            { user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" exact>
            {user ? <Redirect to="/" /> : <Auth />}
          </Route>
          <Route path="/profile/:username" exact>
            {user ? <Profile/> :<Redirect to="/login" />}
          </Route>
          <Route path="/messanger" exact>
            {user ? <Messanger/> :<Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
