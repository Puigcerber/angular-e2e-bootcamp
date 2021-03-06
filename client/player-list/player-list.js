'use strict';

angular.module('webApp.playerList', ['webApp.btnSelect'])
  .component('playerList', {
    bindings: {
      players: '=',
      isSquad: '=',
      onPlayerClick: '&',
      search: '='
    },
    template: [
      '<ul class="list-group">',
      '<li class="list-group-item" ng-repeat="player in $ctrl.players | filter:$ctrl.search">',
      '{{ player.name }} {{ player.surname }}',
      '<btn-select is-select="!$ctrl.isSquad" ng-click="$ctrl.onPlayerClick({player: player})"></btn-select>',
      '</li>',
      '</ul>'
    ].join('')
  });
