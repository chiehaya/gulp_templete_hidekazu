// form validation
(function () {
  const form = '.js-form';
  const $submit = jQuery('.js-submit');
  const $privacy = jQuery('.js-privacy');
  let requireFlg = false;
  let privacyFlg = false;
  let $require = jQuery(`${form} [required]`);
  let fillCount = 0;

  function setSubmitProp() {
    if (requireFlg && privacyFlg) {
      $submit.prop('disabled', false);
    } else {
      $submit.prop('disabled', true);
    }
  }

  jQuery('.js-formTel').on('blur', function () {
    let val = jQuery(this).val().replace(/[━.‐.―.－.-.ー.-]/gi, '');
    if (!val.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
      jQuery(this).val('');
      alert('電話番号が正しくありません');
    }
  });

  // 必須項目
  $require.on('blur', function () {
    // if (jQuery(this).attr('id') === 'js-formKana' && !jQuery(this).val().match(/^([ァ-ン]|ー)+$/)) {
    if (jQuery(this).hasClass('js-formKana') && !jQuery(this).val().match(/^([ァ-ン　 ]|ー)+$/)) {
      jQuery(this).val('');
      alert('全角カタカナで入力してください。');
    }
    if (jQuery(this).attr('name') == 'your_email' && !jQuery(this).val().match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
      jQuery(this).val('');
      alert('メールアドレスが正しくありません');
    }
  });

  $require.on('keyup', function () {
    $require.each(function () {
      let value = jQuery(this).val();

      if ((value !== '' && value.match(/[^\s\t]/))) {
        fillCount++;
      }
    });

    requireFlg = (fillCount === $require.length ? true : false);

    setSubmitProp();
    fillCount = 0;
  });

  // プライバシーポリシー
  $privacy.on('change', function () {
    privacyFlg = (jQuery(this).prop('checked') ? true : false);
    setSubmitProp();
  });

  // 送信時
  jQuery(form).on('submit', function () {
    if (!(requireFlg && privacyFlg)) {
      alert('入力に誤りがあります。');
      return false;
    }
  });
})();

// });
