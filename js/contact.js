$(function () {
    let contactDivHtml = `
    <div id="contact-header">
    <img id="contact-image" src="../images/contact.jpg" alt="image with contact icons"/>
    </div>
    <div id="address" class="contact-contents">
    <i class="fas fa-map-marker-alt contact-icons"></i>
    <h3 class="contact-method">
    ADRESS
    </h3>
    <p class="contact-text"><b>BOOKS.</b></br>
    Gustavslundsvägen 151 D</br>
    167 51 Bromma
    </p>
    </div>
    <div id="phone" class="contact-contents">
    <i class="fas fa-mobile-alt contact-icons"></i>
    <h3 class="contact-method">
    PHONE
    </h3>
    <p class="contact-text">08-123-456-78<br/>
    Operating Hours:<br/>
    <b>Mon - Fri:</b> 9am - 6pm</p>
    </div>
    <div id="email" class="contact-contents">
    <i class="fas fa-envelope-open-text contact-icons"></i>
    <h3 class="contact-method">
    EMAIL
    </h3>
    <p class="contact-text"><a href="#">Click here</a> to email<br/>
    BOOKS. customer service<br/>
    <a href="#">info@books.se</a></p>
    </div>`
    
    $('#main-area').html(contactDivHtml);
    
});
