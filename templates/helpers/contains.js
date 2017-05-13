// Block helper to render content if a string is part of an array or another string
//
// Usage in a page that has the "devices" front-matter key:
// {{#contains devices 'photon'}}Link to Photon content{{/if}}
//
// Usage in URL matching:
// {{#contains ../path.href section}}active-section{{/contains}}
module.exports = function( collection, item, options ){
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
