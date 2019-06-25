import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';
import LoginPage from '../components/LoginPage';

import { ConnectedRouter } from 'connected-react-router'
import APIKeyPage from '../components/APIKeyPage';
import APIKeyDetail from '../components/APIKeyDetail';
import CreateAPIKey from '../components/CreateAPIKey';
import ProfilePage from '../components/ProfilePage';
import Registration from '../components/Registration';
import LearnMore from '../components/LearnMore';
import InvoiceList from '../components/InvoiceList';
import CreateEditInvoice from '../components/CreateEditInvoice';


const AppRouter = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
      
      <Switch>
        
        <PublicRoute path="/" component={LandingPage} exact={true} />
        <PublicRoute path="/registration" component={Registration} exact={true} />
         <PrivateRoute path="/home" component={HomePage} />
         <PrivateRoute path="/profile" component={ProfilePage} />
         <PrivateRoute path="/api_keys/create" component={CreateAPIKey} />
         <PrivateRoute path="/api_keys/:id" component={APIKeyDetail} />
         <PrivateRoute path="/api_keys" component={APIKeyPage} />
         <PrivateRoute path="/invoices/:id/edit" component={CreateEditInvoice} />
         <PrivateRoute path="/invoices/create" component={CreateEditInvoice} />
         
         <PrivateRoute path="/invoices" component={InvoiceList} />
         
         <PublicRoute path="/learn_more" component={LearnMore} />
       
        <Route path="/login" component={LoginPage}  />
        
         
        <Route component={NotFoundPage} />
      </Switch>
      
    </div>
  </ConnectedRouter>
);

export default AppRouter;