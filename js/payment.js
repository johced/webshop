$(function () {
 
    let checkoutHtml = `<div>
    <ol id="added-products"></ol>
    </div>
    
    `
    $('#main-area').html(checkoutHtml);

   addedProducts();
});


function addedProducts() {
    let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
    
    $('#added-products').html("");
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
        '</div>' +  "</li>").appendTo('#added-products');	
        
      
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
    
    $("#total-price").html( totalPrice +" "+"kr");
    $('#items-basket').html( totalQuantity);
}

