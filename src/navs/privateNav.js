
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountIcon from '@material-ui/icons/AccountCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import DraftsIcon from '@material-ui/icons/Drafts'
/* import your desired icon from material-ui icons library */
import {NavLink} from 'react-router-dom';


export const publicNavs = [
    {
        url:'/dashboard',
        name:'Dashboard',
        icon:<HomeIcon/>
    },
    {
        url:'/request_money',
        name:'Request Money',
        icon:<ReceiptIcon />
    },
    {
        url:'/send_invoice',
        name:'Send an Invoice',
        icon:<DraftsIcon />
    },
    {
        url:'/invoices',
        name:'Invoices',
        icon:<DescriptionIcon />
    },
    {
        url:'/profile',
        name:'Profile',
        icon:<AccountIcon />
    },
    // add new Nav links here as a json object, in this file the public navigations
];



export default  ()=>(
publicNavs.map((navItem)=>{
return <NavLink to={navItem.url}  className="NavLinkItem" key={navItem.url} activeClassName="NavLinkItem-selected"> <List component="nav" >  <ListItem button>
          <ListItemIcon className="innernavitem"> 
 {navItem.icon}
          </ListItemIcon>
          <ListItemText primary={navItem.name} className="innernavitem" color="black"/>
        </ListItem></List> </NavLink>
})


     

);





