document.addEventListener('DOMContentLoaded', () => {
  // 入力内容を格納するための変数
  let val;
  // 入力フィールドのタイプを格納するための変数
  let type;
  // ラジオボタンの選択値を格納するための変数
  let radio;
  // チェックボックスの選択値を格納するための変数
  let check;
  const inputArea = document.querySelector('.js-inputArea');
  const privacy = inputArea.querySelector('#js-privacy');
  let requireFlg = false;
  let privacyFlg = false;
  let errFlg = true;

  // ラジオボタンの初期値を取得し、確認画面に反映させる
  const radioButtons = inputArea.querySelectorAll('[type="radio"]:checked');
  radioButtons.forEach(button => {
    // ラジオボタンの選択値を取得
    radio = button.value;
    // ラジオボタンの親要素からidを取得
    const name = button.closest('[name]').name;
    // 取得したidをクラス名に追加し、確認画面の値を設定
    document.querySelector(`[data-input-name="${name}"]`).textContent = radio;
    // console.log(document.querySelector(`[data-input-name="${name}"]`));
  });

  // 入力フィールドの内容が変更された場合の処理
  const formInputs = inputArea.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('change', function () {
      // 入力内容を取得
      val = this.value;
      // 入力フィールドのタイプを取得
      type = this.getAttribute("type");

      if (type === "radio") {// ラジオボタンの場合の処理
        // ラジオボタンの選択値を取得
        radio = this.value;
        // ラジオボタンの親要素からidを取得
        const name = this.closest("[name]").name;
        // 取得したnameをクラス名に追加し、確認画面の値を設定
        document.querySelector(`[data-input-name="${name}"]`).textContent = radio;
      }
      else if (type === "checkbox") {// チェックボックスの場合の処理
        if (input !== privacy) {

          // チェックボックスの選択値を取得
          check = this.value;
          // チェックボックスの親要素からidを取得
          const name = this.closest("[name]").name;
          // 取得したidをクラス名に追加し、確認画面の値を設定
          document.querySelector(`[data-input-name="${name}"]`).textContent += check + " / ";
        }
      }
      else if (type === "file") { // fileの場合
        // ファイル名を取得
        const fileName = this.files[0].name;
        // ファイルの親要素からidを取得
        const name = this.closest("[name]").name;
        // 取得したidをクラス名に追加し、確認画面の値を設定
        document.querySelector(`[data-input-name="${name}"]`).textContent = fileName;
      }
      else {// その他の場合の処理
        // ファイルの場合の処理

        // 入力フィールドのidを取得
        const name = this.name;
        // 取得したidをクラス名に追加し、確認画面の値を設定
        document.querySelector(`[data-input-name="${name}"]`).textContent = val;
      }
    });
  });

  // 確認ボタンをクリックした場合の処理
  const confirmButton = inputArea.querySelector(".js-confirmBtn");
  confirmButton.addEventListener('click', () => {
    document.querySelector(".js-inputArea").style.display = 'none';
    document.querySelector(".js-confirmArea").style.display = 'block';
    // window.scrollTo(0, document.querySelector('.js-header').getBoundingClientRect().top);
    // document.querySelector('#entryForm').scrollIntoView();
    window.scrollTo(0, document.querySelector('.js-header').getBoundingClientRect().top);
  });

  // 戻るボタンをクリックした場合の処理
  const backButton = document.querySelector(".js-backBtn");
  backButton.addEventListener('click', () => {
    document.querySelector(".js-inputArea").style.display = 'block';
    document.querySelector(".js-confirmArea").style.display = 'none';
    // window.scrollTo(0, document.querySelector('.js-header').getBoundingClientRect().top);
    // document.querySelector('#entryForm').scrollIntoView();
    window.scrollTo(0, document.querySelector('.js-header').getBoundingClientRect().top);
  });


  // 確認ボタンを無効化/有効化する処理
  function setSubmitProp() {
    if (requireFlg && privacyFlg && !errFlg) {
      confirmButton.disabled = false;
    } else {
      confirmButton.disabled = true;
    }
  }


  // プライバシーポリシー
  privacy.addEventListener('change', function () {
    privacyFlg = (this.checked ? true : false);
    setSubmitProp();
  });

  // 必須項目が変更された場合の処理
  const requiredInputs = inputArea.querySelectorAll('[aria-required="true"]');
  requiredInputs.forEach(input => {
    input.addEventListener('input', () => {
      // フラグ
      let flag = true;
      // 必須項目をループで確認
      requiredInputs.forEach(requiredInput => {
        if (requiredInput.value === "") {
          flag = false;
        }
      });
      // フラグに基づいて確認ボタンを有効化/無効化
      requireFlg = flag;
      setSubmitProp();
    });
  });

  // エラーチェック
  function errorCheck() {
    if (document.querySelector('.wpcf7-not-valid-tip')) {
      errFlg = true;
    } else {
      errFlg = false;
    }
  }

  requiredInputs.forEach(function (element) {
    element.addEventListener('blur', function () {
      errorCheck();
      setSubmitProp();
    });
  });


  // // 送信ボタンをクリックした場合の処理 PHPでやるので不要
  // document.addEventListener('wpcf7mailsent', (event) => {
  //   location = location.protocol + '//' + location.host + location.pathname + '/thanks/';
  // }, false);
});
