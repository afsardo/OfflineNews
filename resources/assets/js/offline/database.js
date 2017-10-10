export default {

	getAll(entity)  {
		return new Promise((resolve, reject) => {
			resolve([
				{
					id: 1,
					title: "Title 1",
					content: "There is a long story to be told in this article."
				},
				{
					id: 2,
					title: "Title 2",
					content: "There is a long story to be told in this article."
				},
				{
					id: 3,
					title: "Title 3",
					content: "There is a long story to be told in this article."
				},
				{
					id: 4,
					title: "Title 4",
					content: "There is a long story to be told in this article."
				}
			]);
		});
	},

	get(entity, id) {
		return new Promise((resolve, reject) => {
			resolve({
				id: id,
				title: "News title",
				content: "There is a long story to be told in this article."
			});
		});
	},

	insert(entity, data) {
		return new Promise((resolve, reject) => {
			let id = (new Date()).getTime();
			data.id = id;

			resolve(data);
		});
	},

	update(entity, id, partialData) {
		return new Promise((resolve, reject) => {
			let data = {
				id: id,
				title: "News title",
				content: "There is a long story to be told in this article."
			};

			partialData.keys().forEach(key => {
				data[key] = partialData[key];
			});

			resolve(data);
		});
	}

}