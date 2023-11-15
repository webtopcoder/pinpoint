import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { profileService } from "@/services/index";
import {
    getUserInfo,
} from "@/redux/Profile/actions";
import {
    Row,
    Card,
    CardBody,
} from "reactstrap";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import useNotify from "@/hooks/useNotify";
import { Spin } from "antd";

const index = ({
    ongetUser
}) => {

    const [loading, setLoading] = useState(true);
    const [dashboardInfo, setDashboardInfo] = useState([]);
    const { notify } = useNotify();
    useEffect(async () => {
        await ongetUser((res, error) => {
            if (error) {
                console.log(error);
                notify("error", "Fail");
            }
        });

        await profileService.getDashboardInfo()
            .then((res) => {
                setLoading(false);
                setDashboardInfo(res);
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }, []);
    return (
        <Card>
            <CardBody className="p-4">
                <Spin spinning={loading}>
                    <Row>
                        <LeftSide dashboardInfo={dashboardInfo} />
                        <RightSide />
                    </Row>
                </Spin>
            </CardBody>
        </Card>
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

export default connect(matchStateToProps, mapDispatchToProps)(index);