import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
    getUserInfo,
} from "@/redux/Profile/actions";
import Image from "next/image";
import {
    Col,
    Card,
    CardTitle,
} from "reactstrap";
import { message } from "antd";
import { useRouter } from "next/router";
import quickArrive from "@/public/images/quick-arrive.png";
import quickDeparture from "@/public/images/quick-arrive.png";
import useNotify from "@/hooks/useNotify";
import ArrivalModal from "./ArrivalModal";
import DepartureModal from "./DepartureModal";
import { locationService } from "@/services/index";

const RightSide = ({ userInfo, userId, additionLocatoins }) => {

    const router = useRouter();
    const [arrivalModalOpen, setModal1Open] = useState(false);
    const [departureModalOpen, setModal2Open] = useState(false);
    const { notify } = useNotify();
    const [upload_name, setUploadFile] = useState([]);
    const [locations, setLocations] = useState([]);

    const uploadProps = {
        name: "upload",
        onChange(info) {
            if (info.file.status !== "uploading") {
                const fileUploadInfo = info.fileList;
                setUploadFile(fileUploadInfo);
            }

            if (info.file.status == "removed") {
                if (info.fileList.length == 0) setUploadFile([]);
                else {
                    const fileUploadInfo = info.fileList;
                    setUploadFile(fileUploadInfo);
                }
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    async function initialize(status) {
        await locationService.getLocations({ partner: userId, isActive: status })
            .then(async (res) => {
                if (additionLocatoins.length > 0) {
                    const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
                    await setLocations(filteredData);
                }
                else {
                    await setLocations(res.results);
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
            if (arrivalModalOpen)
                initialize(false);
            if (departureModalOpen)
                initialize(true);
        }
    }, [departureModalOpen, arrivalModalOpen, router.isReady]);


    return (
        <Col md={3}>
            <Card body className="bg-bluegradient mb-3 shadow-lg">
                <CardTitle className="mt-0 text-white fs-4 py-2">Quick Arrival</CardTitle>
                <Image src={quickArrive} alt="quickArrive" className="mb-2" />
                <a
                    onClick={() => {
                        if (userInfo?.activePartnership && userInfo?.activeSubscription && new Date(userInfo?.partnershipPriceRenewalDate) > new Date())
                            setModal1Open(true)
                        else
                            notify(
                                "error",
                                "You're not subscribed to this service"
                            );
                    }}
                    className="btn btn-light m-2"
                >
                    Go
                </a>
            </Card>
            <Card body className="bg-redgradient shadow-lg">
                <CardTitle className="mt-0 text-white fs-4 py-2">Quick Departure</CardTitle>
                <Image src={quickDeparture} alt="quickDeparture" className="mb-2" />
                <button
                    type="button"
                    className="btn btn-light "
                    onClick={() => {
                        if (userInfo?.activePartnership && userInfo?.activeSubscription && new Date(userInfo?.partnershipPriceRenewalDate) > new Date())
                            setModal2Open(true)
                        else
                            notify(
                                "error",
                                "You're not subscribed to this service"
                            );
                    }}
                >
                    GO
                </button>
            </Card>
            <ArrivalModal
                openArrival={arrivalModalOpen}
                setArrivalModalOpen={setModal1Open}
                uploadProps={uploadProps}
                uploadFile={upload_name}
                setLocations={setLocations}
                locations={locations}
            />
            <DepartureModal
                modalOpen={departureModalOpen}
                setModalOpen={setModal2Open}
                uploadProps={uploadProps}
                setLocations={setLocations}
                locations={locations}
            />
        </Col>
    );
};

const matchStateToProps = ({ user, profile }) => {
    return {
        additionLocatoins: user.additionLocatoins,
        userId: user.user_id,
        userInfo: profile.userinfo
    };
};

const mapDispatchToProps = (dispatch) => ({
    ongetUser: (cb) => dispatch(getUserInfo(cb)),
});

export default connect(matchStateToProps, mapDispatchToProps)(RightSide);