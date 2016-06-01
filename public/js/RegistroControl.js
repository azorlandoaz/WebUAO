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
parking.controller('registerCtrl', function ($scope, $http) {

    $scope.nUsuario = {};
    $scope.servidor = "http://localhost:8080";

    $scope.clickRegister = function () {

        var nUsuario = {}
        angular.extend(nUsuario, $scope.nUsuario);

      var url = $scope.servidor+'/createUser/'+nUsuario.username+'/'+nUsuario.Password+'/'+nUsuario.tipo+'/'+nUsuario.file;
      var getUser = $http.get(url);
            getUser.then(success,fail);
        
    function success(resp) {
        console.log(resp);
       // console.log(resp.data)
        //sessionStorage.setItem('token', resp.data);
        document.location = '/Views/Login.html';

        /*$scope.nUsuario._id = response.data.value;
                $scope.usuario.push($scope.convertirUsuario($scope.nUsuario));
                $scope.nUsuario = {};
                $scope.nUsuario.tabla = 'User';
                $scope.dato = undefined;
                $scope.file = undefined;*/
     }

    function fail(resp) {
        $scope.login.error = "El login fallo";
        alert("El Registro fallo");
    }
    };

    $scope.convertirUsuario = function (usuario) {
            return {
              username: usuario.v1,
              password: usuario.v2,
              type: usuario.v3,
                img: 'data:image/png;base64,' + usuario.v6
            };
        };
});
