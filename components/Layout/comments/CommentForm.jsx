import {
  Button, Form, Input
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import useMedia from "@/hooks/useMedia";

const { TextArea } = Input;

const CommentForm = ({ handleSubmit, submitLabel, hasCancelButton = false,
  initialText = "", handleCancel, expand }) => {

  const isWebDevice = useMedia('(min-width:700px)');
  const onFinish = (values) => {
    handleSubmit(values.message);
  }
  return (

    <Form
      hidden={expand}
      onFinish={onFinish}
      layout="inline"
      autoComplete="off"
      initialValues={{
        message: initialText
      }}
    >
      <Form.Item
        name="message"
        style={
          { width: isWebDevice ? '80%' : '60%' }
        }
        rules={[
          {
            required: true,
            message: "Please input Message!",
          },
          {
            whitespace: true,
            message: "Please input Message!",
          },
        ]}
      >
        <TextArea style={{
          height: 50,
          resize: 'none'
        }} rows={3} placeholder="Write Comment"
          maxLength={100} />
      </Form.Item>
      <Button type="primary" htmlType="submit"
        style={{
          display: "initial",
          float: "right",
          height: 50,

        }} icon={<SendOutlined />}>
        {submitLabel}
      </Button>

      {hasCancelButton && (
        <Button
          type="primary"
          className="btn-submit"
          style={{
            display: "initial",
            float: "right",
            height: 50,
            padding: "10px 40px",
          }}
          onClick={handleCancel}
        >
          cancel
        </Button>
      )}
    </Form>
  );
};

export default CommentForm;
