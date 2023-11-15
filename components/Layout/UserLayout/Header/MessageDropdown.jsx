import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import { apiBaseUrl } from "@/utils/baseUrl";
import { Badge, Spin, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { mailService } from "@/services/index";
import { getDiffToNow } from "@/utils/date";
import classNames from "classnames";
import { useRouter } from "next/router";
import {
  getIsReadEmail,
} from "@/redux/Mail/actions";
import VirtualList from 'rc-virtual-list';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const ContainerHeight = 400;

const MessageDropdown = ({ onGetIsReadEmails, unreadList, unreadCount }) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function MarkMessages() {
    await mailService.clearMessages()
      .then(async () => {
        onGetIsReadEmails({
          sort: "createdAt:desc",
          limit: count * 10,
          page: 1
        })
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  useEffect(async () => {
    setLoading(true);
    await onGetIsReadEmails({
      sort: "createdAt:desc",
      limit: count * 10,
      page: 1
    });
    setLoading(false);
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
          id="page-header-Messages-dropdown"
        >
          <div
            className="search-icon"
          >
            <Badge count={unreadCount} size="small">
              <i className={classNames('bx', 'bxs-envelope', { vibratebell: unreadCount > 0 })}></i>
            </Badge>
          </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">Messages</h6>
              </Col>
              <div className="col-auto">
                <a onClick={MarkMessages} className="small">
                  {" "}
                  Mark All Read
                </a>
              </div>
              <div className="col-auto">
                <a className="small"
                  onClick={() => router.push('/message/inbox')}>
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>
          <VirtualList
            data={unreadList}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="_id"
            onScroll={onScroll}
          >
            {(item) => (
              <a onClick={() => {
                router.push({
                  pathname: '/message/inbox/detail',
                  query: {
                    id: item?.id
                  }
                });
              }} className="text-reset notification-item"
                key={item?._id}>
                <div className="d-flex">
                  <img
                    src={avatarurl + item?.from?.profile?.avatar?.filepath}
                    className="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  <div className="flex-grow-1">
                    <Row className="align-items-center">
                      <Col>
                        <h6 className="m-0">{item?.from?.name} </h6>
                      </Col>
                      {/* <div className="col-auto">
                        <a onClick={MarkMessages} className="small">
                          {" "}
                          Mark
                        </a>
                      </div> */}
                    </Row>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {item?.message?.length > 50
                          ? item?.message.substring(0, 50) + "..."
                          : item?.message}
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
      </Dropdown>
    </React.Fragment>
  );
};


const mapStateToProps = ({ mail, user }) => ({
  user_id: user.user_id,
  unreadList: mail.isreadlist,
  unreadCount: mail.unreadCount
});

const mapDispatchToProps = (dispatch) => ({
  onGetIsReadEmails: (parms) => dispatch(getIsReadEmail(parms)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageDropdown);