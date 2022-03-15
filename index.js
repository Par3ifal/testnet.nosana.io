/*
  case insensitive names!
*/

var Basic = function(obj) {
  var _transform = (function(){
    var cache = Object.create(null)
    return  function(name){
      return  (cache[name] // lisp! 
        || (cache[name] = 
          Object.getOwnPropertyNames(obj).filter(function(i){ return  i.toUpperCase() == name.toUpperCase() })[0]))
    }
  })()
  
  return  Proxy.create({
    has: function(name) { return  _transform(name) in obj },
    get: function(r, name) { return  obj[_transform(name)] },
    set: function(r, name, v) { obj[_transform(name) || name] = v }
  }, null)
}

var a = Basic({
  x: 1,
  _foo: function(){ return  this.x }
})

a.X = 1
a.Y = 2
_log(a._Foo() + a.y)
