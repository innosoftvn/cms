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

        self.signin = function () {
            $('#form-signin .btn').prop("disabled", true);
            $.post("login", $('#form-signin').serialize()).done(function (data) {
                $('#form-signin .btn').prop("disabled", false);
                if (data.status === 'success') {
                    window.location.reload();
                } else {
                    self.notify('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                }
            });
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
    viewModel: function (params) {
        var self = this;
        self.params = params;
        self.token = params.token;
        self.url = params.url;
        self.labels = $.map(params.cols, function (val, key) {
            return val;
        });
        self.trans = params.trans;
        self.buttons = params.buttons;
        self.cols = $.map(params.cols, function (val, key) {
            return key;
        });
        self.data_empty_label = params.data_empty_label;
        self.sizes = [25, 50, 100, 200, 500];
        self.total = ko.observable(0);
        self.rows = ko.observableArray([]);
        self.ids = ko.observableArray([]);
        self.pagenum = ko.observable(1);
        self.pagesize = ko.observable(25);
        self.search = ko.observable('');
        self.sorts = params.sorts;
        self.sortdatafield = ko.observable('');
        self.sortorder = ko.observable(0);
        self.groupby = ko.observable(params.groupby === undefined ? '' : params.groupby);
        self.filters = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.is_fetch = false;
        self.pagemax = ko.pureComputed(function () {
            return Math.max(Math.ceil(self.total() / self.pagesize()), 1);
        });
        self.setSize = function (data) {
            if (self.pagesize() !== data) {
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
            if (column !== self.sortdatafield()) {
                self.sortdatafield(column);
                // self.sortorder(1);
            } else {
                var sort = self.sortorder() + 1;
                if (sort > 1)
                    sort = -1;
                self.sortorder(sort);
            }
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
        self.doSearch = function (id) {
            if (self.is_fetch)
                return true;
            self.search($('#' + id).val());
        };
        self.clearSearch = function (id) {
            $('#' + id).val('');
            self.search('');
        };
        
        self.groupby.subscribe(function(previousValue){
            self.rows([]);
        }, self, "beforeChange");
        self.fetch = function () {
            self.is_fetch = true;
            $.ajax({url: self.url, type: "post", data: {_token: self.token, pagenum: self.pagenum, pagesize: self.pagesize, search: self.search, sort: self.sortdatafield, order: self.sortorder, groupby: self.groupby, filters: self.filters()},
                beforeSend: self.showLoading, complete: self.hideLoading,
                success: function (data) {
                    self.rows(data.rows);
                    self.total(data.total);
                    self.is_fetch = false;
                    tableRefesh('#app-grid');
                }
            });
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
        };
        if (params.callback !== undefined)
            params.callback(self);

        ko.computed(self.fetch);

        $("#app-grid .wrap-scroll").css('height', $(window).height() - 135);
        $(window).resize(function () {
            $("#app-grid .wrap-scroll").css('height', $(window).height() - 135);
            tableRefesh('#app-grid');
        });
    },
    template: '\
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
                        <button data-bind="click: del, enable: ids().length>0, attr:{title: trans.delete}" type="button" class="btn btn-default" data-toggle="tooltip"><span class="glyphicon glyphicon-trash"></span></button>\
                        <!--/ko-->\
                        <div class="btn-group">\
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
                                <span data-bind="text: pagesize"></span>\
                                <span class="caret"></span>\
                            </button>\
                            <ul class="dropdown-menu">\
                                <!--ko foreach: sizes-->\
                                    <!-- ko if: $parent.sizes[$index() -1 ] <= $parent.total() || $index()==0 -->\
                                    <li data-bind="click: $parent.setSize"><a data-bind="text: $data"></a></li>\
                                    <!--/ko-->\
                                <!--/ko-->\
                            </ul>\
                        </div>\
                        <!-- ko if: params.leftToolbar !== undefined -->\
                            <div class="pull-left" data-bind="template: {name: params.leftToolbar }"></div>\
                        <!-- /ko -->\
                    </div>\
                </div>\
                <div class="pull-right">\
                    <div class="pagination" data-bind="visible: total() > 0">\
                        <span><b data-bind="html: start"></b>-<b data-bind="html: end"></b> <span data-bind="html: trans.pagination_of_total"></span> <b data-bind="html: total"></b></span>\
                        <div class="btn-group" role="group">\
                            <button type="button" class="btn btn-default" data-bind="click: prev, enable: pagenum()>1"><span class="glyphicon glyphicon-chevron-left"></span></button>\
                            <button type="button" class="btn btn-default" data-bind="click: next, enable: pagenum()<pagemax()"><span class="glyphicon glyphicon-chevron-right"></span></button>\
                        </div>\
                    </div>\
                    <div id="search-wrap">\
                        <input type="text" class="form-control" id="search-warehouse" data-bind="attr: {placeholder: trans.search}, event: {keyup: doSearch.bind($data, \'search-warehouse\')} ">\
                        <i id="search-clear" class="glyphicon glyphicon-remove" data-bind="click: clearSearch.bind($data, \'search-warehouse\'), attr: {\'data-toggle\': search()!=\'\'}"></i>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </nav>\
    <div class="table-header-fixed-top" id="app-grid" >\
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
                                <th class="sortdatafield" data-bind="click: $parent.sort.bind($data, $parent.cols[$index()])"><span data-bind="html: $data"></span> <span data-bind="attr: {class: $parent.sortdatafield() != $parent.cols[$index()] || $parent.sortorder()==0 ? \'sort\' : $parent.sortorder()==1 ? \'sortasc\' : \'sortdesc\'}"></span></th>\
                            <!--/ko-->\
                        <!--/ko-->\
                    <!--/ko-->\
                    <th></th>\
                </tr>\
             </thead>\
        </table>\
        <div class="grid-container loading-container wrap-scroll">\
            <div class="loading" data-bind="attr: {class: loading() ? \'loading open\' : \'loading\'}"><span class="glyphicon glyphicon-refresh glyphicon-spin"></span></div>\
            <table class="table table-hover table-content table-striped thead-hide">\
                <thead>\
                    <tr>\
                        <th width="30px"><input type="checkbox" data-bind="click: toogleAll,checked: ids().length===rows().length"/></th>\
                        <!--ko foreach: {data: labels, as: \'labels\' }--> \
                            <!--ko if: $parent.groupby()===\'\' || $parent.cols[$index()] !== $parent.groupby() -->\
                                <!--ko if: $parent.sorts.indexOf($parent.cols[$index()]) < 0 --> \
                                    <th><span data-bind="html: $data"></span></th>\
                                <!--/ko-->\
                                <!--ko if: $parent.sorts.indexOf($parent.cols[$index()]) >= 0 --> \
                                    <th class="sortdatafield" data-bind="click: $parent.sort.bind($data, $parent.cols[$index()])"><span data-bind="html: $data"></span> <span data-bind="attr: {class: $parent.sortdatafield() != $parent.cols[$index()] || $parent.sortorder()==0 ? \'sort\' : $parent.sortorder()==1 ? \'sortasc\' : \'sortdesc\'}"></span></th>\
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
                                    <!-- ko if: $parents[1].params.cellsrenderer[$data] === undefined -->\
                                    <span data-bind="html: row[$data]"></span>\
                                    <!-- /ko -->\
                                    <!-- ko if: $parents[1].params.cellsrenderer[$data] !== undefined -->\
                                    <span data-bind="html: $parents[1].params.cellsrenderer[$data](row)"></span>\
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
                                        <span data-bind="html: row[$parent.groupby()]"></span> <span data-bind="html: row.total" class="label label-default"></span>\
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
                                                    <!-- ko if: $parents[2].params.cellsrenderer[$data] === undefined -->\
                                                    <span data-bind="html: row_group[$data]"></span>\
                                                    <!-- /ko -->\
                                                    <!-- ko if: $parents[2].params.cellsrenderer[$data] !== undefined -->\
                                                    <span data-bind="html: $parents[2].params.cellsrenderer[$data](row_group)"></span>\
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
    <!-- /ko -->'
});

ko.components.register('edit-form', {
    viewModel: function (params) {
        var self = this;
        self.params = params;
        if (params.buttons === undefined)
            self.params.buttons = [];
        self.current = ko.observable({});
        self.method = ko.observable('add');

        self.save = function () {
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
                        self.back();
                        if (self.params.saved !== undefined)
                            self.params.saved();
                    }
                }
            });
        };

        self.back = function () {
            self.current({});
            params.back();
        };

        self.reset = function () {
            self.current({});
        };

        self.form_rendered = function () {
            if (params.callback !== undefined)
                params.callback(self);
            formValidate('frm-edit');
        };

    },
    template: '\
        <nav class="navbar navbar-default">\
            <div class="container-fluid">\
                <div class="app-toolbar">\
                    <div class="pull-left">\
                        <button data-bind="click: back" type="button" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span> Quay lại</button>\
                    </div>\
                    <!-- ko if: params.leftToolbar !== undefined -->\
                        <div class="pull-left" data-bind="template: {name: params.leftToolbar }"></div>\
                    <!-- /ko -->\
                    <!-- ko if: params.rightToolbar !== undefined -->\
                        <div class="pull-right" data-bind="template: {name: params.rightToolbar }"></div>\
                    <!-- /ko -->\
                    <!-- ko if: method()===\'add\' && params.buttons.indexOf(\'add\') >= 0 || method()===\'update\' && params.buttons.indexOf(\'edit\') >= 0-->\
                    <div class="pull-right">\
                        <button data-bind="click: reset" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span> Huỷ</button>\
                        <button data-bind="click: save" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span> Lưu</button>\
                    </div>\
                    <!-- /ko -->\
                </div>\
            </div>\
        </nav>\
        <form id="frm-edit" style="padding: 15px;">\
            <div data-bind="template: {name: params.template, afterRender: form_rendered }"></div>\
        </form>'
});
