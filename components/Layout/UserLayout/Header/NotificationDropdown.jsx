import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { apiBaseUrl } from "@/utils/baseUrl";
import Link from "@/utils/ActiveLink";
import { Badge } from 'antd';

const NotificationDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const avatarurl = `${apiBaseUrl}/avatar/`;

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <div
            className="search-icon"
          // onClick={handleToggleSearchModal}
          >
            <Badge count={5} size="small">
              <i className="flaticon-bell"></i>
            </Badge>
          </div>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">Notifications </h6>
              </Col>
              <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <PerfectScrollbar style={{ height: "260px" }}>
            <a href="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatarurl + '20145331-1688404255867-648c4a84b8ec1739a9319690.png'}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    Your order is placed
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      If several languages coalesce the grammar
                    </p>
                    <p className="mb-0">
                      <i className="bx bx-time-five" />{" "}
                      3 min ago
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatarurl + '20145331-1688404255867-648c4a84b8ec1739a9319690.png'}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">James Lemire</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      It will seem like simplified English
                    </p>
                    <p className="mb-0">
                      <i className="bx bx-time-five" />
                      1 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    Your item is shipped
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      If several languages coalesce the grammar
                    </p>
                    <p className="mb-0">
                      <i className="bx bx-time-five" />{" "}
                      3 min ago
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatarurl + '20145331-1688404255867-648c4a84b8ec1739a9319690.png'}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      As a skeptical Cambridge friend of mine occidental
                    </p>
                    <p className="mb-0">
                      <i className="bx bx-time-five d-xl-inline-block" />
                      1 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </PerfectScrollbar>
          <div className="p-2 border-top d-grid">
            <a className="btn btn-sm btn-link font-size-14 text-center" href="#">
              <span key="t-view-more"><i className="bx bxs-chevron-right-circle me-1"></i>View More... </span>
            </a>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default NotificationDropdown;

