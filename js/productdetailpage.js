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
				$('#productLeft').each(function () {
					let title = book.title;
					let removeBtn = "<button class='remove'> X </button>";
					let price = "<span class='eachPrice'>" + (parseFloat(book.price)) + "</span>";
					$('<li>'+" "+ title +" "+ "<b>" + price +"kr" + "</b>"+ removeBtn + "</li>").appendTo('#list-item');
				});
				
				$("#items-basket").html("(" + ($("#list-item").children().length) + ")");
				
				let totalPrice = 0;
				$(".eachPrice").each(function (){ 
					let eachPrice = parseFloat(book.price);
					totalPrice += eachPrice;
				});
				
				$("#total-price").html("<b>"+ totalPrice +" "+"kr" +"</b>");
				
				
				$(".remove").on("click", function () {
					$(this).parent().remove();
					
					$("#items-basket").html("(" + ($("#list-item").children().length) + ")");
					
					let totalPrice = 0;
					$(".eachPrice").each(function (){ 
						let eachPrice = parseFloat(book.price);
						totalPrice += eachPrice;
					});
					
					$("#total-price").html("<b>"+ totalPrice +" "+"kr" +"</b>");
					
				});
			});
		});
	});
	
	