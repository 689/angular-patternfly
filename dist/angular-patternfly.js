/**
 * @ngdoc directive
 * @name patternfly.button:loButtonClear
 * @element button
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 * @example
 <example module="patternfly.button">

 <file name="index.html">
 <div ng-controller="ButtonDemoCtrl">
  <form>
    <button lo-button-clear="clearMe()">Clear</button>
    <pre>{{text}}</pre>
  </form>
 </div>
 </file>

 <file name="script.js">
 function ButtonDemoCtrl($scope) {
    $scope.text = 'Text before clear.';

    $scope.clearMe = function() {
      $scope.text = '';
    };
  }
 </file>

 </example>
 */
angular.module('patternfly.button', []).directive('loButtonClear', function () {
  return {
    scope: {
      loButtonClear: '&'
    },
    restrict: 'A',
    link: function (scope, elem) {
      elem.addClass('btn btn-default btn-lg');
      elem.attr('type','button');
      elem.bind('click', function() {
        scope.$apply(function() {
          scope.loButtonClear();
        });
      });
    }
  };
});;angular.module('patternfly.notification', [])

.factory('Notifications', function($rootScope, $timeout, $log) {
  // time (in ms) the notifications are shown
  var delay = 5000;

  var notifications = {};

  $rootScope.notifications = {};
  $rootScope.notifications.data = [];

  $rootScope.notifications.remove = function(index){
    $rootScope.notifications.data.splice(index,1);
  };

  var scheduleMessagePop = function() {
    $timeout(function() {
      $rootScope.notifications.data.splice(0,1);
    }, delay);
  };

  if (!$rootScope.notifications) {
    $rootScope.notifications.data = [];
  }

  notifications.message = function(type, header, message) {
    $rootScope.notifications.data.push({
      type : type,
      header: header,
      message : message
    });

    scheduleMessagePop();
  };

  notifications.info = function(message) {
    notifications.message('info', 'Info!', message);
    $log.info(message);
  };

  notifications.success = function(message) {
    notifications.message('success', 'Success!', message);
    $log.info(message);
  };

  notifications.error = function(message) {
    notifications.message('danger', 'Error!', message);
    $log.error(message);
  };

  notifications.warn = function(message) {
    notifications.message('warning', 'Warning!', message);
    $log.warn(message);
  };

  notifications.httpError = function(message, httpResponse) {
    message += ' (' + (httpResponse.data.message ? (httpResponse.data.message) : (httpResponse.data.cause ? (httpResponse.data.cause) : '')) + ')';
    notifications.message('danger', 'Error!', message);
    $log.error(message);
  };

  return notifications;
});