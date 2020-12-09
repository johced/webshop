$(function () {
	displayObjectFromLS();
});
function displayObjectFromLS() {
	let productDetailObjectAsTextFromLS = sessionStorage.getItem('productDetailObject');
	let productDetailObjectFromLS = JSON.parse(productDetailObjectAsTextFromLS);
	$.each(productDetailObjectFromLS, (i, book) => {
		$('<div>')
		.attr('id', 'productlistBoxDetail')
		.html(
			'<div id="productLeft"><img src="' +
			book.poster +
			'">' +
			'<h3>' +
			book.title +
			'</h3>' +
			'<p>' +
			book.price +
			'</p>' +
			'<div id="quantityBox">' +
			'<i class="fas fa-minus-circle" id="removeItem"></i>' +
			'<p id="quantity">' +
			book.quantity +
			'</p>' +
			'<i class="fas fa-plus-circle" id="addItem"></i>' +
			'</div>' +
			'<button type="button" id="buyButton" alt="button">' +
			'Add' +
			'</button>' +
			'</div>' +
			'<div id="productDescription"><h5>' +
			book.description +
			'</h5></div>'
			)
			.appendTo($('#main-area'));
			
			$('#removeItem').on('click', { book: book }, () => {
				if (book.quantity == 1) {
				} else {
					book.quantity--;
					$('#quantity').html(book.quantity);
				}
			});
			
			$('#addItem').on('click', { book: book }, () => {
				book.quantity++;
				$('#quantity').html(book.quantity);
			});
			
			$('#buyButton').on('click', { book: book }, () => {
				let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
				if (existingProducts == null) {
					existingProducts = [];
				}
				let item = new AddedProduct(book.title, book.price, book.quantity, book.id);
				
				let index = 0;
				let productInCart = false;
				$.each(existingProducts, (i, product) => {
					if (product.id == item.id) {
						productInCart = true;
						index = i;
					}
				});
				
				if (productInCart === true) {
					existingProducts.splice(index, 1);
				}
				
				existingProducts.push(item);
				
				localStorage.setItem('addedProductsList', JSON.stringify(addedProductsList));
				localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
				
				let title = book.title;
				let removeBtn = "<button class='remove'> X </button>";
				let price = "<span class='eachPrice'>" + (parseFloat(book.price)) + "</span>";
				let quantity = book.quantity;
				$('<li>'+" "+ title +" "+ "<b>" + price +"kr" + "</b>"+ '<div id="quantityBox">' +
				'<i class="fas fa-minus-circle" id="removeItemInCart"></i>' +
				'<p id="quantity">' + quantity +'</p>' +
				'<i class="fas fa-plus-circle" id="addItemInCart"></i>' +
				'</div>' + removeBtn + "</li>").appendTo('#list-item');
				
				
				$('#removeItemInCart').on('click', { book: book }, () => {
					if (book.quantity == 1) {
					} else {
						book.quantity--;
						$('#quantity').html(book.quantity);
					}
				});
				
				$('#addItemInCart').on('click', { book: book }, () => {
					book.quantity++;
					$('#quantity').html(book.quantity);
				});
				
				
				$("#items-basket").html("(" + book.quantity + ")");
				
				let totalPrice = 0;
				$(".eachPrice").each(function (){ 
					let eachPrice = parseFloat(book.price) * book.quantity;
					totalPrice += eachPrice;
				});
				
				$("#total-price").html("<b>"+ totalPrice +" "+"kr" +"</b>");
				
				
				$(".remove").on("click", function () {
					$(this).parent().remove();
					
					$("#items-basket").html("(" + ($("#list-item").children().length) + ")");
					
					let totalPrice = 0;
					$(".eachPrice").each(function (){ 
						let eachPrice = parseFloat(book.price) * book.quantity;
						totalPrice += eachPrice;
					});
					
					$("#total-price").html("<b>"+ totalPrice +" "+"kr" +"</b>");
					
				});
			});
		});
	}
	
	