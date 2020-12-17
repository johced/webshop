$(function () {
	let logoDiv = $('#main-logo');
	$('<a>').attr('href', '../index.html').attr('id', 'books-logo').html('BOOKS.').appendTo(logoDiv);
	
	createNavDiv();
	
	$('#cart-items').hide();

	$('.menu-toggle').on('click', function () {
		$('nav').toggleClass('active');
		$('#cart-items').slideUp();
	});
	
	$('.cart').on('click', function () {
		$('nav').removeClass('active');
		$('#cart-items').slideToggle();
	});
	
	$('.close').on('click', function () {
		$('#cart-items').slideUp();
	});
	
	updateCart();
});

function updateCart() {
	let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
	
	$('#list-item').html('');
	
	let totalPrice = 0;
	let totalQuantity = 0;
	
	$.each(existingProducts, (i, book) => {
		let title = book.title;
		let removeBtn = "<i class='fas fa-trash-alt remove'></i>";
		let price = "<span class='eachPrice'>" + parseFloat(book.price) + ' ' + 'kr' + '</span>';
		let quantity = book.quantity;
		
		$('<li id="book-' + book.id + '">' + ' ' + title + ' ' +
		price + removeBtn + '<div id="quantityBox">' + '<i class="fas fa-minus-circle" id="removeItemInCart"></i>' +
		'<p id="quantityInCart">' + quantity + '</p>' + '<i class="fas fa-plus-circle" id="addItemInCart"></i>' +
		'</div>' + '</li>').appendTo('#list-item');
		
		$('#book-' + book.id + ' #removeItemInCart').on('click', () => {
			let reduceNum = $('#book-' + book.id + ' #quantityInCart');
			if (book.quantity == 1) {
			} else {
				book.quantity--;
				reduceNum.html(book.quantity);
			}
			let quantity = reduceNum.html();
			
			book.quantity = parseInt(quantity);
			localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
			
			updateCart();
			addedProducts();
		});
		
		$('#book-' + book.id + ' #addItemInCart').on('click', () => {
			let addNum = $('#book-' + book.id + ' #quantityInCart');
			book.quantity++;
			addNum.html(book.quantity);
			
			let quantity = addNum.html();
			
			book.quantity = parseInt(quantity);
			localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
			
			updateCart();
			addedProducts();
		});
		
		$('#book-' + book.id + ' .remove').on('click', function () {
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
	
	$('#total-price').html(totalPrice + ' ' + 'kr');
	$('#items-basket').html(totalQuantity);
}

function addedProducts() {
	let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
	
	$('#added-products').html('');
	
	let totalAmount = 0;
	let totalQty = 0;
	
	$.each(existingProducts, (i, book) => {
		let title = book.title;
		let removeBtn = "<i class='fas fa-trash-alt removeBook'></i>";
		let price = "<span class='item-price'>" + '( Price: ' + parseFloat(book.price) + ' ' + 'kr )' + '</span>';
		let quantity = book.quantity;
		
		$('<li id="book-' + book.id + book.price + '">' + ' ' + title + ' ' + price + removeBtn +
		'<div id="quantityBox">' + '<i class="fas fa-minus-circle" id="removeItemCheckout"></i>' +
		'<p id="quantityInCheckout">' + quantity + '</p>' + '<i class="fas fa-plus-circle" id="addItemCheckout"></i>' +
		'</div>' + '</li>').appendTo('#added-products');
		
		$('#book-' + book.id + book.price + ' #removeItemCheckout').on('click', () => {
			let reduceNum = $('#book-' + book.id + book.price + ' #quantityInCheckout');
			if (book.quantity == 1) {
			} else {
				book.quantity--;
				reduceNum.html(book.quantity);
			}
			let quantity = reduceNum.html();
			book.quantity = parseInt(quantity);
			localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
			
			updateCart();
			addedProducts();
		});
		
		$('#book-' + book.id + book.price + ' #addItemCheckout').on('click', () => {
			let addNum = $('#book-' + book.id + book.price + ' #quantityInCheckout');
			book.quantity++;
			addNum.html(book.quantity);
			
			let quantity = addNum.html();
			book.quantity = parseInt(quantity);
			localStorage.setItem('addedProductsList', JSON.stringify(existingProducts));
			
			updateCart();
			addedProducts();
		});
		
		$('#book-' + book.id + book.price + ' .removeBook').on('click', function () {
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
		
		totalAmount += parseFloat(book.price) * book.quantity;
		totalQty += book.quantity;
	});
	
	$('#total-amount').html(totalAmount + ' ' + 'kr');
}

function createNavDiv() {
	let navDivHtml = `<nav id="desktop-only">
	<ul>
	<li><a href="../html/about.html">About us</a></li>
	<li><a href="../html/productslist.html">Products</a></li>
	<li><a href="../html/contact.html">Contact Us</a></li>
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
}