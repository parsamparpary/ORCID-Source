/*
 * =============================================================================
 *
 * ORCID (R) Open Source
 * http://orcid.org
 *
 * Copyright (c) 2012-2013 ORCID, Inc.
 * Licensed under an MIT-Style License (MIT)
 * http://orcid.org/open-source-license
 *
 * This copyright and license information (including a link to the full license)
 * shall be included in its entirety in all copies or substantial portion of
 * the software.
 *
 * =============================================================================
 */

var orcidNgModule = angular.module('orcidApp', ["ngCookies"]);

orcidNgModule.directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            
            elm.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                }
            });

            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
});

orcidNgModule.factory("worksSrvc", function () {
	var serv = {
			works: new Array()
	}; 
	return serv;
});

orcidNgModule.factory("prefsSrvc", function ($rootScope) {
	var serv = {
			prefs: null,
			getPrivacyPreferences: function() {
				$.ajax({
			        url: $('body').data('baseurl') + 'account/preferences.json',
			        dataType: 'json',
			        success: function(data) {
			        	serv.prefs = data;
			        	$rootScope.$apply;
			        }
			    }).fail(function() { 
			    	// something bad is happening!
			    	console.log("error with multi email");
			    });
			},
			savePrivacyPreferences: function() {
				$.ajax({
			        url: $('body').data('baseurl') + 'account/preferences.json',
			        type: 'POST',
			        data: angular.toJson(serv.prefs),
			        contentType: 'application/json;charset=UTF-8',
			        dataType: 'json',
			        success: function(data) {
			        	serv.prefs = data;
			        	$rootScope.$apply;
			        }
			    }).fail(function() { 
			    	// something bad is happening!
			    	console.log("error with multi email");
			    });
			}
		};
	    
	    // populate the prefs
		serv.getPrivacyPreferences();

	return serv; 
});


orcidNgModule.filter('urlWithHttp', function(){
	return function(input, output){
		if (input == null) return input;
		if (!input.startsWith('http')) return 'http://' + input; 
	    return input;
	};
});


function EditTableCtrl($scope) {
	
	// email edit row
	$scope.emailUpdateToggleText = function () {
		if ($scope.showEditEmail) $scope.emailToggleText = OM.getInstance().get("manage.editTable.hide");
		else $scope.emailToggleText = OM.getInstance().get("manage.editTable.edit");		
	};
	
	$scope.toggleEmailEdit = function() {
		$scope.showEditEmail = !$scope.showEditEmail;
		$scope.emailUpdateToggleText();
	};
	
	// init email edit row
	$scope.showEditEmail = (window.location.hash === "#editEmail");
	$scope.emailUpdateToggleText();
	

	// password edit row
	$scope.passwordUpdateToggleText = function () {
		if ($scope.showEditPassword) $scope.passwordToggleText = OM.getInstance().get("manage.editTable.hide");
		else $scope.passwordToggleText = OM.getInstance().get("manage.editTable.edit");		
	};
	
	$scope.togglePasswordEdit = function() {
		$scope.showEditPassword = !$scope.showEditPassword;
		$scope.passwordUpdateToggleText();
	};

	// init password row
	$scope.showEditPassword = (window.location.hash === "#editPassword");
	$scope.passwordUpdateToggleText();
	
	// deactivate edit row
	$scope.deactivateUpdateToggleText = function () {
		if ($scope.showEditDeactivate) $scope.deactivateToggleText = OM.getInstance().get("manage.editTable.hide");
		else $scope.deactivateToggleText = OM.getInstance().get("manage.editTable.deactivateRecord");		
	};

	$scope.toggleDeactivateEdit = function() {
		$scope.showEditDeactivate = !$scope.showEditDeactivate;
		$scope.deactivateUpdateToggleText();
	};
	
	// init deactivate
	$scope.showEditDeactivate = (window.location.hash === "#editDeactivate");
	$scope.deactivateUpdateToggleText();
	
	// privacy preferences edit row
	$scope.privacyPreferencesUpdateToggleText = function () {
		if ($scope.showEditPrivacyPreferences) $scope.privacyPreferencesToggleText = OM.getInstance().get("manage.editTable.hide");
		else $scope.privacyPreferencesToggleText = OM.getInstance().get("manage.editTable.edit");		
	};

	$scope.togglePrivacyPreferencesEdit = function() {
		$scope.showEditPrivacyPreferences = !$scope.showEditPrivacyPreferences;
		$scope.privacyPreferencesUpdateToggleText();
	};
	
	// init privacy preferences
	$scope.showEditPrivacyPreferences = (window.location.hash === "#editPrivacyPreferences");
	$scope.privacyPreferencesUpdateToggleText();

	// email preferences edit row
	$scope.emailPreferencesUpdateToggleText = function () {
		if ($scope.showEditEmailPreferences) $scope.emailPreferencesToggleText = OM.getInstance().get("manage.editTable.hide");
		else $scope.emailPreferencesToggleText = OM.getInstance().get("manage.editTable.edit");		
	};

	$scope.toggleEmailPreferencesEdit = function() {
		$scope.showEditEmailPreferences = !$scope.showEditEmailPreferences;
		$scope.emailPreferencesUpdateToggleText();
	};
	
	// init privacy preferences
	$scope.showEditEmailPreferences = (window.location.hash === "#editEmailPreferences");
	$scope.emailPreferencesUpdateToggleText();	

	// security question edit row
	$scope.securityQuestionUpdateToggleText = function () {
		if ($scope.showEditSecurityQuestion) $scope.securityQuestionToggleText = OM.getInstance().get("manage.editTable.hide");
		else $scope.securityQuestionToggleText = OM.getInstance().get("manage.editTable.edit");		
	};

	$scope.toggleSecurityQuestionEdit = function() {
		$scope.showEditSecurityQuestion = !$scope.showEditSecurityQuestion;
		$scope.securityQuestionUpdateToggleText();
	};
	
	// init security question
	$scope.showEditSecurityQuestion = (window.location.hash === "#editSecurityQuestion");
	$scope.securityQuestionUpdateToggleText();	
	
};


function WorksPrivacyPreferencesCtrl($scope, prefsSrvc) {
	$scope.prefsSrvc = prefsSrvc;
	
	$scope.updateWorkVisibilityDefault = function(priv, $event) {
		$scope.prefsSrvc.prefs.workVisibilityDefault.value = priv;
		$scope.prefsSrvc.savePrivacyPreferences();
	};	
};


function EmailPreferencesCtrl($scope, prefsSrvc) {
	$scope.prefsSrvc = prefsSrvc;
};


function DeactivateAccountCtrl($scope, $compile) {
	$scope.sendDeactivateEmail = function() {
		orcidGA.gaPush(['_trackEvent', 'Disengagement', 'Deactivate_Initiate', 'Website']);
		$.ajax({
	        url: $('body').data('baseurl') + 'account/send-deactivate-account.json',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.primaryEmail = data.value;
	    	    $.colorbox({
	    	        html : $compile($('#deactivate-account-modal').html())($scope)	            	
	    	    });
	    	    $scope.$apply();
	    	    $.colorbox.resize();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with change DeactivateAccount");
	    });
	};
	
	$scope.closeModal = function() {
		$.colorbox.close();
	};
};


function SecurityQuestionEditCtrl($scope, $http) {
	$scope.getSecurityQuestion = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/security-question.json',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.securityQuestionPojo = data;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with security question.json");
	    });
	};
	
	$scope.getSecurityQuestion();
	
	$scope.saveSecurityQuestion = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/security-question.json',
	        type: 'POST',
	        data: angular.toJson($scope.securityQuestionPojo),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	//alert(angular.toJson($scope.securityQuestionPojo));
	        	$scope.securityQuestionPojo = data;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with security question");
	    });
	};
};


function PasswordEditCtrl($scope, $http) {
	$scope.getChangePassword = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/change-password.json',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.changePasswordPojo = data;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with change password");
	    });
	};
	
	$scope.getChangePassword();
	
	$scope.saveChangePassword = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/change-password.json',
	        type: 'POST',
	        data: angular.toJson($scope.changePasswordPojo),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.changePasswordPojo = data;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with edit password");
	    });
	};
};

function EmailEditCtrl($scope, $compile) {
	$scope.getEmails = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/emails.json',
	        //type: 'POST',
	        //data: $scope.emailsPojo, 
	        dataType: 'json',
	        success: function(data) {
	        	$scope.emailsPojo = data;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with multi email");
	    });
	};
	
	$scope.initInputEmail = function () {
		$scope.inputEmail = {"value":"","primary":false,"current":true,"verified":false,"visibility":"PRIVATE","errors":[]};		
	};
	
	//init
	$scope.curPrivToggle = null;
	$scope.getEmails();
	$scope.initInputEmail();

	$scope.setPrimary = function(idx) {
		for (i in $scope.emailsPojo.emails) {
			console.log($scope.emailsPojo.emails[idx]);
			if (i == idx) {
				$scope.emailsPojo.emails[i].primary = true;
			} else {
				$scope.emailsPojo.emails[i].primary = false;
			}
		}
		$scope.saveEmail();
	};
	
	$scope.toggleVisibility = function(idx) {
		if ($scope.emailsPojo.emails[idx].visibility ==  "PRIVATE") {
			$scope.emailsPojo.emails[idx].visibility = "LIMITED";
		} else if ($scope.emailsPojo.emails[idx].visibility ==  "LIMITED") {
			$scope.emailsPojo.emails[idx].visibility = "PUBLIC";
		} else {
			$scope.emailsPojo.emails[idx].visibility = "PRIVATE";
		}
		$scope.saveEmail();
	};
	
	$scope.togglePrivacySelect = function(idx) {
		var curEmail = $scope.emailsPojo.emails[idx].value;
		if ($scope.curPrivToggle == null) $scope.curPrivToggle = curEmail;
		else $scope.curPrivToggle = null;
	};
	
	$scope.setPrivacy = function(idx, priv, $event) {
		$event.preventDefault();
		$scope.emailsPojo.emails[idx].visibility = priv;
		$scope.curPrivToggle = null;
		$scope.saveEmail();
	};
	
	$scope.verifyEmail = function(idx) {
		$scope.verifyEmailIdx = idx;
		$.ajax({
	        url: $('body').data('baseurl') + 'account/verifyEmail.json',
	        type: 'get',
	        data:  { "email": $scope.emailsPojo.emails[idx].value },
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	    	    $.colorbox({
	    	        html : $compile($('#verify-email-modal').html())($scope)
	    	    });
	    	    $scope.$apply();
	    	    $.colorbox.resize();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with multi email");
	    });  
	};
	
	$scope.closeModal = function() {
		$.colorbox.close();
	};


	$scope.saveEmail = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/emails.json',
	        type: 'POST',
	        data: angular.toJson($scope.emailsPojo),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.emailsPojo = data;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with multi email");
	    });
	};

	$scope.addEmail = function (obj, $event) {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/addEmail.json',
	        type: 'POST',
	        data:  angular.toJson($scope.inputEmail),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.inputEmail = data;
	        	//alert($scope.inputEmail.errors.length);
	        	if ($scope.inputEmail.errors.length == 0) {
					$scope.initInputEmail();
					$scope.getEmails();
				}
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("$EmailEditCtrl.addEmail() error");
	    });
	};
	
	$scope.confirmDeleteEmail = function(idx) {
		    $scope.deleteEmailIdx = idx;
            $.colorbox({
                html : $compile($('#delete-email-modal').html())($scope)
                	
            });
            $.colorbox.resize();
	};
	
	$scope.deleteEmail = function () {
		var email = $scope.emailsPojo.emails[$scope.deleteEmailIdx];
		$scope.deleteEmailIdx = null;
		$.ajax({
	        url: $('body').data('baseurl') + 'account/deleteEmail.json',
	        type: 'DELETE',
	        data:  angular.toJson(email),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.inputEmail = data;
	        	//alert($scope.inputEmail.errors.length);
	        	if ($scope.inputEmail.errors.length == 0) {
					$scope.initInputEmail();
					$scope.getEmails();
				}
	        	$scope.$apply();
	        	$scope.closeModal();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("$EmailEditCtrl.deleteEmail() error");
	    });
	};
	
};

function ExternalIdentifierCtrl($scope, $compile){		
	$scope.getExternalIdentifiers = function(){
		$.ajax({
			url: $('body').data('baseurl') + 'works/externalIdentifiers.json',	        
	        dataType: 'json',
	        success: function(data) {
	        	$scope.externalIdentifiersPojo = data;
	        	$scope.$apply();
	        }
		}).fail(function(){
			// something bad is happening!
	    	console.log("error fetching external identifiers");
		});
	};
	
	//init
	$scope.getExternalIdentifiers();
	
	$scope.deleteExternalIdentifier = function(idx) {
		$scope.removeExternalIdentifierIndex = idx;
		$scope.removeExternalModalText = $scope.externalIdentifiersPojo.externalIdentifiers[idx].externalIdReference.content;
		if ($scope.externalIdentifiersPojo.externalIdentifiers[idx].externalIdCommonName != null)
			$scope.removeExternalModalText = $scope.externalIdentifiersPojo.externalIdentifiers[idx].externalIdCommonName.content + ' ' + $scope.removeExternalModalText;
        $.colorbox({        	
            html: $compile($('#delete-external-id-modal').html())($scope)
            	
        });
        $.colorbox.resize();
	};
	
	$scope.removeExternalIdentifier = function() {
		var externalIdentifier = $scope.externalIdentifiersPojo.externalIdentifiers[$scope.removeExternalIdentifierIndex];
		$scope.externalIdentifiersPojo.externalIdentifiers.splice($scope.removeExternalIdentifierIndex, 1);
		$scope.removeExternalIdentifierIndex = null;
		$.ajax({
	        url: $('body').data('baseurl') + 'works/externalIdentifiers.json',
	        type: 'DELETE',
	        data: angular.toJson(externalIdentifier),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {	        	
	        	if(data.errors.length != 0){
	        		console.log("Unable to delete external identifier.");
	        	} 
	        }
	    }).fail(function() { 
	    	console.log("Error deleting external identifier.");
	    });
		$scope.closeModal();
	};
	
	$scope.closeModal = function() {
		$.colorbox.close();
	};
	
};	


function RegistrationCtrl($scope, $compile) {
		
	$scope.getRegister = function(){
		$.ajax({
			url: $('body').data('baseurl') + 'register.json',	        
	        dataType: 'json',
	        success: function(data) {
	       	$scope.register = data;
	        $scope.$apply();
	        
	        // make sure inputs stayed trimmed
	    	$scope.$watch('register.email.value', function() {
	    		trimAjaxFormText($scope.register.email);
	    		$scope.serverValidate('Email');
	    	}); // initialize the watch
	    	
	    	// make sure email is trimmed
	    	$scope.$watch('register.emailConfirm.value', function() {
	    		 trimAjaxFormText($scope.register.emailConfirm);
	    		 $scope.serverValidate('EmailConfirm');
	    	}); // initialize the watch
	    	
	    	$scope.$watch('register.givenNames.value', function() {
	    		trimAjaxFormText($scope.register.givenNames);
	    	}); // initialize the watch
	    	
	    	$scope.$watch('register.familyNames.value', function() {
	    		 trimAjaxFormText($scope.register.familyNames);
	    	}); // initialize the watch

	    	
	        }
		}).fail(function(){
		// something bad is happening!
			console.log("error fetching register.json");
		});
	};
	
	$scope.getDuplicates = function(){
		$.ajax({
			//url: $('body').data('baseurl') + 'dupicateResearcher.json?familyNames=test&givenNames=test',	        
			url: $('body').data('baseurl') + 'dupicateResearcher.json?familyNames=' + $scope.register.familyNames.value + '&givenNames=' + $scope.register.givenNames.value,	        
	        dataType: 'json',
	        success: function(data) {
		       	$scope.duplicates = data;
		        $scope.$apply();
		        if ($scope.duplicates.length > 0 ) {
		        	$scope.showDuplicatesColorBox();
		        } else {
		        	$scope.postRegisterConfirm();
		        }
	        }
		}).fail(function(){
		// something bad is happening!
			console.log("error fetching register.json");
		});
	};

	
	$scope.updateWorkVisibilityDefault = function(priv, $event) {
		$scope.register.workVisibilityDefault.visibility = priv;
	};
	
	$scope.postRegister = function () {
		if (basePath.startsWith(baseUrl + 'oauth')) 
		    orcidGA.gaPush(['_trackEvent', 'RegGrowth', 'New-Registration-Submit', 'OAuth']);
	    else
	    	orcidGA.gaPush(['_trackEvent', 'RegGrowth', 'New-Registration-Submit', 'Website']);	
		$.ajax({
	        url: $('body').data('baseurl') + 'register.json',
	        type: 'POST',
	        data:  angular.toJson($scope.register),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.register = data;
	        	$scope.$apply();
	        	if ($scope.register.errors.length == 0) {
	        		$scope.showProcessingColorBox();
	        		$scope.getDuplicates();
	        	}
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("RegistrationCtrl.postRegister() error");
	    });
	};
	
	$scope.postRegisterConfirm = function () {
		$scope.showProcessingColorBox();
		$.ajax({
	        url: $('body').data('baseurl') + 'registerConfirm.json',
	        type: 'POST',
	        data:  angular.toJson($scope.register),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	    		if (basePath.startsWith(baseUrl + 'oauth')) 
	    		    orcidGA.gaPush(['_trackEvent', 'RegGrowth', 'New-Registration', 'OAuth']);
	    	    else
	    	    	orcidGA.gaPush(['_trackEvent', 'RegGrowth', 'New-Registration', 'Website']);
	    		orcidGA.windowLocationHrefDelay(data.url);
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("RegistrationCtrl.postRegister() error");
	    });
	};

	

	$scope.serverValidate = function (field) {
		if (field === undefined) field = '';
		$.ajax({
	        url: $('body').data('baseurl') + 'register' + field + 'Validate.json',
	        type: 'POST',
	        data:  angular.toJson($scope.register),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.copyErrorsLeft($scope.register, data);
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("RegistrationCtrl.serverValidate() error");
	    });
	};

	// in the case of slow network connection
	// we don't want to overwrite  values while
	// user is typing
	$scope.copyErrorsLeft = function (data1, data2) {
		for (var key in data1) {
			if (key == 'errors') {
				data1.errors = data2.errors;
			} else {
				if (data1[key].errors !== undefined)
				data1[key].errors = data2[key].errors;
			};
		};
	};
	
	$scope.showProcessingColorBox = function () {
	    $.colorbox({
	        html : $('<div style="font-size: 50px; line-height: 60px; padding: 20px; text-align:center">' + OM.getInstance().get('common.processing') + '&nbsp;<i id="ajax-loader" class="icon-spinner icon-spin green"></i></div>'),
	        width: '400px', 
	        close: '',
	        escKey:false, 
	        overlayClose:false
	    });
	    $.colorbox.resize({width:"400px" , height:"100px"});
	};
	
	$scope.showDuplicatesColorBox = function () {
	    $.colorbox({
	        html : $compile($('#duplicates').html())($scope),
	        escKey:false, 
	        overlayClose:false,
	        transition: 'fade',
	        close: '',
	        scrolling: true
	        	    });
	    $scope.$apply();
	    $.colorbox.resize({width:"780px" , height:"400px"});
	};
	
	$scope.hideProcessingColorBox = function () {
		$.colorbox.close();
	};

	
	$scope.isValidClass = function (cur) {
		if (cur === undefined) return '';
		var valid = true;
		if (cur.required && (cur.value == null || cur.value.trim() == '')) valid = false;
		if (cur.errors !== undefined && cur.errors.length > 0) valid = false;
		return valid ? '' : 'text-error';
	};
	
	//init
	$scope.getRegister();	
	//$scope.getDuplicates();
		 
};
		

function ClaimCtrl($scope, $compile) {
	$scope.postingClaim = false;
	$scope.getClaim = function(){
		$.ajax({
			url: $scope.getClaimAjaxUrl(),	        
	        dataType: 'json',
	        success: function(data) {
	       	$scope.register = data;
	        $scope.$apply();
	        }
		}).fail(function(){
		// something bad is happening!
			console.log("error fetching register.json");
		});
	};
		
	$scope.postClaim = function () {
		if ($scope.postingClaim) return;
		$scope.postingClaim = true;
		$.ajax({
	        url: $scope.getClaimAjaxUrl(),
	        type: 'POST',
	        data:  angular.toJson($scope.register),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.register = data;
	        	
	        	if ($scope.register.errors.length == 0) {
	        		if ($scope.register.url != null) {
		    	    	orcidGA.gaPush(['_trackEvent', 'RegGrowth', 'New-Registration', 'Website']);
			    		orcidGA.windowLocationHrefDelay($scope.register.url);
	        		}
	        	}
	        	$scope.postingClaim = false;
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("RegistrationCtrl.postRegister() error");
	    	$scope.postingClaim = false;
	    });
	};
	
	
	$scope.getClaimAjaxUrl = function () {
		return window.location.href.split("?")[0]+".json";
	} 
	
	$scope.updateWorkVisibilityDefault = function(priv, $event) {
		$scope.register.workVisibilityDefault.visibility = priv;
	};

	$scope.serverValidate = function (field) {
		if (field === undefined) field = '';
		$.ajax({
	        url: $('body').data('baseurl') + 'claim' + field + 'Validate.json',
	        type: 'POST',
	        data:  angular.toJson($scope.register),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	//alert(angular.toJson(data));
	        	$scope.copyErrorsLeft($scope.register, data);
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("RegistrationCtrl.postRegisterValidate() error");
	    });
	};

	// in the case of slow network connection
	// we don't want to overwrite  values while
	// user is typing
	$scope.copyErrorsLeft = function (data1, data2) {
		for (var key in data1) {
			if (key == 'errors') {
				data1.errors = data2.errors;
			} else {
				if (data1[key] != null && data1[key].errors !== undefined)
				data1[key].errors = data2[key].errors;
			};
		};
	};
	
	$scope.isValidClass = function (cur) {
		if (cur === undefined) return '';
		var valid = true;
		if (cur.required && (cur.value == null || cur.value.trim() == '')) valid = false;
		if (cur.errors !== undefined && cur.errors.length > 0) valid = false;
		return valid ? '' : 'text-error';
	};
	
	//init
	$scope.getClaim();	
	//$scope.getDuplicates();
		 
};


function VerifyEmailCtrl($scope, $compile) {
	$scope.getEmails = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/emails.json',
	        //type: 'POST',
	        //data: $scope.emailsPojo, 
	        dataType: 'json',
	        success: function(data) {
	        	$scope.emailsPojo = data;
	        	$scope.$apply();
	        	var primeVerified = false;
	        	for (i in $scope.emailsPojo.emails) {
	        		if ($scope.emailsPojo.emails[i].primary) {
	        			$scope.primaryEmail = $scope.emailsPojo.emails[i].value;
	        			if ($scope.emailsPojo.emails[i].verified) primeVerified = true;
	        		};
	        	};
	        	if (!primeVerified) {
	        		var colorboxHtml = $compile($('#verify-email-modal').html())($scope);
	        		$scope.$apply();
	        	    
	        		$.colorbox({
	        	        html : colorboxHtml,
	        	        escKey:false, 
	        	        overlayClose:false,
	        	        transition: 'fade',
	        	        close: '',
	        	        //height: '200px',
	        	        //width: '500px',
	        	        scrolling: false
	        	        	    });
	        	        $.colorbox.resize();	        		
	        	};
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with multi email");
	    });
	};
	
	$scope.verifyEmail = function() {
		$.ajax({
	        url: $('body').data('baseurl') + 'account/verifyEmail.json',
	        type: 'get',
	        data:  { "email": $scope.primaryEmail },
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	//alert( "Verification Email Send To: " + $scope.emailsPojo.emails[idx].value); 	
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with multi email");
	    });  		
		var colorboxHtml = $compile($('#verify-email-modal-sent').html())($scope);
		
		$scope.emailSent = true;
		$.colorbox({
	        html : colorboxHtml,
	        escKey: true, 
	        overlayClose: true,
	        transition: 'fade',
	        close: '',
	        scrolling: false
	        	    });
	    $.colorbox.resize();
		
	};
	
	
	$scope.closeColorBox = function() {		
		$.ajax({
	        url: $('body').data('baseurl') + 'account/delayVerifyEmail.json',
	        type: 'get',
	        contentType: 'application/json;charset=UTF-8',
	        success: function(data) {
	        	//alert( "Verification Email Send To: " + $scope.emailsPojo.emails[idx].value); 	
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("error with multi email");
	    });
		$.colorbox.close();
	};
	
	$scope.emailSent = false;
	$scope.getEmails();
};


function ClaimThanks($scope, $compile) {
	$scope.showThanks = function () {
		var colorboxHtml; 
			if ($scope.sourceGrantReadWizard.url == null)  
				colorboxHtml = $compile($('#claimed-record-thanks').html())($scope);
			else 
				colorboxHtml = $compile($('#claimed-record-thanks-source-grand-read').html())($scope);
		$.colorbox({
	        html : colorboxHtml,
	        escKey: true, 
	        overlayClose: true,
	        transition: 'fade',
	        close: '',
	        scrolling: false
	        	    });
		$scope.$apply(); // this seems to make sure angular renders in the colorbox
	    $.colorbox.resize();
	};
	
	$scope.getSourceGrantReadWizard = function(){
		$.ajax({
			url: $('body').data('baseurl') + 'works/sourceGrantReadWizard.json',	        
	        dataType: 'json',
	        success: function(data) {
	        	$scope.sourceGrantReadWizard = data;
	        	//console.log(angular.toJson(data))
	        	$scope.$apply();
	        	$scope.showThanks();
	        }
		}).fail(function(){
			// something bad is happening!
	    	console.log("error fetching external identifiers");
		});
		
	};
	
	$scope.yes = function () {
		$.colorbox.close();
		var newWin = window.open($scope.sourceGrantReadWizard.url);
		if (!newWin) window.location.href = $scope.sourceGrantReadWizard.url;
		else newWin.focus();
	};
	
	$scope.close = function () {
		$.colorbox.close();
	};
	
	$scope.getSourceGrantReadWizard();
	
};

function PersonalInfoCtrl($scope, $compile){
	$scope.displayInfo = true;
	$scope.toggleDisplayInfo = function () {
		$scope.displayInfo = !$scope.displayInfo;
	};
};

function WorkOverviewCtrl($scope, $compile, worksSrvc){
	$scope.works = worksSrvc.works;
}

function WorkCtrl($scope, $compile, worksSrvc){
	$scope.displayWorks = true;
	$scope.works = worksSrvc.works;
	$scope.numOfWorksToAdd = null;
	
	$scope.toggleDisplayWorks = function () {
		$scope.displayWorks = !$scope.displayWorks;
	};
	
	$scope.showAddModal = function(){;
	    $.colorbox({        	
	        html: $compile($('#add-work-modal').html())($scope)
	    });
	    $.colorbox.resize();
	};
	
	
	$scope.addWorkModal = function(){;
		$.ajax({
			url: $('body').data('baseurl') + 'works/work.json',
			dataType: 'json',
			success: function(data) {
				$scope.editWork = data;
				$scope.$apply(function() {
					$scope.showAddModal();
				});
			}
		}).fail(function() { 
	    	console.log("Error fetching work: " + value);
	    });
	};


	$scope.addWork = function(){
		if ($scope.addingWork) return; // don't process if adding work
		$scope.addingWork = true;
		$scope.editWork.errors.length = 0;
		$.ajax({
			url: $('body').data('baseurl') + 'works/work.json',	        
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        type: 'POST',
	        data:  angular.toJson($scope.editWork),
	        success: function(data) {
	        	if (data.errors.length == 0){
	        		$.colorbox.close(); 
	        		$scope.addingWork = false;
	        		$scope.getWorks();
	        	} else {
		        	$scope.editWork = data;
		        	$scope.copyErrorsLeft($scope.editWork, data);
		        	$scope.addingWork = false;
		        	$scope.$apply();
	        	}
	        }
		}).fail(function(){
			// something bad is happening!
			$scope.addingWork = false;
	    	console.log("error fetching works");
		});
	};
	
	
	$scope.addWorkToScope = function() {
		if($scope.worksToAddIds.length != 0 ) {
			var workIds = $scope.worksToAddIds.splice(0,20).join();
			$.ajax({
				url: $('body').data('baseurl') + 'works/works.json?workIds=' + workIds,
				dataType: 'json',
				success: function(data) {
					$scope.$apply(function(){ 
						for (i in data)
						$scope.works.push(data[i]);
					});
					setTimeout(function () {$scope.addWorkToScope();},50);
				}
			}).fail(function() { 
		    	console.log("Error fetching work: " + value);
		    });
		}
	}; 
	

	$scope.getWorks = function() {
		//clear out current works
		$scope.worksToAddIds = null;
		$scope.numOfWorksToAdd = null;
		$scope.works.length = 0;
		//get work ids
		$.ajax({
			url: $('body').data('baseurl') + 'works/workIds.json',	        
	        dataType: 'json',
	        success: function(data) {
	        	$scope.worksToAddIds = data;
	        	$scope.numOfWorksToAdd = data.length;
	 
	        	if (data.length > 0 ) $scope.addWorkToScope();
	        	$scope.$apply();
	        }
		}).fail(function(){
			// something bad is happening!
	    	console.log("error fetching works");
		});
	};
	
	//init
	$scope.getWorks();
	
	$scope.deleteWork = function(idx) {		
		$scope.deleteIndex = idx;
		if ($scope.works[idx].workTitle && $scope.works[idx].workTitle.title) 
			$scope.fixedTitle = $scope.works[idx].workTitle.title.value;
		else $scope.fixedTitle = '';
        var maxSize = 100;
        if($scope.fixedTitle.length > maxSize)
        	$scope.fixedTitle = $scope.fixedTitle.substring(0, maxSize) + '...';
		$.colorbox({        	            
            html : $compile($('#delete-work-modal').html())($scope),
            onComplete: function() {$.colorbox.resize();}
        });
		
		        
	};
	
	$scope.deleteByIndex = function() {		
		var work = $scope.works[$scope.deleteIndex];
    	// remove work on server
		$scope.removeWork(work);
		// remove the work from the UI
    	$scope.works.splice($scope.deleteIndex, 1);
    	$scope.numOfWorksToAdd--; // keep this number matching
    	// apply changes on scope
		// close box
		$.colorbox.close(); 
	};
	
	$scope.closeModal = function() {
		$.colorbox.close();
	};
	
	$scope.removeWork = function(work) {
		$.ajax({
	        url: $('body').data('baseurl') + 'works/works.json',
	        type: 'DELETE',
	        data: angular.toJson(work),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {	        	
	        	if(data.errors.length != 0){
	        		console.log("Unable to delete work.");
	        	} 
	        }
	    }).fail(function() { 
	    	console.log("Error deleting work.");
	    });
	};

	$scope.setAddWorkPrivacy = function(priv, $event) {
		$event.preventDefault();
		$scope.editWork.visibility.visibility = priv;
	};

	
		
	$scope.setPrivacy = function(idx, priv, $event) {
		$event.preventDefault();
		$scope.works[idx].visibility.visibility = priv;
		$scope.curPrivToggle = null;
		$scope.updateProfileWork(idx);
	};
	
	$scope.serverValidate = function (relativePath) {
		$.ajax({
	        url: $('body').data('baseurl') + relativePath,
	        type: 'POST',
	        data:  angular.toJson($scope.editWork),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {
	        	$scope.copyErrorsLeft($scope.editWork, data);
	        	$scope.$apply();
	        }
	    }).fail(function() { 
	    	// something bad is happening!
	    	console.log("RegistrationCtrl.serverValidate() error");
	    });
	};
	
	// in the case of slow network connection
	// we don't want to overwrite  values while
	// user is typing
	$scope.copyErrorsLeft = function (data1, data2) {
		for (var key in data1) {
			if (key == null) continue;
			if (key == 'errors') {
				data1.errors = data2.errors;
			} else {
				if (typeof(data1[key])=="object") {
					$scope.copyErrorsLeft(data1[key], data2[key]);
				}
			};
		};
	};

	$scope.isValidClass = function (cur) {
		if (cur === undefined) return '';
		var valid = true;
		if (cur.required && (cur.value == null || cur.value.trim() == '')) valid = false;
		if (cur.errors !== undefined && cur.errors.length > 0) valid = false;
		return valid ? '' : 'text-error';
	};

	
	$scope.updateProfileWork = function(idx) {
		var work = $scope.works[idx];
		$.ajax({
	        url: $('body').data('baseurl') + 'works/profileWork.json',
	        type: 'PUT',
	        data: angular.toJson(work),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {	        	
	        	if(data.errors.length != 0){
	        		console.log("Unable to update profile work.");
	        	} 
	        }
	    }).fail(function() { 
	    	console.log("Error updating profile work.");
	    });
	};		
}

function QuickSearchCtrl($scope, $compile){
	$scope.results = new Array();
	$scope.numFound = 0;
	$scope.start = 0;
	$scope.rows = 10;
	
	$scope.getResults = function(rows){
		$.ajax({
			url: $('#QuickSearchCtrl').data('search-query-url') + '&start=' + $scope.start + '&rows=' + $scope.rows,      
			dataType: 'json',
			headers: { Accept: 'application/json'},
			success: function(data) {
				var resultsContainer = data['orcid-search-results']; 
				if(typeof resultsContainer !== 'undefined'){
					$scope.numFound = resultsContainer['num-found'];
					$scope.results = $scope.results.concat(resultsContainer['orcid-search-result']);
				}
				else{
					$('#no-results-alert').fadeIn(1200);
				}
				$scope.areMoreResults = $scope.numFound >= ($scope.start + $scope.rows);
				$scope.$apply();
				$('#ajax-loader').hide();
				var newSearchResults = $('.new-search-result');
				newSearchResults.fadeIn(1200);
				newSearchResults.removeClass('new-search-result');
				var newSearchResultsTop = newSearchResults.offset().top;
				var showMoreButtonTop = $('#show-more-button-container').offset().top;
				var bottom = $(window).height();
				if(showMoreButtonTop > bottom){
					$('html, body').animate(
						{ 
							scrollTop: newSearchResultsTop
						},
						1000, 
						'easeOutQuint'
					);
				}
			}
		}).fail(function(){
			// something bad is happening!
			console.log("error doing quick search");
		});
	};
	
	$scope.getMoreResults = function(){
		$('#ajax-loader').show();
		$scope.start += 10;
		$scope.getResults();
	};
	
	$scope.concatPropertyValues = function(array, propertyName){
		if(typeof array === 'undefined'){
			return '';
		}
		else{
			return $.map(array, function(o){ return o[propertyName]; }).join(', ');
		}
	};
	
	$scope.areResults = function(){
		return $scope.numFound != 0;
	};
	
	// init
	$scope.getResults(10);
};

function ClientEditCtrl($scope, $compile){
	$scope.errors = [];
	$scope.clients = [];	
	
	// Get the list of clients associated with this user
	$scope.getClients = function(){
		$.ajax({
	        url: $('body').data('baseurl') + 'manage-clients/get-clients.json',
	        dataType: 'json',
	        success: function(data) {	        	        					
				$scope.$apply(function(){
					
					$scope.clients.splice(0, $scope.clients.length);        		
					for (i in data)	{
						var client = data[i];
						if(client.redirectUris != null && client.redirectUris.redirectUri.length > 0){
							for(var j = 0; j < client.redirectUris.redirectUri.length; j++)	{						
								delete client.redirectUris.redirectUri[j].scopeAsSingleString;
								delete client.redirectUris.redirectUri[j].scope;							
							}
						}
						$scope.clients.push(client);					
					}
					
				});
	        }
	    }).fail(function() { 
	    	alert("Error fetching clients.");
	    	console.log("Error fetching clients.");
	    });				
	};		
	
	// Add a new uri input field to a new client
	$scope.addUriToNewClientTable = function(){		
		$('#client-table').find('tr:last > td:last').html('&nbsp;');		
		$scope.newClient.redirectUris.redirectUri.push({value: '',type: 'DEFAULT'});
	};
	
	// Add a new uri input field to a existing client
	$scope.addUriToExistingClientTable = function(){
		$scope.clientToEdit.redirectUris.redirectUri.push({value: '',type: 'DEFAULT'});
	};
	
	// Display the modal to edit a client
	$scope.editClient = function(idx) {
		// Clean error list
		$scope.errors.splice(0, $scope.errors.length);
		// Copy the client to edit to a scope variable 
		$scope.clientToEdit = angular.copy($scope.clients[idx]);		
		$.colorbox({        	            
            html : $compile($('#edit-client-modal').html())($scope), 
            transition: 'fade',            
	        onLoad: function() {
			    $('#cboxClose').remove();
			},
	        scrolling: true
        });		
        $.colorbox.resize({width:"450px" , height:"420px"});   
	};
	
	// Display the modal to add a new client
	$scope.addClient = function(){
		// Clean error list
		$scope.errors.splice(0, $scope.errors.length);
		$scope.newClient = {			
				displayName: '',
				website: '',
				shortDescription: '',			
				redirectUris: {
					redirectUri:[{value: '',type: 'DEFAULT'}]
				},			
				clientId:'',
				clientSecret:'',
				type: ''
		};	
		$.colorbox({        	            
            html : $compile($('#new-client-modal').html())($scope), 
            transition: 'fade',
            onLoad: function() {
			    $('#cboxClose').remove();
			},
	        scrolling: true
        });
        $.colorbox.resize({width:"580px" , height:"380px"});
	};
	
	// Display client details: Client ID and Client secret
	$scope.viewDetails = function(idx){
		$scope.clientDetails = $scope.clients[idx];
		$.colorbox({        	            
            html : $compile($('#view-details-modal').html())($scope),
	        scrolling: true,
	        onLoad: function() {
			    $('#cboxClose').remove();
			},
			scrolling: true
        });
		
        $.colorbox.resize({width:"550px" , height:"200px"});
        
	};
	
	$scope.closeColorBox = function(){
		$.colorbox.close();	
	};
	
	
	// Delete an uri input field 
	$scope.deleteUri = function(idx){
		$scope.clientToEdit.redirectUris.redirectUri.splice(idx, 1);
	};
	
	//Submits the client update request
	$scope.submitEditClient = function(){
		//Check for errors
		$scope.errors.splice(0, $scope.errors.length);
		
		if(!$scope.clientToEdit.displayName){
			$scope.errors.push("Please enter the name");
		}
		
		if(!$scope.clientToEdit.website){
			$scope.errors.push("Please enter a website");
		}
		
		if(!$scope.clientToEdit.shortDescription){
			$scope.errors.push("Please enter a description");
		}
		
		//If there is any error, return
		if($scope.errors.length != 0){
			return;
		}
		
		// Check which redirect uris are empty strings and remove them from the array
		for(var j = $scope.clientToEdit.redirectUris.redirectUri.length - 1; j >= 0 ; j--)	{
			if(!$scope.clientToEdit.redirectUris.redirectUri[j].value){
				$scope.clientToEdit.redirectUris.redirectUri.splice(j, 1);
			}
		}				
		
		console.log(angular.toJson($scope.clientToEdit));
		
		//Submit the update request
		$.ajax({
	        url: $('body').data('baseurl') + 'manage-clients/edit-client.json',
	        type: 'POST',
	        data: angular.toJson($scope.clientToEdit),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {	        		        		        
	        	if(data.errors != null && data.errors.length > 0){
	        		console.log("Unable to update client information.");
	        	} else {
	        		//If everything worked fine, reload the list of clients
        			$scope.getClients();
	        	} 
	        }
	    }).fail(function() { 
	    	alert("An error occured updating the client");
	    	console.log("Error updating client information.");
	    });		
		$.colorbox.close();
	};
	
	//Submits the new client request
	$scope.submitAddClient = function(){
		//Check for errors
		$scope.errors.splice(0, $scope.errors.length);
		
		if(!$scope.newClient.displayName){
			$scope.errors.push("Please enter the name");
		}
		
		if(!$scope.newClient.website){
			$scope.errors.push("Please enter a website");
		}
		
		if(!$scope.newClient.shortDescription){
			$scope.errors.push("Please enter a description");
		}
		
		//If there is any error, return
		if($scope.errors.length != 0){
			return;
		}
		
		// Check which redirect uris are empty strings and remove them from the array
		for(var j = $scope.newClient.redirectUris.redirectUri.length - 1; j >= 0 ; j--)	{
			if(!$scope.newClient.redirectUris.redirectUri[j].value){
				$scope.newClient.redirectUris.redirectUri.splice(j, 1);
			}
		}
		
		var type = $("#client_type").val();
		$scope.newClient.type = type;
		console.log(angular.toJson($scope.newClient));
		
		//Submit the new client request
		$.ajax({
	        url: $('body').data('baseurl') + 'manage-clients/add-client.json',
	        type: 'POST',
	        data: angular.toJson($scope.newClient),
	        contentType: 'application/json;charset=UTF-8',
	        dataType: 'json',
	        success: function(data) {	        		        		        
	        	if(data.errors != null && data.errors.length > 0){
	        		console.log("Unable to create client information.");
	        	} else {
	        		//If everything worked fine, reload the list of clients
        			$scope.getClients();
	        	} 
	        }
	    }).fail(function() { 
	    	console.log("Error creating client information.");
	    });
		$.colorbox.close();
	};
	    
	//init
	$scope.getClients();
};

function statisticCtrl($scope){	
	$scope.liveIds = 0;	
	$scope.getLiveIds = function(){
		$.ajax({
	        url: $('body').data('baseurl')+'statistics/liveids.json',	        
	        type: 'GET',
	        dataType: 'html',
	        success: function(data){
	        	$scope.liveIds = data;
	        	$scope.$apply($scope.liveIds);	        		        	
	        }
	    }).fail(function(error) { 
	    	// something bad is happening!	    	
	    	console.log("Error getting statistics Live iDs total amount");	    	
	    });
	};

	$scope.getLiveIds();
};

function languageCtrl($scope, $cookies){		
	$scope.languages = 
	    [
	        {	            
	            "value": "en",
	            "label": "English"
	        },
	        {
	        	"value": 'es',
	    		"label": 'Español'
	        },
	        {
	        	"value": 'fr',
	    		"label": 'Français'
	        },	        
	        {
		        "value": 'zh_CN',
			    "label": '簡體中文'
	        },
	        {
		        "value": 'zh_TW',
			    "label": '简体中文'
	        },	        
	    ];	

	//Load Language that is set in the cookie or set default language to english
	$scope.getCurrentLanguage = function(){
		$scope.language = $scope.languages[0]; //Default
		typeof($cookies.locale_v3) !== 'undefined' ? locale_v3 = $cookies.locale_v3 : locale_v3 = "en"; //If cookie exists we get the language value from it		
    	angular.forEach($scope.languages, function(value, key){ //angular.forEach doesn't support break
    		if (value.value == locale_v3) $scope.language = $scope.languages[key];    		
    	});
	};

	$scope.getCurrentLanguage(); //Checking for the current language value


	$scope.selectedLanguage = function(){		
		$.ajax({
	        url: $('body').data('baseurl')+'lang.json?lang='+$scope.language.value,	        
	        type: 'POST',
	        dataType: 'json',
	        success: function(data){
	        	angular.forEach($scope.languages, function(value, key){
	        		if(value.value == data.locale){
	        			$scope.language = $scope.languages[key];
	        			window.location.reload(true);
	        		}
	        	});	        
	        }
	    }).fail(function(error) { 
	    	// something bad is happening!	    	
	    	console.log("Error setting up language cookie");	    	
	    });		
	};
};
