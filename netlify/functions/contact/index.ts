
import sendGrid from '@sendgrid/mail';
import { Handler, HandlerEvent } from '@netlify/functions';
const { SENDGRID_API_KEY, RECEIVER_EMAIL, SENDER_EMAIL } = process.env;
import { isFormValid } from '../../../src/utils';

export const handler: Handler = async (event: HandlerEvent) => {
	sendGrid.setApiKey(SENDGRID_API_KEY || '');
	const formData = event.body && JSON.parse(event.body);
	const formValidity = isFormValid(formData);

	const data = {
		to: RECEIVER_EMAIL || '',
		from: {
			email: SENDER_EMAIL || '',
			name: `${formData.firstname} ${formData.lastname}`
		},
		subject: `HediK - ${formData.subject}`,
		html: `
			<p>From ${formData.firstname} ${formData.lastname} - ${formData.email}</p>
			<p>Message:</p>
			${formData.message}
		`,
	};

	if (formValidity.isValid) {
		try {
			await sendGrid.send(data);
	
			return {
				statusCode: 200,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					status: 200,
					response: 'Message sent successfully.',
				}),
			};
		} catch (error) {
			return {
				statusCode: error.code,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					status: error.code,
					response: `An error occured: ${error.message}`
				}),
			};
		};
	} else {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				status: 400,
				response: 'The message is invalid and was not sent.',
				errors: formValidity.errors,
			}),
		};
	}
};
