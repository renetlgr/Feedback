import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from '../Home/Home';
import Header from '../Header/Header';
import IndexFeedbacks from '../Feedback/index';
import Trello from '../Trello';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/feedbacks" component={IndexFeedbacks} />
        <Route path="/trello" component={Trello} />
      </div>
    </Router>
  );
}

export default App;