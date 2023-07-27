import React, { useState, useCallback, useEffect } from "react";
import { Image as Antimage, Divider, Button, Typography, Popover, Pagination, Spin, Drawer, Space } from "antd";
import { useRouter } from "next/router";
import { profileService } from "@/services/index";
import toast from "@/components/Toast";
import { apiBaseUrl } from "@/utils/baseUrl";
import { formatDate } from "@/utils/date";
import useMedia from "@/hooks/useMedia";

const ProfileAllPhotos = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myallPhotos, setAllphotos] = useState([]);
  const [activityInfo, setactivityInfo] = useState([]);
  const [sidebarImage, setSideImage] = useState([]);
  const [total, setTotal] = useState();
  const [currentImage, setCurrentImage] = useState();
  const isWebDevice = useMedia('(min-width:700px)');
  const [paginationInfo, setPageInfo] = useState(
    {
      current: 1,
      pageSize: 50,
    },
  );

  const router = useRouter();
  const { profile } = router.query;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  async function onShowSizeChange(current, pageSize) {
    await setPageInfo({
      current: current,
      pageSize: pageSize
    }
    )
  };

  async function onChange(current, pageSize) {

    await setPageInfo({
      current: current,
      pageSize: pageSize
    })
  };

  const myLoader = ({ src }) => {
    return src;
  };

  const imgurl = `${apiBaseUrl}/avatar/`;

  async function allActivities(id, count, search) {
    await profileService.getActivity(id, count, search)
      .then((res) => {
        if (res.success) {
          setactivityInfo(res);
        } else notify("error", res.msg);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  async function initialize(profileId) {
    await setLoading(true);
    const allphotos = await profileService.getAllphotos(profileId, false, paginationInfo);
    await setAllphotos(allphotos?.image);
    await setSideImage(allphotos?.sidebarImage)
    await setLoading(false);
    await setTotal(allphotos.total);
    await allActivities(profileId, 1, "");
  }

  useEffect(() => {
    initialize(profile);
  }, [router.isReady, paginationInfo.current, paginationInfo.pageSize]);

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  return (
    <div className="blog-details-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-7 col-md-12">
            <div className="avatar-area green-color">
              <div className="avatar-respond">
                <div className="avatar-form">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Divider orientation="left">
                        <span className="all-photos">All Photos</span>
                      </Divider>
                      <Spin spinning={loading} delay={500}>
                        <Antimage.PreviewGroup
                          preview={{
                            countRender: (current) => setCurrentImage(myallPhotos[current - 1]),
                            onVisibleChange: async (visible, prevVisible) => {
                              !visible ? await onClose() : '';
                            }
                          }}
                        >
                          {myallPhotos &&
                            myallPhotos?.map((image, index) => (
                              isWebDevice ?
                                <Popover content={image?.content} title={image?.type + ", " + formatDate(image?.createdAt)} trigger="hover" >
                                  <Antimage
                                    loader={myLoader}
                                    style={{
                                      padding: "5px",
                                    }}
                                    width={"20%"}
                                    src={imgurl + image?.filepath}
                                    key={index}
                                    alt="ewrwerwerwe"
                                  />
                                </Popover> :
                                <Antimage
                                  onClick={() => {
                                    !isWebDevice ? showDrawer(true) : ''
                                  }}
                                  loader={myLoader}
                                  style={{
                                    padding: "5px",
                                  }}
                                  width={"25%"}
                                  src={imgurl + image?.filepath}
                                  key={index}
                                  alt="ewrwerwerwe"
                                />
                            ))}
                        </Antimage.PreviewGroup>
                      </Spin>
                      <Pagination
                        style={{
                          marginTop: 10
                        }}
                        total={total}
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        onChange={onChange}
                        showTotal={(total) => `Total ${total} items`}
                        defaultPageSize={50}
                        current={paginationInfo.current}
                        defaultCurrent={paginationInfo.current}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-12">
            <div className="left-sidebar">
              <aside className="widget-area">
                <div className="avatar-area green-color">
                  <div className="avatar-respond">
                    <div
                      className="pin-post-header-section"
                      style={{
                        display: "block",
                      }}
                    >
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">About Me</span>
                        </h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: activityInfo && activityInfo?.about,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="avatar-respond">
                    <div className="pin-post-header-section">
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">Photos</span>
                        </h4>
                        <div className="row">
                          <Antimage.PreviewGroup
                            preview={{
                              countRender: (current) => setCurrentImage(myallPhotos[current - 1]),
                              onVisibleChange: async (visible, prevVisible) => {
                                !visible ? await onClose() : '';
                              }
                            }}>
                            {sidebarImage &&
                              sidebarImage.map((image, index) => (
                                isWebDevice ?
                                  <Popover content={image?.content} title={image?.type + ", " + formatDate(image?.createdAt)} trigger="hover" >
                                    <Antimage
                                      loader={myLoader}

                                      width={"25%"}
                                      src={imgurl + image?.filepath}
                                      key={index}
                                      alt="ewrwerwerwe"
                                    />
                                  </Popover> :
                                  <Antimage
                                    onClick={() => {
                                      showDrawer(true);
                                    }}
                                    loader={myLoader}
                                    style={{
                                      padding: "5px",
                                    }}
                                    width={"20%"}
                                    src={imgurl + image?.filepath}
                                    key={index}
                                    alt="ewrwerwerwe"
                                  />
                              ))}

                          </Antimage.PreviewGroup>
                        </div>
                        <div className="row">
                          <Divider orientation="center" plain>
                            <Button type="link">View All Photos</Button>
                          </Divider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="avatar-respond">
                    <div className="pin-post-header-section">
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">Social Links</span>
                        </h4>
                        <ul className="social-links">
                          {activityInfo?.social?.facebook ? (
                            <li>
                              <a
                                href={activityInfo.social.facebook}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-facebook-app-symbol"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.twitter ? (
                            <li>
                              <a
                                href={activityInfo.social.twitter}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-twitter"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.snapchat ? (
                            <li>
                              <a
                                href={activityInfo.social.snapchat}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-snapchat"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.instagram ? (
                            <li>
                              <a
                                href={activityInfo.social.instagram}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-instagram"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.viewInfo?.profile?.social?.tiktok ? (
                            <li>
                              <a
                                href={activityInfo.social.tiktok}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-tik-tok"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.website ? (
                            <li>
                              <a
                                href={activityInfo.social.website}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="bx bx-world"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Drawer
                    title={currentImage?.type + ", " + formatDate(currentImage?.createdAt)}
                    placement="bottom"
                    width={500}
                    height={200}
                    closable={false}
                    open={open}
                    zIndex={10000}
                    mask={false}
                    maskClosable={false}
                    extra={
                      null
                    }
                  >
                    <p style={{
                      color: "#000000",
                    }}>{currentImage?.content}</p>
                  </Drawer>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAllPhotos;
