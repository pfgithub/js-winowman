var $ = require('jquery');
function panel(x,y,w,h){
  return $('<li>').attr("style","top:"+x+"px;left:"+y+"px;width:"+w+"px;height:"+h+"px;").addClass('contained');
}

function window(title, w, h, x, y){
  this.title=title;
  this.w=w;
  this.h=h;
  this.x=x;
  this.y=y;
  if(!this.title){this.title = "Untitled Window";}
  if(!this.w){this.w = 100;}
  if(!this.h){this.h = 100;}
  if(!this.x){this.x = 50;}
  if(!this.y){this.y = 50;}

  this.panel = panel(x,y,w,h);

  $('#container').append(
    this.panel
  );
  this.panel.append($("<h1>").text("hi"));
}
module.exports = {
  window: window,
  astring: "astring"
}
