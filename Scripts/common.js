var fn_xnk_js = (function () {
    var fn_xnk_js_common = function () { };

    fn_xnk_js_common.prototype.activeTab = function () {
        $(".ht-mor-stul li").removeClass("active");
        $(".ulorder li").first().find("a").css("color", "red");
        var link = window.location.href.toLowerCase();
        $(".ht-mor-stul li").each(function () {
            var url = $(this).children().attr("href").toLowerCase();
            if (link.indexOf(url) != -1) {
                $(this).addClass("active");
            }
        });
    }
    fn_xnk_js_common.prototype.loadData = function (linkApi, tagAppend, statusId, khonhanid, quotaid, From, To, pageIndex, pageSize, key) {
        var data = {
            statusId: statusId,
            khonhanid: khonhanid,
            quotaid:quotaid,
            From: From,
            To: To,
            pageIndex: pageIndex,
            pageSize: pageSize,
            key: key
        };
        $(".loading").show();
        $.post(linkApi, data, function (resp) {
            if (resp != null) {
                $("#" + tagAppend + " tbody").html("");
                $("#" + tagAppend + " tbody").html(resp.Content);
                if (resp.TotalPage > 1) {
                    $(".pagination").show();
                } else {
                    $(".pagination").hide();
                }
                $('#datatable').attr("data-total", resp.TotalPage);
                $('#datatable').attr("data-page", pageIndex);
                $('#datatable').attr("data-status", statusId);
                $(".loading").hide();
            } else {
                swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
            }
        });
    }
    fn_xnk_js_common.prototype.loadDataAndPaging = function (linkApi, tagAppend, statusId, khonhanid, quotaid, from, to, pageIndex, pageSize, key) {

        var data = {
            statusId: statusId,
            khonhanid: khonhanid,
            quotaid: quotaid,
            From: from,
            To: to,
            pageIndex: pageIndex,
            pageSize: pageSize,
            key: key
        };
        $(".loading").show();
        $.post(linkApi, data, function (resp) {
            if (resp != null) {
                $("#" + tagAppend + " tbody").html("");
                $("#" + tagAppend + " tbody").html(resp.Content);
                $('#datatable').attr("data-total", resp.TotalPage);
                $('#datatable').attr("data-page", pageIndex);
                $('#datatable').attr("data-status", statusId);
                if (resp.TotalPage > 1) {
                    if (typeof $(".pagination").html() != "undefined") {
                        $(".pagination").show();
                    } else {
                        var html = '<ul class="pagination" id="pagination"></ul>';
                        $(".pagecus").append(html);
                    }
                    fn_xnk_js.xnk_js().showPagination(resp.TotalPage, linkApi, tagAppend, statusId, khonhanid, quotaid, from, to, pageIndex, pageSize, key);
                } else {
                    $(".pagination").hide();
                }
                $(".loading").hide();
            }
            else {
                swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
            }
        });

    }
    fn_xnk_js_common.prototype.showPagination = function (pagesCounter, linkApi, tagAppend, statusId, khonhanid, quotaid, from, to, pageIndex, pageSize, key) {
        $('#pagination').remove();
        $('.pagecus').html('<div class="pagination" id="pagination"></div>');
        $('#pagination').twbsPagination({
            totalPages: pagesCounter,
            visiblePages: 3,
            first: 'Trang đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Trang cuối',
            onPageClick: function (event, page) {
                var curentpage = parseInt($('#datatable').attr("data-page"));
                if (curentpage != page) {
                    $(".loading").show();
                    var data = {
                        statusId: statusId,
                        khonhanid: khonhanid,
                        quotaid: quotaid,
                        From: from,
                        To: to,
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        key: key
                    };

                    $.post(linkApi, data, function (resp) {
                        if (resp != null) {
                            $("#" + tagAppend + " tbody").html("");
                            $("#" + tagAppend + " tbody").html(resp.Content);
                            if (resp.TotalPage > 1) {
                                $(".pagination").show();
                            } else {
                                $(".pagination").hide();
                            }
                            $('#datatable').attr("data-total", resp.TotalPage);
                            $('#datatable').attr("data-page", pageIndex);
                            $('#datatable').attr("data-status", statusId);
                            $(".loading").hide();
                        } else {
                            swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                        }
                    });
                }
            }
        });
    }
    //Thang bui
    fn_xnk_js_common.prototype.loadDataShop = function (linkApi, tagAppend, statusId, khonhanid, quotaid, From, To, pageIndex, pageSize, key, isDelete) {
        var data = {
            statusId: statusId,
            khonhanid: khonhanid,
            quotaid: quotaid,
            From: From,
            To: To,
            pageIndex: pageIndex,
            pageSize: pageSize,
            key: key,
            isDelete: isDelete
        };
        $(".loading").show();
        $.post(linkApi, data, function (resp) {
            if (resp != null) {
                $("#" + tagAppend + " tbody").html("");
                $("#" + tagAppend + " tbody").html(resp.Content);
                if (resp.TotalPage > 1) {
                    $(".pagination").show();
                } else {
                    $(".pagination").hide();
                }
                $('#datatable').attr("data-total", resp.TotalPage);
                $('#datatable').attr("data-page", pageIndex);
                $('#datatable').attr("data-status", statusId);
                $(".loading").hide();
            } else {
                swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
            }
        });
    }

    fn_xnk_js_common.prototype.loadDataShopAndPaging = function (linkApi, tagAppend, statusId, khonhanid, quotaid, from, to, pageIndex, pageSize, key, isDelete) {
        var datefrom = new Date(from.split('-')[1] + "/" + from.split('-')[0] + "/" + from.split('-')[2]);
        var dateto = new Date(to.split('-')[1] + "/" + to.split('-')[0] + "/" + to.split('-')[2]);

        if (datefrom.getTime() > dateto.getTime()) {
            swal("Ngày bắt đầu không được lớn hơn ngày kết thúc!", "", "warning");
        } else {
            var data = {
                statusId: statusId,
                khonhanid: khonhanid,
                quotaid: quotaid,
                From: from,
                To: to,
                pageIndex: pageIndex,
                pageSize: pageSize,
                key: key,
                isDelete: isDelete
            };
            $(".loading").show();
            $.post(linkApi, data, function (resp) {
                if (resp != null) {
                    $("#" + tagAppend + " tbody").html("");
                    $("#" + tagAppend + " tbody").html(resp.Content);
                    $('#datatable').attr("data-total", resp.TotalPage);
                    $('#datatable').attr("data-page", pageIndex);
                    $('#datatable').attr("data-status", statusId);
                    if (resp.TotalPage > 1) {
                        if (typeof $(".pagination").html() != "undefined") {
                            $(".pagination").show();
                        } else {
                            var html = '<ul class="pagination" id="pagination"></ul>';
                            $(".pagecus").append(html);
                        }
                        fn_xnk_js.xnk_js().showPaginationShop(resp.TotalPage, linkApi, tagAppend, statusId, from, to, pageIndex, pageSize, key, isDelete);
                    } else {
                        $(".pagination").hide();
                    }
                    $(".loading").hide();
                }
                else {
                    swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                }
            });
        }
    }

    fn_xnk_js_common.prototype.showPaginationShop = function (pagesCounter, linkApi, tagAppend, statusId, khonhanid, quotaid, from, to, pageIndex, pageSize, key, isDelete) {
        $('#pagination').remove();
        $('.pagecus').html('<div class="pagination" id="pagination"></div>');
        $('#pagination').twbsPagination({
            totalPages: pagesCounter,
            visiblePages: 3,
            first: 'Trang đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Trang cuối',
            onPageClick: function (event, page) {
                var curentpage = parseInt($('#datatable').attr("data-page"));
                if (curentpage != page) {
                    $(".loading").show();
                    var data = {
                        statusId: statusId,
                        khonhanid: khonhanid,
                        quotaid: quotaid,
                        From: from,
                        To: to,
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        key: key,
                        isDelete: isDelete
                    };

                    $.post(linkApi, data, function (resp) {
                        if (resp != null) {
                            $("#" + tagAppend + " tbody").html("");
                            $("#" + tagAppend + " tbody").html(resp.Content);
                            if (resp.TotalPage > 1) {
                                $(".pagination").show();
                            } else {
                                $(".pagination").hide();
                            }
                            $('#datatable').attr("data-total", resp.TotalPage);
                            $('#datatable').attr("data-page", pageIndex);
                            $('#datatable').attr("data-status", statusId);
                            $(".loading").hide();
                        } else {
                            swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                        }
                    });
                }
            }
        });
    }

    return {
        xnk_js: function () {
            var xnk_js = new fn_xnk_js_common();
            return xnk_js;
        }
    };
})();