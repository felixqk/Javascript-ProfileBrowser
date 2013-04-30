//Define Profile Model

var Profiles = function(){
};

Profiles.prototype = {
	//for future usages
	getAll: function() {
		return data;
	},
	//Model provide a general way of sorting data
	getAllsortBy: function(property) {
		return data.sort(function (a,b) {
			return result = (a[property]<b[property])? -1: (a[property]>b[property])?1:0;
		});
	},
	//for future usages
	findbyID: function(id) {

	}
};



