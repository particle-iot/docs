// <svg height="200" width="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle r="40" fill="none" stroke-width="1" stroke="#CB3728" cx="42" cy="82"></circle></svg>
const fs = require('fs');
const { result } = require('lodash');

(function(svg) {

    svg.indent = function(level) {
        return '                                                               '.substring(0, level);
    }

    svg.element = function(name, attr) {
        let element = {
            children: [],
        };
        
        // Returns element so you can chain multiple drawing primitives inside a group or svg drawing
        element.circle = function(attr) {
            const e = svg.element('circle', attr);
            element.children.push(e);
            return element;
        }

        // Returns element so you can chain multiple drawing primitives inside a group or svg drawing
        element.rect = function(attr) {
            const e = svg.element('rect', attr);
            element.children.push(e);
            return element;
        }

        // Returns element so you can chain multiple drawing primitives inside a group or svg drawing
        element.line = function(attr) {
            const e = svg.element('line', attr);
            element.children.push(e);
            return element;
        }

        // Returns element so you can chain multiple drawing primitives inside a group or svg drawing
        element.path = function(attr) {
            const e = svg.element('path', attr);
            element.children.push(e);
            return element;
        }
        
        // Returns element so you can chain multiple drawing primitives inside a group or svg drawing
        element.text = function(attr, t) {
            const e = svg.element('text', attr);
            e.data = t;
            element.children.push(e);
            return element;
        }
        
        // Returns the group element so you can add items inside it
        element.g = function(attr) {
            const e = svg.element('g', attr);
            element.children.push(e);
            return e;
        }

        // Returns element so you can chain multiple drawing primitives inside a group or svg drawing
        element.svg = function(attr, path) {
            let e = {

            };
            e.data = fs.readFileSync(path, 'utf8');
            e.render = function(indent) {
                let result = '';
                for(const l of e.data.split('\n')) {
                    if (!l.startsWith('<?xml') && !l.startsWith('<!DOCTYPE')) {
                        result += svg.indent(indent + 2) + l.trim() + '\n';
                    }
                }
                return result;
            };
            element.children.push(e);
            return element;
        }

        element.render = function(indent) {
            if (!indent) {
                indent = 0;
            }
            let attrString = '';
            if (attr) {
                for(const key in attr) {
                    attrString += key + '="';
                    
                    if (Array.isArray(attr[key])) {
                        // transform
                        for(const t of attr[key]) {
                            attrString += t + ' ';
                        }
                    }
                    else
                    if (typeof attr[key] == 'object') {
                        // style
                        for(const k2 in attr[key]) {
                            attrString += k2 + ':' + attr[key][k2] + '; ';
                        }
                    }
                    else {
                        // plain attributes
                        attrString += attr[key];
                    }
                    attrString += '" ';
                }    
            }
            let result = svg.indent(indent) + '<' + name + ' ' + attrString + '>\n';

            for(const c of element.children) {
                result += c.render(indent + 2);
            }
            if (element.data) {
                result += element.data;
            }

            result += svg.indent(indent) + '</' + name + '>\n';

            return result;
        }

        return element;
    };

    svg.svg = function(attr) {
        return svg.element('svg', Object.assign({
            'xmlns': 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        }, (attr ? attr : {})));
    }


}(module.exports));
