/*
* @purpose Set widths of sub items
* @description Find the width of the span around each sub item and add room for
*  spacing.
*  Set the li and the covering div to the height of the size reference span
*  Align the first sub item with the left of the sub menu and the last with the
*  right
*  If there are more than 2 items, align the left of each middle item with the
*  right side of its previous neighbor
*/
var subItemWidth,
prevLeft,
subItemHeight;
function subItemsDimensions() {
  $(".active .subitem").each(function() {
    subItemWidth = $(this).find(".sizeref").width() + 10;
    subItemHeight = $(this).find(".sizeref").height() + 20;
    $(this).width(subItemWidth).find(".subcover").width($(this).width()).height($(this).height()-5);
    //subcover height offset of -5 is compensation for .subitem a p rule in main.css, which adds bottom padding to li. This gives the li some space without making the cover any bigger than the word it is covering.
    if($(this).is(":first-child")) {
      $(this).css({left: "0"});
    } else if($(this).is(":last-child")) {
      $(this).css({
        right: "0",
        left: function() {
          return $(".active").width() - subItemWidth + "px";
        }
      });
    } else {
      prevLeft = $(this).prev("li").offset().left;
      $(this).css({
        left: function() {
          return prevLeft + subItemWidth + "px";
        }
      });
    }
  });
}

/*
* @purpose Set dimensions of active div
* @description Make the active sub-menu div encompass all the white space
*  between the top and 2nd tier menu items.
*  Set the width to be the combined widths of the sub menu items (rather
*  than setting the width relative to the screen width in CSS), with room for spacing.
*/
var divTop,
liBottom,
refWidth;
function activeDimensions() {
  divTop = $(".active").offset().top,
  liBottom = $(".active").find("a").offset().top + $(".active").find("a").height(),
  refWidth = 0;
  $(".active .sizeref").each(function() {
    refWidth += ($(this).width() + 80);
  });
  $(".active").height(function() {
    return liBottom - divTop + "px";
  });
  $(".active").width(function() {
    return refWidth + "px";
  });
}

/*
* @description
*  construct array with x values cooresponding to the center off each sub menu
*  element relative to the active div (the canvas space)
* @purpose
*  to later dynamically create two paths in the center of each sub menu (the little dashes
*  under the sub menu items)
* @called
*  drawLines()
*/
var siwHalfx = [];
function liCenters() {
  $(".active li").each(function() {
    if(($(this).offset().left - $(".active").offset().left) <= 0) {
      siwHalfx.push($(this).width()/2);
    } else {
      siwHalfx.push($(this).offset().left - $(".active").offset().left + subItemWidth/2);
    }
  });
}

/*
* @description
*  create one svg path that draws an L and one that draws a backwards L, as well
*  as dash below each sub menu item
* @called
*  itemsDisplay()
* @param
*  x : the starting x value of the bath depending on the parent li's position
*   when a user hovers.
*/
var canvas,
lines,
rPath,
lPath,
rLine,
lLine,
smallPaths = {},
vlrSmall,
vllSmall;
function drawLines(x) {
  canvas = $(".active").attr("id");
  lines = new Raphael(canvas, "100%", "100%");
  rPath = "M" + x + " 0V" + ($(".active").height()+5) + "H" + ($(".active").width()+5);
  lPath = "M" + x + " 0V" + ($(".active").height()+5) + "H-5";
  for (var i=0; i<siwHalfx.length; i++) {
    smallPaths["path" + i] = "M" + siwHalfx[i] + " " + ($(".active").height() - 3) + "v15";
  }
  rLine = lines.path(rPath).attr({stroke:"#030D00", "stroke-width":5, "stroke-linecap":"round"});
  rLine.node.id = "rLine";
  lLine = lines.path(lPath).attr({stroke:"#030D00", "stroke-width":5, "stroke-linecap":"round"});
  lLine.node.id = "lLine";
  vlrSmall = lines.path(smallPaths["path0"]).attr({stroke:"#030D00", "stroke-width":4, "stroke-linecap":"round"});
  vlrSmall.node.id = "vlrSmall";
  vllSmall = lines.path(smallPaths["path1"]).attr({stroke:"#030D00", "stroke-width":4, "stroke-linecap":"round"});
  vllSmall.node.id = "vllSmall";
}

/*
* @description
*  animation of each svg item as well as sub menu items on tier-1 li hover
* @called
*  itemsDisplay()
*/
var subTL = new TimelineMax();
function animateIn() {
  subTL
  .fromTo("#rLine", 1.2, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Expo.easeInOut}, "start")
  .fromTo("#lLine", 1.2, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Expo.easeInOut}, "start")
  .fromTo($("#vllSmall"), 0.5, {drawSVG:"100% 100%"}, {drawSVG:"0% 100%", ease:Expo.easeOut}, "small-=0.4")
  .fromTo($("#vlrSmall"), 0.5, {drawSVG:"100% 100%"}, {drawSVG:"0% 100%", ease:Expo.easeOut}, "small-=0.4")
  .to($(".subitem .sizeref"), 1, {top:"0", ease:Expo.easeOut}, "items-=0.6")
  .to($(".subitem .sizeref"), 0.8, {opacity:1, ease:Expo.easeOut}, "items-=0.5");
  subTL.play();
}

/*notes contained in function*/
var parent,
parentCenter,
firstChildW,
firstChildRightOffset,
lastChildLeftOffset,
centerOfItems,
activeCenter,
x;
itemsDisplay();
function itemsDisplay() {
  //space each top level menu item evenly based on window size*/
  $(".tier-1 > a").width(function() {
    return $(window).width()/$("#main-nav .tier-1").length;
  });
  //move the sub item labels and the div that hides them below the sub menu
  $(".subitem .sizeref, .subcover").css({
    top: function() {
      return $(".submenu li").height() + 15 + "px";
    }
  });
  /*
  * @hoverin
  *  add active class
  *  determine the center of the hovered on item
  *  call dimension setting and x-val setting functions
  *  move last and first top menu item sub-menus so they do not appear off screen
  *  position sub-menu so the space between the first and last items is centered with
  *   the parent li
  *  call svg drawing function conditionally so the images are positioned properly
  *  allow svg to extend outside the canvas so bottom line shows
  *  call animation function
  */
  $(".tier-1").hover(function() {
    $(this).find(".submenu .sub-container").toggleClass("active");
    parent = $(this),
    parentCenter = $(parent).offset().left + $(parent).width()/2;
    activeDimensions();
    subItemsDimensions();
    liCenters();
    if($(parent).is(":last-child")) {
      $(".active").css({
        right: function() {
          return ($(parent).width()/2 ) - 15 + "px";
        }
      });
      x = $(".active").width() + 15;
      drawLines(x);
    } else if($(parent).is(":first-child")) {
      $(".active").css({left: "0"});
      x = -5;
      drawLines(x);
    } else {
      firstChildW = $(".active li:first-child").width(),
      firstChildRightOffset = $(".active li:first-child").offset().left + firstChildW,
      lastChildLeftOffset =  $(".active li:last-child").offset().left,
      centerOfItems = firstChildW + ((lastChildLeftOffset - firstChildRightOffset)/2);
      $(".active").css({
        left:function() {
          return parentCenter - centerOfItems + "px"
        }
      });
      x = centerOfItems;
      drawLines(x);
    }
    $("svg").css({position:"absolute", overflow:"visible"});
    animateIn();
    /*
    * @hoverout
    *  remove active class from sub-menu div
    *  reset containing element dimensions to the parent table cell returns to its
    *   original size.
    */
  }, function() {
    $(this).find(".submenu .sub-container").toggleClass("active").height(0).width(0);
    $("#main-nav .submenu").height(0).width(0);
    $(".tier-1 .submenu .sub-container").height(0).width(0);
    lines.remove();
    subTL.pause(0);
    siwHalfx = [];
  });
}
