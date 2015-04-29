var unused = require('../index'),
    shouldIgnore = require('../index').shouldIgnore;

describe('shouldIgnore()', function() {
    it('should work without anything', function() {
        var fn = shouldIgnore();
        expect(fn('grid')).to.equal(false);
    });

    it('should work with strings', function() {
        var ignore = ['grid', 'grid-col'],
            fn = shouldIgnore(ignore);
        expect(fn('grid')).to.equal(true);
        expect(fn('grid-col')).to.equal(true);
        expect(fn('other')).to.equal(false);
    });

    it('should work with regexes', function() {
        var ignore = [/^grid/],
            fn = shouldIgnore(ignore);
        expect(fn('grid')).to.equal(true);
        expect(fn('grid-col')).to.equal(true);
        expect(fn('col-grid')).to.equal(false);
    });

    it('should work with both', function() {
        var ignore = [/^grid/, 'beartato'],
            fn = shouldIgnore(ignore);
        expect(fn('grid')).to.equal(true);
        expect(fn('beartato')).to.equal(true);
        expect(fn('other')).to.equal(false);
    });
});

describe('symdiff', function() {
    it('should work without arguments', function() {
        var result = unused();
        expect(result).to.be.defined;
        expect(result.css).to.be.defined;
        expect(result.templates).to.be.defined;
    });

    it('should find unused css classes', function() {
        var css = ['grid', 'grid-col'],
            tpl = ['grid'],
            result = unused(css, tpl);
        expect(result.css.length).to.equal(1);
        expect(result.css[0]).to.equal('grid-col');
        expect(result.templates.length).to.equal(0);
    });

    it('should find unused template classes', function() {
        var tpl = ['grid', 'grid-col'],
            css = ['grid'],
            result = unused(css, tpl);
        expect(result.templates.length).to.equal(1);
        expect(result.templates[0]).to.equal('grid-col');
        expect(result.css.length).to.equal(0);
    });

    it('should ignore classes correctly', function() {
        var tpl = ['grid', 'grid-col', 'grid-row'],
            css = ['grid', 'block', 'element'],
            ignore = ['grid-col', 'block'],
            result = unused(css, tpl, ignore);
        expect(result.css.length).to.equal(1);
        expect(result.css[0]).to.equal('element');

        expect(result.templates.length).to.equal(1);
        expect(result.templates[0]).to.equal('grid-row');
    });
});