angular.module('SaltyBits', ['ui.router'])

angular.module('SaltyBits')
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('main', {url: '/', templateUrl: 'resources/partials/main.html', controller: 'FileCtrl as FileCtrl'})
			.state('encrypt', {url: '/encrypt', templateUrl: 'resources/partials/encrypt.html', controller: 'EncryptCtrl as EncryptCtrl'})
			.state('decrypt', {url: '/decrypt', templateUrl: 'resources/partials/decrypt.html', controller: 'DecryptCtrl as DecryptCtrl'})
	});

// Create a reference to the selected file that persists throughout controllers

angular.module('SaltyBits')
	.factory('FileFactory', function() {
		doc = document.getElementById("userFile");
		password = document.getElementById('inputPassword').value;
		return {
			storePass : function(){
				return password
			},
			findInput : function(){
				return doc
			}
		}
	})

angular.module('SaltyBits')
	.controller('FileCtrl', [
		'FileFactory',
		'$scope',
		'$location',
		FileCtrl
	])

function FileCtrl (FileFactory, scope, location) {
	window.sb = this
	this.file = FileFactory.findInput()
	this.fileName = ""
	this.hideForm = true
	this.fileSelect = function () {
		console.log("file selected");
		this.hideForm = false
	}

	this.goForItE = function(){
		FileFactory.storePass()
		location.path('/encrypt');
		// return true;
	}
	this.goForItD = function(){
		FileFactory.storePass()

		var reader = new FileReader()
		reader.onload = function(e){
			var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
				.toString(CryptoJS.enc.Latin1);

			if (!/^data:/.test(decrypted)){
				alert("Invalid pass phrase or file! Please try again.");
				return false;
			}
		};
		location.path('/decrypt');
		// return true;
	}
}

angular.module('SaltyBits')
	.controller('EncryptCtrl', [
		'FileFactory',
		EncryptCtrl
	])

function EncryptCtrl (FileFactory) {
	document.getElementById("wrapper").className = "content encryptStyle";
	this.file = FileFactory.findInput();

	var file = this.file.files[0],
	// password = "jhgk",
	password = FileFactory.storePass(),
	reader = new FileReader(),
	dBtn = $('a.download');

	// Encrypt
	// console.log(dBtn)
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

angular.module('SaltyBits')
	.controller('DecryptCtrl', [
		'FileFactory',
		DecryptCtrl
	])

function DecryptCtrl (FileFactory) {
	document.getElementById("wrapper").className = "content decryptStyle";
	this.file = FileFactory.findInput();

	var file = this.file.files[0],
	password = FileFactory.storePass(),
	reader = new FileReader(),
	dBtn = $('a.download');

	// Decrypt

	reader.onload = function(e){

		var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
		.toString(CryptoJS.enc.Latin1);

		if (!/^data:/.test(decrypted)){
			alert("Invalid pass phrase or file! Please try again.");
			return false;
		}

		dBtn.attr('href', decrypted);
		dBtn.attr('download', file.name.replace('.encrypted',''));

		//GOTO DOWNLOAD VIEW
	};

	reader.readAsText(file);
}
