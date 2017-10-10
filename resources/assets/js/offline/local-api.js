const routes = [];

const add = (method, endpoint, act, refresh) => {
	routes.push({
		method,
		endpoint,
		act,
		refresh
	});
};

const route = (request) => {
	let route = routes.find(route => {
		let endpoint = route.endpoint.replace(/\//g, "\\/").replace(/{\w+}/g, "\\w+");
		let matches = request.url.match(new RegExp(".*" + endpoint + ".?", "ig"));
		let urlMatched = "";
		if (matches) urlMatched = matches[0];
		return route.method == request.method && urlMatched == request.url;
	});

	if (route) {
		let params = route.endpoint.match(/{\w+}/g);
		if (params) params = params.map(function(param) { return param.replace("{","").replace("}", "") });
		let endpoint = route.endpoint.replace(/\//g, "\\/").replace(/{\w+}/g, "(\\w+)");
		let regex = new RegExp(".*" + endpoint + ".?", "i");
		let values = regex.exec(request.url);

		route.values = {};
		for(let i in params) {
			let param = params[i];
			route.values[param] = values[parseInt(i)+1];
		}
    }

	return route;
};

const refresh = (request, response) => {
	return new Promise((resolve, reject) => {
		let r = route(request);

		if (r) {
			resolve(r.refresh(request, r.values, response));
		}

		reject(new Error("Can't handle the request"));
	});
};

const act = (request) => {
	return new Promise((resolve, reject) => {
		let r = route(request);

		if (r) {
			resolve(r.act(request, r.values));
		}

		reject(new Error("Can't handle the request"));
	});
};

export default {
	add,
	refresh,
	act
}


/*
############ EXAMPLE #################

add("GET", "users", () => {
  console.log("GG");
  return new Response();
}, () => {
  
});

add("PUT", "users/{id}", () => {
  
}, () => {
  
});

add("GET", "users/{user}/books/{book}", () => {
  
}, () => {
  
});

add("GET", "users/{id}", () => {
  
}, () => {
  
});

add("GET", "users/{id}/books", () => {
  
}, () => {
  
});

let request = {
  method: "GET",
  url: "http://localhost/api/users/"
}
act(request).then(response => {
  console.log(response);
  console.log("FINISHED");
});



// CODE TO BE USED

request.text().then(body => {
	const options = {method: request.method};
	if (body) {
		options.body = body;
	}
	const ShadowRequest = new Request(request.url, options);
});

function respond(data) {
	return new Response(JSON.stringify(data), { headers: {'content-type': 'application/json'} });
}


*/
