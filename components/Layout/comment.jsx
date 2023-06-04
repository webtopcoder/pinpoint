import { Avatar, Button, List, Space, Typography, Input } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const { Text } = Typography;
const {TextArea} = Input

const Comment = ({ author, avatar, content, datetime }) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar src={avatar} alt={author} />}
      // title={author}
      description={content}
    />
    <Space>
      <Text type="secondary">{datetime}</Text>
    </Space>
  </List.Item>
);

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Space direction="vertical">
      <TextArea rows={4} onChange={onChange} value={value} />
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Space>
  </>
);

const App = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments((prevComments) => [
        ...prevComments,
        {
          author: 'Han Solo',
          avatar: 'https://api.thepinpointsocial.com/direction.png',
          content: <p>{value}</p>,
          datetime: moment('2016-11-22').fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        author="Han Solo"
        avatar="https://joeschmoe.io/api/v1/random"
        content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
        datetime={moment('2016-11-22').fromNow()}
      />
    </>
  );
};

export default App;
