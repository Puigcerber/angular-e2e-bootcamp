'use strict';

describe('Service: Players', function () {

  beforeEach(module('webApp.players'));

  var Players;
  var httpBackend;
  beforeEach(inject(function($httpBackend, _Players_){
    httpBackend = $httpBackend;
    Players = _Players_;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function() {
    expect(!!Players).toBe(true);
  });

  describe('Method: getAll', function () {

    it('should expose a method to get all the players', function() {
      expect(Players.getAll).toBeDefined();
      expect(angular.isFunction(Players.getAll)).toBe(true);
    });

    it('should retrieve an array of players', function() {
      var players = [
        { id: 1, name: 'Thibaut', surname:'Courtois', countryId:'BE'},
        { id: 2, name: 'Simon', surname: 'Mignolet', countryId:'BE'}
      ];
      var actualPlayers = [];
      var handler = jasmine.createSpyObj('handler', ['success', 'error']);
      handler.success.and.callFake(function(data) {
        actualPlayers = data;
      });

      httpBackend.expectGET(/\/api\/players/).respond(players);
      Players.getAll().then(handler.success, handler.error);
      httpBackend.flush();

      expect(actualPlayers).toEqual(players);
      expect(handler.success).toHaveBeenCalled();
      expect(handler.success.calls.count()).toBe(1);
      expect(handler.error).not.toHaveBeenCalled();
    });

  });

});
