import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// layouts
import MainLayout from './layouts/mainLayout';

// routes/screens
import Notes from './screens/notes';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" render={props => (
                        <MainLayout>
                            <Notes {...props} />
                        </MainLayout>
                    )} />
                </Switch>
            </Router>
        )
    }
}

export default App;