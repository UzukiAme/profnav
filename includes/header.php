<?php
$menu_items = [
  "Personality" => array(
    "tier" => "tier-1",
  ),
  "Skills" => array(
    "tier" => "tier-1",
    array(
      "tier" => "tier-2",
      "labels" => array("Languages", "Platforms")
    ),
  ),
  "Interests" => array(
    "tier" => "tier-1",
    array(
      "tier" => "tier-2",
      "labels" => array("Personal", "Professional")
    )
  ),
  "History" => array(
    "tier" => "tier-1",
    array(
      "tier" => "tier-2",
      "labels" => array("Tech", "Other")
    )
  )
];
?>
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenLite.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TimelineLite.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/plugins/CSSPlugin.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/plugins/ScrollToPlugin.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/plugins/BezierPlugin.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/plugins/CSSRulePlugin.min.js"></script>
    <link rel="stylesheet" href="css/main.css" charset="utf-8">
    <link rel="stylesheet" href="css/normalize.css" charset="utf-8">
    <link href='http://fonts.googleapis.com/css?family=Share+Tech+Mono' rel='stylesheet' type='text/css'>
  </head>
  <body>
    <nav id="main-nav">
      <ul>
        <?php foreach ($menu_items as $label => $key): ?>
          <li class="tier-1"><a href="#"><span class="underline"><?php echo htmlspecialchars($label); ?></span></a>
            <ul class="submenu">
              <div class="">
                <?php if(array_key_exists(0, $key)) {
                  $subLabels = $key[0]["labels"];
                  foreach($subLabels as $subLabel): ?>
                    <li class="subitem tier-2"><a href="#"><span class="underline"><?php echo htmlspecialchars($subLabel); ?></span></a></li>
                <?php endforeach;
                } ?>
              </div>
            </ul>
          </li>
        <?php endforeach; ?>
    </nav>
