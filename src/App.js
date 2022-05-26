import React from 'react'
import Welcome from './WelcomePage'
import Portfolio from './PortfolioPage';
import './App.less';


export default function App() {

  const session_email = sessionStorage.getItem("email");  
  if(session_email==null)
  return(<Welcome/>)
  else  
  return (<Portfolio/>)
}

