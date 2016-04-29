'use strict';

angular
    .module('myApp.components.form', [])
    .directive('genericForm', [
        function () {
            return {
                restrict: 'EA',
                templateUrl: 'components/form/form.html',
                // require: '^userForm',
                scope: {
                    fields: '=',
                    action: '&',
                    mode: '='
                },
                link: function (scope, elements, attrs) {

                    scope.$watch('mode', function (newMode) {
                        if (newMode === 'create') {
                            scope.formName = 'Create form';
                            scope.disabled = false;
                            scope.actionLabel = 'Create';
                        } else if (newMode === 'update') {
                            scope.formName = 'Update form';
                            scope.disabled = false;
                            scope.actionLabel = 'Update';
                        } else {
                            scope.formName = 'Show';
                            scope.disabled = true;
                            scope.actionLabel = undefined;
                        }
                    });

                    scope.close = function () {
                        scope.$parent.$parent.initialize();
                    };
                }
            };
        }
    ]);