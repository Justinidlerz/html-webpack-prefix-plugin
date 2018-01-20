const fs = require('fs');
const path = require('path');
const should = require('should');

const HTMLMatcher = require('../lib/HTMLMatcher');

describe('HTMLMatcher.js', () => {
  describe('#10 links', () => {
    it('Should be matched 10', () => {
      const html = fs.readFileSync(path.join(__dirname, './10links.html'), { encoding: 'utf8' });
      const repeated = HTMLMatcher(html);
      repeated.should.be.length(10);
    });
  });
});
