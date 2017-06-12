import Facebook from './Facebook';
import FacebookURL from './FacebookURL';
import BuildTemplate from './BuildTemplate';

// Facebook Template
const fbTemplate = document.querySelector('#facebook').innerHTML;
const fbOutput = document.querySelector('#output-facebook');

const button = document.querySelector('#facebook-btn');

const APP = {
	facebook: null,

	origin: null,

	WebApp() {
		this.origin = 'webapp';
		this.facebook = new FacebookURL();
	},

	Desktop() {
		this.origin = 'desktop';
		this.facebook = new Facebook();
	},

	initEvents() {
		button.addEventListener('click', this.handleClick.bind(this), false);
	},

	handleClick() {
		const facebook = this.facebook;

		if (this.origin === 'webapp') {
			facebook.checkUrl();

			facebook.on('webapp_data', () => {
				const obj = facebook.getUserData();
				obj.photo = obj.picture.data.url;

				BuildTemplate(fbTemplate, obj, fbOutput);
			});
		} else {
			facebook.getStatus();

			facebook.on('token', () => {
				const tokenTemplate = document.querySelector('#token').innerHTML;
				const obj = facebook.getToken();
				const tokenOutput = document.querySelector('#output-token');

				BuildTemplate(tokenTemplate, obj, tokenOutput);
			});

			facebook.on('user_profile', () => {
				const obj = facebook.getProfile();
				BuildTemplate(fbTemplate, obj, fbOutput);
			});
		}

	}
};

export default APP;