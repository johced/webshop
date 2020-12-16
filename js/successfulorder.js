$(function () {
    
    let orderDetailList = JSON.parse(localStorage.getItem("orderDetailList"));
    $.each(orderDetailList, (i, o) => {
        let orderNo = o.orderNo;
        let name = o.name;
        let successDiv = $("<div>").addClass("successorder");
        let button = $("<button></button>");
        $("<h2> Successful order! </h2>").appendTo(successDiv);
        $("<p> Thank you " + name + " for choosing us!</p>").appendTo(successDiv)
        $("<p>Your ordernumber is: #" + orderNo + "</p>").appendTo(successDiv);
        $("<p>If there is any problem, please don't hesitate to <a href = '../html/contact.html'>contact us.</a></p>").appendTo(successDiv);
        $("<a>").attr('href','../html/productslist.html').attr("id", "continueShpLink").html("Continue shopping").appendTo(button);
        successDiv.appendTo($("#main-area"));
        button.appendTo($(successDiv));
    });
    localStorage.removeItem('orderDetailList');

});