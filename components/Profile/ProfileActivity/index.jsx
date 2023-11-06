import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import RightSider from "@/components/Profile/ProfileActivity/RightSider";
import ComposePost from "@/components/Profile/ProfileActivity/ComposePost";
import Posts from "@/components/Profile/ProfileActivity/Posts";
import { downloadFile } from "@/redux/Mail/actions";

const index = ({
  ondownloadFile,
  user_id,
  usertype
}) => {

  const { notify } = useNotify();
  const myLoader = ({ src }) => {
    return src;
  };

  const [paginationInfo, setPageInfo] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [myallPhotos, setAllphotos] = useState([]);
  const [activityInfo, setactivityInfo] = useState([]);
  const [LoadMoreAllStatus, setLoadMoreAll] = useState(false);
  const [list, setList] = useState([]);
  const router = useRouter();
  const view_user_id = router?.query?.profile;

  async function allActivities(id, count, search) {
    await profileService.getActivity(id, count, search)
      .then((res) => {
        if (res.success) {
          res?.posts?.length === 0 ? setLoadMoreAll(true) : ''
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

  async function initFunc(profileId) {
    const allphotos = await profileService.getAllphotos(profileId, false, paginationInfo);
    // await setAllphotos(allphotos?.image.slice(0, 8));
    await setAllphotos(allphotos?.image);
    await profileService.updateProfileViewsCount(profileId);
    await allActivities(profileId, 1, "");
  }

  useEffect(() => {
    initFunc(view_user_id);
  }, [router.isReady, view_user_id]);

  return (
    <div className="blog-details-area">
      <div className="container">
        <div className="row justify-content-center">
          <RightSider
            activityInfo={activityInfo}
            myallPhotos={myallPhotos}
            view_user_id={view_user_id}
            myLoader={myLoader}
            role={usertype}
          />
          <div className="col-xl-8 col-lg-7 col-md-12">
            <ComposePost
              view_user_id={view_user_id}
              allActivities={allActivities}
            />
            <Posts
              initLoading={initLoading}
              loading={loading}
              user_id={user_id}
              list={list}
              data={data}
              setLoading={setLoading}
              setList={setList}
              allActivities={allActivities}
              ondownloadFile={ondownloadFile}
              LoadMoreAllStatus={LoadMoreAllStatus}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    followAndFollowing: user.followAndFollowing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
