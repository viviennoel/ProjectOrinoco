class Product {
    constructor(id, name, price, description, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

console.log(Product.price);

//FUNCTION PRODUCTLIST PAGE + creating productlist (Function productlist) + displaying the list (Fucnction insertlisthtml)***********************************************************
function DisplayProductList() {
    fetch('http://localhost:3000/api/cameras').then(response => response.json()).then(response => productlist(response))
        .catch(function (error) {
            console.log('there was a problem with the fetch : ' + error.message)
        })
}
//*************************************************************************************************************************************************************************************
//Fucnction creating an array of all the caracteristics of the product called "productlist" *****************************************************************************************
function productlist(json) {

    var productlist = [];
    for (let i = 0; i < json.length; i++) {
        productlist.push(new Product(json[i]._id, json[i].name, json[i].price, json[i].description, json[i].imageUrl))
    }

    //display this productlist
    console.log(productlist);
    console.log(productlist.length);

    //Display the elements of productlist in HTML
    insertlisthtml(productlist);
}
//***********************************************************************************************************************************************************************************
//Function to display the content of the list on the page HTML***********************************************************************************************************************
function insertlisthtml(productlist) {
    let HTMLProductlist = "";
    
    productlist.forEach(Product => {
        HTMLProductlist += `<div class="productlist">
                <h2>${Product.name}</h2>
                <p class="text-center">${Product.description}</p>
                <p class="priceproductslist">Price of the article: ${Product.price / 100 + '.' + Product.price % 100}</p>
                <img class="imageproduct" src="${Product.imageUrl}">
                <a class="button" onclick = "getqueryParams('${Product.id}')">Select</a>
            </div>`
    })
    console.log(HTMLProductlist);
    document.getElementById('products').innerHTML = HTMLProductlist;
}
//***********************************************************************************************************************************************************************************
//Function to get the queryParams and relocate the window****************************************************************************************************************************
function getqueryParams(Productid) {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("id", Productid);
    history.pushState(null, null, "?" + queryParams.toString());
    window.location.replace("confirmation.html" + "?" + queryParams.toString());
    alert('The page was queryParameters were successfully added');
}