(function ($) {
    $(document).ready(function () {
        fn_xnk_js.xnk_js().activeTab();
        if ($(".btn-vanchuyen").length > 0) {
            $(".btn-vanchuyen").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: false,
                width: '70%',
                height: '70%',
                autoSize: false,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        }

        //$(document).on("click", "#OrderFill", function () {
        //    $(".loading").show();
        //    var orderId = parseInt($(this).attr("data-orderId"));
        //    var ordercode = $(this).attr("data-ordercode");
        //    var orderShopId = $(this).attr("data-orderShop");
        //    var desending = 0;
        //    var data = {
        //        orderID: orderId,
        //        From: "",
        //        To: "",
        //        nameOrder: "ModifiedUTCDate",
        //        desending: desending == 0 ? false : true,
        //        pageIndex: 1,
        //        pageSize: 1000
        //    }
        //    $.get("/OrdersShop/DetailOrder", data, function (resp) {
        //        $("#main").html(resp.View);
        //        $("#popdh").modal("show");
        //        $("#IdOrder").text("#" + ordercode);
        //        $("#IdOrder").attr("data-orderid", orderId);
        //        $("#IdOrder").attr("data-ordershopId", orderShopId);
        //        //if (orderShopId != "") {
        //        //    $(".ht-" + orderShopId).addClass("gtshows");
        //        //    $(".ht-s").addClass("gtshow");
        //        //    $(".ht-s-" + orderShopId).removeClass("gtshow");
        //        //    $(".ht-h-" + orderShopId).addClass("gtshows");
        //        //} else {
        //        //    //setTimeout(function () {
        //        //        $(".ht-s").addClass("gtshow");
        //        //        $(".ht-show-1").removeClass("gtshow");
        //        //        $(".ht-hide-1").addClass("gtshows");
        //        //        $("#list-pro-1").addClass("gtshows")
        //        //    //}, 1500);
        //        //}
        //        $(".fancybox").fancybox();
        //        $(".loading").hide();
        //    })
        //})

        //$(document).on('click', '#ht-show', function () {
        //    var clas = $(this).attr('data-mvd');
        //    $(".ht-s").addClass("gtshow");
        //    $(".ht-h").removeClass("gtshows");
        //    $(".ht-hide-" + clas).addClass("gtshows");
        //    $(".ht-show-" + clas).removeClass("gtshow");
        //    $(".ht-pop-it").slideUp();
        //    $("#list-pro-" + clas).slideDown();
        //});

        //$(document).on('click', '#ht-hide', function () {
        //    var clas = $(this).attr('data-mvd');
        //    $(".ht-show-" + clas).addClass("gtshow");
        //    $(this).removeClass("gtshows");
        //    $(".ht-pop-it").slideUp();
        //});


        $(document).on('click', '#ht-show', function () {
            var clas = $(this).attr('data-mvd');           
            $(this).removeClass("gtshows")
            $(".ht-hide-" + clas).addClass("gtshows");           
            $("#list-pro-" + clas).slideDown();
        });

        $(document).on('click', '#ht-hide', function () {
            var clas = $(this).attr('data-mvd');
            $(this).removeClass("gtshows");
            $(".ht-show-" + clas).addClass("gtshows");
            $("#list-pro-" + clas).slideUp();
        });

        var totalpage = parseInt($('#datatable').attr("data-total"));
        var totalrecord = parseInt($('#datatable').attr("data-totalrecord"));
        var status = $('#datatable').attr("data-status");
        var isDelete = parseInt($('#datatable').attr("data-isDelete"));
        var pagesizedefine = 20;
        if (totalpage > 1) {
            var obj = $('#pagination').twbsPagination({
                totalPages: totalpage,
                visiblePages: 5,
                first: 'Trang đầu',
                prev: 'Trước',
                next: 'Tiếp',
                last: 'Trang cuối',
                onPageClick: function (event, page) {
                    var curentpage = parseInt($('#datatable').attr("data-page"));
                    if (curentpage != page) {
                        var pageSize = pagesizedefine;
                        fn_xnk_js.xnk_js().loadDataShop("/OrdersShop/LoadData", "list_data", status, $("#dropKhoNhan").val(), $("#dropQuota").val(), $("#txtfrom").val(), $("#txtto").val(), page, pageSize, "ModifiedUTCDate", isDelete);
                    }
                }
            });
        }

        $(document).on("click", "#btnTimKiem", function () {
            LoadDataShop(status, pagesizedefine, isDelete);
        });
        //$(document).on("change", "#txtto, #txtfrom", function () {
        //    if (status >= 7 || status == 0) {
        //        LoadDataShop(status, pagesizedefine, isDelete);
        //    }
        //});

        $(document).on("click", ".totalfilter", function () {
            $("#txtfrom").val("");
            $("#txtto").val("");
            $("#dropTrangThai").val(0);
            $("#dropKhoNhan").val(0);
            $("#dropQuota").val(0);
            LoadDataShop(status, pagesizedefine, isDelete);
        });

    });

    function LoadDataShop(status, pagesizedefine, isDelete) {
        fn_xnk_js.xnk_js().loadDataShopAndPaging("/OrdersShop/LoadData", "list_data", status, $("#dropKhoNhan").val(), $("#dropQuota").val(), $("#txtfrom").val(), $("#txtto").val(), 1, pagesizedefine, "ModifiedUTCDate", isDelete);
    }

    function ConvertCurrency(str) {
        return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    function showmessage(status, message) {
        $.gritter.add({
            title: "Thông báo",
            text: message,
            class_name: 'gritter-' + status + ' gritter-light'
        });
    }
})(window.jQuery);