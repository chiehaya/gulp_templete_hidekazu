<?php
require_once('functions/init.php');
require_once('functions/security.php');
require_once('functions/my_funcs.php');
// require_once('functions/editor_custom.php');

require_once('functions/control_panel.php');
require_once('functions/login.php');
// require_once('functions/resister_post_taxonomy.php'); // カスタム3兄弟
// require_once('functions/rewrite_rule.php'); // リライトルール
// require_once('includes/shortcodes.php'); // ショートコード
// require_once('includes/bogo_custom.php');
// require_once('includes/cf7_custom.php');
// require_once('includes/simple_seo_pack.php');


/**
 * GTM
 */
// function add_gtm_head_tag()
// {
//   get_template_part('includes/gtm-head');
// }
// add_action('wp_head', 'add_gtm_head_tag');
// function add_gtm_body_tag()
// {
//   get_template_part('includes/gtm-body');
// }
// add_action('wp_body_open', 'add_gtm_body_tag');


remove_filter('the_content', 'wpautop');
remove_filter('the_excerpt', 'wpautop');


/**
 * 抜粋
 */
add_filter('excerpt_more', function ($more) {
  return '...';
});
add_filter('excerpt_mblength', function () {
  // 抜粋を80文字に制限
  return 80;
});


/* the_archive_title 余計な文字を削除 */
add_filter('get_the_archive_title', function ($title) {
  if (is_category()) {
    $title = single_cat_title('', false);
  } elseif (is_tag()) {
    $title = single_tag_title('', false);
  } elseif (is_tax()) {
    $title = single_term_title('', false);
  } elseif (is_author()) { // 作者アーカイブの場合
    $title = get_the_author();
  } elseif (is_post_type_archive()) {
    $title = post_type_archive_title('', false);
  } elseif (is_date()) {
    $title = get_the_time(get_option('date_format'));
  } elseif (is_search()) {
    $title = '検索結果：' . esc_html(get_search_query(false));
  } elseif (is_404()) {
    $title = '「404」ページが見つかりません';
  } else {
  }
  return $title;
});


/**
 * URLスラッグの自動生成
 * @see https://open-cage.com/automatic-create-url-slug/
 * 投稿・固定ページ以外のときにスラッグが日本語のときはIDに置き換える
 */
function auto_post_slug($slug, $post_ID, $post_status, $post_type)
{
  if ($post_type !== 'post' && $post_type !== 'page') {
    if (preg_match('/(%[0-9a-f]{2})+/', $slug)) {
      $slug = utf8_uri_encode($post_type) . '-' . $post_ID;
    }
  }
  return $slug;
}
// add_filter('wp_unique_post_slug', 'auto_post_slug', 10, 4);
