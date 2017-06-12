import EventEmitter from 'events';
import axios from 'axios';

class FacebookURL extends EventEmitter {
	constructor() {
		super();

		this.appId = '136721383558088';
		this.redirect_uri = window.location.href;
		this.userData = null;
	}

	login() {
		const login_url = `https://m.facebook.com/v2.3/dialog/oauth?client_id=${this.appId}&response_type=token,signed_request&redirect_uri=${this.redirect_uri}&scope=public_profile,email`;

    window.open(login_url, '_self');
	}

	checkUrl() {
		const URL = window.location.href;

		if (URL.includes('access_token')) {
			let token = URL.split('&')[1].replace('access_token=', '');
			this.makeRequest(token);
		} else {
			this.login();
		}
	}

	makeRequest(token) {
    const fbUrl = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`;

    axios.get(fbUrl).then(this._handleSuccess.bind(this)).catch(this._handleError.bind(this));
	}

	_handleSuccess(res) {
		this.userData = res.data;
		this.emit('webapp_data');
	}

	_handleError(err) {
		throw new Error(`Error: ${err}`);
	}

	getUserData() {
		return this.userData;
	}
};

export default FacebookURL;