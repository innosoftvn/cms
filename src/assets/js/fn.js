function formValidate(id) {
    var validate = $('#'+id).validate({
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    return validate;
}
function formReset(id) {
    if($('#'+id).length > 0){
        $('#'+id)[0].reset();
        $('#'+id+' .form-group').removeClass('has-error');
        $( "#"+id ).validate().resetForm();
    }
}
function showAppLoading() {
    $('.app-loading').addClass('open');
}
function hideAppLoading() {
    $('.app-loading').removeClass('open');
}
function tableRefesh(selecttor){
    var arr = [];
    $(selecttor + ' .table-content thead tr:first-child th').each(function(index, value){
        arr.push($(this).width());
    });
    arr.pop();
    $(selecttor + ' .table-header thead tr:first-child th').each(function(index, value){
        $(this).width(arr[index]);
    });
}

// ko components register
ko.components.register('form-signin', {
    viewModel: function(params) {
        var self = this;
        self.params = params;
        self.notify = ko.observable('');
        
        self.signin = function(){
            $('#form-signin .btn').prop("disabled", true);
            $.post( "login", $('#form-signin').serialize()).done(function( data ){
                $('#form-signin .btn').prop("disabled", false);
                if(data.status === 'success'){
                    window.location.reload();
                }else{
                    self.notify('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
                }
            });
            return false;
        };
        $('#form-signin .form-control').on('keyup', function(){
            self.notify('');
        });
    },
    template: '<div class="container">\
        <div class="panel panel-default panel-signin">\
            <div class="panel-body">\
                <form data-bind="submit: signin" class="form-signin" id="form-signin" method="POST">\
                    <input type="hidden" name="_token" data-bind="value: params.token">\
                    <img data-bind="attr:{src: params.logo}" class="img-responsive" style="margin: 5px auto 20px auto;"/>\
                    <div data-bind="html: notify"></div>\
                    <input type="text" id="username" name="username" class="form-control" data-bind="attr:{placeholder: params.labels.username}" required autofocus>\
                    <input type="password" id="password" name="password" class="form-control" data-bind="attr:{placeholder: params.labels.password}" required>\
                    <div class="checkbox">\
                        <label>\
                            <input type="checkbox" name="remember-me" value="true"> <span data-bind="html: params.labels.remember_me"></span>\
                        </label>\
                    </div>\
                    <button data-bind="attr:{class: \'btn btn-lg btn-block btn-\' + params.type}, html: params.labels.login" type="submit"></button>\
                </form>\
            </div>\
        </div>\
    </div>'
});

ko.components.register('button-default', {
   viewModel: function(params){
       var self = this;
       self.params = params;
   },
   template: '<button data-bind="attr: {class: \'btn btn-\'+params.type}, click: params.action"><span data-bind="attr:{class: params.icon}"></span> <span data-bind="attr: {class: params.label}"></span> </button>'
});

ko.components.register('grid-toolbar', {
   viewModel: function(params){
       var self = this;
       self.params = params;
   },
   template: '<div class="app-toolbar">\
            <button type="button" class="btn btn-success"><i class="glyphicon glyphicon-floppy-disk"></i> xxx</button>\
        </div>'
});

ko.components.register('toolbar', {
   viewModel: function(params){
       var self = this;
       self.toolbars = params.toolbars;
   },
   template: '<nav class="navbar navbar-default">\
        <div class="container-fluid" data-bind="foreach: toolbars">\
            <!-- ko if: typeof($data) === "string" -->\
                <!--ko component: $data -->\
                <!-- /ko -->\
            <!-- /ko -->\
            <!-- ko if: typeof($data) !== "string" -->\
                <!--ko component: {\
                    name: name,\
                    params: params\
                }-->\
                <!--/ko-->\
            <!--/ko-->\
        </div>\
    </nav>'
});