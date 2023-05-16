import { Button, Col, Form, Mentions, Rate, Row } from "antd";
import Image from "next/image";
import { UploadOutlined } from "@ant-design/icons";
function PostForm({ form, onFinish, mentionOptions, rate }) {
  const [rating, setRating] = useState(0);
  return (
    <div className="avatar-area green-color">
      <div className="avatar-respond">
        <div className="pin-post-header-section">
          <div className="pin-post-label">
            <p className="comment-notes">
              <span id="email-notes">Let us know what you think!</span>
            </p>
          </div>
          <div className="pin-post-logo">
            <Image src={food} alt="blog-details" width={50} height={70} />
          </div>
        </div>
        <div className="avatar-form">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  name="message"
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
                  <Mentions
                    rows={7}
                    style={{
                      width: "100%",
                    }}
                    placeholder="input @ to mention user"
                    prefix={["@"]}
                    options={mentionOptions}
                  />
                </Form.Item>
                <Form.Item name="fileupload">
                  <Row>
                    <Col span={8}>
                      <Button
                        icon={<UploadOutlined />}
                        style={{ marginRight: 10 }}
                      >
                        Click to Upload
                      </Button>
                    </Col>
                    {rate ? (
                      <Col span={5} offset={2}>
                        <Rate
                          allowHalf
                          defaultValue={2}
                          tooltips={[
                            "terrible",
                            "bad",
                            "normal",
                            "good",
                            "wonderful",
                          ]}
                          onChange={setRating}
                          value={rating}
                        />
                      </Col>
                    ) : (
                      ""
                    )}
                    <Col span={8} offset={1}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-submit"
                        style={{
                          display: "initial",
                          float: "right",
                          height: 50,
                          padding: "10px 40px",
                        }}
                      >
                        POST
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect(undefined, undefined)(PostForm);
