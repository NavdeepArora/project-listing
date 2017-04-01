projectList.filter('searchForName', [
	searchForNameFn
]);

function searchForNameFn(){

	return function(arr, searchString){

		var result = [], arrayLength = arr.length;
		
		angular.forEach(arr, function(item, key){
			if(item.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1){
				result.push(item);
			}
		});
		return result;
	};
};