projectList.directive('validateNavdeepDirective', [
    ValidateNavdeepDirectiveFn
]);

function ValidateNavdeepDirectiveFn () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('keyup mouseup blur change', function() {
              if(element.val() === 'Navdeep') {
                element.val('');
              }
            });
        }
    };
};