import { Route, Switch } from 'react-router-dom';
import AppNav from '../components/AppNav';
import Home from './Home';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import PollDetails from './PollDetails';

const AppWrapper = (props) => {
    return (
        <>
            <AppNav />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/Leaderboard' component={LeaderBoard} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/questions/:question_id' component={PollDetails} />
            </Switch>
        </>

    );
}

export default AppWrapper;
