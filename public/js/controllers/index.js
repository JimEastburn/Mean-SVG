angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {

    $scope.global = Global;

    $scope.addTextBox = function(){
        var s = Snap("#svg");
        s.text(200, 100, "Text box...").drag();
    };

    $scope.addCircle = function(){
        var s = Snap("#svg");
        var bigCircle = s.circle(150, 150, 100).drag();

        bigCircle.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5
        });
    };


}]);