const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://localhost:8080"
		: "http://localhost:3000";

export default baseUrl;