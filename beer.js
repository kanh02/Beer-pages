var app = new Vue({
	el: '#app',
	data: {
		Beer: [],
		Beercopy: [],
		name: [],
		description: [],
		images: [],
		search: "",
		contributed_by: "",
		food_pairing:"",
		food_pairing1:"",
		food_pairing2:"",
		fecha:"",
		ingredients:[],
		titulo:""

	},
	created: function () {
		this.getData();
	},
	methods: {
		getData: function () {

			fetch("https://api.punkapi.com/v2/beers", {
				method: "GET",
			}).then(function (response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error(response.statusText);
			}).then(function (json) {
				app.Beer = json;
				app.Beercopy = json;
				console.log(app.Beer);

			}).catch(function (error) {
				console.log("Request failed: " + error.message);
			})
		},
		filteredList: function () {
			this.search = document.getElementById("search").value;
			this.Beer = this.Beercopy.filter(b => {
				return b.name.toLowerCase().includes(this.search.toLowerCase())
			})
		},
		imagenes: function () {
			var name = [];
			var description = [];
			var images = [];
			for (var x = 0; x < app.Beer.length; x++) {
				nombre = app.Beer[x].name;
				name.push(app.Beer[x].name);
				description.push(app.Beer[x].description);
				images.push(app.Beer[x].image_url);
			}
		},
		modal: function (array) {

			for (i = 0; i < app.Beer.length; i++) {
				if (array == app.Beer[i].name) {
					app.titulo=app.Beer[i].name;
					app.food_pairing =app.Beer[i].food_pairing[0];
					app.food_pairing1 =app.Beer[i].food_pairing[1];
					app.food_pairing2 =app.Beer[i].food_pairing[2];
					app.contributed_by = app.Beer[i].contributed_by;
					app.fecha=app.Beer[i].first_brewed;
					app.ingredients=app.Beer[i].ingredients.yeast;
				}
			}
		}
	}
})
