// USING COMMON JS SYNTAX TO IMPORT THE JSON BECAUE THIS IS RUNNING SERVER-SIDE
const { djEvents } = require("./dj-events.json");

export default (req, res) => {
	if (req.method === "GET") {
		res.status(200).json(djEvents);
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `METHOD [ ${req.method} ] IS NOT ALLOWED` });
	}
};
