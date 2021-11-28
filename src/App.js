import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";
import About from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  //Get Single User
  getUser(username) {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ user: res.data }));

    this.setState({ loading: false });
  }

  //Get Repository
  getUserRepos(username) {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ repos: res.data }));

    this.setState({ loading: false });
  }

  //Search users
  searchUsers(text) {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ users: res.data.items }));

    this.setState({ loading: false });
  }

  //Clears user
  clearUsers() {
    this.setState({ users: [], loading: false });
  }

  //Sets Alert
  setAlert(msg, type) {
    this.setState({
      alert: { msg, type },
    });
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar title="Github Finder" icon="fab fa-github" />

          <div className="container my-2">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers.bind(this)}
                      clearUsers={this.clearUsers.bind(this)}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert.bind(this)}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser.bind(this)}
                    getUserRepos={this.getUserRepos.bind(this)}
                    user={this.state.user}
                    repos={this.state.repos}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
