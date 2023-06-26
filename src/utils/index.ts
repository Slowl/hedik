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
 * Function to animate a list of element with a delay.
 */
export enum ANIMATION_TYPE {
	SLIDE_IN = 'slideIn',
	FADE_IN = 'fadeIn',
}
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
 * Custom data fetching function.
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

		return { data, error }
	}
}