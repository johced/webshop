$(function () {
    let logoDiv = $('#main-logo');
    $('<a>').attr('href','index.html').attr('id','books-logo').html('BOOKS.').appendTo(logoDiv);
    
    // let mainNav = $('#main-nav');
    // let navTag = $('<nav>').addClass('navbar').appendTo(mainNav);
    // let spanTag = $('<span>').addClass('navbar-toggle').attr('id','js-navbar-toggle').appendTo(navTag);
    // $('<i>').addClass('fas fa-bars').appendTo(spanTag);
    
    // let ulTag = $('<ul>').addClass('main-nav').attr('id','js-menu').appendTo(navTag);
    // let aboutLink = $('<li>').appendTo(ulTag);
    // let productLink = $('<li>').appendTo(ulTag);
    // let contactLink = $('<li>').appendTo(ulTag);
    // let cartLink = $('<li>').appendTo(ulTag);
    
    // $('<a>').attr('href', '#').addClass('nav-links').html('About Us').appendTo(aboutLink); 
    // $('<a>').attr('href', 'html/productslist.html').addClass('nav-links').html('Products').appendTo(productLink); 
    // $('<a>').attr('href', '#').addClass('nav-links').html('Contact Us').appendTo(contactLink); 
    // let cartAnchor = $('<a>').addClass('nav-links').attr('href', '#').appendTo(cartLink)
    // $('<i>').addClass('fas fa-shopping-basket').attr('id', 'shopping-cart').appendTo(cartAnchor); 
    
    let navDivHtml = `<nav class="navbar">
    <span class="navbar-toggle" id="js-navbar-toggle">
    <i class="fas fa-bars"></i>
    </span>
    <ul class="main-nav" id="js-menu">
    <li><a href="#" class="nav-links">About Us</a></li>
    <li><a href="html/productslist.html" class="nav-links">Products</a></li>
    <li><a href="#" class="nav-links">Contact Us</a></li>
    <li><a href="#" class="nav-links"><i class="fas fa-shopping-basket" id="shopping-cart"></i></a></li>
    </ul>
    </nav>`;
    
    $("#main-nav").html(navDivHtml);
    
    $('#js-navbar-toggle').on('click', function(){
        $('#js-menu').toggleClass('active');
    }); 
});
