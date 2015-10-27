require('assert');
var should = require('should');

describe('Search', function() {

  var Search = require('../src/search'),
      searchInstance;

  beforeEach(function() {
    searchInstance = new Search;
  });

  describe('searchString', function() {
    it('should find a term in a string', function() {
      var result = searchInstance.searchString('term', 'source string with term');
      should(result).be.true();
    });
  });

  describe('countWords', function() {
    it('should count the words in the given string', function() {
      var count = searchInstance.countWords('horse', 'i love horses they are great, horse horse horse');
      should(count).be.exactly(3);
    });
  });

  describe('countWordsInSet', function() {
    it('should return a count of all the words in the given set', function() {
      var result = searchInstance.countWordsInSet(
          ['horse', 'coffee'],
          [
            'the horse was drinking coffee',
            'coffee is healthy in small doses',
            'horses are hillarious'
          ]
      );

      should(result).have.ownProperty('horse');
      should(result).have.ownProperty('coffee');
      should(result).have.ownProperty('total');

      should(result.horse).be.exactly(1);
      should(result.coffee).be.exactly(2);
      should(result.total).be.exactly(3);
    });
  });

  describe('scoreSets', function() {
    it('should generate a matching score for each set', function() {
      var result = searchInstance.scoreSets(
          'fancy pants',
          [
            [
              'mr fancy had lots of pants',
              'the pants were really fancy'
            ],
            [
              'pants are good in the cold'
            ],
            [
              'jesus christ monkey balls'
            ],
            [
              'premium pants at jim\'s fancy pants shop'
            ]
          ]
      );

      should(result.length).be.exactly(4);
      should(result[0]).be.exactly(4);
      should(result[1]).be.exactly(1);
      should(result[2]).be.exactly(0);
      should(result[3]).be.exactly(3);
    });
  });
});
