$(function () {
	$.each(productsList, (i, book) => {
		$('<div>')
			.attr('id', 'productlistBox')
			.html('<img src="' + book.poster + '">' + '<h3>' + book.title + '</h3>' + '<p>' + book.price +" kr" + '</p>' + '<button type="button" alt="button">' + 'Läs mer!' + '</button>')
			.on('click', { book: book }, handleBookClick)
			.appendTo($('#main-area'));
	});
});

function handleBookClick(book) {
	book.data.book.clicked = !book.data.book.clicked;

	if (book.data.book.clicked == true) {
		productDetailObject.push(book.data.book);

		let productDetailObjectAsText = JSON.stringify(productDetailObject);
		sessionStorage.setItem('productDetailObject', productDetailObjectAsText);

		window.location.assign('productdetailpage.html');
	}
}
