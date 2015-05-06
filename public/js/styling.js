function subItemsWidth() {
  $(".active .subitem").each(function() {//loop through subitems
    var subItemWidth = $(this).find(".underline").width() + 10;
    $(this).width(subItemWidth);
    if($(this).is(":first-child")) {//if this is the first one in the list
      $(this).css({left: "0"});//align the table cell with the left of the active div
    } else if($(this).is(":last-child")) {//if this is the last in the list
      $(this).css({
        right: "0",//align the cell with the right of the active div
        left: function() {//and make sure the left side of the cell doesn't extend further than
          return $(".active").width() - subItemWidth + "px";//the width of the subitem should be
        }
      });
    } else {//if the item is somewhere in the middle
      var prevLeft = $(this).prev("li").offset().left;
      $(this).css({//align the left side of the cell with the right side of the previous cell
        left: function() {//(The left coordinate of the previous sell plus the width of the previous item)
          return prevLeft + subItemWidth + "px";
        }
      });
    }
  });
}

function activeDimensions() {
  var divTop = $(".active").offset().top,
  liBottom = $(".active").find("a").offset().top + $(".active").find("a").height(),
  underlineWidth = 0;
  $(".active .underline").each(function() {//loop through underline spans to get the
    underlineWidth += ($(this).width() + 80);//combined width of the menu items (rather than
  });//setting a fixed width for the active div that all items need to conform to.

  $(".active").height(function() {//set height of active div
     return liBottom - divTop + "px";//to encompass all the space between the
  });
  $(".active").width(function() {//set width of active div to the combined width of
    return underlineWidth + "px";//subitem spans.
  });
};

ItemsDisplay();
function ItemsDisplay() {
  $(".tier-1 > a").width(function() {
    return $(window).width()/$("#main-nav .tier-1").length;
  });
  $(".tier-1").hover(function() {//on hover
    $(this).find(".submenu div").toggleClass("active");//add "active" class
    var parent = $(this),//make the parent li more recognizable
      parentCenter = $(parent).offset().left + $(parent).width()/2;//get the center of the parent li

      activeDimensions();//set active div height and width on hover
      subItemsWidth();//set width and position of each sub item

      if($(parent).is(":last-child")) {//if the top level menu item is on the far right
      $(".active").css({
        right: function() {
          return ($(parent).width()/2 ) - 15 + "px";
        }
      });//align the active div with the right of the screen
    } else if($(parent).is(":first-child")) {//if the top level is on the far left
      $(".active").css({left: "0"});//align the active div with the left of the screen
    } else {//if the top level is in between
      $(".active").css({//align the active div with the center of the top level menu item
        left: function() {
          return parentCenter - $(".active").width()/2 + "px"
        }
      });
    }
  }, function() {//When the mouse leaves the top level menu item
    $(this).find(".submenu div").toggleClass("active");//remove the active class, hiding the subitems
    $("#main-nav .submenu").height(0).width(0);//reset heights so that the nav doesn't
    $(".tier-1 .submenu div").height(0).width(0);//continue to leave space for them
  });
}
