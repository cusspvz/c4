# c4
:fire: a javascript engine burster error handler

Burst [nodejs] or a [browser] engine in case an hacking error was detected.

## Installation

```
npm i --save c4
```

## Usage

In case you catch an error

```
var c4 = require( 'c4' )

{
    before: function ( err, next ) {
        report(function () {
            document.body.innerHtml = "i know what you did boy... reported!!"
            next()
        })
    }
    // Other options
})

function someMethod ( variable ) {
    try{
        if ( variable === 'hacking' ) {
            throw new Error( "Hacking errorr!!!!!" )
        }
    }catch(err) {
        report(function () {
            document.body.innerHtml = "i know what you did boy... reported!!"
            c4.explode()
        })
    }
}

```

### API

#### `c4.explode` - blocks the browser/node's js engine
