import { Avatar, Card, Rate, Row, Space } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
import { connect } from "react-redux";

const { Text } = Typography;

function PartnerLocationCard({ location }) {
  return (
    <Card
      hoverable
      className="banner"
      style={{
        backgroundColor: "#2F2F2F",
        margin: "60px 16px",
        marginTop: "100px",
        position: "relative",
      }}
      bodyStyle={{
        paddingBottom: "5px",
      }}
      bordered={false}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row
          justify={"space-between"}
          style={{
            height: "100px",
            marginTop: "20px",
          }}
        >
          <Rate
            allowHalf
            disabled
            defaultValue={2}
            tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
            value={location.rating}
          />
          <Space direction="vertical">
            <Text
              style={{
                marginTop: "30px",
                fontSize: "20px",
                color: "#fff",
              }}
              strong
            >
              {location.name}
            </Text>
          </Space>

          <Space
            wrap
            style={{
              alignItems: "top",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                height: "15px",
                width: "15px",
                backgroundColor: location.isActive ? "#05ff00" : "#ff0000",
                borderRadius: "50%",
              }}
            />
            <Text style={{ color: "#fff" }}>{location.location}</Text>
          </Space>
        </Row>

        <Text style={{ color: "#fff", textAlign: "center" }}>
          {location.description ?? "Description of the location"}
        </Text>

        <Text
          strong
          style={{
            color: "#fff",
            textAlign: "center",
            paddingTop: "20px",
          }}
        >
          Mexican, Pinpoint Favorite, Cheap Eats, Late Night
        </Text>

        <Avatar
          style={{
            border: "3px solid black",
            position: "absolute",
            top: "-28%",
            right: "45%",
          }}
          size={100}
          icon={
            location.profilePhoto ? (
              location.profilePhoto
            ) : (
              <EnvironmentFilled />
            )
          }
        />
      </div>
    </Card>
  );
}
export default connect(undefined, undefined)(PartnerLocationCard);
