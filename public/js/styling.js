navItemPos();
function navItemPos() {
  function divide() {
    var itemNum = $(".tier-1").length;
    var screenW = $(window).width();
    var itemW = screenW/itemNum + "px";
    $(".tier-1").css({width: itemW});
  }
  divide();
  $(window).resize(divide);
}

/*On hover and when on content from that page, add active
class.*/
