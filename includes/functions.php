<?php
function get_menu_items() {
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
  return $menu_items;
}
?>
