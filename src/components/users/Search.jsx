import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "danger");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit} className="form-group my-2">
          <input
            className="form-control"
            type="text"
            name="text"
            placeholder="Search Users"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-dark mt-2 w-100">
            Search
          </button>
        </form>
        {this.props.showClear && (
          <button
            onClick={this.props.clearUsers}
            className="btn btn-secondary mb-2 w-100"
          >
            Clear
          </button>
        )}
      </Fragment>
    );
  }
}

export default Search;
