$(function () {
    let logoDiv = $('#main-logo');
    $('<a>').attr('href','../index.html').attr('id','books-logo').html('BOOKS.').appendTo(logoDiv);
    
    let mainNav = $('#main-nav');
    let navTag = $('<nav>').addClass('active').attr('id', 'desktop-only').appendTo(mainNav);
    
    let ulTag = $('<ul>').appendTo(navTag);
    let aboutLink = $('<li>').appendTo(ulTag);
    let productLink = $('<li>').appendTo(ulTag);
    let contactLink = $('<li>').appendTo(ulTag);
    let cartLink = $('<li>').appendTo(ulTag);
    
    $('<a>').attr('href', '#').html('About Us').appendTo(aboutLink); 
    $('<a>').attr('href', '../html/productslist.html').html('Products').appendTo(productLink); 
    $('<a>').attr('href', '#').html('Contact Us').appendTo(contactLink); 
    let cartAnchor = $('<a>').attr('href', '../html/checkout.html').appendTo(cartLink)
    $('<i>').addClass('fas fa-shopping-basket').attr('id', 'shopping-cart').appendTo(cartAnchor); 

    let divTag = $('<div>').addClass('menu-toggle').appendTo(mainNav);
    $('<i>').addClass('fas fa-bars').appendTo(divTag);
    
    // let navDivHtml = `<nav class="active" id="desktop-only">
    // <ul>
    // <li><a href="#">About Us</a></li>
    // <li><a href="html/productslist.html">Products</a></li>
    // <li><a href="#">Contact Us</a></li>
    // <li><a href="#"><i class="fas fa-shopping-basket" id="shopping-cart"></i></a></li>
    // </ul>
    // </nav>
    // <div class="menu-toggle">
    // <i class="fas fa-bars"></i>
    // </div>`;
    
    // $("#main-nav").html(navDivHtml);
    
    $('.menu-toggle').on('click', function(){
        $('nav').toggleClass('active');
    });
});
