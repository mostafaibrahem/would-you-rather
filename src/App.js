import './stylesheets/css/style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import Error404 from './pages/Error404';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/404' component={Error404} />
        <Route>
          <MainLayout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
