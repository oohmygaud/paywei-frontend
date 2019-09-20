import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';
import LoginPage from '../components/LoginPage';
import { ConnectedRouter } from 'connected-react-router'
import ProfilePage from '../components/ProfilePage';
import Registration from '../components/Registration';
import LearnMore from '../components/LearnMore';
import InvoiceList from '../components/InvoiceList';
import InvoiceDetail from '../components/InvoiceDetail';
import CreateEditInvoice from '../components/CreateEditInvoice';
import MakePaymentPage from '../components/MakePaymentPage';
import VerifyAddress from '../components/VerifyAddress';
import RequestMoney from '../components/RequestMoney';


const AppRouter = ({history}) => (
  <ConnectedRouter history={history}>
      
      <Switch>
        
        <PublicRoute path="/" component={LandingPage} exact={true} />
        <PublicRoute path="/registration" component={Registration} exact={true} />
         <PrivateRoute path="/dashboard" component={Dashboard} />
         <PrivateRoute path="/pay/:id" component={MakePaymentPage} />
         <PrivateRoute path="/profile" component={ProfilePage} />
         <PrivateRoute path="/invoices/:id/edit" component={CreateEditInvoice} />
         <PrivateRoute path="/send_invoice" component={CreateEditInvoice} />
         <PrivateRoute path="/invoices/:id" component={InvoiceDetail} />
         <PrivateRoute path="/verify_address/:id/:secret" component={VerifyAddress} />
         <PrivateRoute path="/request_money" component={RequestMoney} />
         
         <PrivateRoute path="/invoices" component={InvoiceList} />
         
         <PublicRoute path="/learn_more" component={LearnMore} />
       
        <Route path="/login" component={LoginPage}  />
        
         
        <Route component={NotFoundPage} />
      </Switch>
      
  </ConnectedRouter>
);

export default AppRouter;