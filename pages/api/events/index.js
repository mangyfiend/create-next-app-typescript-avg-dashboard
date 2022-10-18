const events = require("events.json");

export default (req, res) => {
	res.status(200).json(events);
};
