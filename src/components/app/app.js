import React, {useContext} from 'react';
import Login from '../login/login';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {AppContext} from '../context/context';
import ElementsIndex from '../../elementsIndex';

const App = () => {
    const {canRedirectLS} = useContext(AppContext);

    return (
        <Router>
            {!canRedirectLS ? <Redirect to='/login' /> : <Redirect to='/' />}
            <Route path='/login' component={Login} />
            <Route path='/' component={ElementsIndex} />
        </Router>
    )
};


export default App;