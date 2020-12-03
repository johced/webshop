class Product {
	constructor(image, price, shortDescription, largeDescription, orderid, addedProduct) {
		this.image = image;
		this.price = price;
		this.shortDescription = shortDescription;
		this.largeDescription = largeDescription;
		this.orderid = orderid;
		this.addedProduct = addedProduct;
	}
}

// addedProduct arg. = if true = show in addedProductsList.

let productsList = [];
let addedProductsList = [];

$(function () {
	$('#main-nav').addClass('nav');
	$('#main-area').addClass('main');
	$('#main-footer').addClass('footer');
	$('#main-logo').addClass('logo');
});
