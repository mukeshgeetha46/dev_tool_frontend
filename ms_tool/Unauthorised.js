import React from 'react';
import { Link } from "react-router-dom";
import { LockFilled } from '@ant-design/icons';

class Unauthorised extends React.Component {

  render() {
    return (
     <> 
     <div  style={{textAlign:'center'}} className="unauthfullpage">  
      <div className="message">
      <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <LockFilled style={{ fontSize: '46px' }}/>
        <h1 className="unauth-h1">Access to this page is restricted</h1>
        <p>Please check with the site admin if you believe this is a mistake.</p>
      </div>
      </div>
      </>
    );
  }
}

export default () => <Unauthorised/>;