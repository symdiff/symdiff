var _ = require('lodash');

/**
 * Returns a function that accepts a string and returns
 * whether this class should be ignored.
 *
 * @param  {Array} Array of strings or regexes
 * @return {Function}
 */
function shouldIgnore(ignore) {
    ignore = ignore || [];
    return function(clazz) {
        return _.chain(ignore)
                .map(function(i) {
                    if (_.isRegExp(i)) {
                        return i.test(clazz);
                    }
                    if (_.isString(i)) {
                        return i === clazz;
                    }
                    return false;
                })
                .some(_.identity)
                .value();
    };
}

/**
 * Checks whether all classes used in CSS and templates
 * are the same.
 * 
 * @param  {Array} Array of CSS classes
 * @param  {Array} Array of template classes
 * @param  {Array} Array of classes or RegExps to ignore
 * @return {Object} Object with `css` array for classes unused in templates and `templates` for the opposite case.
 */
function symdiff(css, tpls, ignore) {
    // defaults
    css = css || [];
    tpls = tpls || [];

    var testIgnoreFn = shouldIgnore(ignore),
        // bad templates => in tpls, but not in css
        badTemplates = _.difference(tpls, css),
        // bad css => in css, but not in tpls
        badCSS = _.difference(css, tpls);

    // filter out ignored classes
    badTemplates = _.reject(badTemplates, testIgnoreFn);
    badCSS = _.reject(badCSS, testIgnoreFn);

    return {
        css: badCSS,
        templates: badTemplates
    };
};

module.exports = symdiff;
module.exports.shouldIgnore = shouldIgnore;