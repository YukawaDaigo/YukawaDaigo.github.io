/* =========================================================
   main.js
   最小限の動作だけを担当します。文章は一切ここで作りません。
   1. 名前を 1 文字ずつ現れるように分割
   2. スマホのメニュー開閉（Menu / Close）
   3. 日本語／英語の切り替え
   4. 画面上端の読み進み線
   5. 図版の拡大表示（ライトボックス）
   ========================================================= */

(function () {
  "use strict";

  /* ----- 1. 名前を 1 文字ずつ <span> に分ける -------------
     HTML に書いた名前をそのまま使い、見た目用に分割するだけです。 */
  var heroName = document.querySelector(".hero-name");

  if (heroName) {
    var text = heroName.textContent.trim();
    var charIndex = 0;

    heroName.setAttribute("aria-label", text);
    heroName.textContent = "";

    text.split(" ").forEach(function (word, wordIndex) {
      if (wordIndex > 0) {
        heroName.appendChild(document.createTextNode(" "));
      }

      var wordSpan = document.createElement("span");
      wordSpan.className = "hero-name-word";
      wordSpan.setAttribute("aria-hidden", "true");

      Array.from(word).forEach(function (char) {
        var charSpan = document.createElement("span");
        charSpan.className = "hero-name-char";
        charSpan.style.setProperty("--char-index", charIndex);
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        charIndex += 1;
      });

      heroName.appendChild(wordSpan);
    });
  }

  /* ----- 2. スマホのメニュー開閉 -------------------------- */
  var menuButton = document.querySelector(".menu-button");
  var nav = document.querySelector(".site-nav");

  function setMenu(isOpen) {
    document.body.classList.toggle("is-menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("is-menu-open"));
    });

    // メニュー内のリンクを押したら閉じる
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });

    // Esc キーで閉じる
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("is-menu-open")) {
        setMenu(false);
        menuButton.focus();
      }
    });

    // 画面を広げてデスクトップ表示になったら閉じた状態に戻す
    window.matchMedia("(min-width: 769px)").addEventListener("change", function (event) {
      if (event.matches) {
        setMenu(false);
      }
    });
  }

  /* ----- 3. 日本語／英語の切り替え ------------------------
     <html lang="…"> を書き換えるだけで、表示の出し分けは base.css が行います。
     選んだ言語はブラウザに記憶し、URL に ?lang=en を付けると英語で開きます。 */
  var langButtons = document.querySelectorAll(".lang-button");
  var supportedLangs = ["ja", "en"];

  function setLang(lang) {
    document.documentElement.lang = lang;
    langButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });
    try {
      localStorage.setItem("lang", lang);
    } catch (error) {
      // 保存できない環境（プライベートモードなど）では記憶しない
    }
  }

  function getInitialLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (supportedLangs.indexOf(fromUrl) !== -1) {
      return fromUrl;
    }
    try {
      var saved = localStorage.getItem("lang");
      if (supportedLangs.indexOf(saved) !== -1) {
        return saved;
      }
    } catch (error) {
      // 読み込めない環境では初期値（日本語）を使う
    }
    return "ja";
  }

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLang(button.dataset.lang);
    });
  });

  setLang(getInitialLang());

  /* ----- 4. 画面上端の読み進み線 -------------------------- */
  var progress = document.querySelector(".scroll-progress");
  var ticking = false;

  function updateProgress() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.setProperty("--scroll-progress", Math.min(Math.max(ratio, 0), 1));
    ticking = false;
  }

  if (progress) {
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ----- 5. 図版の拡大表示（ライトボックス） ------------- */
  var lightbox = document.querySelector(".lightbox");

  if (lightbox && typeof lightbox.showModal === "function") {
    var lightboxImage = lightbox.querySelector(".lightbox-image");
    var lightboxCaption = lightbox.querySelector(".lightbox-caption");
    var lightboxClose = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll(".figure-button").forEach(function (button) {
      button.addEventListener("click", function () {
        var image = button.querySelector("img");
        var caption = button.closest("figure").querySelector("figcaption");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = caption ? caption.textContent : "";
        lightbox.showModal();
      });
    });

    // 「Close」ボタンで閉じる
    lightboxClose.addEventListener("click", function () {
      lightbox.close();
    });

    // Esc キーで閉じる（ブラウザ標準の動作に加えて確実に閉じるため）
    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        lightbox.close();
      }
    });

    // 画像の外側（背景）をクリックしたら閉じる
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });
  }
})();
