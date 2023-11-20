import {
  Card, CardBody, CardHeader, CardText, CardTitle, Col, Row, UncontrolledDropdown, DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { Image as Antimage } from "antd";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import CheckInArrivalExpired from "./CheckInArrivalExpired";
import LikeArrvial from "./LikeArrvial";
import { apiBaseUrl } from "@/utils/baseUrl";
import { getDiffToNow } from "@/utils/date";

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;

function ArrivalBannerExpired({ location, arrivals, expand, setExpand, user_id }) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      {arrivals?.arrivalData.map((arrival, index) => (
        <Card outline color="danger" className="border mb-2 bg-f8fbff">
          <CardHeader className="bg-transparent">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3" >
                <h5 className="my-0 text-danger font-size-14">
                  <i className="bx bx-station me-3 fw-semibold" />Expired
                </h5>
              </li>
              <CheckInArrivalExpired
                arrvialID={arrival?.id}
                text={arrival?.checkIn?.length ? arrival?.checkIn?.length : 0}
                notify={notify}
              />
              <LikeArrvial
                user_id={user_id}
                arrvialID={arrival.id}
                text={arrival?.like ? arrival?.like?.count : 0}
                notify={notify} />
            </ul>
          </CardHeader>
          <CardBody>
            <p className="my-0 text-default font-size-14">
              <i className="bx bxs-map-pin me-3 fw-semibold" />{arrival?.address?.address}
            </p>
            <p className="my-0 text-default font-size-14">
              <i className="bx bx-time-five me-3 fw-semibold" />
              {getDiffToNow(arrival?.departureAt)} ago
            </p>
            <CardText className="font-size-14">
              <i className="bx bx-message-alt me-3 fw-semibold" />{arrival?.arrivalText}
            </CardText>
            {arrival?.images[0]?.filepath && (
              <Antimage.PreviewGroup>
                {
                  <Antimage
                    src={imgurl + arrival?.images[0]?.filepath}
                    height="200px"	
                    alt="img"
                  />
                }
              </Antimage.PreviewGroup>
            )}
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default ArrivalBannerExpired;
