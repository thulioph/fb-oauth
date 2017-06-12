class FacebookURL {
	constructor() {
		this.appId = '136721383558088';
		this.redirect_uri = window.location.href;
		this.login_url = `https://m.facebook.com/v2.3/dialog/oauth?client_id=${this.appId}&response_type=token,signed_request&redirect_uri=${this.redirect_uri}&scope=public_profile,email`;
	}

	login() {
    window.open(this.login_url, '_blank');
	}

	checkUrl() {}
};

export default FacebookURL;