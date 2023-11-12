import { sanityClient } from '@/data/sanity';
import imageUrlBuilder from '@sanity/image-url';

/**
 * A throttle function, mainly used inside Navbar component.
 */
let throttlePause: boolean;
export const throttle = (callback: () => void, time = 200) => {
  if (throttlePause) return;
  throttlePause = true;
  
  setTimeout(() => {
    callback();
    
    throttlePause = false;
  }, time);
};

/**
 * Function to animate a list of element with a delay 'cause i'm lazy to learn a lib for it.
 */
export enum ANIMATION_TYPE {
	SLIDE_IN = 'slideIn',
	FADE_IN = 'fadeIn',
};
export const animateElements = ({ targets, animationType, delay = 180 }: {
	targets: NodeListOf<Element>;
	animationType: ANIMATION_TYPE;
	delay?: number;
}) => {
	const animations = {
		[ANIMATION_TYPE.SLIDE_IN]: 'animated-slideIn',
		[ANIMATION_TYPE.FADE_IN]: 'animated-fadeIn',
	};

	targets.forEach((card, index) => setTimeout(() => card.classList.add(animations[animationType]), delay * index));
};

/**
 * Custom data fetching function, it's hard to not think about you React, love u.
 */
export const useFetch = async ({ url, params }: { url: string; params?: string }) => {
	
	let data = null;
	let error = null;

	try {
		const response = await fetch(`${url}${params}`);
		data = await response.json();
	} catch(err) {
		error = err;
		throw new Error(`Request failed: ${err}`);
	} finally {
		return { data, error };
	};
};

/**
 * Utils provided by Sanity to build an image from the CMS.
 */
export const imageBuilder = imageUrlBuilder(sanityClient);

/**
 * Function to extract the url from the image built by Sanity's utils.
 */
export const urlForImage = (source: string) => imageBuilder.image(source);

/**
 * Helper function to sanitize values sent from clients, thanks SO.
 */
export const sanitize = (value: string) => {
  const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
			'`': '&#x60;',
			'=': '&#x3D;',
  };
  const regexRule = new RegExp(/[&<>"'/`=]/ig);

  return value.replace(regexRule, (match) => map[match]!);
};

/**
 * Custom regex to validate an email.
 */
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'm');
export const isEmailValid = (email: string) => emailRegex.test(email);

/**
 * Custom generic form validator, no idea if i'll re-use it but it's fun.
 */
export const isFormValid = (values: Record<string, string>): {
	isValid: boolean,
	errors: { [key: string]: string },
} => {

		const specialValidation = {
			email: {
				validator: (value: string) => isEmailValid(value),
				errorMessage: 'Your email is invalid, please check it\'s validity.',
			},
			message: {
				validator: (value: string) => !(value.length < 50),
				errorMessage: 'Your message cannot be shorter than 50 characters.',
			},
		};

		const formErrors = Object.entries(values).reduce(
			(errors: { [key: string]: string }, [key, value]) => {

				if (value && value.length < 1) {
					errors[key] = 'This field is required.';
				};

				if (value && value.length < 2) {
					errors[key] = 'The value cannot be shorter than 2 characters.';
				};

				if (key in specialValidation) {
					const specialValidationItem = specialValidation[key as keyof typeof specialValidation];
					if (!(specialValidationItem.validator(value))) {
						errors[key] = specialValidationItem.errorMessage;
					};
				};

				return errors;
			},
			{},
		);
		const formHasError = Object.values(formErrors).some(error => error);

		return { isValid: !(formHasError), errors: formErrors };
};