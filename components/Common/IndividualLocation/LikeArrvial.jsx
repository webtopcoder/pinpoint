import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import { locationService } from "@/services/index";
import { Tooltip } from "antd";

const LikeArrvial = ({ arrvialID, text, user_id, notify }) => {
  const [like, setLike] = useState(text);
  const isWebDevice = useMedia('(min-width:700px)');
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Tooltip placement="top" title="Like">
      <li className="list-inline-item me-3 float-end"
        onClick={async () => {
          if (!user_id) {
            notify(
              "error",
              "Please login"
            );
            return;
          }
          await locationService.likeArrival(arrvialID)
            .then(async (res) => {
              if (res.liked) {
                setLike((like) => like + 1);
              } else {
                setLike((like) => (like ? like - 1 : like));
              };
            })
            .catch((error) => {
              console.log(error);
              return;
            });
        }}
      >
        <i className="bx bxs-heart me-1 text-danger fs-4 heart-comment" />
        <span className="fs-6 text-danger">{like}</span>
      </li>
    </Tooltip>
  );
};

export default LikeArrvial;
