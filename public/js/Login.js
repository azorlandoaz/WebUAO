$(document).ready(function () {
    var formInputs = $('input[type="text"],input[type="password"]');
    formInputs.focus(function () {
        $(this).parent().children('p.formLabel').addClass('formTop');
        $('div#formWrapper').addClass('darken-bg');
        $('div.logo').addClass('logo-active');
    });
    formInputs.focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).parent().children('p.formLabel').removeClass('formTop');
        }
        $('div#formWrapper').removeClass('darken-bg');
        $('div.logo').removeClass('logo-active');
    });
    $('p.formLabel').click(function () {
        $(this).parent().children('.form-style').focus();
    });
});

var parking = angular.module('parking', []);
var apiBaseUrl = '@Url.Content(ProjectNameSpace.WebApiConfig.UrlPrefixRelative)';
parking.controller('loginCtrl', function ($scope, $http) {


    $scope.login = {};

    $scope.clickLogin = function () {

        var login = {}
        angular.extend(login, $scope.login);

        if (login.username != null && login.UserPassword != null) {

            login.username = calcMD5($scope.login.username);
            login.UserPassword = calcMD5($scope.login.UserPassword);

            var post = $http.post('/api/systemuser/login', login);
            post.then(success, fail);
        }
    }

    function success(resp) {

        sessionStorage.setItem('token', resp.data);
        sessionStorage.setItem('UserName', $scope.login.username);
      
        document.location = '/Web/Views/Menu.html';
     }

    function fail(resp) {
        $scope.login.error = "El login fallo";
        alert("El login fallo");
    }
});