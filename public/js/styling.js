/*navItemPos();
function navItemPos() {
  function divide() {
    var itemNum = $(".tier-1").length;
    var screenW = $(window).width();
    var itemW = screenW/itemNum + "px";
    $(".tier-1").css({width: itemW});
  }
  divide();
  $(window).resize(divide);
}*/

//Center sub items
//Add "active" class to div around list items on hover
//Add the parent li's left coordinate with its halved width to get center's x coordinate
//Subtract half the width of the active div from the center coordinate of the
//element it is to be centered on and set that as the active div's left val
//Set width of sub items
subItemsPos();
function subItemsPos() {
  var parent = $(".active").parents("li"),
  parentCenter = $(parent).offset().left + $(parent).width()/2,
  subItemWidth = $(".active").width()/$(".active li").length;
  $(".active").css({
    left: function() {
      return parentCenter - $(".active").width()/2 + "px";
    }
  });
  $(".active .subitem").css({
    width: subItemWidth + "px"
  }).each(function() {
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
      var prevLeft = $(this).prev("li").offset().left;
      $(this).css({
        left: function() {
          return prevLeft + subItemWidth + "px";
        }
      });
    }
  });
}
