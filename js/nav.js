$(function () {
    let logoDiv = $('#main-logo');
    $('<a>').attr('href','../index.html').attr('id','books-logo').html('BOOKS.').appendTo(logoDiv)
    
    let navDivHtml = `<nav id="desktop-only">
    <ul>
    <li><a href="#">About Us</a></li>
    <li><a href="../html/productslist.html">Products</a></li>
    <li><a href="#">Contact Us</a></li>
    </ul>
    </nav>
    <div id="cart" class="cart" deta-totalitems="0">
    <i class="fas fa-shopping-basket" id="shopping-cart"></i>
    <div class="total-text">
    <p>Items</p>
    <p id="items-basket"></p>
    </div>
    </div>
    <div id="cart-items">
    <p id="cart-header">Shopping cart</p>
    <ol id="list-item">
    </ol>
    <div class="total-text">
    <p>Total: </p>
    <p id="total-price"></p>
    </div>
    <button class="buttons continue-btn"><a href="../html/productslist.html">Continue shopping</a></button>
    <button class="buttons checkout-btn"><a href="../html/payment.html">Check out</a></button>
    </div>
    <div class="menu-toggle">
    <i class="fas fa-bars"></i>
    </div>`;
    
    $('#main-nav').html(navDivHtml);
    
    $('.menu-toggle').on('click', function(){
        $('nav').toggleClass('active');
    });
    
    $('#cart-items').slideUp();
    $('.cart').on('click', function () {
        $('#cart-items').slideToggle();
    });
    
    updateCart();
    
});

function updateCart() {
    let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
    
    $('#list-item').html("");
    let totalPrice = 0;
    let totalQuantity = 0;
    
    $.each(existingProducts, (i, book) => {
        let title = book.title;
        let removeBtn = "<button class='remove'> X </button>";
        let price = "<span class='eachPrice'>" + (parseFloat(book.price)) + "</span>";
        let quantity = book.quantity;
        let updateBtn = "<button class=update>Update</button>";
        $('<li id="book-'+book.id+'">'+" "+ title +" "+ "<b>" + price +"kr" + "</b>"+ '<div id="quantityBox">' +
        '<i class="fas fa-minus-circle" id="removeItemInCart"></i>' +
        '<p id="quantity">' + quantity +'</p>' +
        '<i class="fas fa-plus-circle" id="addItemInCart"></i>' +
        '</div>' +  updateBtn + removeBtn + "</li>").appendTo('#list-item');	
        $("#book-" + book.id + " .update").on('click', () => {
            let quantity = $('#quantity').html();
            console.log(quantity);
            existingProducts[i].quantity = parseInt(quantity);
            localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
            
            updateCart();
            
        });
        $("#book-" + book.id + " .remove").on('click', function () {
            let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
            let index = -1;
            $.each(existingProducts, (i, product) => {
                if (product.id == book.id) {                    
                    index = i;
                }
            });
            
            existingProducts.splice(index, 1);
            localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
            
            updateCart();
            
        });
        
        totalPrice += parseFloat(book.price) * book.quantity;
        totalQuantity += book.quantity;
        
    });
    
    $("#total-price").html("<b>"+ totalPrice +" "+"kr" +"</b>");
    $('#items-basket').html(totalQuantity);
}

// function changeProductsList(book, remove) {
//     let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
//     if (existingProducts == null) {
//         existingProducts = [];
//     }
//     let item = new AddedProduct(book.title, book.price, book.quantity, book.id);

//     let index = 0;
//     let productInCart = false;
//     $.each(existingProducts, (i, product) => {
//         if (product.id == item.id) {
//             productInCart = true;
//             index = i;
//         }
//     });

//     if (productInCart === true) {
//         existingProducts.splice(index, 1);
//     }

//     if(!remove) {
//         existingProducts.push(item);
//     }    

//     //localStorage.setItem('addedProductsList', JSON.stringify(addedProductsList));
//     localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
// }
