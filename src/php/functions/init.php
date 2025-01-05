<?php

/**
 * メジャーアップデート無効
 */
add_filter('allow_major_auto_core_updates', '__return_false');

/**
 * テーマセットアップ
 * 参考：https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/add_theme_support#HTML5
 */
add_action('after_setup_theme', function () {
  add_theme_support('post-thumbnails');
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
  add_theme_support('custom-logo'); // カスタムロゴを使用可能にする
  add_theme_support('wp-block-styles');  //Default block styles を有効に

  add_theme_support(
    'html5',
    array(
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
    )
  );
});

/**
 * ブロックエディタ内のスタイル
 */
// add_action('enqueue_block_editor_assets', function () {
//   wp_enqueue_style('editor-style', get_theme_file_uri('assets/css/style-editor.css'), array(), date('YmdGis', filemtime(get_theme_file_path('assets/css/style-editor.css'))), 'all');
// });


/**
 * CSS, JavaScript
 */
add_action('wp_enqueue_scripts', function () {
  $theme_title = 'my-theme';
  /* CSS */
  // wp_enqueue_style('swiper', get_theme_file_uri('assets/css/app/swiper.min.css'), array(), '1.0.0', 'all');
  // wp_enqueue_style('googleMPlusRound', 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap', array(), '1.0.0', 'all');
  // wp_enqueue_style('googleNotoSerif', 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&display=swap', array(), '1.0.0', 'all');
  // wp_enqueue_style('googleNotoSans', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap', array(), '1.0.0', 'all');
  // wp_enqueue_style('googleNotoSans', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap', array(), '1.0.0', 'all');
  wp_enqueue_style($theme_title, get_theme_file_uri('assets/css/style.css'), array('googleNotoSans'), date('YmdGis', filemtime(get_theme_file_path('assets/css/style.css'))), 'all');
  // ページごとに読み込む場合
  // if (is_front_page() || is_home()) {
  //   if (is_file(get_theme_file_path('assets/css/top.css')) && file_exists(get_theme_file_path('assets/css/top.css'))) {
  //     wp_enqueue_style('top_css', get_theme_file_uri('assets/css/top.css'), array('common_css'), date('YmdGis', filemtime(get_theme_file_path('assets/css/top.css'))), 'all');
  //   }
  // }
  // if (is_page()) {
  //   global $post;
  //   $slugName = $post->post_name;
  // } elseif (is_archive()) {
  //   $slugName = get_queried_object()->name;
  // } elseif (is_singular()) {
  //   $slugName = get_queried_object()->post_type;
  // }
  // if (!empty($slugName)) {
  //   if (is_file(get_theme_file_path('assets/css/' . $slugName . '.css')) && file_exists(get_theme_file_path('assets/css/' . $slugName . '.css'))) {
  //     wp_enqueue_style($theme_title . $slugName, get_theme_file_uri('assets/css/' . $slugName . '.css'), array($theme_title), date('YmdGis', filemtime(get_theme_file_path('assets/css/' . $slugName . '.css'))), 'all');
  //   }
  // }

  /* JS */
  // wp_enqueue_script('swiper', get_theme_file_uri('assets/js/app/swiper-bundle.min.js'), array('jquery'), '1.0.0', true);
  // wp_enqueue_script('gsap', get_theme_file_uri('assets/js/app/gsap.min.js'), array('jquery'), '1.0.0', true);
  // wp_enqueue_script('scrollTrigger', get_theme_file_uri('assets/js/app/ScrollTrigger.min.js'), array('gsap'), '1.0.0', true);
  wp_enqueue_script('svgxuse', get_theme_file_uri('assets/js/app/svgxuse.min.js'), array('jquery'), '1.0.0', true);
  wp_enqueue_script('browserswitcher', get_theme_file_uri('assets/js/app/b_browser_switcher.js'), array('jquery'), '1.0.0', true);
  wp_enqueue_script($theme_title, get_theme_file_uri('assets/js/script.js'), array('jquery'), date('YmdGis', filemtime(get_theme_file_path('assets/js/script.js'))), true);
});
