import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setPerson } from "Redux/Actions/global";

import "./style.css";

class AlertBlock extends PureComponent {
  render() {
    const { newPerson, setPersonAction } = this.props;

    const birthdayDate = new Date(newPerson.birthday || "");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if (Object.keys(newPerson).length === 0) return <div />;

    setTimeout(() => setPersonAction({}), 3 * 1000);
    return (
      <div className="alertBlockDiv">
        <p>
          <span>Hello </span>
          <span>{newPerson.name}</span>
          <span> from </span>
          <span>{newPerson.country.name}</span>
          <span>.</span>
          <span> On </span>
          <span>{birthdayDate.getDate()}</span>
          <span> of </span>
          <span>{months[birthdayDate.getMonth()]}</span>
          <span> you will be </span>
          <span>
            {Math.abs(
              new Date(Date.now()).getFullYear() - birthdayDate.getFullYear()
            )}
          </span>
          <span> old!</span>
        </p>
      </div>
    );
  }
}

AlertBlock.propTypes = {
  newPerson: PropTypes.string.isRequired,

  setPersonAction: PropTypes.func.isRequired
};

const MapStateToProps = state => ({
  newPerson: state.global.newPerson
});

const ActionProps = {
  setPersonAction: setPerson
};

export default connect(
  MapStateToProps,
  ActionProps
)(AlertBlock);
