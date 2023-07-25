import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import RightSider from "@/components/Profile/ProfileActivity/RightSider";
import FollowerList from "@/components/Profile/ProfileSocial/FollowerList";
import Posts from "@/components/Profile/ProfileSocial/Posts";
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
  const [socialsInfo, setsocialsInfo] = useState([]);
  const [list, setList] = useState([]);
  const router = useRouter();
  const view_user_id = router?.query?.profile;

  async function allSocials(id, count, search) {
    await profileService.getSocials(id, count, search)
      .then((res) => {
        if (res.success) {
          setInitLoading(false);
          setLoading(false);
          setsocialsInfo(res);
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
    const allphotos = await profileService.getAllphotos(profileId, paginationInfo);
    await setAllphotos(allphotos?.image.slice(0, 8));
    await profileService.updateProfileViewsCount(profileId);
    await allSocials(profileId, 1, "");
  }

  useEffect(() => {
    initFunc(view_user_id);
  }, [router.isReady, view_user_id]);

  return (
    <div className="blog-details-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-7 col-md-12">
            <FollowerList
              view_user_id={view_user_id}
            />
            <Posts
              initLoading={initLoading}
              loading={loading}
              user_id={user_id}
              list={list}
              data={data}
              setLoading={setLoading}
              setList={setList}
              allActivities={allSocials}
              ondownloadFile={ondownloadFile}
            />
          </div>
          <RightSider
            role={usertype}
            activityInfo={socialsInfo}
            myallPhotos={myallPhotos}
            view_user_id={view_user_id}
            myLoader={myLoader}
          />
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
