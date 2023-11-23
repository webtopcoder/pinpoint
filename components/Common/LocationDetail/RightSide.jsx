//optimized
import React, { useState, useMemo } from 'react';
import { useRouter } from "next/router";
import { Card, CardBody, Col, Row, } from 'reactstrap';
import { Popconfirm, Progress } from "antd"
import ArrivalBannerExpired from "./ArrivalBannerExpired";
import { locationService } from "@/services/index";
import useNotify from "@/hooks/useNotify";

const RightSide = ({ location, expand, setExpand, user_id }) => {

    const router = useRouter();
    const { notify } = useNotify();
    const [myprofilePoll, setProfilePoll] = useState(location?.location?.poll);
    const totalPollVoteCount = useMemo(() => {
        return myprofilePoll?.options?.reduce((a, item) => a + (item?.votes || 0), 0);
    }, [myprofilePoll?.options]);

    const partnerPollOptions = useMemo(() => {
        return myprofilePoll?.options?.map(option => ({
            content: option.optionText,
            votePercentage: ((option.votes || 0) / totalPollVoteCount) * 100 || 0,
        }));
    }, [myprofilePoll?.options, totalPollVoteCount]);

    const handleVote = async (content) => {
        try {
            const res = await locationService.votePoll(router.query?.profile, location?.location?._id, content);
            setProfilePoll(res);
            notify("success", "Successfully voted");
        } catch (error) {
            notify("error", error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <React.Fragment>
            <Col xl={4}>
                {location?.location?.poll?.question &&
                    <Card className='mb-3'>
                        <div className="bg-darkblue bg-soft">
                            <Row>
                                <Col xs="6">
                                    <div className="text-white ptlrt-10">
                                        <h5 className="text-white">Location Poll</h5>
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div className="text-white ptlrt-10 text-end">
                                        <p className='text-white'>
                                            {totalPollVoteCount}&nbsp;votes
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <CardBody>
                            <div className="avatar-respond">
                                <div
                                    style={{
                                        display: "block",
                                    }}
                                >
                                    <div className="pin-about-section">
                                        <p className="partner-poll-question">
                                            {myprofilePoll?.question}
                                        </p>
                                        <div className="border-top mt-2 pt-4">
                                            {partnerPollOptions?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        {router.query.profile ?
                                                            <Popconfirm
                                                                title="Vote"
                                                                description="Are you voting this option?"
                                                                okText="Yes"
                                                                cancelText="No"
                                                                onConfirm={handleVote}
                                                            >
                                                                <a className='m-0 p-0'>{item?.content}</a>
                                                            </Popconfirm>
                                                            : <h5 className="card-title m-0">{item?.content}</h5>}
                                                        <Progress
                                                            percent={item?.votePercentage !== "NaN" ? item?.votePercentage : 0}
                                                            strokeColor="#175594"
                                                            trailColor="gray"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                }
                <Card>
                    <div className="bg-darkblue bg-soft">
                        <Row>
                            <Col xs="12">
                                <div className="text-white ptlrt-10">
                                    <h5 className="text-white">Previous Arrivals</h5>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <CardBody>
                        {location?.expiredArrival?.arrivalData?.length > 0 && (
                            <ArrivalBannerExpired
                                location={location}
                                arrivals={location?.expiredArrival}
                                expand={expand}
                                setExpand={setExpand}
                                user_id={user_id}
                            />
                        )}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default RightSide;