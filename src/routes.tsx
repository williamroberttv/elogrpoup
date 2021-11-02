import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import NewLead from './pages/NewLead';
import Dashboard from './pages/Dashboard';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/newlead" component={NewLead} />
        <Route component={() => <h1>404 Page not found.</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
