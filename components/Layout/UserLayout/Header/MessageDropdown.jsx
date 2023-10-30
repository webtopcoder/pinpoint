import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { apiBaseUrl } from "@/utils/baseUrl";
import { Badge, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { mailService } from "@/services/index";
import { getDiffToNow } from "@/utils/date";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const MessageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const [count, setCount] = useState(1);
  const [data, setData] = useState();
  const [TotalResults, setTotalResults] = useState();
  const [loading, setLoading] = useState(false);

  async function MarkMessages() {
    await mailService.clearMessages()
      .then(async (res) => {
        await setData(res);
        await setTotalResults('');
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  async function onLoadMore() {
    await setCount(count + 1);
  }

  useEffect(async () => {
    setLoading(true);
    await mailService.getIsReadEmails({
      sort: "createdAt:desc",
      limit: 10,
      page: count
    }).then(async (res) => {
      await setTotalResults(res?.totalResults);
      if (count !== 1) {
        await setData(data.concat(res?.results));
      }
      else {
        console.log(res?.results)
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
          id="page-header-Messages-dropdown"
        >
          <div
            className="search-icon"
          >
            <Badge count={TotalResults} size="small">
              <i className="flaticon-email-1"></i>
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
                  Mark All
                </a>
              </div>
              <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <PerfectScrollbar style={{ height: "260px" }}>
            {data && data?.map((item, index) => (
              <a href="" className="text-reset notification-item">
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
            ))}
          </PerfectScrollbar>
          <div className="p-2 border-top d-grid">
            <a className="btn btn-sm btn-link font-size-14 text-center" onClick={onLoadMore}>
              <span key="t-view-more"><i className="bx bxs-chevron-right-circle me-1"></i>View More... <Spin spinning={loading} indicator={antIcon}></Spin> </span>
            </a>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default MessageDropdown;

