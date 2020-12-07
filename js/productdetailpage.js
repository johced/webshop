$(function () {
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
					'<button type="button" id="buyButton" alt="button">' +
					'Köp' +
					'</button></div>' +
					'<div id="productDescription"><h5>' +
					book.description +
					'</h5></div>'
			)
			.appendTo($('#main-area'));

		$('#buyButton').on('click', { book: book }, () => {
			console.log(book);
		});
	});
});
