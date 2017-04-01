projectList.filter('sortByBudget', [
	sortByBudgetFn
]);

function sortByBudgetFn(){

	return function(arr, order){
		
		angular.forEach(arr, function(value, key) {
   			arr[key]['amt.pledged'] = parseInt(value['amt.pledged']);
		});

		var result = [], arrayLength = arr.length;
		var temp = 10;

		while(result.length != arrayLength && temp != 0) {
			temp = 0, keys = [];
			
			angular.forEach(arr, function(item){
				if(item['amt.pledged'] > temp){
					temp = item['amt.pledged'];
				}
			});
		
			angular.forEach(arr, function(item, key){
				if(item['amt.pledged'] === temp){
					result.push(item);
					keys.push(key);
				}
			});
			
			var indexSetter = 0;
			angular.forEach(keys, function(item){
				arr.splice(item-indexSetter++,1);
			});
		}
		
		if (order === 'lowToHigh') {
			return result.reverse();	
		} else {
			return result;	
		}
		
	};
};