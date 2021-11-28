import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import Spinner from "../layouts/Spinner";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      company,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;
    if (this.props.loading) return <Spinner />;

    return (
      <Fragment>
        <Link className="btn btn-light mx-2" to="/">
          Back
        </Link>
        Hireable : {""}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card m-1">
          <div className=" row ">
            <div className="col text-center m-1">
              <img
                src={avatar_url}
                className="rounded-circle"
                alt=""
                style={{ width: "150px" }}
              />
              <h1>{name}</h1>
              <p>location: {location}</p>
            </div>
            <div className="col m-1">
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a href={html_url} className="btn btn-dark m-1">
                Visit Github Profile
              </a>
              <ul className="list-unstyled">
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: </strong>
                      {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: </strong>
                      {company}
                    </Fragment>
                  )}
                </li>
                <li>
                  {blog && (
                    <Fragment>
                      <strong>Website: </strong>
                      {blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card text-center my-2">
          <div className="d-flex align-items-baseline m-auto p-2">
            <div className="badge bg-secondary m-1">Followers: {followers}</div>
            <div className="badge bg-success m-1">Following: {following}</div>
            <div className="badge bg-danger m-1">
              Public Repos: {public_repos}
            </div>
            <div className="badge bg-dark m-1">
              Public Gists: {public_gists}
            </div>
          </div>
        </div>
        <Repos repos={this.props.repos} />
      </Fragment>
    );
  }
}

export default User;
