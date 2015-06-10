var app = angular.module('votingapp', []);
// angular.module('votingapp')
//     .filter('to_trusted', ['$sce', function($sce){
//         return function(text) {
//             return $sce.trustAsHtml(text);
//         };
//     }]);
app.controller('main_controller', function($scope) {
	$scope.items=[];
	$scope.init = function()
	{	
		$scope.ws = new WebSocket('wss://example.com/');
		console.log(JSON.stringify($scope.ws));
	    $scope.ws.onmessage = $scope.message_handler;
	    $scope.ws.onclose = function (error) {
  			setTimeout(function(){	$scope.init();	},10000);
		};

		$.ajax({ url: '/get_list/',
			type: 'GET',
			error: function() { alert("failed to get  list");      	},
			success: function(response){
				
				obj= JSON.parse(response);
				
				$scope.items=obj;
				$scope.$apply();
	
			}
		})
	}
});