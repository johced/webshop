$(function () {
	displayObjectFromLS();
});
function displayObjectFromLS() {
	let productDetailObjectAsTextFromLS = sessionStorage.getItem('productDetailObject');
	let productDetailObjectFromLS = JSON.parse(productDetailObjectAsTextFromLS);
	// START - TESTING TO CREATE VARIABLES INSTEAD
	let container = document.getElementById('main-area');
	//$.each(productDetailObjectFromLS, (i, book) => {
	for (let i = 0; i < productDetailObjectFromLS.length; i++) {
		let divContainer = document.createElement('div');
		divContainer.id = 'productlistBoxDetail';
		let divInnerContainer = document.createElement('div');
		divInnerContainer.id = 'productLeft';
		let imageOfProduct = document.createElement('img');
		imageOfProduct.setAttribute('src', productDetailObjectFromLS[i].poster);
		let textOfTitle = document.createElement('h3');
		textOfTitle.innerText = productDetailObjectFromLS[i].title;
		let textOfPrice = document.createElement('p');
		textOfPrice.innerText = productDetailObjectFromLS[i].price;
		let divOfQuantity = document.createElement('div');
		divOfQuantity.id = 'quantityBox';
		let imageOfRemoveItem = document.createElement('i');
		imageOfRemoveItem.className = 'fas fa-minus-circle';
		imageOfRemoveItem.id = 'removeItem';
		imageOfRemoveItem.addEventListener('click', () => {
			reduceItem(productDetailObjectFromLS[i]);
		});
		let textOfQuantity = document.createElement('p');
		textOfQuantity.id = 'quantity';
		textOfQuantity.innerText = productDetailObjectFromLS[i].quantity;
		let imageOfAddItem = document.createElement('i');
		imageOfAddItem.className = 'fas fa-plus-circle';
		imageOfAddItem.id = 'addItem';
		imageOfAddItem.addEventListener('click', () => {
			addItem(productDetailObjectFromLS[i]);
		});
		let addButton = document.createElement('button');
		addButton.id = 'addButton';
		addButton.setAttribute('aria-label', 'add button');
		addButton.innerText = 'Add';
		// Add eventlistener create function
		let divOfDescription = document.createElement('div');
		divOfDescription.id = 'productDescription';
		let textOfDescription = document.createElement('h5');
		textOfDescription.innerText = productDetailObjectFromLS[i].description;
		container.appendChild(divContainer);
		divContainer.appendChild(divInnerContainer);
		divInnerContainer.appendChild(imageOfProduct);
		divInnerContainer.appendChild(textOfTitle);
		divInnerContainer.appendChild(textOfPrice);
		divInnerContainer.appendChild(divOfQuantity);
		divOfQuantity.appendChild(imageOfRemoveItem);
		divOfQuantity.appendChild(textOfQuantity);
		divOfQuantity.appendChild(imageOfAddItem);
		divInnerContainer.appendChild(addButton);
		divContainer.appendChild(divOfDescription);
		divOfDescription.appendChild(textOfDescription);
	}
	$('#addButton').on('click', () => {
		let existingProducts = JSON.parse(localStorage.getItem('addedProductsList'));
		if (existingProducts == null) {
			existingProducts = [];
		}
		let i = 0;
		let item = new AddedProduct(productDetailObjectFromLS[i].title, productDetailObjectFromLS[i].price, productDetailObjectFromLS[i].quantity, productDetailObjectFromLS[i].id);
		
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
		
		updateCart();
		
	});
	
	
	function reduceItem(item) {
		let reduce = document.getElementById('quantity');
		if (item.quantity == 1) {
		} else {
			item.quantity--;
			reduce.innerText = item.quantity;
		}
	}
	function addItem(item) {
		let add = document.getElementById('quantity');
		item.quantity++;
		add.innerText = item.quantity;
	}
	
}



