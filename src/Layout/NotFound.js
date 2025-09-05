import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h2>Not Found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
