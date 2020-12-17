$(function () {
	addedProducts();
	
	$('.continue-1').on('click', function () {
		$('#information-section').addClass('flex');
		$('#delivery-section').addClass('flex');
		$('.cart-section').addClass('opacity');
		setTimeout(function () {
			window.location.hash = '#information-section';
		}, 100);
	});
	
	$('.continue-2').on('click', () => {
		validateForm();
	});
	
	$('.continue-3').on('click', () => {
		validatePayment();
	});
	
	$('.placeOrder').on('click', () => {
		mergeLists();
		localStorage.removeItem('addedProductsList');
	});
});

function validateForm() {
	$('#information-form').validate({
		rules: {
			firstname: 'required',
			email: 'required',
			address: 'required',
			city: 'required',
			zip: 'required',
			deliveryType: 'required',
		},
		messages: {
			firstname: 'Enter First Name',
			email: 'Enter Valid Email ID',
			address: 'Enter your address',
			city: 'Enter your city',
			zip: 'Enter your zip',
			deliveryType: 'Choose a delivery',
		},
		submitHandler: function () {
			$('#payment-section').addClass('flex');
			$('#information-section').addClass('opacity');
			$('#delivery-section').addClass('opacity');
			setTimeout(function () {
				window.location.hash = '#payment-section';
			}, 100);
		},
	});
}

function validatePayment() {
	$('#payment-form').validate({
		rules: {
			paymentType: 'required',
		},
		messages: {
			paymentType: 'Choose a payment method',
		},
		submitHandler: function () {
			$('#confirmation-section').addClass('flex');
			$('#payment-section').addClass('opacity');
			setTimeout(function () {
				window.location.hash = '#confirmation-section';
			}, 100);
			orderDetailToLocalStorage();
			orderForm();
		},
	});
}

function mergeLists() {
	let orderDetailList = JSON.parse(localStorage.getItem('orderDetailList'));
	let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
	
	let merge = $.merge( $.merge( [], orderDetailList ), existingProducts );
	
	updatedOrderDetailList.push(merge);
	localStorage.setItem('updatedOrderDetailList', JSON.stringify(updatedOrderDetailList));
}

function orderDetailToLocalStorage() {
	let orderNo = Date.now();
	let name = $('#fname').val();
	let email = $('#email').val();
	let address = $('#address').val();
	let city = $('#city').val();
	let zip = $('#zip').val();
	let country = $('#country').val();
	let shipping = $('input[name="deliveryType"]:checked').val();
	let cardInfo = $('input[name="paymentType"]:checked').val();
	
	let order = new orderDetail(orderNo, name, email, address, city, zip, country, shipping, cardInfo);
	
	orderDetailList.push(order);
	localStorage.setItem('orderDetailList', JSON.stringify(orderDetailList));
}

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
		$('<p class="order-detail">' + orderNo + '</p>').appendTo('#orderNo');
		$('<p class="order-detail">' + shipping + '</p>').appendTo('#method');
		$('<p class="order-detail">' + name + '</br>' + address + ' ' + zip + '</br>' + city + ' ' + country + '</p>').appendTo('#shipTo');
		$('<p class="order-detail">' + cardInfo + '</p>').appendTo('#cardInfo');
	});
	
	let totalAmount = 0;
	let totalQty = 0;
	
	$.each(existingProducts, (i, book) => {
		let title = book.title;
		let price = "<span class='item-price'>" + '( Price: ' + parseFloat(book.price) + ' ' + 'kr )' + '</span>';
		let quantity = book.quantity;
		
		$('<p>' + title + ' x ' + quantity + price + '</p>').appendTo('#summery');
		
		totalAmount += parseFloat(book.price) * book.quantity;
		totalQty += book.quantity;
	});
	
	$('<p>' + totalAmount + ' kr' + '</p>').appendTo('#total');
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


