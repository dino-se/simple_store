function loadProductData() {
    fetch("api/product/read.php")
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        var template = document.getElementById("productListTemplate");
        var parent = document.getElementById("productList");
  
        data.forEach(item => {
          let clone = template.content.cloneNode(true);
          clone.getElementById("prodId").value = item.product_id;
          clone.getElementById("prodName").innerHTML = item.product_name;
          clone.getElementById("prodCat").innerHTML = item.product_category;
          clone.getElementById("prodStock").innerHTML = item.product_quantity;
          clone.getElementById("prodImg").src = item.product_image;
          parent.appendChild(clone);
        });
      });
  }
  
  loadProductData();

  fetch("api/category/read.php")
  .then(response => response.json())
  .then(data => {
      const selectElement = document.getElementById("pCat");
      const selectElementT = document.getElementById("pUpCat");

      const defaultOption = document.createElement("option");
      defaultOption.text = "Select Category";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      selectElement.appendChild(defaultOption);

      data.forEach(category => {
          const option = document.createElement("option");
          option.value = category.category_name;
          option.text = category.category_name;

          selectElement.appendChild(option.cloneNode(true));
          selectElementT.appendChild(option.cloneNode(true));
      });
  });


document.querySelector('#btnAddProd').addEventListener('click', addProduct);

  async function addProduct(event) {
    event.preventDefault();

    const formDataX = new FormData();
    formDataX.append('name', document.querySelector('#pName').value);
    formDataX.append('cat', document.querySelector('#pCat').value);
    formDataX.append('quan', document.querySelector('#pQa').value);
    formDataX.append('img', document.querySelector('#pPic').files[0]);
  
    try {
        const response = await fetch("api/product/create.php", {
            method: "POST",
            body: formDataX,
            // mode:"no-cors"
        });

        if (!response.ok) {
            throw new Error('Newton 3rd law');
        }

        const data = await response.json();

        if (data.res === "success") {
          location.reload();
        } else {
            console.error('Newton 2nd law:', data.error);
        }
    } catch (error) {
        console.error('Newton 1st law:', error);
    }
}


  addEventListener("click", function (event) {
    if (event.target.classList.contains("btnProdUpdate")) {
        var prodUpId = event.target.closest(".card").querySelector(".prodId").value;
        var prodUpName = event.target.closest(".card").querySelector("#prodName").textContent;
        var prodQName = event.target.closest(".card").querySelector("#prodStock").textContent;
        var prodPImg = event.target.closest(".card").querySelector("#prodImg").src;
        var prodCatName = event.target.closest(".card").querySelector("#prodCat").textContent;
        
  
      document.querySelector("#pEId").value = prodUpId;
      document.querySelector("#pEName").value = prodUpName;
      document.querySelector("#pEQa").value = prodQName;
      document.querySelector("#pView").src = prodPImg;
      var selectElement = document.querySelector("#pUpCat");
        var options = selectElement.options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].value === prodCatName) {
                options[i].selected = true;
                break;
            }
        }

      // const selectElementUp = document.getElementById("pUpCat");

      // const defaultOption = document.createElement("option");
      // defaultOption.text = prodCatName;
      // defaultOption.hidden = true;
      // defaultOption.selected = true;
      // selectElementUp.appendChild(defaultOption);
  
      document.querySelector("#addCategoryModal").modal("show");
    }
  });


  document.querySelector("#productUpdateMan").addEventListener("click", function () {

    const formDataY = new FormData();
    formDataY.append('id', document.querySelector("#pEId").value);
    formDataY.append('name', document.querySelector("#pEName").value);
    formDataY.append('cat', document.querySelector("#pUpCat").value);
    formDataY.append('stock', document.querySelector("#pEQa").value);
    formDataY.append('img', document.querySelector("#pEPic").files[0]);
  
      fetch("api/product/update.php", {
        method: "POST",
        body: formDataY
      })
        .then(response => response.json())
        .then(data => {
          if (data.res === "success") {
            location.reload();
          }
        })
        .catch(error => {
            alert(error);
        });
    
  });

  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btnProdDelete")) {
        var prodId = event.target.closest(".card").querySelector(".prodId").value;

        if (confirm(`Are you sure you want to delete this product?`)) {
            fetch(`api/product/delete.php?id=${prodId}`)
            .then(response => response.json())
            .then(result => {
                if(result.res === "success") {
                    location.reload();
                }
            });
        }
    }
});

function updateStock(prodUpId, prodQName) {
    fetch(`api/product/quantity.php?id=${prodUpId}&stock=${prodQName}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.reload();
    })
}


function displayImage() {
  const inputs = document.querySelectorAll('#pEPic, #pPic');
  const images = document.querySelectorAll('#pView, #pvView');

  inputs.forEach((input, index) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        images[index].src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  });
}

