//optimized
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { mailCompose } from "@/redux/Mail/actions";
import useNotify from "@/hooks/useNotify";
import { Row, Container } from "reactstrap";
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import { useRouter } from "next/router";
import { locationService } from "@/services/index";

const Index = ({
    locationName,
    role,
    user_id
}) => {
    const { notify } = useNotify();
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [expand, setExpand] = useState(false);
    const [locationInfo, setLocationInfo] = useState();
    const temporarySwapHalf = (array) => {
        const length = array.length;
        for (let left = 0; left < length / 2; left += 1) {
            const right = length - 1 - left;
            const temporary = array[left];
            array[left] = array[right];
            array[right] = temporary;
        }
        return array;
    };

    const init = useCallback(async () => {
        try {
            const res = await locationService.getLocationInfo({
                title: locationName,
                expand: expand,
            });
            if (res?.location?.reviews) {
                const activeReviews = res?.location?.reviews.filter(
                    (option) => option.status === "active"
                );
                setReviews(temporarySwapHalf(activeReviews));
            }
            await setLocationInfo((prevLocationInfo) => ({
                ...prevLocationInfo,
                ...res,
            }));
        } catch (error) {
            notify(
                "error",
                error?.response?.data?.message || "Something went wrong"
            );
        }
    }, [expand, notify]);

    useEffect(() => {
        init();
    }, [router.isReady, expand]);

    return (
        <Container fluid>
            <Row>
                <LeftSide
                    locationInfo={locationInfo}
                    setLocationInfo={setLocationInfo}
                    userRole={role}
                    init={init}
                    reviews={reviews}
                />
                <RightSide
                    location={locationInfo}
                    expand={expand}
                    setExpand={setExpand}
                    user_id={user_id}
                />
            </Row>
        </Container>
    );
};

const mapStateToProps = ({ user }) => ({
    role: user.role,
    user_id: user.user_id,
});

const mapDispatchToProps = (dispatch) => ({
    onmailCompose: (data, cb) => dispatch(mailCompose(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
