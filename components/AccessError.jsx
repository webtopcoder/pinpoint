import React from "react";

export default function AccessError() {
  return (
    <div className="not-found-area ptb-100">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="not-found-content">
              <h3>Wait for a second, access checking</h3>
              <p>
                Please sign in to access this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}