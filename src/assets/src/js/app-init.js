function open_popup(url) {
    var w = 880;
    var h = 570;
    var l = Math.floor((screen.width - w) / 2);
    var t = Math.floor((screen.height - h) / 2);
    var win = window.open(url, '', "scrollbars=1,width=" + w + ",height=" + h + ",top=" + t + ",left=" + l);
}
function delImg(id) {
    $('#' + id).val('');
}

window.onload = function () {
//    $(".dropdown").hover(function () {
//        $(this).addClass("open");
//    }, function () {
//        $(this).removeClass("open");
//    });
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({
        html: true
    });
    $(".nano").nanoScroller();
    $("input.touch-spin").TouchSpin({
        verticalbuttons: true,
        verticalupclass: 'glyphicon glyphicon-plus',
        verticaldownclass: 'glyphicon glyphicon-minus'
    });
    
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    ko.applyBindings();
};
