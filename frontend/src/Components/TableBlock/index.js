import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Table from "rc-table";

import { setPerson } from "Redux/Actions/global";

import "./style.css";

class TableBlock extends PureComponent {
  render() {
    const { persons, setPersonAction } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100
      },
      {
        title: "Country",
        dataIndex: "country.name",
        key: "country",
        width: 100
      },
      {
        title: "Birthday",
        dataIndex: "birthday",
        key: "birthday",
        width: 100
      },
      {
        title: "Operations",
        dataIndex: "",
        key: "d",
        render() {
          return <span>Click Row to Alert</span>;
        }
      }
    ];

    return (
      <Table
        columns={columns}
        data={persons}
        onRowClick={record => setPersonAction(record)}
        className="tableWrapper"
      />
    );
  }
}

TableBlock.propTypes = {
  persons: PropTypes.array.isRequired,

  setPersonAction: PropTypes.func.isRequired
};

const MapStateToProps = state => ({
  persons: state.global.persons
});

const ActionProps = {
  setPersonAction: setPerson
};

export default connect(
  MapStateToProps,
  ActionProps
)(TableBlock);
