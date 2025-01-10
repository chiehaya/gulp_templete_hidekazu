/*-------------------------------------------------------------------
グローバル変数
--------------------------------------------------------------------*/
let headerHeight;

/*-------------------------------------------------------------------
関数定義
--------------------------------------------------------------------*/
function isPc() {
  return window.innerWidth >= 768;
}
// Mobileの場合True
function isMobile() {
  return !isPc();
}

/**
 * 指定の要素のテキストを1文字ずつspanで囲む
 */
const wrapSpan = () => {
  const textWrap = document.querySelectorAll('.js-wrapSpan');
  textWrap.forEach((t) => (
    t.innerHTML = t.textContent.replace(/\S/g, '<span>$&</span>')
  ));
}

/**
 * アンカーリンク
*/
function scrollHash() {
  const hash = location.hash;
  if (hash && jQuery(hash).length) {
    const offset = jQuery(hash).offset().top;
    const scrollto = offset - (("fixed" !== jQuery("#header").css("position")) ? (headerHeight + 20) : 0);
    jQuery('html, body').animate({ scrollTop: scrollto }, 500);
  }
}


// /**
//  * ローディング画面
//  */
// function stopload() {
//   jQuery('#js-loading').delay(900).fadeOut(800);
// }

/*-------------------------------------------------------------------
読み込み時実行
--------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  headerHeight = document.querySelector('.js-header').offsetHeight;
  // wrapSpan();
  // setTimeout('stopload()', 10000);
});


/*-------------------------------------------------------------------
イベント
--------------------------------------------------------------------*/
/**
 * スクロールバーを除いた画面幅の取得
 */
jQuery(window).on('load resize', function () {
  let vw = document.body.clientWidth;// スクロールバーを除いた幅を取得
  let vh = window.innerHeight; // アドレスバーを覗いた画面高さ
  headerHeight = document.querySelector('.js-header').offsetHeight;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
});


// ローディング判定
jQuery(window).on("load", function () {
  jQuery("body").attr("data-loading", "true");
  // stopload();
});

jQuery(function () {
  scrollHash();
  gsap.to('body', { opacity: 1, duration: 1 });

  // 画面遷移
  jQuery(document).on('click', 'a:not([href*="#"]):not([target]):not([href*="mailto"]):not([href*="tel"])', function (event) {
    event.preventDefault();
    const url = jQuery(this).attr('href');

    if ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) {
      // ctrl(command) + click 時に別ウィンドウで開く処理
      window.open(url, '_blank');
      return false;
    }

    if (url !== '') {
      document.body.classList.add("fadeOut");
      setTimeout(() => {
        window.location = url;
      }, 500);
    }
  });


  // スクロール判定
  jQuery(window).on("scroll", function () {
    let scrollTop = jQuery(this).scrollTop();
    let windowHeight = jQuery(this).height();
    let documentHeight = jQuery(document).height();

    if (100 < scrollTop) {
      jQuery("body").attr("data-scroll", "true");
    } else {
      jQuery("body").attr("data-scroll", "false");
    }

    if (documentHeight - (windowHeight + scrollTop) <= 0) {
      jQuery("body").attr("data-scroll-bottom", "true");
    } else {
      jQuery("body").attr("data-scroll-bottom", "false");
    }

    /**
     * トップに戻るボタン
     */
    const totop = jQuery('.js-totop');
    const totopTarget = jQuery(`.${totop.data("target")}`);
    if ((totopTarget.length ? totopTarget.innerHeight() : headerHeight) < scrollTop) {
      totop.addClass('is-active');
    } else {
      totop.removeClass('is-active');
    }

  });

  /* ドロワー */
  jQuery(".js-drawer").on("click", function (event) {
    event.preventDefault();
    const ariaControls = jQuery(this).attr("aria-controls");
    const addClass = 'is-opened'

    if (jQuery(`#${ariaControls}`).hasClass(addClass)) {
      jQuery(`#${ariaControls}`).removeClass(addClass);
    } else {
      jQuery(`#${ariaControls}`).addClass(addClass);
    }

    jQuery(`[aria-controls=${ariaControls}]`).each(function () {
      jQuery(this).attr("aria-expanded", (jQuery(`#${ariaControls}`).hasClass(addClass) ? 'false' : 'true'));
      if (jQuery(`#${ariaControls}`).hasClass(addClass)) {
        jQuery(this).addClass(addClass);
      } else {
        jQuery(this).removeClass(addClass);
      }
    });

    // ドロワー開時にbody要素がスクロールしないように
    (jQuery(`#${ariaControls}`).hasClass(addClass) ? jQuery('body').addClass('u-overflowHidden') : jQuery('body').removeClass('u-overflowHidden'));

    return false;
  });

  /**
   * ドロワー内のページ内リンククリック時に閉じる
   */
  jQuery('#drawer-content1 a[href*="#"]').on('click', function (event) {
    const currentUrl = location.protocol + '//' + location.host + location.pathname; // 現在のURL
    const href = jQuery(this).prop("href");
    const hrefUrl = href.split('#')[0];   // リンク先のURL

    if (currentUrl == hrefUrl) {
      jQuery('.for-drawer').removeClass('is-opened');
      jQuery('#drawer-content1').attr('aria-hidden', true);
      jQuery('body').removeClass('u-overflowHidden');
    }
  });

  /* ヘッダ */
  jQuery(window).on('load scroll', function () {
    // if (jQuery('body').hasClass('home')) {
    const $header = jQuery('.js-header');
    if ($header.length) {
      const target = jQuery(`.${jQuery($header).data('target')}`);
      const targetHeight = (target.length ? target.innerHeight() : headerHeight * 1.1);
      let position = jQuery(this).scrollTop();
      if (position > targetHeight) {
        $header.addClass('is-fixed');
      } else if (position == 0) {
        $header.removeClass('is-fixed');
      }
    }
    // }
  });


  /* スムーススクロール */
  jQuery(document).on('click', 'a[href*="#"]:not(".js-tabIndex, .js-modal, .js-accordion, .toc_toggle a")', function (e) {
    const currentUrl = location.protocol + '//' + location.host + location.pathname; // 現在のURL
    const href = jQuery(this).prop("href");
    const hrefUrl = href.split('#')[0];   // リンク先のURL
    // let target = $(this.hash);
    // if (!target.length) return;

    if (currentUrl == hrefUrl) {
      e.preventDefault();
      let id = '#' + href.split('#')[1];  // リンク先のアンカー
      let speed = 300;
      let target = jQuery("#" == id ? "html" : id);
      let position = target.offset().top - headerHeight;
      if (("fixed" !== jQuery("#header").css("position")) && ("sticky" !== jQuery("#header").css("position"))) {
        position = target.offset().top;
      }
      if (0 > position) {
        position = 0;
      }
      jQuery("html, body").animate({
        scrollTop: position
      }, speed);
      jQuery(this).blur();
      // return false;
    }
  });

  /* 電話リンク */
  let $ua = navigator.userAgent;
  if ($ua.indexOf("iPhone") < 0 && $ua.indexOf("Android") < 0) {  // PCのとき
    jQuery('a[href^="tel:"]') // 電話リンク
      .css("cursor", "default") // カーソルをポインターにしない
      .css('pointer-events', 'none')  // ホバーなども動作しない
      .on("click", function (e) {
        e.preventDefault();
      });
  }

  /* tab */
  jQuery('.js-tabIndex').on('click', function (e) {
    e.preventDefault();
    const tabParent = jQuery(this).parents('.js-tab');
    const targets = jQuery(this).data('target');
    const target = jQuery(this).attr('href');

    jQuery('.js-tabIndex.is-active').removeClass('is-active');
    jQuery(this).addClass('is-active');

    // 現在表示しているものを非表示にする
    tabParent.find(`.${targets}.is-active`).removeClass('is-active');
    // クリックしたタブのターゲットを表示
    jQuery(target).addClass('is-active');

    return false;
  });

  // スワイパー
  jQuery(function ($) {
    const $mvSwiper = $('.js-mv-swiper');
  
    if ($mvSwiper.length > 0) {
      const mvSwiper = new Swiper('.js-mv-swiper', {
        loop: true,
        speed: 2000,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        }
      });
    }
  });
  
  

});
