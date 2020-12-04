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

let addedProductsList = [];

let productsList = [
	{
		poster: '/images/products/julafton-pa-den-lilla-on-i-havet.jpeg',
		title: 'Julafton på den lilla ön i havet',
		author: 'Jenny Colgan',
		price: '299kr',
		description: 'Följ med till ett vackert nordligt hörn av världen, till gemenskapen på Mure, och upplev en höglandsjul du sent kommer att glömma!',
	},
	{
		poster: '/images/products/absolute-freebsd.jpeg',
		title: 'Absolute freebsd',
		author: 'Michael W Lucas',
		price: '559kr',
		description: "FreeBSD is the muscle behind companies like Netflix and EMC. Any place where someone does heavy lifting on the Internet, you'll find FreeBSD. ",
	},
	{
		poster: '/images/products/jag-kan-ha-fel-och-andra-visdomar-fran-mitt-liv-som-buddhistmunk.jpeg',
		title: 'Jag kan ha fel...',
		author: 'Björn Lindeblad & Co',
		price: '269kr',
		description: 'Boken är skriven i nära samarbete med Björns två vänner och kolleger Caroline Bankler och Navid Modiri.',
	},
	{
		poster: '/images/products/javascript-the-definitive-guide.jpeg',
		title: 'Javascript the definitive guide',
		author: 'David Flanagan',
		price: '579kr',
		description: 'JavaScript is the programming language of the web and is used by more software developers today than any other programming language.',
	},
	{
		poster: '/images/products/jul-i-stallet.jpeg',
		title: 'Jul i stallet',
		author: 'Astrid Lindgren',
		price: '169kr',
		description: 'Mästerligt illustrerad av Lars Klinting som skapat en svit vidunderligt vackra, tidlösa bilder i vintrig miljö.',
	},
	{
		poster: '/images/products/jul-igen-pa-monsterhotellet.jpeg',
		title: 'Jul igen på monsterhotellet',
		author: 'Anna Hansson',
		price: '319kr',
		description: 'Jul igen på Monsterhotellet är den tionde boken om varulvarna på Monsterhotellet.',
	},
	{
		poster: '/images/products/spegelmannen.jpeg',
		title: 'Spegelmannen',
		author: 'Lars Kepler',
		price: '249kr',
		description: 'Spegelmannen är den åttonde boken med Joona Linna.',
	},
	{
		poster: '/images/products/stormvakt.jpeg',
		title: 'Stormvakt',
		author: 'Kristina Ohlsson',
		price: '199kr',
		description: 'Efter en räcka framgångsrika spänningsromaner startar Kristina Ohlsson med ”Stormvakt” en ny deckarserie om den stillsamme före detta finansmannen August Strindberg.',
	},
	{
		poster: '/images/products/vi-har-sa-roligt-nar-det-ar-jul-astrid-lindgrens-basta-julberattelser.jpeg',
		title: 'Vi har så roligt när det är jul',
		author: 'Astrid Lindgren',
		price: '329kr',
		description: 'Den perfekta julklappen som räcker hela jullovet!',
	},
	{
		poster: '/images/products/guinness-world-records-2021.jpeg',
		title: 'Guiness world records 2021',
		author: 'Ltd Guinness World Records',
		price: '199kr',
		description: 'Välkommen till Guinness World Records 2021!',
	},
];

$(function () {
	$('#main-nav').addClass('nav');
	$('#main-area').addClass('main');
	$('#main-footer').addClass('footer');
	$('#main-logo').addClass('logo');
});
