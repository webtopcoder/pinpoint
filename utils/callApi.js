import axios from "axios";
import config from "./config";

export default async function callAPI(endpoint, method = "get", data, params) {
  let token = "";
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  const configs = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${config.baseURL}/${endpoint}`,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return new Promise((resolve, reject) => {
    axios(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  // return res.data
}
