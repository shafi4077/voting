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
		$scope.ws = new WebSocket(chat_uri);
		$scope.ws.onmessage = $scope.message_handler;
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
	$scope.add_item = function(user,item){
		if (item){
			$.ajax({ url: '/create_item/',
		        type: 'GET',
		        data: {	item_title: item},
		        error: function() {
		         	alert("Oops...", "failed", "error");
		        },
		        success: function(res) {

		        	for (var i = 0; i < res.length; i++) {
					    $scope.ws.send(JSON.stringify(
						{	"chat_type":"individual",
						 	"sender":user,
						 	"reciever":String(res[i]),
						 	"content":{
						 		"type":"text",
						 		"data":item},
						 	"temp_id":1736
						}));
					}
		        	
		        	
		        }
			});
			
			
		}
	}
	$scope.vote = function(state,id){
		$.ajax({ url: '/vote/',
			type: 'GET',
			data: {	state:state,id:id},
			error: function() { alert("failed to vote");      	},
			success: function(res){
				for (var i = 0; i < res.length; i++) {
					    $scope.ws.send(JSON.stringify(
						{	"chat_type":"individual",
						 	"sender":String(res[i]),
						 	"reciever":String(res[i]),
						 	"content":{
						 		"type":"text",
						 		"data":id},
						 	"temp_id":1736
						}));
					}
			}
		})
	}
	$scope.message_handler = function(evt){
  		//msg = JSON.parse(evt.data);
  		//alert(JSON.stringify(msg));
  		$.ajax({ url: '/get_list/',
			type: 'GET',
			success: function(response){
				obj= JSON.parse(response);
				$scope.items=obj;
				$scope.$apply();
			}
		})
	}
	// setTimeout(function(){
 //   	$scope.ws.send(JSON.stringify({"chat_type":"individual","organization":"557545be42745216a2e054c1","sender":"2","reciever":"3","content":{"type":"text","data":"automated message from 2 to 3"},"temp_id":1736}));
	// }, 10000);
});