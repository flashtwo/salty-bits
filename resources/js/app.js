angular.module('SaltyBits', ['ui.router'])

angular.module('SaltyBits')
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('main', {url: '/main', templateUrl: 'resources/partials/main.html', controller: 'FileCtrl as FileCtrl'})
			.state('encrypt', {url: '/encrypt', templateUrl: 'resources/partials/encrypt.html', controller: 'EncryptCtrl as EncryptCtrl'})
			.state('decrypt', {url: '/decrypt', templateUrl: 'resources/partials/decrypt.html', controller: 'DecryptCtrl as DecryptCtrl'})
			.state('download', {url: '/download', templateUrl: 'resources/partials/download.html'})
	});

// Create a reference to the selected file that persists throughout controllers

angular.module('SaltyBits')
	.factory('FileFactory', function() {
		doc = document.getElementById("userFile")
		return {
			findInput : function(){
				return doc
			}
		}
	})

angular.module('SaltyBits')
	.controller('FileCtrl', [
		'FileFactory',
		'$scope',
		FileCtrl
	])

function FileCtrl (FileFactory, scope) {
	window.sb = this
	this.file = FileFactory.findInput()
	this.fileName = ""
	this.hideForm = true
	this.fileSelect = function () {
		console.log("file selected");
		this.hideForm = false
	}
}

angular.module('SaltyBits')
	.controller('EncryptCtrl', [
		'FileFactory',
		EncryptCtrl
	])

function EncryptCtrl (FileFactory) {
	this.file = FileFactory.findInput();

	var file = this.file.files[0],
	password = 'hahahaha',
	reader = new FileReader(),
	dBtn = $('a.download');

	// Encrypt

	reader.onload = function(e){

		// Use the AES cypher from the CryptoJS library to encrypt the contents of the file

		var encrypted = CryptoJS.AES.encrypt(e.target.result, password);

		// Prepare downloadable file

		dBtn.attr('href', 'data:application/octet-stream,' + encrypted);
		dBtn.attr('download', file.name + '.encrypted');

		//GOTO DOWNLOAD VIEW
	};

	// Encode to data-uri

	reader.readAsDataURL(file);
	// if (this.file.length == 1)
	// 	!this.dbtn;
}

// angular.module('SaltyBits')
// 	.controller('DecryptCtrl', [
// 		DecryptCtrl
// 	])
//
// function DecryptCtrl () {
// 	// Decrypt
//
// 	reader.onload = function(e){
//
// 		var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
// 		.toString(CryptoJS.enc.Latin1);
//
// 		if (!/^data:/.test(decrypted)){
// 			alert("Invalid pass phrase or file! Please try again.");
// 			return false;
// 		}
//
// 		a.attr('href', decrypted);
// 		a.attr('download', file.name.replace('.encrypted',''));
//
// 		//GOTO DOWNLOAD VIEW
// 	};
//
// 	reader.readAsText(file);
// }
