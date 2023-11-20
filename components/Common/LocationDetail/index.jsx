import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { mailCompose } from "@/redux/Mail/actions";
import useNotify from "@/hooks/useNotify";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Modal,
    Container,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import Overview from './Overview';
import DetailsSection from './DetailsSection';
import { useRouter } from "next/router";
import { locationService } from "@/services/index";

const index = ({ modal_fullscreen, setmodal_fullscreen, location, role, user_id }) => {
    
    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    function temporarySwapHalf(array) {
        var left = null;
        var right = null;
        var length = array.length;
        for (left = 0; left < length / 2; left += 1) {
            right = length - 1 - left;
            var temporary = array[left];
            array[left] = array[right];
            array[right] = temporary;
        }
        return array;
    }

    const { notify } = useNotify();
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [expand, setExpand] = useState(false);
    const [locationInfo, setLocationInfo] = useState();

    async function initialize() {
        locationService.getLocationInfo({ id: location?._id, expand: expand })
            .then((res) => {
                setLocationInfo(res)
                if (res?.location?.reviews) {
                    const activeReviews = res?.location?.reviews ?? res?.location?.reviews.reduce(
                        (acc, option, index) => {
                            option.status === "active" ? acc.push(option) : ''
                            return acc;
                        },
                    );
                    setReviews(temporarySwapHalf(activeReviews));
                }
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }
    useEffect(() => {
        if (router.isReady) {
            initialize();
        }
    }, [router.isReady, expand]);


    return (
        <Modal
            size="xl"
            isOpen={modal_fullscreen}
            toggle={() => {
                tog_fullscreen();
            }}
            // className="modal-fullscreen"
        >
            <div className="modal-header">
                <h5
                    className="modal-title mt-0"
                    id="exampleModalFullscreenLabel"
                >
                    Location Detail
                </h5>
                <button
                    onClick={() => {
                        setmodal_fullscreen(false);
                    }}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="location-detail modal-body">
                <Container fluid>
                    <Row>
                        <DetailsSection locationInfo={locationInfo} setLocationInfo={setLocationInfo} userRole={role} initialize={initialize} reviews={reviews} />
                        <Overview
                            location={locationInfo}
                            expand={expand}
                            setExpand={setExpand}
                            user_id={user_id} />
                    </Row>
                </Container>
            </div>
      
        </Modal>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        myfollowerList: user.myFollowers,
        role: user.role,
        user_id: user.user_id,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onmailCompose: (data, cb) => dispatch(mailCompose(data, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
