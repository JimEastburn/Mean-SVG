angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {

    $scope.global = Global;

    $scope.addTextBox = function(){
        var s = Snap("#svg");
        s.text(200, 100, "Text box...").drag();
    };

    $scope.outputPdf = function(){
//        var doc = new jsPDF();
//        doc.text(20, 20, 'Hello world.');
//        doc.save('Test.pdf');


       // https://github.com/CBiX/svgToPdf.js
//        // I recommend to keep the svg visible as a preview
//        var svg = $('#container > svg').get(0);
//// you should set the format dynamically, write [width, height] instead of 'a4'
//        var pdf = new jsPDF('p', 'pt', 'a4');
//        svgElementToPdf(svg, pdf, {
//            scale: 72/96, // this is the ratio of px to pt units
//            removeInvalid: true // this removes elements that could not be translated to pdf from the source svg
//        });
//        pdf.output('datauri'); // use output() to get the jsPDF buffer

        var pdfdoc = new jsPDF();
        var s = $("#svg");
        var options = {};
        options.removeInvalid = false;
        options.scale = 1.0;
        options.x_offset = 0;
        options.y_offset = 0;
        options.ego_or_link = false;
        var svgPdf = pdfdoc.svgElementToPdf(s, pdfdoc, options);

        svgPdf.save('Test.pdf');

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

    $scope.addDropTarget = function(){
        var s = Snap("#svg");
        var bigSquare = s.rect(100, 100, 200, 200);
//        var topLeft = s.rect(90, 90, 10, 10).drag(topLeftOnMove,topLeftOnStart,topLeftOnEnd);
//        var bottomLeft = s.rect(90, 300, 10, 10).drag(bottomLeftOnMove,bottomLeftOnStart,bottomLeftOnEnd);
        //var dropTarget = s.group(bigSquare, topLeft, topRight, bottomRight, bottomLeft);

        bigSquare.attr({
            fill: "#fff",
            stroke: "#000",
            strokeWidth: 5
        });

        var bottomRightOnMove = function(dx, dy, x, y, e){
            bigSquare.animate({width: e.offsetX - bigSquare.node.x.baseVal.value, height: e.offsetY - bigSquare.node.y.baseVal.value}, 1);
            bottomRight.animate({x: e.offsetX, y: e.offsetY}, 1);
            topRight.animate({ x:e.offsetX}, 1);
            bottomLeft.animate({ y:e.offsetY}, 1);
        };
        var bottomRightOnStart = function(x, y, e){
        };
        var bottomRightOnEnd = function(e){
        };

        var topRightOnMove = function(dx, dy, x, y, e){
            console.log("x", x);
    console.log("y", y);
    console.log("dx",dx);
    console.log("dy",dy);
    console.log("e.offsetX",e.offsetX);
    console.log("e.offsetY",e.offsetY);
    console.log("e",e);
            bigSquare.animate({width: e.offsetX - bigSquare.node.x.baseVal.value ,   y: e.offsetY + topRight.node.width.baseVal.value}, 1);
            topRight.animate({ x: e.offsetX, y: e.offsetY}, 1);
            bottomRight.animate({x: e.offsetX}, 1);
            topLeft.animate({y: e.offsetY}, 1);


        };
        var topRightOnStart = function(){

        };
        var topRightOnEnd = function(){

        };

        var bottomRight = s.rect(300, 300, 10, 10).drag(bottomRightOnMove,bottomRightOnStart,bottomRightOnEnd);
        var topRight = s.rect(300, 90, 10, 10).drag(topRightOnMove,topRightOnStart,topRightOnEnd);
        var bottomLeft = s.rect(90, 300, 10, 10);
        var topLeft = s.rect(90, 90, 10, 10);

//        var topLeftOnMove = function(){
//
//        };
//        var topLeftOnStart = function(){
//
//        };
//        var topLeftOnEnd = function(){
//
//        };
//
//
//        var bottomLeftOnMove = function(){
//
//        };
//        var bottomLeftOnStart = function(){
//
//        };
//        var bottomLeftOnEnd = function(){
//
//        };


    };

//    console.log("bigSquare", bigSquare);
//    console.log("x", x);
//    console.log("y", y);
//    console.log("dx",dx);
//    console.log("dy",dy);
//    console.log("bigSquareWidth",bigSquareWidth);
//    console.log("bigSquareHeight",bigSquareHeight);
//    console.log("bigSquareWidth + dx",bigSquareWidth + dx);
//    console.log("bigSquareHeight + dy",bigSquareHeight + dy);
//    console.log("e.offsetX",e.offsetX);
//    console.log("e.offsetY",e.offsetY);
//    console.log("e",e);
}]);