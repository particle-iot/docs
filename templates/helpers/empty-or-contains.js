// Similar to contains but renders content even if the collection or
// item is blank
module.exports = function( collection, item, options ){
  if (!collection || !collection.length || !item) {
    return options.fn(this);
  }

  // string check
  if( typeof collection === 'string' ){
    if( collection.search( item ) >= 0 ){
      return options.fn(this);
    }
    else {
      return options.inverse(this);
    }
  }
  // "collection" check (objects & arrays)
  for( var prop in collection ){
    if( collection.hasOwnProperty( prop ) ){
      if( collection[prop] == item ) return options.fn(this);
    }
  }
  return options.inverse(this);
};
