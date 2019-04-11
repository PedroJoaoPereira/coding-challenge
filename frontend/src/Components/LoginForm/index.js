import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TextField, Button } from "@material-ui/core";

import { fetchToken } from "Redux/Actions/global";

import "./style.css";

class LoginForm extends Component {
  username = "";

  password = "";

  render() {
    const { authToken, fetchTokenAction } = this.props;

    return (
      <div className="formWrapper">
        <TextField
          label="Username"
          floatingLabelText="Username"
          className="inputField"
          onChange={event => {
            this.username = event.target.value;
          }}
        />
        <TextField
          label="Password"
          floatingLabelText="Password"
          className="inputField"
          onChange={event => {
            this.password = event.target.value;
          }}
        />
        <Button onClick={() => fetchTokenAction(this.username, this.password)}>
          Login To Get an Auth Token
        </Button>
        <p>{authToken}</p>
      </div>
    );
  }
}

LoginForm.propTypes = {
  authToken: PropTypes.string.isRequired,

  fetchTokenAction: PropTypes.func.isRequired
};

const MapStateToProps = state => ({
  authToken: state.global.authToken
});

const ActionProps = {
  fetchTokenAction: fetchToken
};

export default connect(
  MapStateToProps,
  ActionProps
)(LoginForm);
