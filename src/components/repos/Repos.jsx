import React from "react";
import PropTypes from "prop-types";
import ReposItems from "./ReposItems";

function Repos({ repos }) {
  return repos.map((repo) => <ReposItems repo={repo} key={repo.id} />);
}

Repos.porpTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
