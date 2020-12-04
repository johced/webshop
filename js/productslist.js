$(function () {
	$.each(productsList, (i, book) => {
		$('<div>')
			.attr('id', 'productlistBox')
			.html('<img src="' + book.poster + '">' + '<h3>' + book.title + '</h3>' + '<p>' + book.price + '</p>' + '<button type="button" alt="button">' + 'Läs mer!' + '</button>')
			.on('click', { book: book }, handleBookClick)
			.appendTo($('#main-area'));
	});
});

function handleBookClick(e) {
	console.log(e.data.book);
}
