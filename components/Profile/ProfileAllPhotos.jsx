import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Image as Antimage, Divider, Button, Typography, Popover } from "antd";
import { useRouter } from "next/router";
import { getActivity } from "@/redux/Profile/actions";
import { getmyFollowers } from "@/redux/User/actions";
import { postThink } from "@/redux/Profile/actions";
import { getAllphotos } from "@/redux/Profile/actions";
import toast from "@/components/Toast";
import { apiBaseUrl } from "@/utils/baseUrl";
const { Text, Link } = Typography;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const ProfileAllPhotos = () => {
  const [current, setCurrent] = useState(1);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [myallPhotos, setAllphotos] = useState([]);
  const [activityInfo, setactivityInfo] = useState([]);
  const [list, setList] = useState([]);
  const [paginationInfo, setPageInfo] = useState({
    pagination: {
      current: 1,
      pageSize: 500,
    },
  });

  const onChange = (page, pageSize) => {
    setCurrent(page);
  };

  const myLoader = ({ src }) => {
    return src;
  };

  const imgurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

  async function allActivities(id, count, search) {
    await profileService.getActivity(id, count, search)
      .then((res) => {
        if (res.success) {
          setInitLoading(false);
          setLoading(false);
          setactivityInfo(res);
          if (count !== 1) {
            const newData = data.concat(res.posts);
            setData(newData);
            setList(newData);
          }
          else {
            setData(res.posts);
            setList(res.posts);
          }
          window.dispatchEvent(new Event("resize"));
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
    const allphotos = await profileService.getAllphotos(profileId, paginationInfo);
    await setAllphotos(allphotos?.image);
    await allActivities(profileId, 1, "");
  }

  useEffect(() => {
    if (router.isReady) {
      const { profile } = router.query;
      initialize(profile);
      // ongetAllphotos(profile, paginationInfo);
      // ongetActivity(profile, 1, "", (res) => {
      //   if (res.success) {
      //   } else notify("error", res.msg);
      // });
    }
  }, [router.isReady]);

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
                      <Antimage.PreviewGroup>
                        {myallPhotos &&
                          myallPhotos?.map((image, index) => (
                            <Popover content={content} title="Title" trigger="hover">
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
                            </Popover>

                          ))}
                      </Antimage.PreviewGroup>
                      {/* <Pagination
                                                total={85}
                                                showTotal={(total) => `Total ${total} items`}
                                                defaultPageSize={20}
                                                onChange={onChange}
                                                current={paginationInfo.pagination.current}
                                            /> */}
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
                          <Antimage.PreviewGroup>
                            {myallPhotos &&
                              (myallPhotos.slice(0, 8)).map((image, index) => (
                                <Antimage
                                  key={index}
                                  loader={myLoader}
                                  width={"25%"}
                                  src={imgurl + image?.filepath}
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
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile, user }) => {
  return {
    activityInfo: profile.activityInfo,
    myallPhotos: profile.allphotosInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetActivity: (data, count, search, cb) =>
    dispatch(getActivity(data, count, search, cb)),
  ongetAllphotos: (id, pageInfo) => dispatch(getAllphotos(id, pageInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAllPhotos);
