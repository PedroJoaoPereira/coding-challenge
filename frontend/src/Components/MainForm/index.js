import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from "@material-ui/core";

import AlertBlock from "Components/AlertBlock";

import { fetchCountries, addNewPerson } from "Redux/Actions/global";

import "./style.css";

class MainForm extends Component {
  name = "";

  surname = "";

  country = {};

  birthday = "";

  componentWillMount() {
    const { fetchCountriesAction } = this.props;
    fetchCountriesAction();
  }

  render() {
    const { countries, addNewPersonAction } = this.props;

    return (
      <div className="mainFormWrapper">
        {(countries.length === 0 && (
          <div className="progressBarDiv">
            <CircularProgress className="progressBar" />
          </div>
        )) || (
          <div>
            <div className="inputWrapper">
              <span>Name:</span>
              <TextField
                label="name here"
                className="inputTextField"
                onChange={event => {
                  this.name = event.target.value;
                }}
              />
            </div>
            <div className="inputWrapper">
              <span>Surname:</span>
              <TextField
                label="name here"
                className="inputTextField"
                onChange={event => {
                  this.surname = event.target.value;
                }}
              />
            </div>
            <div className="inputWrapper">
              <span>Countries:</span>
              <FormControl className="inputTextField">
                <InputLabel>Countries</InputLabel>
                <Select
                  value={this.country}
                  onChange={event => {
                    this.country = event.target.value;
                    this.forceUpdate();
                  }}
                >
                  {countries.map(country => (
                    <MenuItem value={country}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="inputWrapper">
              <span>Birthday:</span>
              <form className="inputTextField" noValidate>
                <TextField
                  className="datePicker"
                  id="date"
                  label="Birthday"
                  type="date"
                  onChange={event => {
                    this.birthday = event.target.value;
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </div>
            <div className="inputWrapper">
              <Button
                className="saveButton"
                variant="outlined"
                color="primary"
                onClick={() => {
                  if (this.name === "") return;
                  if (this.surname === "") return;
                  if (this.country === {}) return;
                  if (this.birthday === "") return;

                  addNewPersonAction(
                    this.name,
                    this.surname,
                    this.country,
                    this.birthday
                  );
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
        <div className="alertBlockWrapper">
          <AlertBlock />
        </div>
      </div>
    );
  }
}

MainForm.propTypes = {
  countries: PropTypes.array.isRequired,

  fetchCountriesAction: PropTypes.func.isRequired,
  addNewPersonAction: PropTypes.func.isRequired
};

const MapStateToProps = state => ({
  countries: state.global.countries
});

const ActionProps = {
  fetchCountriesAction: fetchCountries,
  addNewPersonAction: addNewPerson
};

export default connect(
  MapStateToProps,
  ActionProps
)(MainForm);
