window.onload = function(){
    $( ".dropdown" ).hover(function() {
        $( this ).addClass( "open" );
    }, function() {
        $( this ).removeClass( "open" );
    });
    $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
    $('[data-toggle="popover"]').popover({html: true});
    $(".nano").nanoScroller();
    $("input.touch-spin").TouchSpin({
        verticalbuttons: true,
        verticalupclass: 'glyphicon glyphicon-plus',
        verticaldownclass: 'glyphicon glyphicon-minus'
    });
    
    ko.applyBindings();
};
