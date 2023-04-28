let euro = document.querySelector(".euro");
let dolar = document.querySelector(".dolar");

let l1 = document.querySelector(".l1");
let l2 = document.querySelector(".l2");
let e1 = document.querySelector(".e1");
let e2 = document.querySelector(".e2");
let d1 = document.querySelector(".d1");
let d2 = document.querySelector(".d2");
let sonuc = document.querySelector(".result");

const xhr = new XMLHttpRequest();

xhr.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(this.responseText);

    console.log(response.TCMB_AnlikKurBilgileri);

    //euro
    let euro_live = response.TCMB_AnlikKurBilgileri[3].ForexBuying;
    euro.innerHTML = Number(euro_live) + " €";

    //dolar
    let dolar_live = response.TCMB_AnlikKurBilgileri[0].ForexBuying;
    dolar.innerHTML = dolar_live + " $";

    document.querySelector(".btn").addEventListener("click", function () {
      let text_miktar = document.querySelector(".miktar");
      let miktar = Number(text_miktar.value);

      if (l1.checked && e2.checked) {
        sonuc.innerHTML = Math.round(miktar / euro_live) + "€";
        clear();
      } else if (l1.checked && d2.checked) {
        sonuc.innerHTML = Math.round(miktar / dolar_live) + "$";
        clear();
      } else if (e1.checked && l2.checked) {
        sonuc.innerHTML = Math.round(miktar * euro_live) + "₺";
        clear();
      } else if (e1.checked && d2.checked) {
        sonuc.innerHTML = Math.round(miktar * 1.07) + "$";
        clear();
      } else if (d1.checked && l2.checked) {
        sonuc.innerHTML = Math.round(miktar * dolar_live) + "₺";
        clear();
      } else if (d1.checked && e2.checked) {
        sonuc.innerHTML = Math.round(miktar * 0.93) + "€";
        clear();
      }
    });
  }
};

xhr.open("GET", "http://hasanadiguzel.com.tr/api/kurgetir");
xhr.send();

document.querySelector(".btn").addEventListener("click", function () {
  let text_miktar = document.querySelector(".miktar").value;
  let miktar = Number(text_miktar);

  if (l1.checked && e2.checked) {
    sonuc.innerHTML = miktar / euro_live;
  } else if (l1.checked && d2.checked) {
  } else if (e1.checked && l2.checked) {
  } else if (e1.checked && d2.checked) {
  } else if (d1.checked && l2.checked) {
  } else if (d1.checked && e2.checked) {
  }
});

function clear() {
  document.querySelector(".miktar").value = "";
  document.querySelector(".l1").checked = false;
  document.querySelector(".l2").checked = false;
  document.querySelector(".e1").checked = false;
  document.querySelector(".e2").checked = false;
  document.querySelector(".d1").checked = false;
  document.querySelector(".d2").checked = false;
}
