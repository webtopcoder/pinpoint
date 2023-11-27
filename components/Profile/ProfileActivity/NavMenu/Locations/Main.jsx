import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Row, Card, CardBody, Col } from "reactstrap";
import { Spin, Divider } from "antd";
import useNotify from "@/hooks/useNotify";
import { map } from "lodash";
import { locationService } from "@/services/index";
import LocationCard from "@/components/Partner/Locations/LocationCard";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "@/components/Common/Spinner";

const index = ({
    user_id, additionLocatoins
}) => {
    const router = useRouter();
    const { notify } = useNotify();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showActions, setShowActions] = useState(user_id === router.query.profile ? true : false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState();
    const isWebDevice = useMedia('(min-width:700px)');

    async function handlePageClick() {
        setPage(page + 1);
    };

    async function initialize() {
        await locationService.getLocations({
            partner: router.query.profile, isActive: null,
        }, {
            // sort: "createdAt:asc",
            limit: 9,
            page: page,
        })
            .then(async (res) => {
                await setLoading(false);
                setTotalResults(res?.totalResults)
                if (additionLocatoins.length > 0) {
                    const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
                    setLocations(page !== 1 ? locations.concat(filteredData) : filteredData);
                } else {
                    setLocations(page !== 1 ? locations.concat(res.results) : res.results);
                }
            })
            .catch((error) => {
                setLoading(false);
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    useEffect(() => {
        router.query.profile !== user_id && setShowActions(false);
        initialize();
    }, [page]);

    return (
        <Card>
            <InfiniteScroll
                dataLength={locations.length}
                next={handlePageClick}
                hasMore={locations?.length < totalResults}
                style={{ overflow: 'hidden' }} //To put endMessage and loader to the top.
                loader={<LoadingSpinner />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            >
                <CardBody
                    className={classnames({ 'p-2': !isWebDevice, 'p-2': isWebDevice })}
                >
                    <Spin spinning={loading}>
                        <Row>
                            {map(locations, (item, key) => {
                                return <Col xl="6" sm="12" className="py-2" key={key}>
                                    <LocationCard locations={locations} setLocations={setLocations} location={item} initialize={initialize} showActions={showActions} />
                                </Col>
                            }
                            )}
                        </Row>
                    </Spin>
                </CardBody>
            </InfiniteScroll>
        </Card >
    );
};

const matchStateToProps = ({ user }) => {
    return {
        user_id: user.user_id,
        additionLocatoins: user.additionLocatoins,
        userCategoryId: user.category
    };
};

export default connect(matchStateToProps)(index);