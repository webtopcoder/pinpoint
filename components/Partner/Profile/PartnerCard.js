import IconText from "@/components/Layout/icontext";
import { Avatar, Card, Col, Divider, Rate, Row, Space, Tag } from "antd";
import Link from "next/link";
import {
  EnvironmentFilled,
  MessageOutlined,
  LikeOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const PartnerCard = ({ location }) => {
  const router = useRouter();
  const { profile } = router.query;

  const [rating, setRating] = useState(location.rating ?? 0);

  return (
    <Link href={`/profile/${profile}/locations/${location._id}`}>
      <Card
        style={{
          color: "white",
          cursor: "pointer",
        }}
        headStyle={{
          color: "white",
          textAlign: "center",
        }}
        title={location.name}
        className="partner-locations-card"
      >
        <Row
          gutter={16}
          style={{
            textAlign: "center",
          }}
        >
          <Col span={24}>
            <Link href={`/profile/${profile}/locations/${location._id}`}>
              <Avatar
                style={{ border: "3px solid black", cursor: "pointer" }}
                size={100}
                icon={location.avatar ? location.avatar : <EnvironmentFilled />}
              />
            </Link>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            textAlign: "center",
          }}
        >
          <Col className="gutter-row" span={12}>
            <IconText
              icon={
                <LikeOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              }
              text={
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                  }}
                >
                  {location.likeCount ?? 0}
                </Text>
              }
              key="list-vertical-like-o"
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <IconText
              icon={
                <MessageOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              }
              text={
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                  }}
                >
                  {location.reviewCount ?? 0}
                </Text>
              }
              key="list-vertical-message"
            />
          </Col>
        </Row>
        <Divider
          style={{
            borderColor: "white",
          }}
          dashed
        >
          <Tag style={{}} color={location.isActive ? "#87d068" : "#ff4d4f"}>
            {location.isActive ? "Active" : "Inactive"}
          </Tag>
        </Divider>
        <Col
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <Space direction="vertical" className="gutter-row" span={24}>
            <Space>
              <Text
                style={{
                  color: "white",
                }}
              >
                {location.location}
              </Text>
            </Space>
            <Space>
              <Text
                style={{
                  color: "white",
                }}
              >
                last seen {location.lastSeen}
              </Text>
            </Space>
            <Space>
              <Rate
                allowHalf
                defaultValue={2}
                tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                onChange={(value) => setRating(value)}
                value={rating}
              />
            </Space>
          </Space>
        </Col>
      </Card>
    </Link>
  );
};
export default connect(undefined, undefined)(PartnerCard);
