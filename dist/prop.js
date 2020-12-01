// initial data

window.$exorpit = {};

// sound effects

var audio = helium('audio').appendTo('body');

audio.mediaGroup = "test";
function addSource(path) {
  audio.empty()
  return helium('source').attr('src', path).appendTo(audio);
}

soundManager.debugMode = false;

function bzipEffect(name) {
  return function bzipEffect(event) {
    var mySound = soundManager.createSound({
      url: './sounds/' + name + '.mp3',
      volume: 10
    });

    // ...and play it
    mySound.play();
  };
}

// btn and label effects

helium("[fui~='label']").on('click', bzipEffect("click"));
helium("[fui~='btn']").on('mouseover', bzipEffect("click"));
helium("[fui~='btn']").on('click', bzipEffect("8"));


// popover and tooltip
if(tippy) {
  let tooltipElems = document.querySelectorAll("[fui~='tooltip']");
  tooltipElems.forEach((item, i) => {
    helium(item).on('mouseover', bzipEffect("click"));
    let label = item.children[0];
    let theme = label.attributes["fui-theme"];
    tippy(item, {
      content: label,
      theme: "fui" + ( theme ? "-" + theme.nodeValue  :  ""),
      placement: label.attributes["fui-position"].nodeValue || "top"
    })
  });


  let popoverElems = document.querySelectorAll("[fui~='popover']");
  popoverElems.forEach((item, i) => {
    helium(item).on('click', bzipEffect("click"));
    let label = item.children[0];
    let theme = label.attributes["fui-theme"];
    tippy(item, {
      content: label,
      theme: "fui" + ( theme ? "-" + theme.nodeValue  :  ""),
      placement: label.attributes["fui-position"].nodeValue || "top",
      trigger: 'click',
    })
  });
}

// modal effects
helium("[fui~='modal']").on('click', x => {
  if(helium(x.target).attr("fui")[0].split(" ").includes("modal")) {
    closeModal('#' + x.target.id);
  }
});

let body = helium('body');

function openModal(query) {
  let el = helium(query).first();
  body.css('overflow', 'hidden');
  el.css('display', 'block');
}

function closeModal(query) {
  let el = helium(query).first();
  body.css('overflow', 'auto');
  el.css('display', 'none');
}

// toast effects

// search for toastArea
window.$exorpit.area = {};
window.$exorpit.toast = {};

areaList = document.querySelectorAll("[fui~='toast-area']");

areaList.forEach((item, i) => {
  window.$exorpit.area[item.attributes["fui-id"].nodeValue] = item;
});

toastList = document.querySelectorAll("[fui~='toast']");

toastList.forEach((item, i) => {
  console.log(item);
  let elem = helium(item);
  window.$exorpit.toast[item.attributes["fui-id"].nodeValue] = elem.first().clone();
  $(item).remove();
});

function addToast(id, el, time = 1000) {
  let elem = window.$exorpit.toast[el];

  console.log(window.$exorpit.area[id]);

  let newElem = elem.first().clone().css("display", "block").prependTo(window.$exorpit.area[id]);

  // newElem.find("[fui~='btn']").on('mouseover', bzipEffect("click"));
  // newElem.find("[fui~='btn']").on('click', bzipEffect("8"));
  //
  // newElem.find("[fui~='toast-close']").on('click', () => {
  //   closeToast(newElem);
  // });

  if(time != "Infinity") {
    setTimeout(() => {
      closeToast(newElem);
    }, time);
  }
}

function closeToast(elem) {
  elem.remove();
}

// let themes = ["", "alert", "success", "warn"];
//
// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) ) + min;
// }
//
// setInterval(() => {
//   let ell = $("[fui~='toast']");
//   if(ell.length > 0) {
//     let defaultAttr = ell.attr("fui");
//
//
//     themes.map(x => {
//       if(defaultAttr.includes(x)) {
//         defaultAttr = defaultAttr.replace(x, "");
//       }
//     });
//
//     ell.attr("fui", defaultAttr + " " + themes[random(0,2)]);
//   }
// }, 1000);
