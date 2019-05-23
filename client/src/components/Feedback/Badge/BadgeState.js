import React from 'react';
import './BadgeStyle.css'

function BadgeState (props) {
  var status = props.status;
  switch (status) {
    case 'Created':
      return(
        <div className="ribbon blue">
          <span >{status}</span>
        </div>
      );
    case 'Assigned':
        return(
          <div className="ribbon orange">
            <span>{status}</span>
          </div>
        );
    case 'In Progress':
      return(
        <div className="ribbon yellow">
          <span>{status}</span>
        </div>
      );
    case 'Finished':
      return(
        <div className="ribbon green">
          <span>{status}</span>
        </div>
      );
    case 'Cancelled':
      return(
        <div  className="ribbon red">
          <span>{status}</span>
        </div>
      );
    case 'Archived':
      return(
        <div className="ribbon purple">
          <span>{status}</span>
        </div>
      );
      default:
      break;
    }
  }
  
  export default BadgeState;