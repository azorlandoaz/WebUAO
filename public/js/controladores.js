var uao = angular.module('parking', []);
uao.controller('notas', function ($scope, $http) {

    var user = sessionStorage.userID;
    $scope.materias = [];
    $http({
        method: 'GET',
        url: 'http://localhost:8080/read/Enrollment'
    }).then(function (response) {
        $scope.inscripciones = response.data.value;
        $scope.inscripciones = $scope.inscripciones.filter(function (item) {
            return item.idUser === user;
        });
        buscarMaterias();
    });

    function buscarMaterias() {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/read/Subject'
        }).then(function (response) {
            var datos = response.data.value;
            datos.forEach(function (item) {
                var data = $scope.inscripciones.containsData('idSubject', item._id);
                if (data !== false) {
                    var materia = item;
                    materia.notas = [];
                    buscarNotas(materia,$scope.inscripciones[data]._id);
                    $scope.materias.push(item);
                }
            });
        });
    }

    function buscarNotas(asignatura, idEnrollment) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/read/Score'
        }).then(function (response) {
            var definitiva = 0;
            var cantNotas = 0;
            var datos = response.data.value;
            datos = datos.filter(function (item) {
                return item.idEnrollment === idEnrollment;
            });
            datos.forEach(function (item) {
                cantNotas++;
                definitiva+=Number(item.score);
                asignatura.notas.push(item);
            });
            definitiva = definitiva/cantNotas;
            asignatura.definitiva=definitiva;
        });
    }

});
uao.controller('horarios', function ($scope, $http) {

    var user = sessionStorage.userID;
    $scope.materias = [];
    $http({
        method: 'GET',
        url: 'http://localhost:8080/read/Enrollment'
    }).then(function (response) {
        $scope.inscripciones = response.data.value;
        $scope.inscripciones = $scope.inscripciones.filter(function (item) {
            return item.idUser === user;
        });
        buscarMaterias();
    });

    function buscarMaterias() {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/read/Subject'
        }).then(function (response) {
            var datos = response.data.value;
            datos.forEach(function (item) {
                if ($scope.inscripciones.containsData('idSubject', item._id) !== false) {
                    $scope.materias.push(item);
                }
            });
        });
    }
});

Array.prototype.containsData = function (parametro, obj) {
    var i = this.length;
    while (i--) {
        if (this[i][parametro]) {
            if (this[i][parametro] === obj) {
                return i;
            }
        }
    }
    return false;
};