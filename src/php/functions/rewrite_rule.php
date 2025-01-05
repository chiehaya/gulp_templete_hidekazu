<?php

/**
 * リライトルールの確認
 */
function check_rewrite()
{
  global $wp_rewrite;
  echo '<pre>';
  print_r($wp_rewrite->wp_rewrite_rules());
  echo '</pre>';
  exit;
}
// add_action('init', 'check_rewrite');


/**
 * 投稿の個別ページのみパーマリンクを変更
 * @see https://yuki.world/wordpress-post-permalink-customize/
 *
 * @param string $permalink
 * @return string
 */
function add_article_post_permalink($permalink)
{
  $permalink = '/news' . $permalink;
  return $permalink;
}
// add_filter('pre_post_link', 'add_article_post_permalink');

function add_article_post_rewrite_rules($post_rewrite)
{
  $return_rule = array();
  foreach ($post_rewrite as $regex => $rewrite) {
    $return_rule['news/' . $regex] = $rewrite;
  }
  return $return_rule;
}
// add_filter('post_rewrite_rules', 'add_article_post_rewrite_rules');
