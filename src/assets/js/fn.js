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

ko.components.register('grid', {
    viewModel: function(params){
        var self = this;
        self.token = params.token;
        self.url = params.url;
        self.labels = $.map(params.cols, function(val, key) { return val; });
        self.cols = $.map(params.cols, function(val, key) { return key; });
        self.data_empty_label = params.data_empty_label;
        self.sizes = [10, 20, 50, 100, 200, 500];
        self.total = ko.observable(0);
        self.rows = ko.observableArray([]);
        self.ids = ko.observableArray([]);
        self.pagenum = ko.observable(1);
        self.pagesize = ko.observable(10);
        self.search = ko.observable('');
        self.sortdatafield = ko.observable('');
        self.sortorder = ko.observable(0);
        self.filters = ko.observableArray([]);
        self.display = ko.observable(false);
        self.loading = ko.observable(false);
        self.is_fetch = false;
        self.pagemax = ko.pureComputed(function () {
            return Math.max(Math.ceil(self.total() / self.pagesize()), 1);
        });
        self.setSize = function (data) {
            if (self.pagesize() !== data){
                self.pagenum(1);
                self.pagesize(data);
            }
        };
        self.start = ko.pureComputed(function () {
            return self.pagesize() * (self.pagenum() - 1) + 1;
        });
        self.end = ko.pureComputed(function () {
            return Math.min(self.pagesize() * self.pagenum(), self.total());
        });
        self.next = function () {
            self.pagenum(self.pagenum() + 1);
        };
        self.prev = function () {
            self.pagenum(self.pagenum() - 1);
        };
        self.del = function () {
            $('#cfmDel').modal('show');
        };
        self.sort = function (column) {
            if(column !== self.sortdatafield()){
                self.sortdatafield(column);
                // self.sortorder(1);
            }else{
                var sort = self.sortorder() + 1;
                if(sort > 1) sort = -1;
                self.sortorder(sort);
            }
        };
        self.toogleAll = function () {
            if (self.ids().length === self.rows().length) {
                self.ids([]);
            } else {
                var t = [];
                ko.utils.arrayForEach(self.rows(), function (item) {
                    t.push(item.id);
                });
                self.ids(t);
            }
            return true;
        };
        self.showLoading = function(){
            self.loading(true);
        };
        self.hideLoading = function(){
            self.loading(false);
        };
        self.doSearch = function(id){
            self.search($('#'+id).val());
        };
        self.clearSearch = function(id){
            $('#'+id).val('');
            self.search('');
        };
        self.fetch = function(){
            if(self.is_fetch) return true;
            self.is_fetch = true;
            $.ajax({url: self.url, type: "post", data: { _token: self.token, pagenum: self.pagenum, pagesize: self.pagesize, search: self.search, sort: self.sortdatafield, order: self.sortorder, filters: self.filters},
                beforeSend: self.showLoading, complete: self.hideLoading,
                success: function (data) {
                    self.rows(data.rows);
                    self.total(data.total);
                    self.is_fetch = false;
                    tableRefesh('#app-grid');
                }
            });
        };
        self.edit = function(e){
            params.edit(e);
        };
        self.doDel = function(){
            $.ajax({url: self.url, type: "post", data: {_token: self.token, ids: JSON.stringify(self.ids())},
                beforeSend: showAppLoading, complete: hideAppLoading,
                success: function (data) {
                    toastr[data.status](data.message);
                    if(data.status === 'success'){
                        self.ids([]);
                        self.fetch();
                    }
                }
            });
        };
        
        params.callback(self);
        
        ko.computed(self.fetch);
        
        $( "#app-grid .wrap-scroll").css('height', $(window).height() - 150);
        $( window ).resize(function() {
            $( "#app-grid .wrap-scroll").css('height', $(window).height() - 150);
            tableRefesh('#app-grid');
        });
    },
    template: '<div class="table-header-fixed-top" id="app-grid">\
        <table class="table table-header">\
            <thead>\
                <tr>\
                    <th width="30px"><input type="checkbox" data-bind="click: toogleAll,checked: ids().length===rows().length"/></th>\
                    <!--ko foreach: labels--> \
                    <th><span data-bind="html: $data"></span></th>\
                    <!--/ko-->\
                    <th></th>\
                </tr>\
             </thead>\
        </table>\
        <div class="grid-container loading-container wrap-scroll">\
            <div class="loading" data-bind="attr: {class: loading() ? \'loading open\' : \'loading\'}"><span class="glyphicon glyphicon-refresh glyphicon-spin"></span></div>\
            <table class="table table-hover table-content thead-hide">\
                <thead>\
                    <tr>\
                        <th width="30px"><input type="checkbox" data-bind="click: toogleAll,checked: ids().length===rows().length"/></th>\
                        <!--ko foreach: labels--> \
                        <th><span data-bind="html: $data"></span></th>\
                        <!--/ko-->\
                        <th></th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <!--ko foreach: {data: rows, as: \'row\'}-->\
                    <tr data-bind="attr: {\'class\': $parent.ids().indexOf(id)>=0 ? \'active\':\'\'}">\
                        <td>\
                            <input type="checkbox" data-bind="checkedValue: id,checked: $parent.ids"/>\
                        </td>\
                       <!--ko foreach: $parent.cols-->\
                       <td>\
                           <span data-bind="html: row[$data]"></span>\
                       </td>\
                       <!--/ko-->\
                       <td class="text-right actions">\
                           <button class="btn btn-default btn-sm" data-bind="click: $parent.edit"><span class="glyphicon glyphicon-edit"></span></button>\
                       </td>\
                    </tr>\
                    <!--/ko-->\
                    <tr data-bind="visible: rows().length==0 " style="display: none;">\
                        <td data-bind="attr: {colspan: cols.length + 2}, html: data_empty_label" class="text-center active"></td>\
                    </tr>\
                </tbody>\
           </table>\
        </div>\
    </div>'
});