'use strict';

var app = angular.module('superhero', []);

app.directive('superman',function(){
    return {
        restrict: "A",  //A de atribute y va casado con un link, E de element y va casado con un link, "C" is for class, "M" comment replaced
        link: function(){
            alert("I'm working");
        }
    }
})


app.directive('superman2',function(){
    return {
        restrict: "C",  //A de atribute (va casado con un link), E de element (va casado con un template) y va casado con un link, "C" is for class, "M" comment
        link: function(){
            alert("I'm working");
        }
    }
})


app.directive('superman3',function(){
    return {
        restrict: "M",  //A de atribute y va casado con un link, E de element y va casado con un link, "C" is for class, "M" comment
        link: function(){
            alert("I'm working stronger");
        }
    }
})

app.directive('flash',function(){
    return {
        restrict: "A",  //A de atribute y va casado con un link, E de element y va casado con un link, "C" is for class, "M" comment
        link: function(){
            alert("I'm working faster");
        }
    }
})

//--------------------------------------   isolated scope  ----------------------------------------------

var app = angular.module('choreApp',[]);

app.directive('kid', function(){
    return {
        restrict: 'E',
        template: '<input type="text" ng-model="chore"> ' +
                  '{{ chore }}'
    }
})

app.directive('kid2', function(){
    return {
        restrict: 'E',
        scope: {},      //scope isolated, encapsulated into directive
        template: '<input type="text" ng-model="chore"> ' +
        '{{ chore }}'
    }
})
    //------- Next Example:

app.controller('ChoreCtrl', function($scope){
        $scope.logChore = function(chore){
                                alert(chore + ' is done!!!');
                            }
})

app.directive('kid3', function(){
    return {
        restrict: 'E',
        scope: {
                    done:'&' // tihs expresions recive/Send a new extaern expresions to the envioroment scope
                },      //scope isolated, encapsulated into directive
        template: '<input type="text" ng-model="chore"> ' +
                  '{{ chore }}' +
                  '<div class="button" ng-click="done({chore:chore})"> I\'m done!! </div>' //click mapea la expresión del donde del scope aislado
    }
})
/*
otra opción:

 <div ng-app="choreApp">
 <!-- we've replaced the use of $scope with the preferred "controller as" syntax. see:http://toddmotto.com/digging-into-angulars-controller-as-syntax/ -->
 <div ng-controller="ChoreCtrl as choreCtrl">
 <kid done="choreCtrl.logChore(chore)"></kid>
 </div>
 </div>

 app.controller("ChoreCtrl", function() {
 var choreCtrl = this;
 choreCtrl.logChore = function(chore) {
 alert(chore + " is done!");
 };
 });

 app.directive("kid", function() {
     return {
         restrict: "E",
         scope:     {
                     done: "&"
                    },
         template: '<input type="text" ng-model="chore">' +
         ' {{chore}}' +
         ' <div class="button" ng-click="done({chore:chore})">I\'m done!</div>'
         };
 });
 */

//--------------------------------------   isolated scope "&"  ----------------------------------------------
var app = angular.module('phoneApp',[]);

app.controller("AppCtrl", function($scope){
        $scope.callHome = function(message){
            alert(message + " called now!");
        }
})

app.directive("phone", function(){
    return {
                scope: {
                          dial: "&",     // esto permite el paso de parametros entre loq ue se escribe el input text y el scope de la directiva. y al declarar este scope de la directuva se separa del scope externo
                       },
                template: '<input type="text" ng-model="value">' +
                          '<div class="button" ng-click="dial({message:value})"> Call home!!</div>'
           }
})


//--------------------------------------   isolated scope "="  ----------------------------------------------
var app = angular.module('drinkApp',[]);

app.controller('AppCtrl', function($scope){
        $scope.ctrlFlavor = "blackberry";
})

app.directive('drink', function(){
        return {
                  scope:{
                           flavor: "="
                        },
                  template: '<div>{{ flavor }}</div>'
               }
})

app.directive('drink2', function(){
    return {
        scope:{
            flavor: "="    //Permite tener igualdad en el scope externo y el scope interno
        },
        template: '<input type="text" ng-model="flavor">'
    }
})

//--------------------------------------   isolated scope "@"  ----------------------------------------------
var app = angular.module('drinkApp2',[]);

app.controller('AppCtrl', function($scope){

})

app.directive("drink", function(){
    return {
              scope: {},
              template: '<div>{{ flavor }}</div>',
              link: function(scope, element, attrs){
                  scope.flavor = attrs.flavor;
              }
            }
})

app.directive("drink2", function(){
    return {
             scope: {
                      flavor: "@"
                    },
             template: '<div>{{ flavor }}</div>'
    }
})

   // second part: prueba isolatedScope4_2
var app = angular.module('drinkApp2_2',[]);

app.controller('AppCtrl', function($scope){
    $scope.ctrlFlavor = "blackberry";
})

app.directive("drink", function(){
    return {
        scope: {
            flavor: "@"       //Permite actualizar el bind de la directivadesde el contexto exterior pero no del interior
        },
        template: '<div>{{ flavor }}</div>'
    }
})