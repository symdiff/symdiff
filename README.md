# symdiff

[![Build Status](http://img.shields.io/travis/symdiff/symdiff.svg)](https://travis-ci.org/symdiff/symdiff) [![Coverage Status](https://coveralls.io/repos/symdiff/symdiff/badge.svg?branch=master)](https://coveralls.io/r/symdiff/symdiff?branch=master)

Calculates symmetric difference between two arrays of strings. Main purpose is to detect unused CSS classes.

## API

`symdiff` takes three arrays of strings as arguments:

1. the classes used in CSS
2. the classes used in templates
3. classes to ignore

It outputs an object with the fields `css` and `templates`. For instance:

    var css = [“grid”, “grid-col”, “grid-row”],
        html= [“grid”                        ],
        ignr= [        “grid-col”            ];

    symdiff(css, html, ignr)
    > { css: [“grid-row”], templates: [] }


## License

Apache 2
