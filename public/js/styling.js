mainItemsDisplay();
function mainItemsDisplay() {
  $(".tier-1 > a").css({//ensure widths of table cells are
    width: function() {//of uniform widths
      return $(window).width()/$("#main-nav .tier-1").length;
    }
  });
}
subItemsDisplay();
function subItemsDisplay() {
  $(".tier-1").hover(function() {//on hover
    $(this).find(".submenu div").toggleClass("active");//add "active" class
    var parent = $(this),//make the parent li more recognizable
      parentCenter = $(parent).offset().left + $(parent).width()/2,//get the center of the parent li
      subItemWidth = $(".active").width()/$(".active li").length,//get the width of each subitem depending on their total number
      divTop = $(".active").offset().top,
      liBottom = $(".active").find("a").offset().top + $(".active").find("a").height();
      $(".active").height(function() {//set height of active div
         return liBottom - divTop + "px";//to encompass all the space between the
      })//.width(function() {
        //.each(total += current span width)
      //});//tier-1 and tier-2 menu items
    if($(parent).is(":last-child")) {//if the top level menu item is on the far right
      $(".active").css({right: "0"});//align the active div with the right of the screen
    } else if($(parent).is(":first-child")) {//if the top level is on the far left
      $(".active").css({left: "0"});//align the active div with the left of the screen
    } else {//if the top level is in between
      $(".active").css({//align the active div with the center of the top level menu item
        left: function() {
          return parentCenter - $(".active").width()/2 + "px"
        }
      });
    }
    $(".active .subitem").css({//set the width of each subitem
      width: subItemWidth + "px"
    }).each(function() {//loop through subitems
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
  }, function() {//When the mouse leaves the top level menu item
    $(this).find(".submenu div").toggleClass("active");//remove the active class, hiding the subitems
    $("#main-nav .submenu").height(0);//reset heights so that the nav doesn't
    $(".tier-1 .submenu div").height(0);//continue to leave space for them
  });
}
//if #main-nav div .hasClass("active")
//end main function
//div.active.height(function() {return div.active xpos + (div.active li xpos + div.active li height)});
