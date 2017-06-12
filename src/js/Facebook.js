class Facebook {
	constructor() {
		this.fb_provider = window.FB;
		this.scopes = ['public_profile', 'user_birthday'];
		this.fields = 'id,name,email,picture.height(320),birthday';
	}

	getStatus() {
		this.fb_provider
			.getLoginStatus(this._handleStatus.bind(this));
	}

	login() {
		this.fb_provider
			.login(this._handleLogin.bind(this), {
				scopes: 'public_profile,email'
			});
	}

	getUserData() {
		this.fb_provider
			.api(`/me?fields=${this.fields}`, this._handleApi.bind(this));
	}

	_handleStatus(res) {
		let data = res;

		switch (data.status) {
			case 'not_authorized':
				this.login();
				break;

			case 'connected':
				this.displayToken(data.authResponse);
				this.getUserData();
				break;
		}
	}

	_handleLogin(res) {
		if (res.status === 'not_authorized') {
			this._handleError(res.status);
		} else {
			this.displayToken(res);
			this.getUserData();
		}
	}

	_handleApi(res) {
		res.photo = res.picture.data.url;
		displayTemplate(fbTemplate, res, fbOutput);
	}

	_handleError(err) {
		throw new Error(`Error: ${err}`);
	}

	displayToken(obj) {
		// convert seconds to minutes
		obj.expiresIn = Math.floor(obj.expiresIn / 60);

		displayTemplate(tokenTemplate, obj, tokenOutput);
	}
};

export default Facebook;