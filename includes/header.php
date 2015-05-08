<?php
include_once("../includes/functions.php");
$menu_items = get_menu_items();
?>
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <link rel="stylesheet" href="css/main.css" charset="utf-8">
    <link rel="stylesheet" href="css/normalize.css" charset="utf-8">
    <link href='http://fonts.googleapis.com/css?family=Share+Tech+Mono' rel='stylesheet' type='text/css'>
    <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/plugins/RaphaelPlugin.min.js"></script>
    <script src="../includes/DrawSVGPlugin.min.js"></script>
    <script type="text/javascript" src="../includes/raphael.js"></script>
  </head>
  <body>
  <nav id="main-nav">
    <ul>
      <?php foreach ($menu_items as $label => $key): ?>
        <li class="tier-1 gsap-test"><a href="#"><span class="sizeref"><p><?php echo htmlspecialchars($label); ?></p></span></a>
          <ul class="submenu">
            <div class="sub-container" id="<?php echo htmlspecialchars(strtolower($label)); ?>">
              <?php if(array_key_exists(0, $key)) {
                $subLabels = $key[0]["labels"];
                foreach($subLabels as $subLabel): ?>
                <li class="subitem tier-2">
                  <div class="translate-container">
                    <div class="subcover"></div>
                    <a href="#"><p>
                      <span class="sizeref"><?php echo htmlspecialchars($subLabel); ?></span>
                    </p></a>
                  </div>
                </li>
              <?php endforeach;
              } ?>
            </div>
          </ul>
        </li>
      <?php endforeach; ?>
  </nav>
