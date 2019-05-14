/*
 * HtmlBuilder - a set of classes for building HTML on the fly from Javascript code
 * 
 * There are two related classes, ElementBuilder, for building arbitrary elements, 
 * and TableBuilder, which uses ElementBuilder to build HTML tables.
 */

function ElementBuilder() {
	
	this.elem = null;

	this.withName = function(name) {
		this.elem = document.createElement(name);
		return this;
	};
	
	this.withElement = function(elem) {
		this.elem = elem;
		return this;
	};
	
	/**
	 * Helper function to set the id of an element, identical to withAttr("id", id).
	 * 
	 * @param id
	 * @return
	 */
	this.withId = function(id) {
		this.elem.setAttribute('id', id);
		return this;
	};

	/**
	 * Sets an attribute value for an element.
	 * 
	 * This will replace an existing attribute of the same name in the element.
	 * 
	 * If you're setting CSS class attributs, see also withClass().
	 * 
	 * @param attr the attribute name
	 * @param value the attribute value. Note that special characters like double quotes are escaped by this
	 * function, so just pass normal text in.
	 * @return this, so you can chain calls, fluent-style
	 */
	this.withAttr = function(attr, value) {
		this.elem.setAttribute(attr, value);
		return this;
	};
	
	/**
	 * Adds a CSS class to an element.
	 * 
	 * This varies from withAttr("class", c) because it will append multiple space-separated classes if
	 * there is already a "class" attribute.
	 * 
	 * @param c
	 * @return this, so you can chain calls, fluent-style
	 */
	this.withClass = function(c) {
		this.elem.className += ' ' + c;
		return this;
	};

 	/**
	 * 
	 */
	this.on = function(what, fn) {
		$(this.elem).on(what, fn);
		return this;
	};
	
	/**
	 * Appends a Node object to this element. You probably want to use appendElement instead of this
	 * low-level function.
	 * 
	 * @param node
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendNode = function(n) {
		this.elem.appendChild(n);
		return this;
	};
	
	/**
	 * Appends a text node to this element. 
	 * 
	 * You should pass plain UTF-8 text with nothing escaped to this method! Everything will be escaped
	 * for you automatically when converted to HTML.
	 * 
	 * @param text
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendText = function(t) {
		this.elem.appendChild(document.createTextNode(t));
		return this;
	};

	/**
	 * Appends an Number value as a text element by converting it to a string
	 * 
	 * This is a convenience method that comes in handy when building tables with integer values in them.
	 * 
	 * @param value
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendNumber = function(n) {
		this.appendText(n.toString());
		return this;
	};
	
	
	/**
	 * Appends a block of text in a <pre>
	 * 
	 * The text must be regular UTF-8 text; it will be escaped by this function as necessary.
	 * Tabs will be expanded to spaces if tabSize > 0. The text can contain multiple lines separated
	 * by \n. 
	 *  
	 * @param text The text to insert
	 * @param tabSize Tab size in characters or 0 if you don't want to expand tabs to spaces.
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendPreText = function(text, tabSize) {
		var result = '';
		var col = 0;
		
		for(var ii = 0; ii < text.length; ii++) {
			var c = text.charAt(ii);
			if ((c == '\t') && (tabSize > 0)) {
				do {
					result += ' ';
					col++;
				} while((col % tabSize) != 0);
			}
			else {
				result += c;
				col++;
				
				if (c == '\n') {
					col = 0;
				}
			}
		}
		this.appendElement('pre').appendText(result);
		return this;
	};
	
	/**
	 * Append a new element to this element. The result is a new ElementBuilder, not this element builder!
	 * 
	 * You would then use the new ElementBuilder object to build that element, adding attributes, text, 
	 * more elements, etc. You don't have to complete this contained element before moving on with the 
	 * elements in the parent, but obviously you must complete everything before you stringify the
	 * whole element. 
	 * 
	 * See also the pop() method for how to get back to the original ElementBuilder you were working on.
	 * 
	 * @param name Name of the element to create
	 * @return A new ElementBuilder to allow that element to be created (adding attributes, text, etc.)
	 */
	this.appendElement = function(name) {
		var result = new ElementBuilder().withName(name);
		this.elem.appendChild(result.elem);
		result.parent = this;
		return result;
	};
	
	/**
	 * The pop() helper is used with appendElement in a common, but hard to explain, use case.
	 *
	 * Example:
	 * s = h.element("div").appendElement("a").withAttr("href", "http://www.rickk.com").appendText("a link").pop().appendText(" not a link").toString();
	 *
	 * Produces:
	 * <div><a href="http://www.rickk.com">a link</a> not a link</div>
	 *
	 * AppendElement("a") returns a new ElementBuilder that builds the <a> tag. In order to get "back up" to the <div>
	 * that surrounds it, you use pop(). 
	 *
	 * Alternatively, you could save the original ElementBuilder in a variable and then use that to continue building the outer div.
	 * 
	 * Also note: appendAnchor() is an easier way to implement what the example does.
	 * 
	 * @return parent element builder
	 */
	this.pop = function() {
		return parent;
	};
		
	/**
	 * Appends a table built with TableBuilder to this element.
	 * 
	 * @param tb
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendTable = function(tb) {
		this.appendElementBuilder(tb.table);
		return this;
	};
	
	/**
	 * Appends an element built with ElementBuilder to this element
	 * 
	 * This is a little weird, because you would normally just use this element
	 * builder to add to this element, but this situation can arise if 
	 * you have a method that builds a part of your document and returns
	 * an ElementBuilder. 
	 *
	 * Alternatively, you could return an Element or Node and use appendNode.
	 * Or you could pass this ElementBuilder into the method. All work fine.
	 * 
	 * @param eb
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendElementBuilder = function(eb) {
		this.elem.appendChild(eb.elem);
		return this;
	};
	
	/**
	 * Append a <br/>. 
	 * 
	 * This is useful instead of appendElement("br") because the latter will return the inside
	 * of the br, which we do not want. We want to return the parent.
	 *
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendBreak = function() {
		this.appendElement("br");
		return this;
	};
	
	/**
	 * Helper method to insert an <a href="href">text</a>.
	 * 
	 * Basically shorthand for:
	 * appendElement("a").withAttr("href", text).appendText(text).pop()
	     *
	     * If you want to put something complicated in the link (an image, for example), you'll
	     * have to do it manually (which isn't really that much work, anyway).
	     *
	 * @param href
	 * @param text
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendAnchor = function(href, text) {
		this.appendElement("a").withAttr("href", href).appendText(text);
		return this;
	};
	
	/**
	 * Helper method to insert an image <img src="src" width="width" height="height" alt="alt"/>
	 * 
	 * Basically shorthand for the slightly unwieldy:
	 * appendElement("img").withAttr("src", src).withAttr("width", width).withAttr("height", height).withAttr("alt", alt).pop()
   	 *
	 * @return this, so you can chain calls, fluent-style
	 */
	this.appendImage = function(src, width, height, alt) {
		this.appendElement("img").withAttr("src", src).withAttr("width", width).withAttr("height", height).withAttr("alt", alt);
		return this;
	};

	/**
	 * This is used internally by spanColumns and spanRows.
	 */
	this.remove = function() {
		this.elem.parentNode.removeChild(this.elem);
	};
	
	this.removeChildren = function() {
		while(true) {
			var n = this.elem.firstChild;
			if (n == null) {
				break;
			}
			this.elem.removeChild(n);
		}
	};
	
	return this;
}

function TableBuilder(cols, rows, hasHead) {
	// Passed in parameters
	this.cols = cols;
	this.rows = rows;
	this.hasHead = hasHead;
	
	// Member variables
	this.table = null;
	this.rowData = null;
	this.header = null;
	
	this.init = function() {
		this.table = new ElementBuilder().withName('table');
		
		if (this.hasHead) {
			this.thead = this.table.appendElement("thead");
			this.header = new RowData(-1, this);
		}
		this.tbody = this.table.appendElement("tbody");
		
		this.rowData = new Array();
		
		for(var yy = 0; yy < rows; yy++) {
			this.rowData.push(new RowData(yy, this));
		}
	};
	
	/**
	 * Adds rows to the table.
	 * 
	 * It's usually better to size the table appropriately to start, but this method can
	 * be used to add rows dynamically. Note that you cannot add columns, so make sure
	 * you have a way to figure that out ahead of time.
	 * 
	 * Also note that you should apply CSS classes (withColumnClass, withRowClass) AFTER
	 * you have added all of the rows you intend to add. Newly added rows do not inherit
	 * previously applied CSS classes.
	 * 
	 * @param numberOfRows
	 * @return this, so you can chain calls, fluent-style
	 */
	this.addRows = function (numberOfRows) {
		for(var ii = 0; ii < numberOfRows; ii++) {
			this.rowData.push(new RowData(this.rows++, this));
		}
	};

	/**
	 * Helper function to add a border="0" to the <table> declaration 
	 * 
	 * @return this, so you can chain calls, fluent-style
	 */
	this.withNoBorder = function() {
		this.table.withAttr('border', '0');
		return this;
	};

	/**
	 * Applies a CSS class to the <th> in column xx
	 * 
	 * @param xx
	 * @param cssClass
	 * @return this, so you can chain calls, fluent-style
	 * @throws IndexOutOfBoundsException
	 */
	this.withHeaderClass = function(xx, cssClass) {
		this.headerCell(xx).withClass(cssClass);
		return this;
	};

	/**
	 * Applies a CSS class to the <td> in every row of column xx
	 * 
	 * @param xx
	 * @param cssClass
	 * @return this, so you can chain calls, fluent-style
	 * @throws IndexOutOfBoundsException
	 */
	this.withColumnClass = function(xx, cssClass) {
		for(var yy = 0; yy < this.rows; yy++) {
			this.cell(xx, yy).withClass(cssClass);
		}
		return this;
	};

	/**
	 * Applies a CSS class to the <td> in every column of row yy
	 * 
	 * @param yy
	 * @param cssClass
	 * @return this, so you can chain calls, fluent-style
	 * @throws IndexOutOfBoundsException
	 */
	this.withRowClass = function(yy, cssClass) {
		for(var xx = 0; xx < cols; xx++) {
			this.cell(xx, yy).withClass(cssClass);
		}
		return this;
	};

	/**
	 * Gets the ElementBuilder for the <tr> for the header row, if there is one
	 * 
	 * @return an ElementBuilder for the header row
	 * @throws IndexOutOfBoundsException
	 */
	this.headerRow = function() {
		if (this.header == null) {
			throw('no header');
		}
		return this.header.row();
	};

	/**
	 * Gets the ElementBuilder for the <th> cell at column xx in the header row, if there is one
	 * 
	 * @param xx
	 * @return an ElementBuilder for a cell in the header
	 * @throws IndexOutOfBoundsException
	 */
	this.headerCell = function(xx) {
		if (this.header == null) {
			throw('no header');
		}
		return this.header.cell(xx);
	};

	/**
	 * Gets the RowData class for row yy. You probably will never need to use this; it's used internally.
	 * 
	 * @param yy The row to get (0-based), or -1 to get the header row.
	 * @return a RowData object for a given row.
	 * @throws IndexOutOfBoundsException
	 */
	this.getRowData = function(yy) {
		if (yy < 0) {
			return this.header;
		}
		else {
			return this.rowData[yy];
		}
	};

	/**
	 * Gets the ElementBuilder for the <tr> for row yy
	 *  
	 * You might want to do this if you're going to add attributes to the <tr>.
	 *  
	 * @param yy The row to get (0-based), or -1 to get the header row
	 * @return an ElementBuilder for the specified row
	 * @throws IndexOutOfBoundsException
	 */
	this.row = function(yy) {
		return this.getRowData(yy).row();
	};
	
	/**
	 * Gets the ElementBuilder for the <td> at coordinates xx, yy
	 * 
	 * If you are using rowspan or colspan, the xx, yy should specify the upper left
	 * corner of the span (the smallest values of xx and yy in the span).
	 * 
	 * @param xx
	 * @param yy
	 * @return an ElementBuilder for the cell at xx, yy
	 * @throws IndexOutOfBoundsException
	 */
	this.cell = function(xx, yy) {
		return this.getRowData(yy).cell(xx);
	};
	
	/**
	 * Add a colspan starting at column xx and extending for numCols in row yy. Returns
	 * the ElementBuilder to build the cell.
	 * 
	 * Note that this does not change the numbering of the cells in the table. You can get back to 
	 * the cell by using coordinate xx, yy. cell(xx + 1, yy) and so on depending on how many columns 
	 * you've spanned will return null.
	 * 
	 * @param xx
	 * @param numCols The value of the colspan attribute. Always >= 2.
	 * @param yy
	 * @return
	 * @throws IndexOutOfBoundsException
	 */
	this.spanColumns = function(xx, numCols, yy) {
		var rd = this.getRowData(yy);
		return rd.spanColumns(xx, numCols); 
	};
	
	/**
	 * Add a rowspan starting at row yy and extending for numRows in column xx. Returns
	 * the ElementBuilder to build the cell.
	 * 
	 * Note that this does not change the numbering of the cells in the table. You can get back to 
	 * the cell by using coordinate xx, yy. cell(xx, yy + 1) and so on depending on how many columns 
	 * you've spanned will return null.
	 * 
	 * @param xx
	 * @param numRows The value of the rowspan attribute. Always >= 2.
	 * @param yy
	 * @return
	 * @throws IndexOutOfBoundsException
	 */
	this.spanRows = function(xx, yy, numRows) {
		var result = cell(xx, yy);
		
		result.withAttr('rowSpan', numRows.toString());
		
		for(var ii = 1; ii < numRows; ii++) {
			this.getRowData(yy + ii).remove(xx);
		}
	};
	
	this.init();
	return this;
}


/**
 * This class is used internally for managing a table row. You should not need to use it directly.
 */
function RowData(yy, table) {
	this.yy = yy;
	this.table = table;
	
	this.rowBuilder = null;
	this.cellBuilders = null;
	
	this.init = function() {
		if (yy < 0) {
			// thead
			this.rowBuilder = table.thead.appendElement('tr');
		}
		else {
			// tbody
			this.rowBuilder = table.tbody.appendElement('tr');
		}
		
		this.cellBuilders = new Array();
		for(var xx = 0; xx < this.table.cols; xx++) {
			this.cellBuilders.push(this.rowBuilder.appendElement((yy < 0) ? 'th' : 'td'));
		}
	};
	
	this.row = function() {
		return this.rowBuilder;
	};
	
	this.cell = function(xx) {
		return this.cellBuilders[xx];
	};

	this.remove = function(xx) {
		this.cell(xx).remove();
		this.cellBuilders[xx] = null;
	};
	
	this.spanColumns = function(xx, numCols) {
		var result = this.cell(xx);
		
		result.withAttr('colspan', numCols.toString());
		for(var ii = 1; i < numCols; ii++) {
			this.remove(xx + ii);
		}
		
		return result;
	};
	
	this.init();
	return this;
}

