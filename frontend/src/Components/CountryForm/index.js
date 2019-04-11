import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TextField, Button } from "@material-ui/core";

import { createCountry } from "Redux/Actions/global";

import "./style.css";

class CountryForm extends Component {
  name = "";

  alpha2Code = "";

  render() {
    const { authToken, createCountryAction } = this.props;

    return (
      <div className="formWrapper">
        <TextField
          label="Name"
          floatingLabelText="Name"
          className="inputField"
          onChange={event => {
            this.name = event.target.value;
          }}
        />
        <TextField
          label="alpha2Code (2 letters)"
          floatingLabelText="alpha2Code"
          className="inputField"
          onChange={event => {
            this.alpha2Code = event.target.value;
          }}
        />
        <Button
          onClick={() =>
            createCountryAction(authToken, this.name, this.alpha2Code)
          }
        >
          Create
        </Button>
      </div>
    );
  }
}

CountryForm.propTypes = {
  authToken: PropTypes.string.isRequired,

  createCountryAction: PropTypes.func.isRequired
};

const MapStateToProps = state => ({
  authToken: state.global.authToken
});

const ActionProps = {
  createCountryAction: createCountry
};

export default connect(
  MapStateToProps,
  ActionProps
)(CountryForm);
