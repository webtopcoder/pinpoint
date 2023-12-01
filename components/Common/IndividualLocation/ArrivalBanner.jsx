import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LikeArrival from "./LikeArrvial";
import CheckInArrivalActive from "./CheckInArrivalActive";
import { Rate, Image as Antimage } from "antd";
import {
    Card, CardBody, CardHeader, CardText, CardTitle, Col, Row, UncontrolledDropdown, DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';
import useNotify from "@/hooks/useNotify";
import moment from 'moment'
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import useMedia from "@/hooks/useMedia";
import { FacebookShareButton, FacebookIcon } from 'react-share';

const imgurl = `${apiBaseUrl}/avatar/`;

const ArrivalBanner = ({ user_id, location }) => {
    const { notify } = useNotify();
    const [position, setPosition] = useState({
        lat: 30.3321838,
        lng: -81.65565099999999,
    });
    const router = useRouter();
    const url = baseUrl + router.asPath;
    const arrivallocation = location?.location?.title;
    const arrivalText = location?.location?.isArrival?.arrivalText;
    const arrivalImage = location?.location?.isArrival?.images[0]?.filepath;
    const arrivalID = location?.location?.isArrival?.id;
    const date = location?.location?.updatedAt;
    const [checkIncounts, setCheckIncounts] = useState(location?.location?.isArrival?.checkIn?.length);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setPosition({
                lat: latitude,
                lng: longitude,
            });
        });
    }, []);

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Radius of the earth in kilometers
        // Convert latitude and longitude to radians
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c; // Distance in kilometers
        return distance;
    }

    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    const distance = (calculateDistance(position?.lat, position?.lng, location?.location?.mapLocation?.latitude, location?.location?.mapLocation?.longitude)) * 0.621371;
    let dateString = moment(date).format('DD-MM-YYYY');

    return (
        <Card outline color="success" className="border mb-3 bg-f8fbff">
            <CardHeader className="bg-transparent">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item me-3" >
                        <h5 className="my-0 text-success font-size-16">
                            <i className="bx bx-station me-3 fw-semibold" />Active
                        </h5>
                    </li>
                    <CheckInArrivalActive
                        distance={distance}
                        setCheckIncounts={setCheckIncounts}
                        arrvialID={arrivalID}
                        text={checkIncounts ? checkIncounts : 0}
                        notify={notify}
                        user_id={user_id}
                    />
                    <LikeArrival
                        arrvialID={arrivalID}
                        text={location?.location?.isArrival?.like ? location?.location?.isArrival?.like.count : 0}
                        user_id={user_id}
                        notify={notify} />
                    <li className="list-inline-item me-3 float-end">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" to="#" className="card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bx bx-share-alt fs-4"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">
                                    <FacebookShareButton
                                        id="fbShareBtn"
                                        url={`https://api.thepinpointsocial.com/api/v1/share?title=${arrivallocation}&url=${url}&description=${arrivalText}&city=${location?.location?.mapLocation?.city}&date=${dateString}&imageUrl=${encodeURIComponent(imgurl + arrivalImage)}`}
                                        quotes={"Quotes"}  //"Your Quotes"
                                        hashtag={"Hashtag"} // #hashTag
                                    >
                                        <i className="bx bxl-facebook-circle fs-3 tcl-facebook"></i>{" "}Facebook
                                    </FacebookShareButton></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </li>
                </ul>
            </CardHeader>
            <CardBody>
                <p className="my-0 text-default font-size-14">
                    <i className="bx bxs-map-pin me-3 fw-semibold" />{location?.location?.mapLocation?.address}
                </p>
                <p className="my-0 text-default font-size-14">
                    <i className="bx bx-time-five me-3 fw-semibold" />{new Date(date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        hour12: true,
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                </p>
                <CardText className="font-size-14">
                    <i className="bx bx-message-alt me-3 fw-semibold" />{location?.location?.arrivalText}
                </CardText>
                {arrivalImage && (
                    <Antimage.PreviewGroup>
                        {
                            <Antimage
                                src={imgurl + arrivalImage}
                                height="200px"	
                                alt="img"
                            />
                        }
                    </Antimage.PreviewGroup>
                )}
            </CardBody>
        </Card>
    );
};

export default ArrivalBanner;
