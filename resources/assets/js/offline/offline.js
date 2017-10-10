import LocalAPI from './local-api.js';

export default {
	
	canHandle(basePath, request) {
		const url = new URL(request.url);
    	return url.pathname.includes(basePath);
	},

	handle(request) {
		return new Promise((resolve, reject) => {
			if (navigator.onLine) {
				fetch(request).then(response => {
					let clone = response.clone();
					LocalAPI.refresh(request, clone);
					resolve(response);
				}, error => reject(error));
			} else {
				LocalAPI.act(request).then(response => resolve(response), error => reject(error));
			}
		});
	}

};
