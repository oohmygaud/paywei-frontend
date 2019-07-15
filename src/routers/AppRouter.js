import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
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
import InvoiceDetail from '../components/InvoiceDetail';
import CreateEditInvoice from '../components/CreateEditInvoice';
import MakePaymentPage from '../components/MakePaymentPage';
import VerifyAddress from '../components/VerifyAddress';


const AppRouter = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
      
      <Switch>
        
        <PublicRoute path="/" component={LandingPage} exact={true} />
        <PublicRoute path="/registration" component={Registration} exact={true} />
         <PrivateRoute path="/dashboard" component={Dashboard} />
         <PrivateRoute path="/pay/:id" component={MakePaymentPage} />
         <PrivateRoute path="/profile" component={ProfilePage} />
         <PrivateRoute path="/api_keys/create" component={CreateAPIKey} />
         <PrivateRoute path="/api_keys/:id" component={APIKeyDetail} />
         <PrivateRoute path="/api_keys" component={APIKeyPage} />
         <PrivateRoute path="/invoices/:id/edit" component={CreateEditInvoice} />
         <PrivateRoute path="/send_invoice" component={CreateEditInvoice} />
         <PrivateRoute path="/invoices/:id" component={InvoiceDetail} />
         <PrivateRoute path="/verify_address/:id/:secret" component={VerifyAddress} />
         
         <PrivateRoute path="/invoices" component={InvoiceList} />
         
         <PublicRoute path="/learn_more" component={LearnMore} />
       
        <Route path="/login" component={LoginPage}  />
        
         
        <Route component={NotFoundPage} />
      </Switch>
      
    </div>
  </ConnectedRouter>
);

export default AppRouter;