const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://abev-react.envytheme.com"
		: "http://192.168.116.126:8080";

export default baseUrl;