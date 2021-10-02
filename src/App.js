import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

// Pages
import Login from './Pages/Login'
import Overview from './Pages/Dashboard/Overview'
import AddPatient from './Pages/Dashboard/AddPatient'
import Manage from './Pages/Dashboard/Manage'
import SinglePatient from './Pages/Dashboard/SinglePatient'

import './App.css'

function App() {
  return (
    <>
      <div className="display-Type">
        {' '}
        <h1> Sorry you can't view app on this device</h1>
      </div>
      <div className="app-Box">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/dashboard/overview" component={Overview} />
            <Route exact path="/dashboard/addpatient" component={AddPatient} />
            <Route exact path="/dashboard/manage" component={Manage} />
            <Route
              exact
              path="/dashboard/manage/:patientId"
              component={SinglePatient}
            />
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
