import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { apiBaseUrl } from "@/utils/baseUrl";
import { Badge, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { userService } from "@/services/index";
import { getDiffToNow } from "@/utils/date";
import { useRouter } from "next/router";
import classNames from "classnames";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const NotificationDropdown = ({ user_id }) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [data, setData] = useState();
  const [TotalResults, setTotalResults] = useState();
  const [loading, setLoading] = useState(false);

  async function MarkNotifications() {
    await userService.clearNotifications()
      .then(async () => {
        await setCount(0);
        await setTotalResults('');
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const onLoadMore = () => {
    setCount(count + 1);
  };

  useEffect(async () => {
    setLoading(true);
    await userService.getNotifications({
      sort: "createdAt:desc",
      limit: 10,
      page: count,
      is_read: false
    }).then(async (res) => {
      await setTotalResults(res?.totalResults);
      if (count !== 1) {
        await setData(data.concat(res?.results));
      }
      else {
        setData(res?.results);
      }
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, [count]);

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
          >
            <Badge count={TotalResults} size="small">
              <i className={classNames('bx', 'bxs-bell-ring', { vibratebell: TotalResults > 0 })}></i>
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
                <a onClick={MarkNotifications} className="small">
                  {" "}
                  Mark All Read
                </a>
              </div>
              <div className="col-auto">
                <a
                  onClick={() => router.push('/auth/notifications')
                  }
                  className="small">
                  <a>View All</a>
                </a>
              </div>
            </Row>
          </div>

          <PerfectScrollbar style={{ height: "260px" }}>
            {data && data?.map((item, index) => (
              <a href="" className="text-reset notification-item">
                <div className="d-flex">
                  <img
                    src={avatarurl + item?.actor?.profile?.avatar?.filepath}
                    className="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  <div className="flex-grow-1">
                    <Row className="align-items-center">
                      <Col>
                        <h6 className="m-0">{item?.actor?.businessname} </h6>
                      </Col>
                      {/* <div className="col-auto">
                        <a onClick={MarkNotifications} className="small">
                          {" "}
                          Mark
                        </a>
                      </div> */}
                    </Row>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {item?.description}
                      </p>
                      <p className="mb-0">
                        <i className="bx bx-time-five" />{" "}
                        {getDiffToNow(item?.createdAt)} ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </PerfectScrollbar>
          <div className="p-2 border-top d-grid">
            <a className="btn btn-sm btn-link font-size-14 text-center" onClick={onLoadMore}>
              <span key="t-view-more"><i className="bx bxs-chevron-right-circle me-1"></i>View More... <Spin spinning={loading} indicator={antIcon}></Spin> </span>
            </a>
          </div>
        </DropdownMenu>
      </Dropdown >
    </React.Fragment >
  );
};

export default NotificationDropdown;

