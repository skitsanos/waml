if (!Waml.Utils.DragDrop) {Waml.Utils.DragDrop = {};}

Waml.Utils.DragDrop.workspace = "workspace";
Waml.Utils.DragDrop.CORNER_IMAGE_SRC = "/waml/cornertip.gif";
Waml.Utils.DragDrop.maxZIndex = 0;
Waml.Utils.DragDrop.minWidth = 30;
Waml.Utils.DragDrop.minHeight = 30;
Waml.Utils.DragDrop.objectIndex = 0;
Waml.Utils.DragDrop.dragObjects = [];
Waml.Utils.DragDrop.curDragObject = null; //current drag object
Waml.Utils.DragDrop.dragObject = null; //drag object active during dragging and resizing
Waml.Utils.DragDrop.container = null; //drag object active during dragging and resizing

/**
 * Returns the mouse coordinates as an object
 * @param {Object} ev - event source
 */
Waml.Utils.DragDrop.mouseCoords = function(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};	
};

/**
 * Current offset of the mouse relative to the target
 * @param {Object} target
 * @param {Object} ev
 */
Waml.Utils.DragDrop.getMouseOffset = function(target, ev){
	ev = ev || window.event;
	var docPos    = Waml.Utils.DragDrop.getPosition(target);
	var mousePos  = Waml.Utils.DragDrop.mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
};

/**
 * Current position of the element object
 * @param {Object} e
 */
Waml.Utils.DragDrop.getPosition = function(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
		e     = e.offsetParent;
	}
	left += e.offsetLeft;
	top  += e.offsetTop;
	return {x:left, y:top};
};
/**
 * restricts the object in the container
 * @param {Object} point
 */
Waml.Utils.DragDrop.isPointInContainer = function(point) {
	if(point.x > Waml.Utils.DragDrop.container.corners[0].x && point.y > Waml.Utils.DragDrop.container.corners[0].y &&    point.x < Waml.Utils.DragDrop.container.corners[1].x && point.y > Waml.Utils.DragDrop.container.corners[1].y && point.x > Waml.Utils.DragDrop.container.corners[2].x && point.y < Waml.Utils.DragDrop.container.corners[2].y && point.x < Waml.Utils.DragDrop.container.corners[3].x && point.y < Waml.Utils.DragDrop.container.corners[3].y )
	{
	   	return true;
	}
	else
	{
		return false;
	}
};

/**
 * Exports the objects data as XML
 */
Waml.Utils.DragDrop.exportXML = function() {
	var exportXMLData = '<?xml version="1.0"?>';
	var imageXMLData = '<images>';
	var layerXMLData = '<layers>';
	for (var objIndex=0; objIndex<Waml.Utils.DragDrop.dragObjects.length; objIndex++) {
		var curObj = Waml.Utils.DragDrop.dragObjects[objIndex];
		if(curObj !== null){
			if(curObj.type == "Image"){
				imageXMLData += '<image>';
				imageXMLData += '<src>'+curObj.obj.src+'</src>';
				imageXMLData += '<width>'+curObj.w+'</width>';
				imageXMLData += '<height>'+curObj.h+'</height>';
				imageXMLData += '<posX>'+curObj.x+'</posX>';
				imageXMLData += '<posY>'+curObj.y+'</posY>';
				imageXMLData += '<zIndex>'+curObj.zIndex+'</zIndex>';
				imageXMLData += '</image>';
			}
			else if (curObj.type == "Layer"){
				layerXMLData += '<layer>';
				layerXMLData += '<text>'+curObj.obj.innerHTML+'</text>';
				layerXMLData += '<width>'+curObj.w+'</width>';
				layerXMLData += '<height>'+curObj.h+'</height>';
				layerXMLData += '<posX>'+curObj.x+'</posX>';
				layerXMLData += '<posY>'+curObj.y+'</posY>';
				layerXMLData += '<bgColor>'+curObj.bgColor+'</bgColor>';
				layerXMLData += '<zIndex>'+curObj.zIndex+'</zIndex>';
				layerXMLData += '</layer>';
			}
		}
	}
	imageXMLData += '</images>'; 
	layerXMLData += '</layers>';
	exportXMLData += imageXMLData + layerXMLData;
	return exportXMLData;
};

/**
 * The function which adds the draggable object to th array and to the document
 * @param {Object} containerId
 * @param {Object} objType
 * @param {Object} srcText
 * @param {Object} width
 * @param {Object} height
 * @param {Object} bgColor
 */
Waml.Utils.DragDrop.addDraggableObject = function(objType, srcText, width, height, bgColor){
	var drob = new Waml.Utils.DragDrop.Object(objType, srcText, width, height, bgColor);
	drob.index = Waml.Utils.DragDrop.objectIndex;
	document.getElementById(Waml.Utils.DragDrop.workspace).appendChild(drob.obj);
	drob.maximizeZ();
	Waml.Utils.DragDrop.dragObjects[Waml.Utils.DragDrop.objectIndex] = drob;	
	Waml.Utils.DragDrop.objectIndex++;	
};

/**
 * returns the current draggable object
 */
Waml.Utils.DragDrop.getCurrentDragObject = function() {
	return Waml.Utils.DragDrop.curDragObject;
};

/**
 * 
 * @param {Object} containerId
 * @param {Object} objType
 * @param {Object} srcText
 * @param {Object} width
 * @param {Object} height
 * @param {Object} bgColor
 */
Waml.Utils.DragDrop.Object = function (objType, srcText, width, height, bgColor){
	switch(objType)
	{
		case "Image":
			this.obj = new Image();
			this.obj.src = srcText;			
			this.type = "Image";
			break;
		case "Layer":
			this.obj = document.createElement("div");
			this.obj.style.position = "absolute";
			this.obj.style.width = width+'px';
			this.obj.style.height = height+'px';
			this.obj.innerHTML = srcText;
			this.type = "Layer";
			break;		
		default:
			break;
	}
		
	this.index = Waml.Utils.DragDrop.objectIndex;
	this.name = "DraggableObject";
	this.obj.id = "do-"+Waml.Utils.DragDrop.objectIndex;
	this.obj.style.position = "absolute";
	this.obj.style.cursor = "move";

	if( width !== undefined && height !== undefined ) {this.obj.style.width = Number(width)+'px'; this.obj.style.height = Number(height)+'px';}
	
	this.bgColor = ''; if(bgColor !== undefined) {this.obj.style.backgroundColor = bgColor; this.bgColor = bgColor;}
	
	this.w = Number(Waml.Utils.DragDrop._extractValueFromStyle(this.obj.style.width));
	this.h = Number(Waml.Utils.DragDrop._extractValueFromStyle(this.obj.style.height));
	this.x = Number(Waml.Utils.DragDrop._extractValueFromStyle(this.obj.style.left));
	this.y = Number(Waml.Utils.DragDrop._extractValueFromStyle(this.obj.style.top));
	this.zIndex = Waml.Utils.DragDrop.maxZIndex;

	this.cornerPoints = [];
	this.cornerPoints[0] = new Waml.Utils.DragDrop.Point(this.x, this.y);
	this.cornerPoints[1] = new Waml.Utils.DragDrop.Point(this.x+this.w, this.y);
	this.cornerPoints[2] = new Waml.Utils.DragDrop.Point(this.x, this.y+this.h);
	this.cornerPoints[3] = new Waml.Utils.DragDrop.Point(this.x+this.w, this.y+this.h);
	
	this.cornerImages = [];
	for(var i=0; i<4; i++)
	{
		this.cornerImages[i] = new Waml.Utils.DragDrop.CornerImage(i);
	}

	if(Waml.Utils.DragDrop.container === null) {
		Waml.Utils.DragDrop.container = document.getElementById(Waml.Utils.DragDrop.workspace);
		Waml.Utils.DragDrop.container.w = Number(Waml.Utils.DragDrop._extractValueFromStyle(Waml.Utils.DragDrop.container.style.width));
		Waml.Utils.DragDrop.container.h = Number(Waml.Utils.DragDrop._extractValueFromStyle(Waml.Utils.DragDrop.container.style.height));
		Waml.Utils.DragDrop.container.corners = [];
		Waml.Utils.DragDrop.container.corners[0] = Waml.Utils.DragDrop.getPosition(Waml.Utils.DragDrop.container);
		Waml.Utils.DragDrop.container.corners[1] = new Waml.Utils.DragDrop.Point(Waml.Utils.DragDrop.container.corners[0].x+Waml.Utils.DragDrop.container.w, Waml.Utils.DragDrop.container.corners[0].y);
		Waml.Utils.DragDrop.container.corners[2] = new Waml.Utils.DragDrop.Point(Waml.Utils.DragDrop.container.corners[0].x, Waml.Utils.DragDrop.container.corners[0].y+Waml.Utils.DragDrop.container.h);
		Waml.Utils.DragDrop.container.corners[3] = new Waml.Utils.DragDrop.Point(Waml.Utils.DragDrop.container.corners[0].x+Waml.Utils.DragDrop.container.w, Waml.Utils.DragDrop.container.corners[0].y+Waml.Utils.DragDrop.container.h);
	}
	this.adjustToBorder = function() {
		for (var i=0;i<4;i++) {
			if(this.cornerPoints[i].x < Waml.Utils.DragDrop.container.corners[0].x)
				{this.moveToPoint(new Waml.Utils.DragDrop.Point(Waml.Utils.DragDrop.container.corners[0].x, this.y));}
			if(this.cornerPoints[i].y < Waml.Utils.DragDrop.container.corners[0].y)
				{this.moveToPoint(new Waml.Utils.DragDrop.Point(this.x, Waml.Utils.DragDrop.container.corners[0].y));}
			if(this.cornerPoints[i].x > Waml.Utils.DragDrop.container.corners[3].x)
				{this.moveToPoint(new Waml.Utils.DragDrop.Point(Waml.Utils.DragDrop.container.corners[3].x-this.w, this.y));}
			if(this.cornerPoints[i].y > Waml.Utils.DragDrop.container.corners[3].y)
				{this.moveToPoint(new Waml.Utils.DragDrop.Point(this.x, Waml.Utils.DragDrop.container.corners[3].y-this.h));}
		}
		this.update();
	};
	this.hideCornerImages = function() {for(var i=0; i<4; i++) {this.cornerImages[i].obj.style.visibility = "hidden";}};
	this.showCornerImages = function(){
		for(var i=0; i<4; i++) {
			this.cornerImages[i].obj.style.zIndex = Waml.Utils.DragDrop.maxZIndex;
			Waml.Utils.DragDrop.maxZIndex++;
			Waml.Utils.DragDrop.moveObjectToPoint(this.cornerImages[i].obj, this.cornerPoints[i]);
			this.cornerImages[i].obj.style.visibility = "visible";
		}				
	};
	this.update = function() {
		this.w = Number(Waml.Utils.DragDrop._extractValueFromStyle(this.obj.style.width));
		this.h = Number(Waml.Utils.DragDrop._extractValueFromStyle(this.obj.style.height));
		this.x = Number(this.obj.style.left.substr(0, this.obj.style.left.indexOf('p')));
		this.y = Number(this.obj.style.top.substr(0, this.obj.style.top.indexOf('p')));
		this.cornerPoints[0] = new Waml.Utils.DragDrop.Point(this.x, this.y);
		this.cornerPoints[1] = new Waml.Utils.DragDrop.Point(this.x+this.w, this.y);
		this.cornerPoints[2] = new Waml.Utils.DragDrop.Point(this.x, this.y+this.h);
		this.cornerPoints[3] = new Waml.Utils.DragDrop.Point(this.x+this.w, this.y+this.h);
	};
	this.remove = function() {
		document.getElementById(Waml.Utils.DragDrop.workspace).removeChild(this.obj);
		for(var i=0; i<4; i++)
			{document.getElementById(Waml.Utils.DragDrop.workspace).removeChild(this.cornerImages[i].obj);}
		Waml.Utils.DragDrop.dragObjects[this.index] = null;
	};
	this.maximizeZ = function() {
		if (this.zIndex <= Waml.Utils.DragDrop.maxZIndex) {
			this.obj.style.zIndex = Waml.Utils.DragDrop.maxZIndex;
			this.zIndex = Waml.Utils.DragDrop.maxZIndex;
			Waml.Utils.DragDrop.maxZIndex++;
		}
	};	

	//API Methods
	this.getX = function() {return this.x;};
	this.getY = function() {return this.y;};
	this.getWidth = function() {return this.w;};
	this.getHeight = function() {return this.h;};
	this.getName = function() {return this.name;};
	this.getZ = function() {return this.obj.style.zIndex;};
	this.getType = function() {return this.type;};
	this.moveToPoint = function (point) {
		this.obj.style.left = point.x+'px';
		this.obj.style.top = point.y+'px';
		this.x = point.x;
		this.y = point.y;
		
	};
	this.moveTo = function (x, y) {
		this.obj.style.left = x+'px';
		this.obj.style.top = y+'px';
		this.x = x;
		this.x = y;		
	};
	this.setWidth = function (width) {
		this.obj.style.width = width+'px';
		this.w = width;
	};
	this.setHeight = function (height) {
		this.obj.style.height = height+'px';
		this.h = height;
	};
	
	//Mouse down
	Waml.Events.attach(this.obj, "mousedown", function(ev){
		var srcElement = ev.srcElement || ev.target;
		Waml.Utils.DragDrop.dragObject = srcElement;
		Waml.Utils.DragDrop.curDragObject = Waml.Utils.DragDrop.dragObjects[Waml.Utils.DragDrop.dragObject.id.split("-")[1]];
				
		if (Waml.Utils.DragDrop.curDragObject !== null) {
			Waml.Utils.DragDrop.curDragObject.update();
			Waml.Utils.DragDrop.curDragObject.maximizeZ();
			Waml.Utils.DragDrop.curDragObject.showCornerImages();
		}
		mouseOffset = Waml.Utils.DragDrop.getMouseOffset(srcElement, ev);
	});
	
	//Mouse up event	
	Waml.Events.attach(this.obj, "mouseup", function(ev){
		var el = ev.srcElement || ev.target;
		$(el).style.border = "";		
		Waml.Utils.DragDrop.dragObject = null;
	});
	//Mouse move
	Waml.Events.attach(this.obj, "mousemove", function(ev){		
		var mousePos = Waml.Utils.DragDrop.mouseCoords(ev);
				
		if(Waml.Utils.DragDrop.dragObject) {
					var el = ev.srcElement || ev.target;					
					$(el).style.border = "dotted 1px #006699";
					parentObject = Waml.Utils.DragDrop.dragObjects[Waml.Utils.DragDrop.dragObject.id.split("-")[1]];
					Waml.Utils.DragDrop.curDragObject = parentObject;
					parentObject.obj.style.position = "absolute";
										
					if (Waml.Utils.DragDrop.isPointInContainer(new Waml.Utils.DragDrop.Point(Number(mousePos.x - mouseOffset.x) + Number(parentObject.w), Number(mousePos.y - mouseOffset.y) + Number(parentObject.h))) && Waml.Utils.DragDrop.isPointInContainer(new Waml.Utils.DragDrop.Point(Number(mousePos.x - mouseOffset.x), Number(mousePos.y - mouseOffset.y)))) {
						var pnt = new Waml.Utils.DragDrop.Point(mousePos.x - mouseOffset.x, mousePos.y - mouseOffset.y);
						parentObject.moveToPoint(pnt);
						parentObject.update();
						parentObject.showCornerImages();
					} else{		
						debug("corner: "+parentObject);										
						parentObjectPos = getPosition(parentObject.obj);
						parentObject.obj.style.position = "absolute";
												
						var corner = Number(Waml.Utils.DragDrop.dragObject.id.charAt(0));
						
						if (Math.abs(mousePos.y - parentObjectPos.y) > 0 && Math.abs(mousePos.x - parentObjectPos.x) > 0) {
							debug("corner: "+corner);
							switch (corner) {
								case 0://top left corner dragged
									parentObject.moveTo(mousePos.x, mousePos.y);
									parentObject.setWidth(Waml.Utils.DragDrop._extractValueFromStyle(parentObject.obj.style.width) - (mousePos.x - parentObjectPos.x));
									parentObject.setHeight(Waml.Utils.DragDrop._extractValueFromStyle(parentObject.obj.style.height) - (mousePos.y - parentObjectPos.y));
									break;
								case 1://top right corner dragged
									parentObject.setWidth(mousePos.x - parentObjectPos.x);
									parentObject.setHeight(Waml.Utils.DragDrop._extractValueFromStyle(parentObject.obj.style.height) - (mousePos.y - parentObjectPos.y));
									parentObject.moveToPoint(new Waml.Utils.DragDrop.Point(parentObject.x, mousePos.y));
									break;
								case 2://bottom left corner dragged
									parentObject.setWidth(Waml.Utils.DragDrop._extractValueFromStyle(parentObject.obj.style.width) - (mousePos.x - parentObjectPos.x));
									parentObject.setHeight(Number(mousePos.y - parentObjectPos.y));
									parentObject.moveToPoint(new Waml.Utils.DragDrop.Point(mousePos.x, parentObject.y));
									break;
								case 3://bottom right corner dragged
								debug("resizing...");
									parentObject.setWidth(Number(mousePos.x - parentObjectPos.x));
									parentObject.setHeight(Number(mousePos.y - parentObjectPos.y));
									break;
								default:
									break;
							}
						}
						if (Waml.Utils.DragDrop._extractValueFromStyle(parentObject.obj.style.width) < Waml.Utils.DragDrop.minWidth) {
							parentObject.setWidth(Waml.Utils.DragDrop.minWidth);
							parentObject.adjustToBorder();
						}
						if (Waml.Utils.DragDrop._extractValueFromStyle(parentObject.obj.style.height) < Waml.Utils.DragDrop.minHeight) {
							parentObject.setHeight(Waml.Utils.DragDrop.minHeight);
							parentObject.adjustToBorder();
						}
						
						parentObject.update();
						parentObject.showCornerImages();
						
						Waml.Utils.DragDrop.dragObject.style.position = 'absolute';
						Waml.Utils.DragDrop.dragObject.moveToPoint(new Waml.Utils.DragDrop.Point(mousePos.x - mouseOffset.x, mousePos.y - mouseOffset.y));					
					}							
		}
	});		
	
};

//Class for corner images
Waml.Utils.DragDrop.CornerImage = function (index) {
	this.obj = new Image();
	this.obj.src = Waml.Utils.DragDrop.CORNER_IMAGE_SRC;
	this.obj.name = "CornerImage";
	this.obj.id = "image-"+index+"-"+Waml.Utils.DragDrop.objectIndex;
	if(index === 0) {this.obj.style.cursor = 'nw-resize';}
	else if(index == 1) {this.obj.style.cursor = 'ne-resize';}
	else if(index == 2) {this.obj.style.cursor = 'sw-resize';}
	else if(index == 3) {this.obj.style.cursor = 'se-resize';}

	this.obj.style.position = "absolute";
	this.obj.style.visibility = "hidden";
	document.getElementById(Waml.Utils.DragDrop.workspace).appendChild(this.obj);
	
	Waml.Events.attach(this.obj, "mousedown", function(ev){
		
	});
};

//Class Point that includes properties X and Y co-ordinates
Waml.Utils.DragDrop.Point = function(x, y) {
	this.x = x;
	this.y = y;
};

//Moves the object to the given point
Waml.Utils.DragDrop.moveObjectToPoint = function(obj, point) {
	obj.style.left = point.x - Number(obj.width/2);
	obj.style.top = point.y - Number(obj.height/2);
};

//extracts the number value from style e.g. 123px ==> 123 
Waml.Utils.DragDrop._extractValueFromStyle = function(styleString) {
	return styleString.substr(0, styleString.indexOf('p'));
};