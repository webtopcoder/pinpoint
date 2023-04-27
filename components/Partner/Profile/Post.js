import { Image as Antimage, List, Skeleton, Avatar, Space, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import config from "@/utils/config";
import { apiBaseUrl } from "@/utils/baseUrl";

const { Text } = Typography;

const IconText = ({ text, onClick }) => (
  <Space>
    <Button
      type="primary"
      onclick={() => onClick}
      shape="circle"
      icon={<LikeOutlined />}
    />
    <Text> {text}</Text>
  </Space>
);
const recommendPost = (postID) => {
  const movieObj = likeState.find((x) => x._id === postID);
  const myID = sessionStorage.("user_id");
  const found = movieObj?.like?.find((element) => element == myID);

  if (found !== undefined) {
    notify("error", "You already like this post");
    return false;
  }

  if (myID == movieObj?.from_user._id) {
    notify("error", "You can not like your post");
    return false;
  } else movieObj?.like?.push(myID);
  updatePosts(postID, movieObj);

  onrecommendPost(postID, (res) => {
    if (res.success) {
      notify("success", res.msg);
    } else notify("error", res.msg);
  });
};

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;
const myLoader = ({ src }) => {
  return src;
};
function Post(item, { index }, location) {
  const postID = item._id;
  console.log(location);
  console.log(item.from_user.id);
  return (
    <List.Item
      key={index}
      actions={[
        item?.type == "post" ? (
          <IconText
            text={item?.like ? item.like.length : 0}
            onClick={recommendPost(postID)}
            key="list-vertical-like-o"
          />
        ) : (
          ""
        ),
      ]}
    >
      <Skeleton avatar title={false} loading={item?.loading} active>
        {item.from_user.id !== location._id ? (
          <List.Item.Meta
            avatar={
              <Avatar src={avatarurl + item?.from_user?.avatar} size={64} />
            }
            title={
              <>
                <span className="custom-userName">
                  {item?.from_user?.realname?.first +
                    " " +
                    item?.from_user?.realname?.last}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </span>
                <span className="custom-shoutout-text">
                  {item?.type !== "post" ? item.other_content : ""}
                </span>
                <span className="custom-shoutout-text">
                  <a
                    className="custom-touser-text"
                    onClick={() =>
                      window.open(
                        baseUrl + "/profile/" + item.to_user._id + "/activity",
                        "_blank"
                      )
                    }
                  >
                    @{item?.to_user?.username}
                  </a>
                </span>
                <br />
                <a
                  onClick={() =>
                    window.open(
                      baseUrl + "/profile/" + item.from_user._id + "/activity",
                      "_blank"
                    )
                  }
                >
                  @{item?.from_user?.username}
                </a>
              </>
            }
            description={new Date(item?.createdAt).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
                second: "2-digit",
              }
            )}
          />
        ) : (
          <List.Item.Meta
            avatar={<Avatar src={avatarurl + location?.avatar} size={64} />}
            title={
              <>
                <span className="custom-userName">
                  {item?.from_user?.username}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </span>

                <br />
                <a
                  onClick={() =>
                    window.open(
                      baseUrl + "/profile/" + item.from_user._id + "/activity",
                      "_blank"
                    )
                  }
                >
                  @{item?.from_user?.username}
                </a>
              </>
            }
            description={new Date(item?.createdAt).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
                second: "2-digit",
              }
            )}
          />
        )}

        <div className="custom-list-content">{item.content}</div>
        {item.image ? (
          <div
            className="custom-list-content"
            style={{
              marginTop: 10,
            }}
          >
            <Antimage.PreviewGroup>
              {item.image.map((item1, index) => (
                <Antimage
                  loader={myLoader}
                  width={"25%"}
                  src={imgurl + "/" + item1}
                  key={index}
                />
              ))}
            </Antimage.PreviewGroup>
          </div>
        ) : (
          ""
        )}
      </Skeleton>
    </List.Item>
  );
}
export default connect(undefined, undefined)(Post);
