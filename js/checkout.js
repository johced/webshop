$(function () {
	let addedProductsFromLS = JSON.parse(localStorage.getItem('addedProductsList'));

	$.each(addedProductsFromLS, (i, book) => {
		$('<div>')
			.attr('id', 'checkoutItem')
			.html(
				'<p>' + book.title + ' ' + '<div id="addedProductQuantity">' + '<i class="fas fa-minus-circle" id="removeItem"></i> ' + '<p id="quantity">' + book.quantity + '</p>' + '<i class="fas fa-plus-circle" id="addItem"></i></div> ' + '<p>' + '</div>'
			)
			.appendTo($('#checkoutBox'));

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
	});

	// Calqulate total cost
	let totalCost = 0;

	$.each(addedProductsFromLS, (i, test) => {
		totalCost += test.totalCost + test.price * test.quantity;
	});

	console.log(totalCost);
	// END Calqulate total cost

	// Present to browser
	$('<div>')
		.attr('id', 'totalCost')
		.html('<p>' + 'Totalt att betala: ' + totalCost + '</p>')
		.appendTo($('#checkoutBox'));

	$('<div>')
		.attr('id', 'checkoutButtons')
		.html('<button type="button" id="leftBuyBtn" alt="button">' + 'Buy' + '</button>' + '<button type="button" id="rightContinueBtn" alt="button">' + 'Continue shopping' + '</button>')
		.appendTo($('#checkoutBox'));
	// END Present to browser

	$('#rightContinueBtn').on('click', () => {
		window.location.assign('productslist.html');
	});
});
