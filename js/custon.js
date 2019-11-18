$(document).ready(function() {
    $('#searchform').submit(function(e) {
        e.preventDefault();
        alert('ok')
    });

    $.ajax({
        type: "POST",
        url: '/cart',
        data: {
            id: $("#product_id").val(),
            name: $("#product_name").val(),
            NewPrice: $("#product_NewPrice").val()

        },
        success: function(data) {
            $("#addCArt").removeClass("primary-btn").addClass("added-btn").val("Added to cart").off('click');
        },
        error: function(data) {
            console.log('error:', data);
        }
    });
});