
import sendGrid from '@sendgrid/mail';
import { Handler, HandlerEvent } from '@netlify/functions';
const { SENDGRID_API_KEY, RECEIVER_EMAIL, SENDER_EMAIL } = process.env;

export const handler: Handler = async (event: HandlerEvent) => {
	sendGrid.setApiKey(SENDGRID_API_KEY || '');
	const formData = event.body && JSON.parse(event.body);


	// NOTE: THIS IS NOT SECURE. YOU NEED TO SANITIZE THE INPUTS
	const data = {
		to: RECEIVER_EMAIL || '',
		from: {
			email: SENDER_EMAIL || '',
			name: formData.lastname
		},
		subject: `HediK Contact - ${formData.subject}`,
		html: `
			<p>From ${formData.firstname} ${formData.lastname} - ${formData.email}</p>
			<p>${formData.message}</p>
		`,
	};

	try {
		await sendGrid.send(data);
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				msg: 'Message sent successfully',
			}),
		};
	} catch (err) {
		return {
			statusCode: err.code,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ msg: err.message }),
		};
	}
};
