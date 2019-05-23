import React from 'react';
import Feedback from './Feedback/Feedback';
import NewFeedback from './NewFeedback/NewFeedback';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enumTypes , enumStatus } from './Enums/Enums';
import sspSDK from '../../services/sspSDK';
import toast from '../../services/Notifications/toast';

class IndexFeedback extends React.Component {
  state = {
    show: false,
    data: [],
    intervalIsSet: false,
    type: 'Show All Types',
    status: 'Show All Status',
    startDate: new Date(),
    endDate: new Date(),
  };

  componentDidMount = () => {
    this.datesInitialize();
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  
  getDataFromDb = async () => {
    let newExpression = '?';
    if (this.state.type !== 'Show All Types') {
      newExpression = newExpression + 'type=' + this.state.type + '&';
    } 
    if(this.state.status !== 'Show All Status'){
      newExpression = newExpression + 'status=' + this.state.status + '&';
    }
    let startDateString = this.formatDate(this.state.startDate).toString();
    let endDateString = this.formatDate(this.state.endDate).toString();
    newExpression = newExpression + 'startDate=' + startDateString + '&endDate=' + endDateString;
    await sspSDK.get("/feedbacks" + newExpression , { crossdomain: true })
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(function (error) {
        console.log("ERROR HERE", error);
      });
  };

  onUpdateState = async (feedbackItem, newStatus) => {
    let feedback = feedbackItem;
    let id = '/' + feedback._id;
    let status = {status: newStatus};
    if (feedback.status !== newStatus && newStatus !== 'Unchanged' && newStatus !== 'Select status') {
      try {
        await sspSDK.put('/feedbacks' + id , status , { errorHandle: true } )
        toast.success("Your Feedback was update successfully!");
      } catch (err) {
        console.log("Error", err);
      }
    } else {
      if (feedback.status === newStatus) {
        toast.info("You did not change the value of the status");
      } else {
        toast.info("You did not select any option");
      }
    }
  }
  
  handleOnAddFeedback = async (item) => {
    let newItem = {
      name: item.name,
      message: item.message,
      type: item.type,
      status: "Created",
    }
    try {
      await sspSDK.post('/feedbacks', newItem , { errorHandle: true } );
      this.handleClose();
      toast.success("Feedback successfully submitted!");
    } catch (err) {
      console.log("Error", err);
    }
  }

  datesInitialize = () => {
    var dateStart = new Date();
    dateStart.setHours(0,0,0);
    dateStart.setDate( dateStart.getDate() - 6 );
    var dateEnd = new Date();
    dateEnd.setHours(23,59,59);
    this.setState({
      startDate: dateStart,
      endDate: dateEnd,
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }

  handleChangeStartDate = (date) => {
    if (date == null ) {
      date = new Date();
      date.setHours(0,0,0);
      date.setDate( date.getDate() - 6 );
    }
    this.setState({
      startDate: date,
    })
  }
  
  handleChangeEndDate = (date) => {
    if (date === null) {
      date = new Date();
      date.setHours(23,59,59);
    }
    this.setState({
      endDate: date,
    })
  }
  
  formatDate = (date) => {
    var option = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleString('en-US', option);
  }

  handleClose = () => {
    this.setState({ 
      show: false 
    });
  }

  handleShow = () => {
    this.setState({ 
      show: true 
    });
  }

  render() {
    return (
      <div className="container">
        <Button variant="outline-primary" className="float-right" onClick={this.handleShow}>
          Create a New Feedback
        </Button>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submit a new Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewFeedback onAddFeedback={ this.handleOnAddFeedback } />
          </Modal.Body>
        </Modal>

        <Modal centered show={this.state.confirmation} onHide={this.handleConfirmationClose}>
          <Modal.Header closeButton>
            <Alert variant="success">
              <Alert.Heading>Your Feedback message was registered successfully</Alert.Heading>
            </Alert>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="outline-success" block onClick={this.handleConfirmationClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <form>
            <div className="container">
              <div className="input-group row">
                <span className="input-group-text col-3" id="inputGroupFileAddon0">Filter by Type:</span>
                <select className="custom-select col-6" name="type" value={this.state.type} onChange={this.handleInputChange} >
                  <option defaultValue value="Show All Types">Show all Types</option>
                  {Object.keys(enumTypes).map(types => <option key={types} value={enumTypes[types]}>{enumTypes[types]}</option>)}
                </select>
              </div>
              <div className="input-group row">
                <span className="input-group-text col-3" id="inputGroupFileAddon0">Filter by status:</span>
                <select  className="custom-select col-6" name="status" value={this.state.status} onChange={this.handleInputChange}>
                  <option defaultValue value="Show All Status">Show all Status</option>
                  {Object.keys(enumStatus).map(status => <option key={status} value={enumStatus[status]}>{enumStatus[status]}</option>)}
                </select>
              </div>
              <div className="input-group row">
                <span className="input-group-text col-3">Filter by Date:</span>
                <div>
                  <div className="input-group" >
                    <label className="input-group-text col-4" >Start Date: </label>
                    <DatePicker className="input-group w-100 p-2"
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStartDate}
                      dateFormat="MM/dd/yyyy"
                      isClearable={true}
                      />
                  </div>
                  <div className="input-group">
                    <label className="input-group-text col-4" >End Date: </label>
                    <DatePicker className="input-group w-100 p-2"
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEndDate}
                      dateFormat="MM/dd/yyyy"
                      isClearable={true}
                      maxDate={new Date()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="card-group">
            {this.state.data.map((item)=> 
              <Feedback key={item._id}
                  item = {item}
                  showStatus = {false}
                  onUpdateState={this.onUpdateState}
              />)}
          </div>
          <div className="container mt-3">
            {(this.state.data.length === 0) &&
              <div className="alert alert-info" role="alert">
              <h1>
                There are no items to display.
              </h1>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default IndexFeedback;