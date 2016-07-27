angular.module('SaltyBits', ['ui.router'])

angular.module('SaltyBits')
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('main', {url: '/main', templateUrl: 'resources/partials/main.html', controller: 'FileCtrl as FileCtrl'})
			.state('encrypt', {url: '/encrypt', templateUrl: 'resources/partials/encrypt.html'})
			.state('decrypt', {url: '/decrypt', templateUrl: 'resources/partials/decrypt.html'})
			.state('download', {url: '/download', templateUrl: 'resources/partials/download.html'})
	});

angular.module('SaltyBits')
	.factory('FileFactory', function() {
		return {
			findInput : function(){
				return document.getElementById("userFile")
			}
		}
	})

angular.module('SaltyBits')
	.controller('SBCtrl', [
		SBCtrl
	])

function SBCtrl () {

}

angular.module('SaltyBits')
	.controller('FileCtrl', [
		'FileFactory',
		FileCtrl
	])

function FileCtrl (FileFactory) {
	window.sb = this
	this.control = FileFactory.findInput()
	console.log(this)
}
