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
    <div id="cart" class="cart">
    <div class="total-text">
    <i class="fas fa-shopping-basket" id="shopping-cart"></i>
    <span class='cart-counter' id="items-basket"></span>
    </div>
    </div>
    <div id="cart-items">
    <i class="fas fa-times close"></i>
    <h1 id="cart-header">Shopping cart</h1>
    <ol id="list-item">
    </ol>
    <div class="total-price">
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
        $('#cart-items').slideUp();
    });
    
    $('#cart-items').hide();
    
    $('.cart').on('click', () => {
        $('nav').removeClass('active');
        $('#cart-items').slideToggle();
    });
    
    $('.close').on('click', () => {
        $('#cart-items').slideUp();
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
        let removeBtn = "<i class='fas fa-trash-alt remove'></i>";
        let price = "<span class='eachPrice'>" + (parseFloat(book.price)) +" "+"kr"+ "</span>";
        let quantity = book.quantity;
        // let updateBtn = "<button class='update'>Update</button>";
        $('<li id="book-'+book.id+'">'+" "+ title +" "+ price + removeBtn + '<div id="quantityBox">' +
        '<i class="fas fa-minus-circle" id="removeItemInCart"></i>' +
        '<p id="quantityInCart">' + quantity +'</p>' +
        '<i class="fas fa-plus-circle" id="addItemInCart"></i>' + 
        '</div>' +  "</li>").appendTo('#list-item');	
        
        // $("#book-" + book.id + " .update").on('click', () => {
        //     let quantity = $('#book-' + book.id + ' #quantity').html();
        //     console.log(quantity);
        //     existingProducts[i].quantity = parseInt(quantity);
        //     localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
        
        //     updateCart();
        // });
        
        $("#book-" + book.id + " #removeItemInCart").on('click', () => {
            // console.log(book.id)
            let reduceNum = $('#book-' + book.id + ' #quantityInCart');
            if (book.quantity == 1) {
            } else {
                book.quantity--;
                reduceNum.html(book.quantity);
            }
            let quantity = $('#book-' + book.id + ' #quantityInCart').html();
            // console.log(quantity);
            book.quantity = parseInt(quantity);
            localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
            
            updateCart();
            addedProducts();
        });
        
        $("#book-" + book.id + " #addItemInCart").on('click' , () => {
            // console.log(book.id);
            let addNum = $('#book-' + book.id + ' #quantityInCart');
            book.quantity++;
            addNum.html(book.quantity);
            
            let quantity = $('#book-' + book.id + ' #quantityInCart').html();
            // console.log(quantity);
            book.quantity = parseInt(quantity);
            localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
            
            updateCart();
            addedProducts();
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
            addedProducts();
        });
        
        totalPrice += parseFloat(book.price) * book.quantity;
        totalQuantity += book.quantity;
        
    });
    
    $("#total-price").html( totalPrice +" "+"kr");
    $('#items-basket').html( totalQuantity);
}

