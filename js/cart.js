"use strict";
//=============Variabls==========//

let mycartElement = document.querySelector("mycart");
let cartLocalStorage = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let numberOfItem = document.querySelector(".numberOfItem");
let ItemsContainer = document.getElementById("ItemsContainer");
let priceArrAfter = [];

//=============Functions==========//

let uniqeCart = Array.from(new Set(cartLocalStorage.map((s) => s.id))).map(
  (id) => {
    return {
      id: id,
      title: cartLocalStorage.find((s) => s.id === id).title,
      image: cartLocalStorage.find((s) => s.id === id).image,
      price: cartLocalStorage.find((s) => s.id === id).price,
    };
  }
); //=> this variabl get element from local storage to be unic not repeated

// number of numberOfItem display at cart html from localStorage
function numberOfItemFunc() {
  numberOfItem.innerHTML = `Cart - ${
    JSON.parse(localStorage.getItem("ids"))
      ? JSON.parse(localStorage.getItem("ids")).length
      : "0"
  } items`;
}

// generat desired product
function genertatProduct(ele) {
  ele.forEach((element) => {
    // call to know how many product clicked from e-commerc
    ItemsContainer.innerHTML +=
      // genertatProduct(ele); // display product at Html from Local Storage
      `
   <div class="row Item" data-id=${element.id}>
  <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
    <!-- Image -->
    <div
      class="bg-image hover-overlay hover-zoom ripple rounded"
      data-mdb-ripple-color="light"
    >
      <img
        src=${element.image}
        class="w-100"
      />
      <a href="#!">
        <div
          class="mask"
          style="background-color: rgba(251, 251, 251, 0.2)"
        ></div>
      </a>
    </div>
    <!-- Image -->
  </div>

  <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
    <!-- Data -->
    <p><strong>${element.title}</strong></p>
     
    <p>Size: M</p>

    <button
      type="button"
      class="btn btn-remove btn-primary btn-sm me-1 mb-2"
      data-mdb-toggle="tooltip"
      title="Remove item"
      dataRemove-id=${element.id}
    >
      <i class="fas fa-trash"></i>
    </button>
    <button
      type="button"
      class="btn btn-danger btn-sm mb-2"
      data-mdb-toggle="tooltip"
      title="Move to the wish list"
    >
      <i class="fas fa-heart"></i>
    </button>
    <!-- Data -->
  </div>

  <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
    <!-- Quantity -->
    <div class="d-flex mb-4" style="max-width: 300px">
      <button
      dataBtn-id=${element.id}
        class="btn btn-minus btn-primary px-3 me-2"
        onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
      >
        <i class="fas fa-minus"></i>
      </button>

      <div class="form-outline">
        <input
          min="0"
          name="quantity"
          value=${1}
          data-id=${element.id}
          type="number"
        class="form-control NumberOfproduct "
        />
        <label class="form-label" for="form1">Quantity</label>
      </div>

      <button
      dataBtn-id=${element.id}
        class="btn btn-plus btn-primary px-3 ms-2"
        onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <!-- Quantity -->


    
    <!-- Price -->
    <p class="text-start text-md-center">
      <strong class=" ">$<span class="currentPriceOfElements">${
        element.price
      }</span></strong>
    </p>
    <!-- Price -->
  </div>
  <hr class="my-4" />
</div>
<!-- Single item -->

`;
  });
  countOfEachElement();
}

// number  of Each desired product
function countOfEachElement() {
  let NumberOfproduct = document.querySelectorAll(".NumberOfproduct");
  let ids = JSON.parse(localStorage.getItem("ids"))
    ? JSON.parse(localStorage.getItem("ids"))
    : [""];
  let count;
  NumberOfproduct.forEach((ele) => {
    count = 0;
    typeof ids == typeof {}
      ? ids.forEach((eleIds) => {
          eleIds == ele.getAttribute("data-id") ? count++ : "";
        })
      : "";
    ele.setAttribute("value", count);
  });
}

// countNumberOfProductAtElement
function countNumberOfProductAtElement( ) {
  let priceArr = [];
  let items = document.querySelectorAll(".Item");
  let currentPriceOfElements = document.querySelectorAll(
    ".currentPriceOfElements"
  );
  // console.log(NumberOfproduct,currentPriceOfElements);
  // if(NumberOfproduct.length>0){
  let NumberOfproduct = document.querySelectorAll(".NumberOfproduct");

  if (NumberOfproduct.length > 0) {
    for (const i in uniqeCart) {
      // NumberOfproduct.length>0?
      priceArr.push(
        +NumberOfproduct[i].value * +currentPriceOfElements[i].innerHTML
      );
    }

  
    priceArrAfter = priceArr;
  }
}

//  totalPriceFunc after calculat countNumberOfProductAtElement
function totalPriceFunc() {
  let totalPriceContainer = document.querySelectorAll(".price");
  let totalPrice = () => {
    let sum = 0;
    for (
      let i = 0;
      priceArrAfter.length > 1
        ? i < priceArrAfter.length - 1
        : i < priceArrAfter.length;
      i++
    ) {
      priceArrAfter.length > 1
        ? (sum += priceArrAfter[i] + priceArrAfter[i + 1])
        : (sum += priceArrAfter[i]);
    }
    return sum;
  };
  totalPriceContainer[0].innerHTML = `$ ${totalPrice().toFixed(2)}`;
  totalPriceContainer[1].innerHTML = `$ ${totalPrice().toFixed(2)}`;
}

// Plus btn function
function pulusFunction() {
  let idsLocal = JSON.parse(localStorage.getItem("ids"))
    ? JSON.parse(localStorage.getItem("ids"))
    : [];

  idsLocal.push(this.getAttribute("dataBtn-id"));
  JSON.stringify(localStorage.setItem("ids", JSON.stringify(idsLocal)));
  //   NumberOfproduct = document.querySelectorAll(".NumberOfproduct");
  countNumberOfProductAtElement();
  numberOfItemFunc();
  totalPriceFunc();
}

// minus btn function
function minusFunction() {
  let idsLocal = JSON.parse(localStorage.getItem("ids"))
    ? JSON.parse(localStorage.getItem("ids"))
    : [];

  idsLocal = idsLocal
    .join("")
    .replace(this.getAttribute("dataBtn-id"), " ")
    .trim();

  JSON.stringify(
    localStorage.setItem("ids", JSON.stringify(idsLocal.split("")))
  );

  countNumberOfProductAtElement();
  totalPriceFunc();
  numberOfItemFunc();
//   removeItemFunction() 

}


// remove item
function removeItemFunction() {
  //   1- number of item after deleted
  let idsLocal = JSON.parse(localStorage.getItem("ids"))
    ? JSON.parse(localStorage.getItem("ids"))
    : [];
  idsLocal = idsLocal
    .join("")
    .replaceAll(this.getAttribute("dataRemove-id"), "")
    .trim();

  JSON.stringify(
    localStorage.setItem("ids", JSON.stringify(idsLocal.split("")))
  );
  numberOfItemFunc();
  //  end number of item after deleted

  //   2- delet from cart  array
  cartLocalStorage = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  function removeObjectWithId(arr, id) {
    return arr.filter((obj) => obj.id !== id);
  }
  cartLocalStorage = removeObjectWithId(
    cartLocalStorage,
    +this.getAttribute("dataRemove-id")
  );
  localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
  cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

  console.log("i", cartLocalStorage);
  //   end delet from cart  array

  // 3- make it uniqe
  let li = Array.from(new Set(cartLocalStorage.map((s) => s.id))).map((id) => {
    return {
      id: id,
      title: cartLocalStorage.find((s) => s.id === id).title,
      image: cartLocalStorage.find((s) => s.id === id).image,
      price: cartLocalStorage.find((s) => s.id === id).price,
    };
  });
  console.log("li", li);
  console.log("li", li.length);

  // end  make it uniqe

  //   4- remove from html display
  let ItemsInCart = document.querySelectorAll(".Item");
  ItemsInCart.forEach((ele) => {
    ele.getAttribute("data-id") == this.getAttribute("dataRemove-id")
      ? ele.remove()
      : "";
  });
  //  end remove from html display

  // 5- price
  let NumberOfproduct = document.querySelectorAll(".NumberOfproduct");
  let priceArr = [];
  let items = document.querySelectorAll(".Item");
  let currentPriceOfElements = document.querySelectorAll(
    ".currentPriceOfElements"
  );

  console.log(NumberOfproduct);

  if (NumberOfproduct.length > 0) {
    console.log(li, NumberOfproduct);
    for (const i in li) {
      // NumberOfproduct.length>0?
      priceArr.push(
        +NumberOfproduct[i].value * +currentPriceOfElements[i].innerHTML
      );
    }
  }
  priceArrAfter = priceArr;
  totalPriceFunc();
  // end price



}

//=============CALLING FUNCTION==========//
genertatProduct(uniqeCart);
// call two function first count secont calculat price
numberOfItemFunc();
countNumberOfProductAtElement();
totalPriceFunc();

//============= EVENTS==========//
let btnPlus = document.querySelectorAll(".btn-plus");
let btnMinus = document.querySelectorAll(".btn-minus");
let btnRemove = document.querySelectorAll(".btn-remove");
btnPlus.forEach((ele) => ele.addEventListener("click", pulusFunction));
btnMinus.forEach((ele) => ele.addEventListener("click", minusFunction));
btnRemove.forEach((ele) => ele.addEventListener("click", removeItemFunction));

// window.addEventListener( "pageshow", function ( event ) {
//   console.log("lkmjnhbvcx",event.persisted,   window.performance.navigation.type);
//   var historyTraversal = event.persisted || 
//                          ( typeof window.performance != "undefined" && 
//                               window.performance.navigation.type === 2 );
//   if ( historyTraversal ) {
//     // Handle page restore.
//     window.location.reload();
//   }
// });

// var [perfEntries] = performance.getEntriesByType("navigation");
// console.table(perfEntries["type"]);
// if (perfEntries[0].type === "back_forward") {
  
//     location.reload(true);
// }


// var [perfEntries] = performance.getEntriesByType("navigation");
// console.table(perfEntries["type"]);
// if (perfEntries["type"] === "back_forward") {
  
//     location.reload(true);
// }