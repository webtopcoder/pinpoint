import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    Row,
    Card,
    CardBody,
    Col,
} from "reactstrap";
import { message, Spin } from "antd";
import useNotify from "@/hooks/useNotify";
import { map } from "lodash";
import { locationService } from "@/services/index";
import LocationCard from "@/components/Partner/Locations/LocationCard";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";

const index = () => {
    const router = useRouter();
    const { notify } = useNotify();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const isWebDevice = useMedia('(min-width:700px)');

    async function initialize() {
        locationService.getFavoriteLocations(router.query.profile)
            .then((res) => {
                setLoading(false);
                setLocations(res);
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
        initialize();
    }, []);

    return (
        <Card>
            <CardBody
                className={classnames({ 'p-2': !isWebDevice, 'p-2': isWebDevice })}
            >
                <Spin spinning={loading}>
                    <Row>
                        {map(locations, (item, key) => {
                            return <Col xl="6" sm="12" className="py-2" key={key}><LocationCard locations={locations} setLocations={setLocations} location={item} showActions={false} /></Col>
                        }
                        )}
                    </Row>
                </Spin>
            </CardBody>
        </Card >
    );
};

export default index;