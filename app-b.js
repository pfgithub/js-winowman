(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function getPanel(x,y,w,h){
  //return $('<li>').attr("style","top:"+x+"px;left:"+y+"px;width:"+w+"px;height:"+h+"px;").addClass('contained');
  // switch ^ to v
  var containbox = $('<div>').addClass('windowContainer')
  var titlebar = $('<div>').addClass('titlebar')
  var li = $('<li>').css({height:h,width:w,top:y,left:x}).addClass('contained').append(titlebar).append(containbox)
  return [li,containbox,titlebar];
}


function Window(title, w, h, x, y){
  this.title=title;
  this.w=w;
  this.h=h;
  this.x=x;
  this.y=y;
  if(!this.title){this.title = "Untitled Window";}
  if(!this.w){this.w = 500;}
  if(!this.h){this.h = 500;}
  if(!this.x){this.x = 50;}
  if(!this.y){this.y = 50;}
  arr = getPanel(this.x,this.y,this.w,this.h)
  this.panel = arr[0];
  this.window = arr[1];
  arr[2].mousedown(this.titlebarDown.bind(this));
  $(document).mousemove(this.titlebarMouseMove.bind(this));
  arr[2].mouseup(this.titlebarUp.bind(this));
  $("#container").append(this.panel)

  this.isDragging=false
  this.dragInfo = {};
}
Window.prototype.titlebarDown = function (event) {
  this.isDragging = true;
  this.dragInfo = {x:getPos(event).x - this.x, y: getPos(event).y - this.y};
};
function getPos(event){
  return {x:event.clientX+document.documentElement.scrollLeft,y:event.clientY+document.documentElement.scrollTop};
}
Window.prototype.titlebarMouseMove = function (event) {
  if(this.isDragging){
    var x = getPos(event).x;
    var y = getPos(event).y;
    this.x = x - this.dragInfo.x;
    this.y = y - this.dragInfo.y;
    this.update();
    console.log(this.x,this.y,this.dragInfo)
  }
};
Window.prototype.windowDragLoop = function(){
  if(this.isDragging){
    var x = getPos(event).x;
    var y = getPos(event).y;
    this.x = x - this.dragInfo.x;
    this.y = y - this.dragInfo.y;
    this.update();

    setTimeout(this.windowDragLoop.bind(this),12)
  }
}
Window.prototype.update = function(){
  this.panel.css({left:this.x,top:this.y,width:this.w,height:this.h});
}
Window.prototype.titlebarUp = function (event) {
  this.isDragging = false;
};
module.exports = {
  Window: Window
}

},{}],2:[function(require,module,exports){
const wm = require('./api/windowman.js');

$(function(){
  var window = new wm.Window("My window");
});

},{"./api/windowman.js":1}]},{},[2]);
