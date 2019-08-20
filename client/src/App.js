import React from 'react';
import ApolloClient from 'apollo-boost';
import {  } from "module";
import './App.css';
import logo from './assets/spacex-logo.png';
import { ApolloProvider } from '@apollo/react-hooks';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';



const client = new ApolloClient({
  //changing the uri for deployment (see proxy in package.json in client that makes it possible to work in development mode )
  uri: process.env.NODE_ENV === "development" ? 'http://localhost:5000/graphql' : "/graphql",
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="spaceX-logo" style={{width: 500, display: 'block', margin:'auto'}}/>
          <Route exact path="/" component={Launches}/>
          <Route exact path="/launch/:flight_number" component={Launch}/>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
