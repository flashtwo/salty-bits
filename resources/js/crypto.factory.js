// angular.module('SaltyBits')
// 	.factory('CryptoFactory', function() {
// 		var file = this.file
//
// 		console.log(file.name)
//
// 		var reader = new FileReader();
//
// 		if () {
//
// 			// Encrypt
//
// 			reader.onload = function(e){
//
// 				// Use the AES cypher from the CryptoJS library to encrypt the contents of the file
//
// 				var encrypted = CryptoJS.AES.encrypt(e.target.result, password);
//
// 				// Prepare downloadable file
//
// 				a.attr('href', 'data:application/octet-stream,' + encrypted);
// 				a.attr('download', file.name + '.encrypted');
//
// 				//GOTO DOWNLOAD VIEW
// 			};
//
// 			// Encode to data-uri
//
// 			reader.readAsDataURL(file);
// 		}
// 		else {
//
// 			// Decrypt
//
// 			reader.onload = function(e){
//
// 				var decrypted = CryptoJS.AES.decrypt(e.target.result, password)
// 				.toString(CryptoJS.enc.Latin1);
//
// 				if (!/^data:/.test(decrypted)){
// 					alert("Invalid pass phrase or file! Please try again.");
// 					return false;
// 				}
//
// 				a.attr('href', decrypted);
// 				a.attr('download', file.name.replace('.encrypted',''));
//
// 				//GOTO DOWNLOAD VIEW
// 			};
//
// 			reader.readAsText(file);
// 		}
//
// 		return {
// 			findInput : function(){
// 				return document.getElementById("userFile")
// 			}
// 		}
// 	})
