function locationHash() {
    var hash = document.location.hash;
    if(hash !== ''){
        hash = hash.slice(1, hash.length);
        hash = hash.split("-");
    }
    return hash;
}

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

function Grid() {
    var self = this;
    self.fcols = [];
    self.sizes = [10, 20, 50, 100, 200, 500];
    self.total = ko.observable(0);
    self.cols = ko.observableArray([]);
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
};
