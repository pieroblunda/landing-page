/*
@jsDoc
@description FilePicker as HTML5 input type
@param ng-model, Required:true, Expect:String
@example
```html
dropzone(ng-model="my-model" properties="VisualCursor.selected.properties")
```
*/
'use strict';
angular.module('App').directive("dropzone", [
  '$http', '$timeout',
  function($http, $timeout){
  	return {
  		restrict : 'E',
  		scope : {
  			ngModel: '=',
        properties: '='
  		},
      replace: true,
      templateUrl: 'views/directives/dropzone',
      controller: ['$scope', function($scope){

        $scope.deleteImg = function(){
          $scope.ngModel = null;
          $http.delete('/api/images/deleteById/' + $scope.properties.id);
          console.log('Borrado!');
        };

      }],
  		link : function($scope, $element, attrs){

        console.log('AAAA');

        var isBackground = attrs.ngModel.indexOf('backgroundImage') >= 0;
        var bgPrefix = 'url(';
        var bgSuffix = ')';

  			function previewFile(file){
  				var reader = new FileReader();
  				reader.onload = function(data){
            var src = data.target.result;
            var size = file.size/(1024*1024); // in Kb
            var format = file.type.replace('image/','').toUpperCase()
            $scope.$apply(function() {

              // Client-side data
              $scope.ngModel = src;
              $scope.bgPropierty = String().concat(bgPrefix, src, bgSuffix);

              var formData = new FormData();
              formData.append('file', file);
              formData.append('type', format);
              formData.append('size', size);

              $http({
                url     :   '/api/images/upload',
                method  :   "POST",
                data    :   formData,
                transformRequest: angular.identity, // see the angugular js documentation
                headers : {'Content-Type': undefined}// setting content type to undefined that change the default content type of the angular js
              }).then(function(result){
                $scope.srcUrlAsCss = String().concat(bgPrefix, result.data.src, bgSuffix);
                $scope.ngModel = isBackground ? $scope.srcUrlAsCss : result.data.src;
              }, function(){
                console.log("hello from error");
              });
            });
      		}
      		reader.readAsDataURL(file);
  			}

        function uploadFile(e, type){
  				e.preventDefault();
  				var files = "";
  				if(type == "formControl"){
  					files = e.target.files;
  				} else if(type === "drop"){
  					files = e.originalEvent.dataTransfer.files;
  				}
  				for(var i=0;i<files.length;i++){
  					var file = files[i];
  					if(file.type.indexOf("image") !== -1){
  						previewFile(file);
  					} else {
  						alert(file.name + " is not supported");
  					}
  				}
  			}

  			$element.find('input').on('change', function(e){
          uploadFile(e,'formControl');
  			});
  		}
  	}
  }
]);
