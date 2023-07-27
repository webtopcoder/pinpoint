import { LikeOutlined, MessageOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import {
    Space,
    Typography,
    Button,
} from "antd";
import React, { useEffect, useState } from "react";
import Comments from "@/components/Layout/comments/CommentsAll";

const { Text } = Typography;

const IconText = ({ icon, postID, text, likePost }) => {
    const [like, setLike] = useState(text);
    useEffect(() => {
        setLike(text);
    }, [text]);
    return (
        <Space style={{
            marginRight: 20,
            marginTop: 20
        }}>
            <Button
                type="primary"
                onClick={() => {
                    likePost(postID, (liked) => {
                        if (liked) {
                            setLike((like) => like + 1);
                        } else {
                            setLike((like) => (like ? like - 1 : like));
                        }
                    });
                }}
                shape="circle"
                icon={icon}
            />
            <Text>{like}</Text>
        </Space>
    );
};

const CommentBody = ({ item, likePost, user_id, path }) => {
    const [commentCount, setCommentCount] = useState(item.comment ? item?.comment : 0);
    const [expand, setExpand] = useState(true);
    const [expandComments, setExpandComments] = useState(false);

    return (
        <>
            <div
                className="custom-list-content"
                style={{
                    marginTop: 10,
                }}
            >
                <IconText
                    postID={item._id}
                    text={item.like ? item?.like?.count : 0}
                    likePost={likePost}
                    icon={<LikeOutlined />}
                    key="list-vertical-like-o"
                />
                <Space style={{
                    marginRight: 20,
                    marginTop: 20
                }}>
                    <Button
                        type="primary"
                        shape="circle"
                        onClick={() => {
                            setExpand(!expand);
                        }}
                        icon={<MessageOutlined />}
                    />
                    <Text>{commentCount}</Text>
                </Space>
                <Space
                    hidden={commentCount === 0 ? true : false}
                    style={{
                        float: 'right',
                        marginTop: 20
                    }}
                >
                    <Button type="link"
                        onClick={() => {
                            setExpandComments(!expandComments);
                        }}
                        block>
                        {expandComments ? <UpOutlined /> : <DownOutlined />}
                        View Comments
                    </Button>
                </Space>
            </div>
            <Comments currentUserId={user_id} path={path} ownerId={item.from._id} expand={expand} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="post" id={item._id} />
        </>
    );
};

export default CommentBody;
