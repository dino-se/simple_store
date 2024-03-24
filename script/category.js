function loadData() {
    fetch("api/category/read.php")
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        var template = document.querySelector("#categoryRowTemplate");
        var parent = document.querySelector("#tableBody");
  
        data.forEach(item => {
          let clone = template.content.cloneNode(true);
          clone.querySelector("tr td.tdID").innerHTML = item.category_id;
          clone.querySelector("tr td.tdName").innerHTML = item.category_name;
          clone.querySelector("tr td.tdCreatedAt").innerHTML = item.date_created;
          parent.appendChild(clone);
        });
      });
  }
  
  loadData();
  
  document.querySelector("#btnAddCategory").addEventListener("click", function () {
  
    const addData = new FormData();
    addData.append('name', document.querySelector("#categoryName").value);
  
      fetch("api/category/create.php", {
        method: "POST",
        body: addData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.res === "success") {
            location.reload();
            document.querySelector("#exampleModal").modal("toggle");
            document.querySelector("#form").reset();
          }
        })
        .catch(error => {
          console.log(error);
        });
  });
  
  document.querySelector("#tableBody").addEventListener("click", function (event) {
    if (event.target.classList.contains("btnUpdate")) {
      var categoryId = event.target.closest("tr").querySelector(".tdID").textContent;
      var categoryName = event.target.closest("tr").querySelector(".tdName").textContent;
  
      document.querySelector("#updateCategoryId").value = categoryId;
      document.querySelector("#updateCategoryName").value = categoryName;
  
      document.querySelector("#updateModal").modal("show");
    }
  });
  
  document.querySelector("#btnUpdateCategory").addEventListener("click", function () {
  
    const formData = new FormData();
    formData.append('id', document.querySelector("#updateCategoryId").value);
    formData.append('name', document.querySelector("#updateCategoryName").value);
  
      fetch("api/category/update.php", {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.res === "success") {
            location.reload();
          }
        });
    
  });
  
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btnDelete")) {
      var categoryId = event.target.closest("tr").querySelector(".tdID").textContent;
  
      if (confirm("Are you sure you want to delete this category?")) {
        fetch("api/category/delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `id=${encodeURIComponent(categoryId)}`,
        })
          .then(response => response.json())
          .then(data => {
            if (data.res === "success") {
              location.reload();
            }
          });
      }
    }
  });
  