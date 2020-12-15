$(function () {
    let checkoutHtml = `<div class="checkout">
    <div class="cart-section">
    <h3 id="header">1. Shopping cart</h3>
    <ol id="added-products"></ol>
    <div class="total-amount">
    <p>Total: </p>
    <p id="total-amount"></p>
    </div>
    <button class="continue-1">Continue</button>
    </div>
    
    <div id="information-section" class="checkout-section">
    <h3 id="header">2.Shipping address</h3>
    <label for="name"> Full Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Kalle Anka">
    <label for="email"> Email</label>
    <input type="text" id="email" name="email" placeholder="kalleAnka@example.com">
    <label for="address"> Address</label>
    <input type="text" id="address" name="address" placeholder="Gustavslundsvägen 151 D">
    <label for="city"> City</label>
    <input type="text" id="city" name="city" placeholder="Bromma">
    <label for="zip">Zip</label>
    <input type="text" id="zip" name="zip" placeholder="10001">
    <label for="country">Country</label>
    <select id="country" name="country">
    <option value="Sweden">Sweden</option>
    </select>
    </div>
    
    <div id="delivery-section" class="checkout-section">
    <h3 id="header">3.Shipping Method</h3>
    <p>Delivery</p>
    <div>
    <input type="radio" id="standard" name="deliveryType" value="Standard delivery 4-7 Bussiness Days">
    <label for="standard">Standard 4-7 Bussiness Days - Free </label><br>
    <input type="radio" id="express" name="deliveryType" value="Express delivery 2-3 Bussiness Days">
    <label for="express">Express 2-3 Bussiness Days - Free </label><br>
    </div>
    <button class="continue-2">Continue</button>
    </div>
    
    <div id="payment-section" class="checkout-section">  
    <h3 id="header">4.Payment Details</h3>
    <div>
    <input type="radio" id="card" name="card" value="Credit Card">
    <label for="card">Credit Card</label>
    </div>
    <div class="icon-container">
    <i class="fa fa-cc-visa"></i>
    <i class="fa fa-cc-mastercard"></i>
    </div>
    <label for="cardname">Name on Card</label>
    <input type="text" id="cardname" name="cardname" placeholder="Kalle Anka">
    <label for="cardnum">Credit card number</label>
    <input type="text" id="cardnum" name="cardnumber" placeholder="****-****-****-****">
    <label for="expmonth">Exp Month</label>
    <input type="text" id="expmonth" name="expmonth" placeholder="December">
    <label for="expyear">Exp Year</label>
    <input type="text" id="expyear" name="expyear" placeholder="2020">
    <label for="cvc">CVC</label>
    <input type="text" id="cvc" name="cvc" placeholder="***">
    <button class="continue-3">Continue</button>
    </div>
    
    <div id="confirmation-section" class="checkout-section">
    <h3 id="header">5.Place Order</h3>
    <div class="confirm">
    <div id="orderNo">
    <h5 class="order-form">Order No.</h5>
    </div>
    <div id="method">
    <h5 class="order-form">Shipping method</h5>
    </div>
    <div id="shipTo">
    <h5 class="order-form">Ship To</h5>
    </div>
    <div id="cardInfo">
    <h5 class="order-form">Payment</h5>
    </div>
    <div id="summery">
    <h5 class="order-form">Order Summery</h5>
    </div>
    <div id="total">
    <h5 class="order-form">Total price</h5>
    </div>
    </div>
    <div id="term">
    <input type="checkbox" id="term" name="term" value="term">
    <label for="termOfSale">I have read, understood and agree to the Term of Sale</label><br>
    <input type="checkbox" id="offer" name="offer" value="offer">
    <label for="offer">Sign up to receive emails to be the first to know about the latest books, offers and events from BOOKS. By ticking the box and clicking 'Place Order' below upon your purchase history, website browsing and any email preferences that you provide Your personal data is cllected and handled by BOOKS. Once BOOKS has confirmed acceptance of your order, payment will be taken for the item(s) ordered.</label><br>
    </div>
    <button class="placeOrder"><a href="../html/successfulorder.html">Place Order</a></button>
    </div>
    </div>`
    
    $('#main-area').html(checkoutHtml);
    $('input').prop('required', true);
    
    addedProducts();
    
    $('.continue-1').on('click', function(e) {        
        $('#information-section').addClass('flex');
        $('#delivery-section').addClass('flex');
        $('.cart-section').addClass('opacity');
        setTimeout( function() {
            window.location.hash = "#information-section"
        }, 100);
    });
    
    $('.continue-2').on('click', () => {
        $('#payment-section').addClass('flex');
        $('#information-section').addClass('opacity');
        $('#delivery-section').addClass('opacity');
        setTimeout( function() {
            window.location.hash = "#payment-section"
        }, 100);
        
        
    });
    
    $('.continue-3').on('click', () => {
        $('#confirmation-section').addClass('flex');
        $('#payment-section').addClass('opacity');
        setTimeout( function() {
            window.location.hash = "#confirmation-section"
        }, 100);
        let orderNo = Date.now();
        let name = $('#fname').val();
        let email = $('#email').val();
        let address = $('#address').val();
        let city = $('#city').val();
        let zip = $('#zip').val();
        let country = $('#country').val();
        let shipping = $("input[name='deliveryType']:checked").val();
        let cardInfo = $("input[name='card']:checked").val();
        
        let order = new orderDetail(orderNo, name, email, address, city, zip, country, shipping, cardInfo);
        console.log(order);
        
        orderDetailList.push(order);
        localStorage.setItem('orderDetailList', JSON.stringify(orderDetailList));
        
        orderForm();
    });
    
    $('.placeOrder').on('click', () => {
        localStorage.removeItem('addedProductsList');
    });
    
    
});
function orderForm() {
    let orderDetailList = JSON.parse(localStorage.getItem('orderDetailList'));
    let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
    
    $.each(orderDetailList, (i, order) => {
        let orderNo = order.orderNo;
        let name = order.name;
        let address = order.address;
        let city = order.city;
        let zip = order.zip;
        let country = order.country;
        let shipping = order.shipping;
        let cardInfo = order.cardInfo;
        $('<p class="order-detail">' + orderNo + '</p>').appendTo("#orderNo");
        $('<p class="order-detail">' + shipping + '</p>').appendTo("#method");
        $('<p class="order-detail">' + name + '</br>' 
        + address +" "+ zip + '</br>' 
        + city +" "+ country + '</p>').appendTo("#shipTo");
        $('<p class="order-detail">' + cardInfo + '</p>').appendTo("#cardInfo");
    });
    let totalAmount = 0;
    let totalQty = 0;
    
    $.each(existingProducts, (i, book) => {
        let title = book.title;
        let price = "<span class='item-price'>" + "( Price: " + (parseFloat(book.price)) +" "+"kr )"+ "</span>";
        let quantity = book.quantity;
        
        $('<p>' + title +"   x   " + quantity + price +  '</p>').appendTo('#summery');
        
        totalAmount+= parseFloat(book.price) * book.quantity;
        totalQty += book.quantity;	
    });
    
    $('<p>'+ totalAmount + " kr" +'</p>').appendTo('#total');
}


function addedProducts() {
    let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
    
    $('#added-products').html("");
    let totalAmount = 0;
    let totalQty = 0;
    
    $.each(existingProducts, (i, book) => {
        let title = book.title;
        let removeBtn = "<i class='fas fa-trash-alt removeBook'></i>";
        let price = "<span class='item-price'>" + "( Price: " + (parseFloat(book.price)) +" "+"kr )"+ "</span>";
        let quantity = book.quantity;
        // let updateBtn = "<button class='update'>Update</button>";
        $('<li id="book-'+ book.id + book.price +'">'+" "+ title +" "+ price + removeBtn + '<div id="quantityBox">' +
        '<i class="fas fa-minus-circle" id="removeItemCheckout"></i>' +
        '<p id="quantityInCheckout">' + quantity +'</p>' +
        '<i class="fas fa-plus-circle" id="addItemCheckout"></i>' + 
        '</div>' +  "</li>").appendTo('#added-products');	
        
        
        $("#book-" + book.id + book.price + " #removeItemCheckout").on('click', () => {
            let reduceNum = $('#book-' + book.id + book.price + ' #quantityInCheckout');
            if (book.quantity == 1) {
            } else {
                book.quantity--;
                reduceNum.html(book.quantity);
            }
            let quantity = $('#book-' + book.id + book.price + ' #quantityInCheckout').html();
            book.quantity = parseInt(quantity);
            localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
            
            updateCart();
            addedProducts();
        });
        
        $("#book-" + book.id + book.price + " #addItemCheckout").on('click' , () => {
            let addNum = $('#book-' + book.id + book.price + ' #quantityInCheckout');
            book.quantity++;
            addNum.html(book.quantity);
            
            let quantity = $('#book-' + book.id + book.price +  ' #quantityInCheckout').html();
            book.quantity = parseInt(quantity);
            localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
            
            updateCart();
            addedProducts();
        });
        
        
        $("#book-" + book.id + book.price + " .removeBook").on('click', function () {
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
        
        
        totalAmount+= parseFloat(book.price) * book.quantity;
        totalQty += book.quantity;
        
    });
    
    $("#total-amount").html( totalAmount +" "+"kr");
}

