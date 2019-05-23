import React from 'react';
import {enumTypes} from '../Enums/Enums';

class NewFeedback extends React.Component{
  
  state = {
    name: 'UCN/rene.gutierrez',
    type: 'New Service',
    message: '',
  };
  
  setFeedbackType = (event) => {
    this.setState({
      type: event.target.value
    });
  }
  
  setMessage = (event) => {
    this.setState({
      message: event.target.value
    });
  }
  
  render() {
    return (
      <form className="container">
        <div className="form-group">
          <div className="form-group row">
            <label className="col-3">Name:</label>
            <input className="col-9" name="name" value={this.state.name} required disabled />
          </div>
          <div className="form-group row" onChange={this.setFeedbackType.bind(this)}>
            <label className="col-3" htmlFor="type">Feedback Type:</label>
            <select className="col-9" id="type" name="type" required>
            {Object.keys(enumTypes).map(types => <option key={types} value={enumTypes[types]}>{enumTypes[types]}</option>)}
            </select>
          </div>
          <div className="form-group row" onChange={this.setMessage.bind(this)}>
            <label className="col-3" htmlFor="message">Feedback Message:</label>
            <textarea className="col-9" type="text" id="message" name="message" required/>
          </div>
          <div className="form-group row"> 
            <button className="btn btn-outline-primary btn-block" type="button" onClick={ () => this.props.onAddFeedback(this.state)} >Submit Feedback</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewFeedback;