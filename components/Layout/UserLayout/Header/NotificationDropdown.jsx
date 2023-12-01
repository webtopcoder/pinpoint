import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import { apiBaseUrl } from "@/utils/baseUrl";
import { Badge, Spin, Divider } from 'antd';
import { userService } from "@/services/index";
import { getDiffToNow } from "@/utils/date";
import { useRouter } from "next/router";
import classNames from "classnames";
import VirtualList from 'rc-virtual-list';

const ContainerHeight = 400;

const NotificationDropdown = ({ user_id }) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
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
        await setData(res?.results);
      }
      await setLoading(false);
    }).catch((error) => {
      setLoading(false);
    })
  }, [count]);

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      setCount(count + 1);
    }
  };

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
                  onClick={() => router.push('/auth/notifications')}
                  className="small">
                  View All
                </a>
              </div>
            </Row>
          </div>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="_id"
            onScroll={onScroll}
          >
            {(item) => (
              <a href="" className="text-reset notification-item" key={item?._id}>
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
            )}
          </VirtualList>
        </DropdownMenu>
      </Dropdown >
    </React.Fragment >
  );
};

export default NotificationDropdown;

