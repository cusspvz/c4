/* jshint asi: true */

var assign = require( 'object.assign' ).getPolyfill()
var EventEmitter = require( 'events' ).EventEmitter
var spark = require( './spark' )

var global = (function () { return this })()

function C4 ( options ) {
    this.options = assign({}, C4.defaults, typeof options === 'object' ? options : {})
}


module.exports = C4

C4.defaults = {
    wipeGlobal: true,
    wipeDocument: true,
    wipeRequire: true,
    spark: 300,
}

C4.prototype = Object.create( EventEmitter )

C4.prototype.explode = function () {
    var o = this.options

    setTimeout( spark, o.delay )

    if( o.wipeDocument ) {
        this.wipeDocument()
    }

    if( o.wipeGlobal ) {
        this.wipeGlobal()
    }
}

// Prevent accessing to require resources
C4.prototype.wipeRequire = function () {
    if (
        typeof require !== 'undefined'
    ) {
        for ( var i in require ) {
            try {
                delete require[i]
                Object.defineProperty(require, {
                    enumerable: true,
                    writable: false,
                    value: undefined
                })
            }catch(e){}
        }
    }
}

// Prevent accessing to global variables
C4.prototype.wipeGlobal = function () {
    for ( var i in global ) {
        try {
            delete global[i]
            Object.defineProperty(global,{
                enumerable: true,
                writable: false,
                value: undefined
            })
        }catch(e){}
    }

    this.emit( 'global-wiped' )
}

C4.prototype.wipeDocument = function () {
    if ( typeof global.document !== 'undefined' ) {
        document.body.innerHtml = ''
    }
}
