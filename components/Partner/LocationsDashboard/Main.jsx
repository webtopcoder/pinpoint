import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Row,
    Card,
    CardBody,
    Col,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import { message, Spin } from "antd";
import useNotify from "@/hooks/useNotify";
import AddLocationModal from "./AddLocationModal";
import { map } from "lodash";
import { locationService } from "@/services/index";
import LocationCard from "./LocationCard";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";

const index = ({
    user_id, additionLocatoins, userCategoryId
}) => {

    const { notify } = useNotify();
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [uploadFile, setUploadFile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const isWebDevice = useMedia('(min-width:700px)');

    async function handlePageClick(page) {
        await setPage(page);
    };

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

    async function initialize() {
        await locationService.getLocations({
            partner: user_id, isActive: null,
        }, {
            sort: "createdAt:desc",
            limit: 9,
            page: page,
        })
            .then(async (res) => {
                await setLoading(false);
                setTotalPage(res?.totalPages)
                if (additionLocatoins.length > 0) {
                    const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
                    await setLocations(filteredData);
                }
                else
                    await setLocations(res.results);
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
        initialize();
    }, [page]);

    return (
        <Card>
            <CardBody 
            className={classnames({'p-2': !isWebDevice, 'p-5': isWebDevice})}
            >
                <Spin spinning={loading}>
                    <Row>
                        <Col md={12} className="mb-4">
                            <button
                                type="button"
                                className="btn btn-danger float-end"
                                onClick={() => setAddModalOpen(true)}
                            >
                                <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                                Add Location
                            </button>
                        </Col>
                        {map(locations, (item, key) => {
                            return <Col xl="4" sm="12" className="py-2" key={key}><LocationCard locations={locations} setLocations={setLocations} location={item} showActions={true} /></Col>
                        }
                        )}
                    </Row>
                    <Row className="py-3">
                        <Col lg="12">
                            <ul className="pagination pagination-rounded justify-content-center mt-2 mb-5">
                                <PaginationItem disabled={page === 1}>
                                    <PaginationLink
                                        previous
                                        href="#"
                                        onClick={() => handlePageClick(page - 1)}
                                    />
                                </PaginationItem>
                                {map(Array(totalPage), (item, i) => (
                                    <PaginationItem active={i + 1 === page} key={i}>
                                        <PaginationLink
                                            onClick={() => handlePageClick(i + 1)}
                                            href="#"
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem disabled={page === totalPage}>
                                    <PaginationLink
                                        next
                                        href="#"
                                        onClick={() => handlePageClick(page + 1)}
                                    />
                                </PaginationItem>
                            </ul>
                        </Col>
                    </Row>
                </Spin>
            </CardBody>
            <AddLocationModal
                open={addModalOpen}
                locations={locations}
                setLocations={setLocations}
                setModalOpen={setAddModalOpen}
                uploadProps={uploadProps}
                uploadFile={uploadFile}
                user_id={user_id}
                userCategoryId={userCategoryId}
                additionLocatoins={additionLocatoins}
            />
        </Card>
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