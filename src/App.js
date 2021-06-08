import './stylesheets/css/style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import Error404 from './pages/Error404';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFetchedQuestions, getFetchedUsers, loginUser } from './store/actionCreators';


const App = () => {
  let authedUserLocal = localStorage.getItem('authedUser')
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFetchedUsers())
    dispatch(getFetchedQuestions())
    if (authedUserLocal.length > 0) {
      dispatch(loginUser(JSON.parse(authedUserLocal)))

    }
  }, [dispatch,authedUserLocal])


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
