let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discout = document.getElementById("discout");
let count_total = document.getElementById("count_total");
let count_total_color = document.getElementById("count_total_color");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.querySelector(".creat");
let mood = "create";
let get_i;
// price //
function calcprice(){
    if(price.value != ''){
        count_total.innerHTML = (+price.value + +taxes.value + +ads.value)- +discout.value;
        count_total_color.style.background = "darkgreen";
    }
    else{
        count_total.innerHTML = '';
        count_total_color.style.background = "brown";
    }
}

// creat //
let datapro;
if(localStorage.localpruduct != null){
    datapro = JSON.parse(localStorage.localpruduct);
}else {
    datapro = [];
}
creat.onclick = function creatdata(){
    objectpruduct=  {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discout: discout.value,
        count_total: count_total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(mood === "create"){
        if(count.value>1){
            for(i=0; i<count.value; i++){
                datapro.push(objectpruduct);
            }
        }else{
            datapro.push(objectpruduct);
        }
    }else{
        datapro[get_i] = objectpruduct;
        creat.innerHTML = "Create";
        count.style.display = "block";
    }
    localStorage.setItem("localpruduct", JSON.stringify(datapro));
    cleardata()
    readData()
}

// clear input //
function cleardata(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discout.value = '';
        count_total.innerHTML = ''; 
        count.value = ''; 
        category.value = ''; 
        calcprice()
}

// read data //
function readData(){
    let table = '';
    for(let i = 0; i< datapro.length; i++){
        table += 
            `<tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discout}</td>
                    <td>${datapro[i].count_total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick= "deleteitem(${i})" id="delete">delete</button></td>
            </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    clickdelete_All = document.getElementById("deleteall");
    if (datapro.length > 0) {
        clickdelete_All.innerHTML = 
        `<button onclick ="deleteAll()" >Delete All (${datapro.length})</button>`
    }else{
        clickdelete_All.innerHTML = '';
    }
}
readData()
// Delete item //
function deleteitem(i){
    datapro.splice(i, 1);
    localStorage.localpruduct = JSON.stringify(datapro);
    readData();
}
// Delete All //
function deleteAll(){
    datapro.splice(0);
    localStorage.clear()
    readData();
}
// Update data //
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discout.value = datapro[i].discout;
    count_total.innerHTML = datapro[i].count_total;
    category.value = datapro[i].category;
    creat.innerHTML = "Update";
    count.style.display = "none";
    mood = "update";
    get_i = i;
    scroll({
        top:0,
        behavior: "smooth",
    })
}

// search // 
let searchMood = "title";
let search = document.getElementById("search");
function getbTnSearch(id){
    if(id == "Search_By_title"){
        searchMood = "title";
    } else{
        searchMood = "category";
    }
    search.placeholder = `Search By ${searchMood}`;
    search.focus()
    search.value= '';
    readData()
}

function search_data(value){
    let table = '';
    for(let i=0; i<datapro.length; i++){
        if(searchMood == "title"){
            if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discout}</td>
                    <td>${datapro[i].count_total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick= "deleteitem(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }else{
            if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
                table +=
                `<tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discout}</td>
                    <td>${datapro[i].count_total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick= "Update_item(${i})" id="update">update</button></td>
                    <td><button onclick ="deletePro(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}