import React from 'react';
import BadgeState from '../Badge/BadgeState';
import Modal from 'react-bootstrap/Modal';
import { enumStatus } from '../Enums/Enums';

let newStatus = 'Unchanged';

class Feedback extends React.Component{

  state = {
    show: false,
  }

  handleNewStatus = (event) => {
    newStatus = event.target.value;
  }

  handleStateClose = () => {
    this.setState({
      show: false
    });
  }

  handleStateShow = () => {
    this.setState({
      show: true
    });
  }

  formatDate = (date) => {
    var option = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleString('en-US', option);
  }

  render(){
    return (
      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-2 mb-3 border-dark">
        <div className="h-100">
          <div className="card border-dark mb-3 h-100">
            <BadgeState status={this.props.item.status} />
            <h5 className="card-header bg-dark text-light text-center">{this.props.item.name}</h5>
            <small className="bg-dark text-light text-center">{this.formatDate(this.props.item.createdAt)}</small>
            {/* <small className="bg-dark text-light text-center">{this.props.item._id}</small> */}
            <div className="card-body">
              <p className="card-text">{this.props.item.message}</p>
            </div>
            <div className="card-footer border-light">
              <small className="text">{this.props.item.type}</small>
              <button className="float-right btn btn-outline-dark btn-sm" type="button" onClick={this.handleStateShow}>Change Status</button>
            </div>
          </div>
        </div>
        <Modal size="lg" show={this.state.show} onHide={this.handleStateClose}>
          <Modal.Body>
            <form>
              <div className="card text-center">
                <div className="card-header">
                  {this.props.type}
                </div>
                <div className="card-body">
                  <p className="card-title">The actual status of this feedback is: <b>{this.props.item.status}</b></p>
                  <p className="card-title">Do you want to change the feedback status?</p>
                  <div className="input-group container">
                    <div className="input-group-prepend col-12" >
                      <label className="input-group-text col-6" htmlFor="newStatus" >Select a new Status:</label>
                      <select name="newStatus" className="custom-select col-6" id="newStatus" onChange={this.handleNewStatus} >
                      <option defaultValue value="Select status">----Select status----</option>
                        {Object.keys(enumStatus).map(status => <option key={status} value={enumStatus[status]} required>{enumStatus[status]}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  This Feedback Message was created by:<br/>
                  {this.props.item.name} on {this.formatDate(this.props.item.createdAt)}
                </div>
              </div>
              <div className="container row">
                <button className="btn btn-outline-primary col-6" type="button" onClick={ () => this.props.onUpdateState( this.props.item , newStatus , this.handleStateClose() )}>
                    Save Changes
                </button>
                <button className="btn btn-outline-dark col-6" type="button" onClick={this.handleStateClose} >Cancel</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Feedback;