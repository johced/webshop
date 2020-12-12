$(function () {
    let checkoutHtml = `
    <div class="checkout">
    <div class="cart-section">
    <h3 id="header">1. Shopping cart</h3>
    <ol id="added-products"></ol>
    <div class="total-amount">
    <p>Total: </p>
    <p id="total-amount"></p>
    </div>
    <button class=continue>Continue</button>
    </div>
    
    <div class="information-section">
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
    <option value="sweden">Sweden</option>
    </select>
    </div>
    <div class="delivery-section">
    <h3 id="header">3.Shipping Method</h3>
    <p>Delivery</p>
    <div>
    <input type="radio" id="standard" name="deliveryType" value="standard">
    <label for="standard">Standard 4-7 Bussiness Days - Free</label><br>
    <input type="radio" id="express" name="deliveryType" value="express">
    <label for="express">Express 2-3 Bussiness Days - 99 kr</label><br>
    </div>
    <button class=continue>Continue</button>
    </div>
    
    <div class="payment-section">  
    <h3 id="header">4.Payment Details</h3>
    <label for="fname">Accepted Cards</label>
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
    <button class=continue>Continue</button>
    </div>
    
    <div class="confirmation-section">
    <h3 id="header">5.Place Order</h3>
    <div class="confirm">
    <h5>Shipping method</h5>
    <h5>Ship To</h5>
    <h5>Payment</h5>
    <h5>Order Summeary</h5>
    </div>
    <div>
    <input type="checkbox" id="term" name="term" value="term">
    <label for="termOfSale">I have read, understood and agree to the Term of Sale</label><br>
    <input type="checkbox" id="offer" name="offer" value="offer">
    <label for="offer">Sign up to receive emails to be the first to know about the latest books, offers and events from BOOKS. By ticking the box and clicking 'Place Order' below upon your purchase history, website browsing and any email preferences that you provide Your personal data is cllected and handled by BOOKS. Once BOOKS has confirmed acceptance of your order, payment will be taken for the item(s) ordered.</label><br>
    </div>
    <button class="placeOrder">Place Order</button>
    </div>
    </div>
    `
    $('#main-area').html(checkoutHtml);
    
    addedProducts();
});


function addedProducts() {
    let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
    
    $('#added-products').html("");
    let totalAmount = 0;
    
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
        let totalQty = 0;
        
        totalAmount+= parseFloat(book.price) * book.quantity;
        totalQty += book.quantity;
        
    });
    
    $("#total-amount").html( totalAmount +" "+"kr");
}

