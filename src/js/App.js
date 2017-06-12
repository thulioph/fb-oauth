import Facebook from './Facebook';
import FacebookURL from './FacebookURL';
import BuildTemplate from './BuildTemplate';

const button = document.querySelector('#facebook-btn');

const APP = {
	facebook: null,

	origin: null,

	WebApp() {
		this.origin = 'webapp';
		this.facebook = new FacebookURL(window.FB);

		button.addEventListener('click', this.handleClick.bind(this), false);
	},

	Desktop() {
		this.origin = 'desktop';
		this.facebook = new Facebook();

		button.addEventListener('click', this.handleClick.bind(this), false);
	},

	handleClick() {
		const facebook = this.facebook;

		if (this.origin === 'webapp') {
			facebook.login();
		} else {
			facebook.getStatus();
		}

		facebook.on('token', () => {
			const tokenTemplate = document.querySelector('#token').innerHTML;
			const obj = facebook.getToken();
			const tokenOutput = document.querySelector('#output-token');

			BuildTemplate(tokenTemplate, obj, tokenOutput);
		});

		facebook.on('user_profile', () => {
			const fbTemplate = document.querySelector('#facebook').innerHTML;
			const obj = facebook.getProfile();
			const fbOutput = document.querySelector('#output-facebook');

			BuildTemplate(fbTemplate, obj, fbOutput);
		});
	}
}

export default APP;