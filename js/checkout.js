$(function () {
	let addedProductsFromLS = JSON.parse(localStorage.getItem('addedProductsList'));

	$.each(addedProductsFromLS, (i, product) => {
		$('<div>')
			.attr('id', 'checkoutItem')
			.html('<p>' + product.title + ' ' + '<div id="addedProductQuantity">' + ' <i class="fas fa-minus-circle" id="removeItem"></i> ' + product.quantity + ' <i class="fas fa-plus-circle" id="addItem"></i></div> ' + '<p>' + '</div>')
			.appendTo($('#checkoutBox'));
	});
});
