import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Glyphicon, FormControl } from 'react-bootstrap'
import { Link } from 'react-router'

class AccountSettings extends React.Component {
  render() {
    return <div>
    <Panel header="Password">
    <FormControl
      type="text"
      placeholder="Enter Password"
    /> <br />
    <FormControl
      type="text"
      placeholder="Confirm Password"
    /> <br />
    <Button type="submit" className='pull-right'>Update</Button>
    </Panel>


    <Panel header="Deactive Account">
      <Button vertical block bsStyle ="danger">DEACTIVATE ACCOUNT</Button>
    </Panel>
    </div>
  }
}

AccountSettings.displayName = 'AccountSettings'

export default AccountSettings