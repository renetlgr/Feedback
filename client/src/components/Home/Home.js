import React from 'react';
import logo from './logo.svg';

class Home extends React.Component{
  render() {
    return (
      <div className="container">
        <h1 className="display-3">This is Home Page</h1>
         <img src={logo} className="img-thumbnail md-5" alt="Responsive" />
      </div>
    );
  }
}

export default Home;