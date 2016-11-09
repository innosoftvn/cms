Number.prototype.formatMoney = function (c, d, t, unit) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 0 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0,
            unit = unit == undefined ? "VNĐ" : unit;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + ' ' + unit;
};

String.prototype.str_pad = function (len, pad_string, pad_type) {
    if(pad_string === 'undefined') pad_string = ' ';
    if(pad_type === 'undefined') pad_type = 'STR_PAD_RIGHT';
    var str = this + "";
    switch(pad_type) {
        case 'STR_PAD_RIGHT':
            while (str.length < len) str = str + pad_string;
            break;
        case 'STR_PAD_LEFT':
            while (str.length < len) str = pad_string + str;
            break;
        case 'STR_PAD_BOTH':
            while (str.length < len){
                str = str + pad_string;
                if(str.length < len) str = pad_string + str;
            }
            break;
    }
    return str;
};

String.prototype.strtotime = function (str) {
    var date = new Date(this);
    if(date.toString() === 'Invalid Date') return this;
    var len = str.length;
    var result = '';
    for (var i = 0; i < len; i++) {
        switch(str[i]) {
            case 'Y':
                result += date.getFullYear();
                break;
            case 'm':
                result += String (date.getMonth() + 1).str_pad(2, '0', 'STR_PAD_LEFT');
                break;
            case 'd':
                result += String (date.getDate()).str_pad(2, '0', 'STR_PAD_LEFT');
                break;
            case 'H':
                result += String (date.getHours()).str_pad(2, '0', 'STR_PAD_LEFT');
                break;
            case 'i':
                result += String (date.getMinutes()).str_pad(2, '0', 'STR_PAD_LEFT');
                break;
            case 's':
                result += String (date.getSeconds()).str_pad(2, '0', 'STR_PAD_LEFT');
                break;
            default:
                result += str[i];
        };
    }
    return result;
};

String.prototype.latinise = function() {
    //thay thế chữ thường
    var str = this;
    str = str.replace( /å|ä|ā|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|ä|ą/g, 'a' );
    str = str.replace( /ß|ḃ/g, "b" );
    str = str.replace( /ç|ć|č|ĉ|ċ|¢|©/g, 'c' );
    str = str.replace( /đ|ď|ḋ|đ/g, 'd' );
    str = str.replace( /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ę|ë|ě|ė/g, 'e' );
    str = str.replace( /ḟ|ƒ/g, "f" );
    str = str.replace( /ķ/g, "k" );
    str = str.replace( /ħ|ĥ/g, "h" );
    str = str.replace( /ì|í|î|ị|ỉ|ĩ|ï|î|ī|¡|į/g, 'i' );
    str = str.replace( /ĵ/g, "j" );
    str = str.replace( /ṁ/g, "m" );

    str = str.replace( /ö|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ö|ø|ō/g, 'o' );
    str = str.replace( /ṗ/g, "p" );
    str = str.replace( /ġ|ģ|ğ|ĝ/g, "g" );
    str = str.replace( /ü|ù|ú|ū|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ü|ų|ů/g, 'u' );
    str = str.replace( /ỳ|ý|ỵ|ỷ|ỹ|ÿ/g, 'y' );
    str = str.replace( /ń|ñ|ň|ņ/g, 'n' );
    str = str.replace( /ŝ|š|ś|ṡ|ș|ş|³/g, 's' );
    str = str.replace( /ř|ŗ|ŕ/g, "r" );
    str = str.replace( /ṫ|ť|ț|ŧ|ţ/g, 't' );

    str = str.replace( /ź|ż|ž/g, 'z' );
    str = str.replace( /ł|ĺ|ļ|ľ/g, "l" );

    str = str.replace( /ẃ|ẅ/g, "w" );

    str = str.replace( /æ/g, "ae" );
    str = str.replace( /þ/g, "th" );
    str = str.replace( /ð/g, "dh" );
    str = str.replace( /£/g, "pound" );
    str = str.replace( /¥/g, "yen" );

    str = str.replace( /ª/g, "2" );
    str = str.replace( /º/g, "0" );
    str = str.replace( /¿/g, "?" );

    str = str.replace( /µ/g, "mu" );
    str = str.replace( /®/g, "r" );

    //thay thế chữ hoa
    str = str.replace( /Ä|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|Ą|Å|Ā/g, 'A' );
    str = str.replace( /Ḃ|B/g, 'B' );
    str = str.replace( /Ç|Ć|Ċ|Ĉ|Č/g, 'C' );
    str = str.replace( /Đ|Ď|Ḋ/g, 'D' );
    str = str.replace( /È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ę|Ë|Ě|Ė|Ē/g, 'E' );
    str = str.replace( /Ḟ|Ƒ/g, "F" );
    str = str.replace( /Ì|Í|Ị|Ỉ|Ĩ|Ï|Į/g, 'I' );
    str = str.replace( /Ĵ|J/g, "J" );

    str = str.replace( /Ö|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ø/g, 'O' );
    str = str.replace( /Ü|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ū|Ų|Ů/g, 'U' );
    str = str.replace( /Ỳ|Ý|Ỵ|Ỷ|Ỹ|Ÿ/g, 'Y' );
    str = str.replace( /Ł/g, "L" );
    str = str.replace( /Þ/g, "Th" );
    str = str.replace( /Ṁ/g, "M" );

    str = str.replace( /Ń|Ñ|Ň|Ņ/g, "N" );
    str = str.replace( /Ś|Š|Ŝ|Ṡ|Ș|Ş/g, "S" );
    str = str.replace( /Æ/g, "AE" );
    str = str.replace( /Ź|Ż|Ž/g, 'Z' );

    str = str.replace( /Ř|R|Ŗ/g, 'R' );
    str = str.replace( /Ț|Ţ|T|Ť/g, 'T' );
    str = str.replace( /Ķ|K/g, 'K' );
    str = str.replace( /Ĺ|Ł|Ļ|Ľ/g, 'L' );

    str = str.replace( /Ħ|Ĥ/g, 'H' );
    str = str.replace( /Ṗ|P/g, 'P' );
    str = str.replace( /Ẁ|Ŵ|Ẃ|Ẅ/g, 'W' );
    str = str.replace( /Ģ|G|Ğ|Ĝ|Ġ/g, 'G' );
    str = str.replace( /Ŧ|Ṫ/g, 'T' );

    return str;
};

function formValidate(id) {
    var validate = $('#' + id).validate({
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
    if ($('#' + id).length > 0) {
        $('#' + id)[0].reset();
        $('#' + id + ' .form-group').removeClass('has-error');
        $("#" + id).validate().resetForm();
    }
}
function showAppLoading() {
    $('.app-loading').addClass('open');
}
function hideAppLoading() {
    $('.app-loading').removeClass('open');
}
function tableRefesh(selecttor) {
    var arr = [];
    $(selecttor + ' .table-content thead tr:first-child th').each(function (index, value) {
        arr.push($(this).width());
    });
    arr.pop();
    $(selecttor + ' .table-header thead tr:first-child th').each(function (index, value) {
        $(this).width(arr[index]);
    });
}

function dropdown(element, sel) {
    if ($('#' + element).hasClass('open'))
        $('#' + element).removeClass('open');
    else
        $('#' + element).addClass('open');
}

function printDiv(id, callback) {
    var divToPrint = document.getElementById(id);
    var newWin = window.open('', 'Print-Window');
    var html = divToPrint.innerHTML;
    newWin.document.open();
    newWin.document.write('<html><body onload="window.print()">' + html + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
        newWin.close();
        callback();
    }, 3);
}

// ko components register
ko.components.register('form-signin', {
    viewModel: function (params) {
        var self = this;
        self.params = params;
        self.notify = ko.observable('');
        self.expired = ko.observable(false);
        
        var widget;

        self.signin = function () {
            if(params.captcha === undefined){
                $('#form-signin .btn').prop("disabled", true);
                $.post("login", $('#form-signin').serialize()).done(function (data) {
                    $('#form-signin .btn').prop("disabled", false);
                    if (data.status === 'success') {
                        window.location.reload();
                    } else {
                        self.notify('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                    }
                });
            }else{
                self.expired(true);
                widget = grecaptcha.render(params.captcha.id, {
                    sitekey: params.captcha.sitekey,
                    theme: params.captcha.theme,
                    type: params.captcha.type,
                    size: params.captcha.size,
                    tabindex: params.captcha.tabindex,
                    'expired-callback': function() {
                        self.expired(false);
                    },
                    callback: function() {
                        $.post("login", $('#form-signin').serialize() + '&responseCaptcha=' + grecaptcha.getResponse(widget)).done(function (data) {
                            $('#form-signin .btn').prop("disabled", false);
                            if (data.status === 'success') {
                                window.location.reload();
                            } else {
                                self.expired(false);
                                self.notify('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                            }
                        });
                    }
                });
            }
            return false;
        };
        $('#form-signin .form-control').on('keyup', function () {
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
                    <div data-bind="visible: !expired()">\
                        <input type="text" id="username" name="username" class="form-control" data-bind="attr:{placeholder: params.labels.username}" required autofocus>\
                        <input type="password" id="password" name="password" class="form-control" data-bind="attr:{placeholder: params.labels.password}" required>\
                        <div class="checkbox">\
                            <label>\
                                <input type="checkbox" name="remember-me" value="true"> <span data-bind="html: params.labels.remember_me"></span>\
                            </label>\
                        </div>\
                        <button data-bind="attr:{class: \'btn btn-lg btn-block btn-\' + params.type}, html: params.labels.login" type="submit"></button>\
                    </div>\
                    <div data-bind="if: expired()">\
                        <div style="margin-top: 40px;" data-bind="css: params.captcha.class, attr: { id: params.captcha.id }"></div>\
                    </div>\
                </form>\
            </div>\
        </div>\
    </div>'
});

ko.components.register('grid', {
    viewModel: function (params) {
        var self = this;
        self.uigrid = Math.random().toString(36).substring(7);
        self.params = params;
        self.token = (params.token === undefined ? '' : params.token);
        self.url = (params.url === undefined ? '' : params.url);
        self.hidetoolbar = ko.observable((params.hidetoolbar === undefined ? false : params.hidetoolbar));
        self.labels = $.map(params.cols, function (val, key) {
            return val;
        });
        self.lang = {
            vi: {
                data_empty_label: 'Không có dữ liệu',
                add: 'Thêm',
                refresh: 'Làm mới',
                delete: 'Xoá',
                pagination_of_total: 'trong tổng số',
                search: 'Tìm kiếm',
                delete_question: 'Bạn chắc chắn muốn xoá dữ liệu này?',
                cancel: 'Huỷ'
            },
            en: {
                data_empty_label: 'Data empty',
                add: 'Add',
                refresh: 'Refresh',
                delete: 'Delete',
                pagination_of_total: 'of',
                search: 'Search',
                delete_question: 'Are you sure you want to delete this data?',
                cancel: 'Cancel'
            }
        };
        self.trans = self.lang.en;
        if(params.lang !== undefined && self.lang[params.lang] !== undefined){
            $.extend(self.trans, self.lang[params.lang]);
        }
        if(params.trans !== undefined){
            $.extend(self.trans, params.trans);
        }
        if(params.cellsrenderer === undefined){
            params.cellsrenderer = {};
        }
        if(params.cellstemplaterenderer === undefined){
            params.cellstemplaterenderer = {};
        }
        self.buttons = (params.buttons === undefined ? [] : params.buttons);
        self.cols = $.map(params.cols, function (val, key) {
            return key;
        });
        self.sizes = [5, 10, 25, 50, 100, 200, 500];
        self.total = ko.observable(0);
        self.rows = ko.observableArray([]);
        self.ids = ko.observableArray([]);
        self.pagenum = 1;
        self.pagesize = 25;
        self.search = ko.observable('');
        self.sorts = (params.sorts === undefined ? [] : params.sorts);
        self.sortdatafield = '';
        self.sortorder = ko.observable(0);
        self.groupby = ko.observable(params.groupby === undefined ? '' : params.groupby);
        self.filters = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.is_fetch = false;
        self.pagemax = ko.observable(Math.max(Math.ceil(self.total() / self.pagesize), 1));
        self.computed_pagenum = ko.observable(self.pagenum);
        self.computed_pagesize = ko.observable(self.pagesize);
        
        self.localdata = ko.observableArray([]);
        self.is_localdata = (params.localdata === undefined ? false : params.localdata);
        
        self.setPageNum = function(num){
            self.pagenum = num;
            self.computed_pagenum(num);
        };
        self.setPageSize = function(size){
            self.pagesize = size;
            self.computed_pagesize(size);
            self.pagemax(Math.max(Math.ceil(self.total() / size), 1));
        };
        
        self.setSize = function (data) {
            if (self.pagesize !== data) {
                self.setPageNum(1);
                self.setPageSize(data);
                self.fetch();
            }
        };
        self.start = ko.pureComputed(function () {
            return self.computed_pagesize() * (self.computed_pagenum() - 1) + 1;
        });
        self.end = ko.pureComputed(function () {
            return Math.min(self.computed_pagesize() * self.computed_pagenum(), self.total());
        });
        self.next = function () {
            self.setPageNum(self.pagenum + 1);
            self.fetch();
        };
        self.prev = function () {
            self.setPageNum(self.pagenum - 1);
            self.fetch();
        };
        self.del = function () {
            $('#'+self.uigrid+' #cfmDel').modal('show');
        };
        self.sort = function (column) {
            self.sortdatafield = column;
            var sort = self.sortorder() + 1;
            if (sort > 1)
                sort = -1;
            if(sort == 0) self.sortdatafield = '';
            self.sortorder(sort);
        };
        
        self.toogleAll = function () {
            if (self.checkAll())
                self.ids([]);
            else {
                if (self.groupby() === '') {
                    var t = [];
                    ko.utils.arrayForEach(self.rows(), function (item) {
                        t.push(item.id);
                    });
                    self.ids(t);
                } else {
                    var t = [];
                    ko.utils.arrayForEach(self.rows(), function (group) {
                        ko.utils.arrayForEach(group.rows, function (item) {
                            t.push(item.id);
                        });
                    });
                    self.ids(t);
                }
            }
            return true;
        };
        self.checkAll = ko.pureComputed(function () {
            if (self.groupby() === '') {
                return (self.ids().length === self.rows().length);
            } else {
                var t = 0;
                ko.utils.arrayForEach(self.rows(), function (item) {
                    t += item.total;
                });
                return self.ids().length === t;
            }
        }, self);
        self.showLoading = function () {
            self.loading(true);
        };
        self.hideLoading = function () {
            self.loading(false);
        };
        self.doSearch = function (data, event) {
            if (self.is_fetch)
                return true;
            self.search($(event.target).val());
        };
        self.clearSearch = function (data, event) {
            $(event.target).parent().children('input').val('');
            self.search('');
        };
        
        self.search.subscribe(function(oldValue){
            self.setPageNum(1);
        }, self, "beforeChange");
        self.filters.subscribe(function(oldValue){
            self.setPageNum(1);
        }, self, "beforeChange");
        self.groupby.subscribe(function(oldValue){
            self.setPageNum(1);
            self.rows([]);
        }, self, "beforeChange");
        
        self.fetch = function () {
            if(!self.is_localdata){
                self.is_fetch = true;
                $.ajax({url: self.url, type: "post", data: {_token: self.token, pagenum: self.pagenum, pagesize: self.pagesize, search: self.search, sort: self.sortdatafield, order: self.sortorder, groupby: self.groupby, filters: self.filters()},
                    beforeSend: self.showLoading, complete: self.hideLoading,
                    success: function (data) {
                        self.rows(data.rows);
                        self.total(data.total);
                        self.is_fetch = false;
                        tableRefesh('#'+self.uigrid+' #app-grid');
                    }
                });
            }else{
                self.localdata_handle();
                tableRefesh('#'+self.uigrid+' #app-grid');
            }
        };
        self.add = function () {
            if (params.add !== undefined)
                params.add();
        };
        self.edit = function (e) {
            if (params.edit !== undefined)
                params.edit(e);
        };
        self.ref = function () {
            if (self.is_fetch)
                return true;
            self.fetch();
        };
        self.doDel = function () {
            if(!self.is_localdata){
                $.ajax({url: self.url + '/delete', type: "post", data: {_token: self.token, ids: JSON.stringify(self.ids())},
                    beforeSend: showAppLoading, complete: hideAppLoading,
                    success: function (data) {
                        toastr[data.status](data.message);
                        if (data.status === 'success') {
                            self.ids([]);
                            self.fetch();
                        }
                    }
                });
            }else{
                self.deleteData(self.ids());
                self.ids([]);
            }
        };
        
        // local data handle
        self.compare = function(left, operator, right){
            switch (operator){
                case '<':
                    return left < right;
                    break;
                case '<=':
                    return left <= right;
                    break;
                case '==':
                    return left == right;
                    break;
                case '!=':
                    return left != right;
                    break;
                case '>':
                    return left > right;
                    break;
                case '>=':
                    return left >= right;
                    break;
            }
            return false;
        };
        self.localdata_handle = function(){
            self.showLoading();
            // begin handle
            var rows = [];
            self.rows([]);
            // fetch data from storage
            $.each(self.localdata(), function(idx, val){
                rows.push(val);
            });
            // search
            if(self.search() != ''){
                rows = ko.utils.arrayFilter(rows, function (item) {
                    var found = false;
                    $.each(self.cols, function(idx, val){
                        found = found || String(item[val]).latinise().toLowerCase().indexOf(String(self.search()).latinise().toLowerCase()) !== -1;
                    });
                    return found;
                });
            }
            // fillters
            if(self.filters().length){
                rows = ko.utils.arrayFilter(rows, function (item) {
                    var found = true;
                    $.each(self.filters(), function(idx, val){
                        if(val.operator !== undefined){
                            if(Array.isArray(val.operator)){
                                $.each(val.operator, function(i,v){
                                    found = found && (self.compare(item[val.key], val.operator[i], val.value[i]));
                                });
                            }else{
                                found = found && (self.compare(item[val.key], val.operator, val.value));
                            }
                        }else{
                            found = found && (val.value.indexOf(item[val.key]) >= 0);
                        }
                    });
                    return found;
                });
            }
            // sort
            if(self.sortorder() != 0){
                rows.sort(function(left, right){
                    return (self.sortorder() == -1 ? left[self.sortdatafield] < right[self.sortdatafield]:left[self.sortdatafield] > right[self.sortdatafield]);
                });
            }
            self.total(rows.length);
            // paginate
            var paginate = [];
            for(var i = (self.pagenum - 1)*self.pagesize; i < self.pagenum*self.pagesize && i < self.total(); i++){
                paginate.push(rows[i]);
            }
            // groupby on paginated
            if(self.groupby() != ''){
                var colname = [];
                $.each(paginate, function(idx, val){
                   if(colname.indexOf(val[self.groupby()]) == -1){
                       colname.push(val[self.groupby()]);
                   } 
                });
                colname.sort();
                var row_groupby = [];
                $.each(colname, function(idx, val){
                    var child_rows = ko.utils.arrayFilter(paginate, function (item) {
                        return item[self.groupby()] == val;
                    });
                    row_groupby.push({
                        name: val,
                        rows: child_rows,
                        total: child_rows.length
                    });
                });
                paginate = row_groupby;
            }
            self.rows(paginate);
            self.pagemax(Math.max(Math.ceil(self.total() / self.pagesize), 1));
            //end handle
            self.hideLoading();
        };
        
        // push new data into localdata
        self.pushData = function(data){
            var idx = Math.random().toString(36).substring(2);
            var new_data = {
                id: idx,
                idx: idx,
                is_new_data: true
            };
            if(data.id !== undefined){
                $.extend(new_data, {
                    is_new_data: false
                });
            }
            self.localdata.push($.extend(new_data, data));
        };
        self.updateData = function(row){
            $.each(self.localdata(), function(idx, val){
               if(val.id == row.id){
                   $.extend(val, row);
                   return true;
               }
            });
            self.fetch();
        };
        self.deleteData = function(ids){
            self.localdata.remove(function(item){
                return ids.indexOf(item.id) >= 0;
            });
        };
        self.setLocalData = function(data){
            self.localdata(data);
        };
        self.getLocalData = function(){
            return self.localdata();
        };
        // end local data handle

        ko.computed(self.fetch);

        self.init = function(){
            if (params.height == undefined){
                $('#'+self.uigrid+" #app-grid .wrap-scroll").css('height', $(window).height() - 135);
                $(window).resize(function () {
                    $('#'+self.uigrid+" #app-grid .wrap-scroll").css('height', $(window).height() - 135);
                    tableRefesh('#'+self.uigrid+' #app-grid');
                });
            }else{
                $('#'+self.uigrid+" #app-grid .wrap-scroll").css('height', params.height);
                $(window).resize(function () {
                    $('#'+self.uigrid+" #app-grid .wrap-scroll").css('height', params.height);
                    tableRefesh('#'+self.uigrid+' #app-grid');
                });
            }
            if (params.callback !== undefined)
                params.callback(self);
        };
    },
    template: '\
    <div data-bind="attr:{id: uigrid, uigrid: uigrid}">\
        <!--ko if: hidetoolbar()==false-->\
        <nav class="navbar navbar-default">\
            <div class="container-fluid">\
                <div class="app-toolbar">\
                    <div class="pull-left">\
                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
                            <!-- ko if: buttons.indexOf("add") !== -1 -->\
                                <button data-bind="click: add" type="button" class="btn btn-default" ><span class="glyphicon glyphicon-plus"></span> <span data-bind="html: trans.add"></span></button>\
                            <!--/ko-->\
                            <button data-bind="click: ref, attr:{title: trans.refresh}" type="button" class="btn btn-default" data-toggle="tooltip"><span class="glyphicon glyphicon-refresh"></span></button>\
                            <!-- ko if: buttons.indexOf("delete") !== -1 -->\
                            <button data-bind="click: del, visible: ids().length>0, attr:{title: trans.delete}" type="button" class="btn btn-danger" data-toggle="tooltip"><span class="glyphicon glyphicon-trash"></span></button>\
                            <!--/ko-->\
                            <!-- ko if: params.leftToolbar !== undefined -->\
                                <div class="pull-left" data-bind="template: {name: params.leftToolbar }"></div>\
                            <!-- /ko -->\
                        </div>\
                    </div>\
                    <div class="pull-right">\
                        <div class="pagination" style="float:left;" data-bind="visible: total() > 0">\
                            <span><b data-bind="html: start"></b>-<b data-bind="html: end"></b> <span data-bind="html: trans.pagination_of_total"></span> <b data-bind="html: total"></b></span>\
                            <div class="btn-group" role="group">\
                                <button type="button" class="btn btn-default" data-bind="click: prev, enable: computed_pagenum()>1"><span class="glyphicon glyphicon-chevron-left"></span></button>\
                                <button type="button" class="btn btn-default" data-bind="click: next, enable: computed_pagenum()<pagemax()"><span class="glyphicon glyphicon-chevron-right"></span></button>\
                            </div>\
                            <div class="btn-group" style="margin-right: 5px;">\
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
                                    <span data-bind="text: computed_pagesize"></span>\
                                    <span class="caret"></span>\
                                </button>\
                                <ul class="dropdown-menu">\
                                    <!--ko foreach: sizes-->\
                                        <!-- ko if: $parent.sizes[$index() -1 ] <= $parent.total() || $index()==0 -->\
                                        <li data-bind="click: $parent.setSize, attr: {class: $parent.computed_pagesize() === $data ? \'active\':\'\'}"><a data-bind="text: $data"></a></li>\
                                        <!--/ko-->\
                                    <!--/ko-->\
                                </ul>\
                            </div>\
                        </div>\
                        <div id="search-wrap" style="float:right;">\
                            <input type="text" class="form-control" data-bind="attr: {placeholder: trans.search}, event: {keyup: doSearch} ">\
                            <i id="search-clear" class="glyphicon glyphicon-remove" data-bind="click: clearSearch, attr: {\'data-toggle\': search()!=\'\'}"></i>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </nav>\
        <!--/ko-->\
        <div class="table-header-fixed-top" id="app-grid" >\
            <div class="loading" data-bind="attr: {class: loading() ? \'loading open\' : \'loading\'}"><span class="glyphicon glyphicon-refresh glyphicon-spin"></span></div>\
            <table class="table table-header">\
                <thead>\
                    <tr>\
                        <th width="30px"><input type="checkbox" data-bind="click: toogleAll,checked: checkAll"/></th>\
                        <!--ko foreach: {data: labels, as: \'labels\' }--> \
                            <!--ko if: $parent.groupby()===\'\' || $parent.cols[$index()] !== $parent.groupby() -->\
                                <!--ko if: $parent.sorts.indexOf($parent.cols[$index()]) < 0 --> \
                                    <th><span data-bind="html: $data"></span></th>\
                                <!--/ko-->\
                                <!--ko if: $parent.sorts.indexOf($parent.cols[$index()]) >= 0 --> \
                                    <th class="sortdatafield" data-bind="click: $parent.sort.bind($data, $parent.cols[$index()])"><span data-bind="html: $data"></span> <span data-bind="attr: {class: $parent.sortorder() != 0 && $parent.sortdatafield==$parent.cols[$index()] ? ($parent.sortorder()==1 ? \'sortasc\':\'sortdesc\'):\'sort\'}"></span></th>\
                                <!--/ko-->\
                            <!--/ko-->\
                        <!--/ko-->\
                        <th></th>\
                    </tr>\
                 </thead>\
            </table>\
            <div class="grid-container loading-container wrap-scroll">\
                <table class="table table-hover table-content table-striped thead-hide">\
                    <thead>\
                        <tr>\
                            <th width="30px"><input type="checkbox" data-bind="click: toogleAll,checked: ids().length===rows().length"/></th>\
                            <!--ko foreach: {data: labels, as: \'labels\' }--> \
                                <!--ko if: $parent.groupby()===\'\' || $parent.cols[$index()] !== $parent.groupby() -->\
                                    <!--ko if: $parent.sorts.indexOf($parent.cols[$index()]) < 0 --> \
                                        <th data-bind="attr: {style: $parent.params.columnsresize!==undefined &&  $parent.params.columnsresize[$parent.cols[$index()]] !== undefined ? \'width:\'+$parent.params.columnsresize[$parent.cols[$index()]]+\'px;\':\'\'}"><span data-bind="html: $data"></span></th>\
                                    <!--/ko-->\
                                    <!--ko if: $parent.sorts.indexOf($parent.cols[$index()]) >= 0 --> \
                                        <th data-bind="attr: {style: $parent.params.columnsresize!==undefined &&  $parent.params.columnsresize[$parent.cols[$index()]] !== undefined ? \'width:\'+$parent.params.columnsresize[$parent.cols[$index()]]+\'px;\':\'\'}" class="sortdatafield" data-bind="click: $parent.sort.bind($data, $parent.cols[$index()])"><span data-bind="html: $data"></span> <span data-bind="attr: {class: $parent.sortorder() != 0 && $parent.sortdatafield==$parent.cols[$index()] ? ($parent.sortorder()==1 ? \'sortasc\':\'sortdesc\'):\'sort\'}"></span></th>\
                                    <!--/ko-->\
                                <!--/ko-->\
                            <!--/ko-->\
                            <th></th>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <!--ko if: groupby()===\'\'-->\
                            <!--ko foreach: {data: rows, as: \'row\'}-->\
                                <tr data-bind="attr: {\'class\': $parent.ids().indexOf(id)>=0 ? \'active\':\'\'}">\
                                    <td>\
                                        <input type="checkbox" data-bind="checkedValue: id,checked: $parent.ids"/>\
                                    </td>\
                                   <!--ko foreach: $parent.cols-->\
                                   <td>\
                                        <!-- ko if: $parents[1].params.cellsrenderer[$data] === undefined && $parents[1].params.cellstemplaterenderer[$data] === undefined -->\
                                        <span data-bind="html: row[$data]"></span>\
                                        <!-- /ko -->\
                                        <!-- ko if: $parents[1].params.cellsrenderer[$data] !== undefined -->\
                                        <span data-bind="html: $parents[1].params.cellsrenderer[$data](row)"></span>\
                                        <!-- /ko -->\
                                        <!-- ko if: $parents[1].params.cellstemplaterenderer[$data] !== undefined -->\
                                        <div data-bind="template: {name: $parents[1].params.cellstemplaterenderer[$data], data: row}"></div>\
                                        <!-- /ko -->\
                                   </td>\
                                   <!--/ko-->\
                                   <td class="text-right actions">\
                                        <!-- ko if: $parent.buttons.indexOf("edit") !== -1 -->\
                                            <!-- ko if: $parent.params.editToolbar !== undefined -->\
                                                <div data-bind="template: {name: $parent.params.editToolbar }"></div>\
                                            <!-- /ko -->\
                                            <!-- ko if: $parent.params.editToolbar === undefined -->\
                                                <button class="btn btn-default btn-sm" data-bind="click: $parent.edit"><span class="glyphicon glyphicon-edit"></span></button>\
                                            <!-- /ko -->\
                                        <!--/ko-->\
                                    </td>\
                                </tr>\
                            <!--/ko-->\
                        <!--/ko-->\
                        <!--ko if: groupby()!==\'\'-->\
                            <!--ko foreach: {data: rows, as: \'row\'}-->\
                                <!--ko if: row.rows!==undefined-->\
                                    <tr class="group-header">\
                                        <td data-bind="attr:{colspan: $parent.cols.length + ($parent.cols.indexOf($parent.groupby()) < 0 ? 2:1) }">\
                                            <!-- ko if: $parent.params.cellsrenderer[$parent.groupby()] === undefined -->\
                                            <span data-bind="html: row[$parent.groupby()]"></span> (<span data-bind="html: row.total"></span>)\
                                            <!-- /ko -->\
                                            <!-- ko if: $parent.params.cellsrenderer[$parent.groupby()] !== undefined -->\
                                            <div data-bind="html: $parent.params.cellsrenderer[$parent.groupby()](row)"></div>\
                                            <!-- /ko -->\
                                        </td>\
                                    </tr>\
                                    <!--ko foreach: {data: row.rows, as: \'row_group\'}-->\
                                        <tr data-bind="attr: {\'class\': $parents[1].ids().indexOf(row_group.id)>=0 ? \'active\':\'\'}">\
                                            <td>\
                                                <input type="checkbox" data-bind="checkedValue: row_group.id,checked: $parents[1].ids"/>\
                                            </td>\
                                           <!--ko foreach: $parents[1].cols-->\
                                                <!--ko if: $parents[2].cols[$index()] !== $parents[2].groupby() -->\
                                                    <td>\
                                                        <!-- ko if: $parents[2].params.cellsrenderer[$data] === undefined && $parents[2].params.cellstemplaterenderer[$data] === undefined -->\
                                                        <span data-bind="html: row_group[$data]"></span>\
                                                        <!-- /ko -->\
                                                        <!-- ko if: $parents[2].params.cellsrenderer[$data] !== undefined -->\
                                                        <span data-bind="html: $parents[2].params.cellsrenderer[$data](row_group)"></span>\
                                                        <!-- /ko -->\
                                                        <!-- ko if: $parents[2].params.cellstemplaterenderer[$data] !== undefined -->\
                                                        <div data-bind="template: {name: $parents[2].params.cellstemplaterenderer[$data], data: row_group}"></div>\
                                                        <!-- /ko -->\
                                                    </td>\
                                                <!--/ko-->\
                                           <!--/ko-->\
                                            <td class="text-right actions">\
                                                <!-- ko if: $parents[1].buttons.indexOf("edit") !== -1 -->\
                                                    <!-- ko if: $parents[1].params.editToolbar !== undefined -->\
                                                        <div data-bind="template: {name: $parents[1].params.editToolbar }"></div>\
                                                    <!-- /ko -->\
                                                    <!-- ko if: $parents[1].params.editToolbar === undefined -->\
                                                        <button class="btn btn-default btn-sm" data-bind="click: $parents[1].edit"><span class="glyphicon glyphicon-edit"></span></button>\
                                                    <!-- /ko -->\
                                                <!--/ko-->\
                                            </td>\
                                        </tr>\
                                    <!--/ko-->\
                                <!--/ko-->\
                            <!--/ko-->\
                        <!--/ko-->\
                        <tr data-bind="visible: rows().length==0 " style="display: none;">\
                            <td data-bind="attr: {colspan: cols.length + 2}, html: trans.data_empty_label" class="text-center active"></td>\
                        </tr>\
                    </tbody>\
               </table>\
            </div>\
        </div>\
        <!-- ko if: buttons.indexOf("delete") !== -1 -->\
        <!--cfmDel-->\
        <div class="modal" id="cfmDel" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="cfmDel" aria-hidden="true">\
            <div class="modal-dialog">\
                <div class="modal-content modal-delete">\
                    <div class="modal-body">\
                        <h3 data-bind="html: trans.delete_question"></h3><br>\
                        <button class="btn btn-default" data-dismiss="modal" data-bind="html: trans.cancel"></button>\
                        <button class="btn btn-danger" data-dismiss="modal" data-bind="click: doDel, html: trans.delete"></button>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <!-- /ko -->\
    </div>\
    <span data-bind="template: { afterRender: init }"></span>'
});

ko.components.register('edit-form', {
    viewModel: function (params) {
        var self = this;
        self.params = params;
        self.frmToolbar = {
            btnBack: true,
            btnCancel: true,
            btnSaveAndBack: true,
            btnSaveAndNew: true
        };
        if (params.toolbar != undefined)
            self.frmToolbar = $.extend(self.frmToolbar, params.toolbar);
        
        self.frmToolbar = ko.mapping.fromJS(self.frmToolbar);
        self.current = ko.observable({});
        self.method = ko.observable('add');

        self.save = function (callback) {
            if (!$('#frm-edit').valid())
                return false;
            if (params.prepare_save !== undefined)
                params.prepare_save();
            self.current()._token = params.token;
            $.ajax({url: params.url + '/' + self.method(), type: "post", data: self.current(),
                beforeSend: showAppLoading, complete: hideAppLoading,
                success: function (data) {
                    toastr[data.status](data.message);
                    if (data.status == 'success') {
                        if(callback !== undefined)
                            callback();
                        if (self.params.saved !== undefined)
                            self.params.saved();
                    }
                }
            });
        };
        
        self.saveAndNew = function(){
            self.save(function(){
                self.reset();
                self.method('add');
            });
        };
        
        self.saveAndBack = function(){
            self.save(function(){
                self.back();
            });
        };

        self.back = function () {
            self.reset();
            params.back();
        };

        self.reset = function () {
            self.current({});
            formReset('frm-edit');
        };

        self.form_rendered = function () {
            if (jQuery().tooltip !== undefined)
                $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
            if (jQuery().popover !== undefined)
                $('[data-toggle="popover"]').popover({html: true});
            
            
            if (params.callback !== undefined)
                params.callback(self);
            formValidate('frm-edit');
        };

    },
    template: '\
        <nav class="navbar navbar-default">\
            <div class="container-fluid">\
                <div class="app-toolbar">\
                    <!-- ko if: frmToolbar.btnBack()==true -->\
                    <div class="pull-left">\
                        <button data-bind="click: back" type="button" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span> Quay lại</button>\
                    </div>\
                    <!-- /ko -->\
                    <!-- ko if: params.leftToolbar !== undefined -->\
                        <div class="pull-left" data-bind="template: {name: params.leftToolbar }"></div>\
                    <!-- /ko -->\
                    <!-- ko if: params.rightToolbar !== undefined -->\
                        <div class="pull-right" data-bind="template: {name: params.rightToolbar }"></div>\
                    <!-- /ko -->\
                    <div class="pull-right">\
                        <!-- ko if: frmToolbar.btnCancel()==true -->\
                        <button data-bind="click: reset" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span> Huỷ</button>\
                        <!-- /ko -->\
                        <!-- ko if: frmToolbar.btnSaveAndBack()==true -->\
                        <button data-bind="click: saveAndBack" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span> <span data-bind="html: method()==\'add\' ? \'Lưu\':\'Cập nhật\'"></span> & Thoát</button>\
                        <!-- /ko -->\
                        <!-- ko if: frmToolbar.btnSaveAndNew()==true -->\
                        <button data-bind="click: saveAndNew" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span> <span data-bind="html: method()==\'add\' ? \'Lưu\':\'Cập nhật\'"></span> & Thêm mới</button>\
                        <!-- /ko -->\
                    </div>\
                </div>\
            </div>\
        </nav>\
        <form id="frm-edit" style="padding: 15px;">\
            <div data-bind="template: {name: params.template, afterRender: form_rendered }"></div>\
        </form>'
});

ko.bindingHandlers.hotkeys = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        $.each(valueAccessor(), function(index, value){
            $(element).on('keydown', null, value.key, function(){
                value.action();
                return false;
            });
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        //
    }
};