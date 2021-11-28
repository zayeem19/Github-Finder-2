import React from "react";
import PropTypes from "prop-types";

function ReposItems({ repo }) {
  return (
    <div className="card p-2 my-2">
      <h5>
        <a
          className="m-2 p-2 link-primary text-decoration-none"
          href={repo.html_url}
        >
          {repo.name}
        </a>
      </h5>
    </div>
  );
}

ReposItems.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default ReposItems;
