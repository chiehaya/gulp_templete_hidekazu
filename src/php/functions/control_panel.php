<?php
function remove_dashboard_widgets()
{
  global $wp_meta_boxes;
  // unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']); // 現在の状況
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']); // アクティビティ
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']); // 最近のコメント
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']); // 被リンク
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']); // プラグイン
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']); // クイック投稿
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']); // 最近の下書き
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']); // WordPressブログ
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']); // WordPressフォーラム
}
add_action('wp_dashboard_setup', 'remove_dashboard_widgets');
remove_action('welcome_panel', 'wp_welcome_panel');

/**
 * 投稿編集画面のタグをチェックボックスにする
 */
function change_tag_to_checkbox()
{
  $args = get_taxonomy('post_tag');
  $args->hierarchical = true; // Gutenberg用
  $args->meta_box_cb = 'post_categories_meta_box'; // クラシックエディタ用
  register_taxonomy('post_tag', 'post', $args);
}
add_action('init', 'change_tag_to_checkbox', 1);

/**
 * メニューを非表示
 */
function remove_menus()
{
  remove_menu_page('edit-comments.php'); // コメント.
}
add_action('admin_menu', 'remove_menus', 999);

/**
 * 外観のヘッダーと背景を非表示
 */
function my_setup()
{
  remove_theme_support('custom-header');
  remove_theme_support('custom-background');
}
add_action('after_setup_theme', 'my_setup');
