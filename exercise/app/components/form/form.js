'use strict';

angular
    .module('components.form', [])
    .directive('genericForm', [
        function () {
            return {
                restrict: 'EA',
                templateUrl: 'components/form/form.html',
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

                    scope.doAction = function (form) {
                        for (var field = 0; field < scope.fields.length; field++) {
                            form[scope.fields[field].name].$dirty = true;
                        }
                        if (form.$valid) {
                            scope.action();
                        }
                    };

                    scope.close = function () {
                        scope.$parent.$parent.initialize();
                    };
                }
            };
        }
    ]);