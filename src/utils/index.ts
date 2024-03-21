
import { sanityClient } from '@/data/sanity';
import imageUrlBuilder from '@sanity/image-url';

//#region THROTTLE FUNCTION
let throttlePause: boolean;
/**
 * A throttle function, mainly used inside Navbar component.
 */
export const throttle = (callback: () => void, time = 200) => {
  if (throttlePause) return;
  throttlePause = true;
  
  setTimeout(() => {
    callback();
    
    throttlePause = false;
  }, time);
};
//#endregion

//#region ANIMATE ELEMENTS
export enum ANIMATION_TYPE {
	SLIDE_IN = 'slideIn',
	FADE_IN = 'fadeIn',
};
/**
 * Function to animate a list of elements with a delay, usefull when used with Intersection Observer API.
 */
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
//#endregion

//#region FETCH FUNCTION
/**
 * Custom data fetching function, using the Fetch API.
 */
export const useFetch = async ({ url, params }: { url: string; params?: string }) => {
	
	let data = null;
	let error = null;

	try {
		const response = await fetch(`${url}${params ? `?${params}` : ''}`);
		data = await response.json();
	} catch(e) {
		error = e;
		throw new Error(`Request failed: ${error}`);
	} finally {
		return { data, error };
	};
};
//#endregion

//#region SANITY UTILS
/**
 * Utils provided by Sanity to build an image from the CMS.
 */
export const imageBuilder = imageUrlBuilder(sanityClient);

/**
 * Function to extract the url from the image built by Sanity's utils.
 */
export const urlForImage = (source: string) => imageBuilder.image(source);
//#endregion

//#region SANITIZER FUNCTION
/**
 * Function to sanitize user's texts sent from clients.
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
//#endregion 

//#region FORM VALIDATOR
/**
 * Function to validate an email.
 */
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'm');
export const isEmailValid = (email: string) => emailRegex.test(email);

/**
 * Custom generic form validator function, built to be reused for any forms.
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
				}

				if (value && value.length < 2) {
					errors[key] = 'The value cannot be shorter than 2 characters.';
				}

				if (key in specialValidation) {
					const specialValidationItem = specialValidation[key as keyof typeof specialValidation];
					if (!(specialValidationItem.validator(value))) {
						errors[key] = specialValidationItem.errorMessage;
					}
				}

				return errors;
			},
			{},
		);
		const formHasError = Object.values(formErrors).some(error => error);

		return { isValid: !(formHasError), errors: formErrors };
};
//#endregion 

//#region CONSTANTS
/**
 * A dictionnary of icons based on values coming from Sanity data.
 */
export const languageIcon: { [key: string]: { name: string; icon: string; } } = {
	'javascript': {
		name: 'javascript',
		icon: 'simple-icons:javascript'
	},
	'typescript': {
		name: 'typescript',
		icon: 'simple-icons:typescript'
	},
	'html5': {
		name: 'html5',
		icon: 'simple-icons:html5'
	},
	'css3': {
		name: 'css3',
		icon: 'simple-icons:css3'
	},
	'reactjs': {
		name: 'react.js',
		icon: 'simple-icons:react'
	},
	'nextjs': {
		name: 'next.js',
		icon: 'simple-icons:nextdotjs'
	},
	'astro': {
		name: 'astro',
		icon: 'simple-icons:astro'
	},
	'nodejs': {
		name: 'node.js',
		icon: 'simple-icons:nodedotjs'
	},
	'firebase': {
		name: 'firebase',
		icon: 'simple-icons:firebase'
	},
	'supabase': {
		name: 'supabase',
		icon: 'simple-icons:supabase'
	},
	'redux': {
		name: 'redux.js',
		icon: 'simple-icons:redux'
	},
	'zustand': {
		name: 'zustand',
		icon: 'noto:bear'
	},
	'graphql': {
		name: 'graphql',
		icon: 'simple-icons:graphql'
	},
	'styled-components': {
		name: 'styled-components',
		icon: 'simple-icons:styledcomponents'
	},
	'materialui': {
		name: 'material-ui',
		icon: 'simple-icons:materialdesign'
	},
	'sanity': {
		name: 'sanity',
		icon: 'simple-icons:sanity'
	},
	'strapi': {
		name: 'strapi',
		icon: 'simple-icons:strapi'
	},
	'shell': {
		name: 'shell',
		icon: 'simple-icons:powershell'
	},
};
//#endregion
