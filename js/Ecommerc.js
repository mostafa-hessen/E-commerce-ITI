///
let RowContainer = document.querySelector(".row");
let addTocartBtn;
let spanCounter = document.getElementById("spanCounter");
var [perfEntries] = performance.getEntriesByType("navigation");
console.table(perfEntries["type"]);
if (perfEntries[0].type === "back_forward") {
  
    location.reload(true);
}

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      console.log("", element.id);
      RowContainer.innerHTML += `
        <div   id=${element.id}  style="margin-bottom:20px !important" class="product col-md-6 col-lg-4 mb-5 mb-md-0">
        <div style="height:520px"class="card d-flex dirction-column justify-content-between" >
        <div class="d-flex justify-content-between p-3">
          <p class="lead mb-0">Today's Combo Offer</p>
          <div
            class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
            style="width: 35px; height: 35px;">
            <p class="text-white mb-0 small">x2</p>
          </div>
        </div>
        <div class="img" style="text-align:center">
        <img style="max-width:150px;max-height:160px;text-align:center" src=${element.image}
          class="card-img-top" alt="Laptop" />
        
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <p class="small"><a href="#!" class="text-muted">${element.category}</a></p>
            <p class="small text-danger"><s>$1199</s></p>
          </div>
        
          <div class="d-flex justify-content-between mb-3">
            <h5 class="mb-0">${element.title}</h5>
            <h5 class="text-dark mb-0">$${element.price}</h5>
          </div>
        
          <div class="d-flex justify-content-between mb-2">
            <p class="text-muted mb-0">Available: <span class="fw-bold">7</span></p>
            <div  class="ms-auto text-center text-warning">

            
            <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
               <i class="far fa-star"></i>
          
            
              <br>
              <i style="margin:15px"> ${element.rating.count}</i>
            </div>
            </div>
        <div  class="mt-0"style="text-align:center;">
        <button class="btn btn-danger " style="text-align: center;">add to cart</button>
        
        </div>
        </div>
        </div>
        </div>
        
        `;
      addTocartBtn = document.querySelectorAll(".btn");
      let id = JSON.parse(localStorage.getItem("ids"))
        ? JSON.parse(localStorage.getItem("ids"))
        : [];
      for (const iterator of addTocartBtn) {
        iterator.addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem("cart"))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
          cart.push(
            data[
              +iterator.parentElement.parentElement.parentElement.parentElement.getAttribute(
                "id"
              ) - 1
            ]
          );

          localStorage.setItem("cart", JSON.stringify(cart));

          id.push(
            iterator.parentElement.parentElement.parentElement.parentElement.getAttribute(
              "id"
            )
          );
          localStorage.setItem("ids", JSON.stringify(id));
          spanCounter.innerHTML = id.length;
        });
      }
    });
  })
  .catch(function (error) {
    document.getElementById("messages").innerHTML = error;
  });

// get number of product
id = JSON.parse(localStorage.getItem("ids"))
  ? JSON.parse(localStorage.getItem("ids"))
  : [];
spanCounter.innerHTML = id.length;
