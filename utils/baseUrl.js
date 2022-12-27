const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://192.168.116.126:8080"
		: "http://localhost:3000";

export default baseUrl;