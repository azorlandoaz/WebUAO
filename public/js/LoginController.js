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
    $scope.servidor = "http://localhost:8080";

    $scope.clickLogin = function () {

        var login = {}
        angular.extend(login, $scope.login);
        sessionStorage.username = login.username;

        if (login.username != null && login.UserPassword != null) 
        {
            var url = $scope.servidor+'/readUser/'+login.username+'/'+login.UserPassword;
            var getUser = $http.get(url);
            getUser.then(success, fail);
            
        }

        function success(resp) {  
            console.log(resp)
            var d = new Date(); 
            var userExist = resp.data.value.length;
            var datenow = d.getMonth()+'-'+d.getDay()+'-'+d.getFullYear()+'-'+ d.getHours()+':' + d.getMinutes(); 
            sessionStorage.userID = resp.data.value[0]._id;
            if(userExist == 0){
                var registerUrl = $scope.servidor+'/createRegistro/Registro/'+ login.username+'/LogError' + '/'+ datenow;
            }else{                
                var registerUrl = $scope.servidor+'/createRegistro/Registro/'+ login.username+'/LogIn' + '/'+ datenow;
            }
            var getRegister = $http.get(registerUrl);
            getRegister.then(sucessRegister, failRegister);
        }

        function fail(resp) {
        $scope.login.error = "El login fallo";
        //alert("El login fallo" + resp.data);
        }
    }

    function sucessRegister(resp)
    {
        document.location = '/Views/Horario.html';
    }

    function failRegister(resp)
    {
		alert("Insercion incorrecta. " + resp.data);
    }
});