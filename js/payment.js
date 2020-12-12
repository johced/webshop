$(function () {
    let checkoutHtml = `<div class="cart-section">
    <ol id="added-products"></ol>
    <div class="total-amount">
    <p>Total: </p>
    <p id="total-amount"></p>
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

