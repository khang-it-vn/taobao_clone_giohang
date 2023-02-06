$(document).on("click", ".OrderFill", function (event) {
    $(".loading").show();
    var orderId = parseInt($(this).attr("data-orderId"));
    var ordercode = $(this).attr("data-ordercode");
    var orderShopId = $(this).attr("data-orderShop");
    var desending = 0;
    var data = {
        orderID: orderId,
        From: "",
        To: "",
        nameOrder: "ModifiedUTCDate",
        desending: desending == 0 ? false : true,
        pageIndex: 1,
        pageSize: 1000
    }
    $.get("/OrdersShop/DetailOrder", data, function (resp) {
        var content = bindingDetailOrder(resp.model);
        $("#main").html(content);
        $("#popdh").modal("show");
        $("#IdOrder").text("#" + ordercode);
        $("#IdOrder").attr("data-orderCode", ordercode);
        $("#IdOrder").attr("data-orderid", orderId);
        $("#IdOrder").attr("data-ordershopId", orderShopId);
        $(".fancybox").fancybox();
        $(".loading").hide();
    })
});
(function ($) {
    $(document).ready(function () {
        fn_xnk_js.xnk_js().activeTab();
        var totalpage = parseInt($('#datatable').attr("data-total"));
        var totalrecord = parseInt($('#datatable').attr("data-totalrecord"));
        var status = parseInt($('#datatable').attr("data-status"));
        var pagesizedefine = 20;
        if (totalpage > 1) {
            var obj = $('#pagination').twbsPagination({
                totalPages: totalpage,
                visiblePages: 3,
                first: 'Trang đầu',
                prev: 'Trước',
                next: 'Tiếp',
                last: 'Trang cuối',
                onPageClick: function (event, page) {
                    var curentpage = parseInt($('#datatable').attr("data-page"));
                    if (curentpage != page) {
                        fn_xnk_js.xnk_js().loadData("/Order/LoadData", "list_data", status, $("#dropKhoNhan").val(), $("#dropQuota").val(), $("#txtfrom").val(), $("#txtto").val(), page, pagesizedefine, "");
                    }
                }
            });
        }

        $(document).on("click", "#btnTimKiem", function () {
            $('.btn-thuoc-tinh').parent().removeClass("active");
            LoadData(status, pagesizedefine);
        });

        $(document).on("click", ".totalfilter", function () {
            $("#txtfrom").val("");
            $("#txtto").val("");
            $("#dropTrangThai").val(0);
            $("#dropKhoNhan").val(0);
            $("#dropQuota").val(0);
            LoadData(status, pagesizedefine);
        });

        /* Handle control */
        /* Delete order */
        $(document).on("click", ".btnDelete", function () {
            var id = parseInt($(this).attr("data-orderid"));
            var code = $(this).attr("data-ordercode");
            swal({
                title: "",
                text: "Bạn có chắc muốn xóa đơn hàng này không?",
                type: "warning",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $(".loading").show();
                    $.post("/order/deleteorder", { orderId: id, orderCode: code }, function (resp) {
                        $(".loading").hide();
                        if (resp == 1) {
                            //send notify to admin
                            //notifyToAdmin(5, $('#check-id').data('id'));
                            swal("Xóa đơn hàng thành công", "", "success");
                            setTimeout(function () {
                                location.reload();
                            }, 500);
                        } else {
                            swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                        }
                    });
                }
            });
        });

        $(document).on("click", ".btnrestore", function () {
            var id = parseInt($(this).attr("data-orderid"));
            var code = $(this).attr("data-ordercode");
            swal({
                title: "",
                text: "Bạn có chắc muốn khôi phục đơn hàng này không?",
                type: "warning",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $(".loading").show();
                    $.post("/order/RestoreOrder", { orderId: id, orderCode: code }, function (resp) {
                        $(".loading").hide();
                        if (resp == 1) {
                            //send notify to admin
                            //notifyToAdmin(5, $('#check-id').data('id'));
                            swal("Khôi phục đơn hàng thành công", "", "success");
                            setTimeout(function () {
                                location.reload();
                            }, 500);

                        } else {
                            swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                        }
                    });
                }
            });
        });
        /* Export Excel */
        $(document).on("click", ".btnExport", function () {
            var id = parseInt($(this).attr("data-orderid"));
            var code = $(this).attr("data-ordercode");
            swal({
                title: "Bạn có chắc?",
                text: "muốn thực hiện thao tác này không1?",
                type: "warning",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $(".loading").show();
                    var url = "/Order/ExportData";
                    location.href = decodeURIComponent(url + "?orderID=" + id + "&ordercode=" + code);
                    $(".loading").hide();
                }
                //setTimeout(function () {
                //    swal("Xuất excel thành công", "", "success");
                //}, 1000);
            });
        });
        /* Thang */

        $(document).on("click", ".btnedituser", function () {
            $(".loading").show();
            var orderId = parseInt($(this).attr("data-orderid"));
            var ordercode = $(this).attr("data-ordercode");
            var orderShopId = $(this).attr("data-orderShop");
            var desending = 0;
            var data = {
                orderID: orderId
            }
            $.get("/OrdersShop/LoadOrderShop", data, function (resp) {
                $("#main").html(resp.View);
                $("#popdh").modal("show");
                $("#IdOrder").text("#" + ordercode);
                $("#IdOrder").attr("data-orderCode", ordercode);
                $("#IdOrder").attr("data-orderid", orderId);
                $(".fancybox").fancybox();
                $(".loading").hide();
            })
        });
        //$('#popdh').on('hidden.bs.modal', function (e) {
        //    var orderId = $("#hdfOrderId").val();
        //    var data = {
        //        orderId: orderId
        //    }
        //    $.post("/OrdersShop/UpdateStatus2", data, function (resp) {
        //        location.reload();
        //    });
        //})
        $(document).on("click", ".btnmerge", function () {
            var namecode = $(this).attr("data-ordercode");
            swal({
                title: "Gộp đơn hàng (" + namecode + ") với :",
                text: "",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Nhập mã đơn hàng cần gộp",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "rgb(48, 133, 214)",
                showLoaderOnConfirm: true,
            },
                function (inputValue) {
                    if (inputValue === false) return false;

                    if (inputValue === "") {
                        swal.showInputError("Bạn cần nhập vào mã đơn hàng!");
                        return false
                    }
                    $.post("/OrdersShop/Mergeorders", { firstOrder: namecode, secondOrder: inputValue }, function (resp) {
                        if (resp != null) {
                            if (resp.Success == 1) {
                                swal({
                                    title: "Gộp đơn hàng thành công!",
                                    text: "",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonText: "Đóng",
                                    closeOnConfirm: true,
                                    timer: 1500
                                });
                                //LoadData(status, pagesizedefine);
                                location.reload();
                            }
                            else {
                                if (resp.Success == 0) {
                                    swal("Mã đơn hàng không tồn tại!", "", "error");
                                } else {
                                    if (resp.Success == 2) {
                                        swal("Xin lỗi bạn không gộp được đơn hàng của các khách hàng khác nhau, đơn hàng đã được xử lý hoặc các đơn hàng không tồn tại!", "", "error");
                                    } else {
                                        swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                                    }
                                }
                            }
                        }
                    });
                });
        });
        

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

        $(document).on('click', '#bt_save', function () {
            $("#popdh").modal("hide");
        });

        /* End Thang */

        /* Order Event*/
        $(document).on("click", ".btn_delete_product", function (e) {
            e.preventDefault();
            $("#popdh").css("z-index", "1");
            $(".modal-backdrop.in").css("opacity", "0");
            var id = $(this).attr("data-productId");
            var orderId = $("#IdOrder").attr("data-orderid");
            var ordercode = $(this).attr("data-ordercode");
            var clas = $(this).parents(".ht-pop-dhitem").attr("data-mvd");
            swal({
                title: "",
                text: "Bạn có chắc muốn xóa sản phẩm này không?",
                type: "warning",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $(".loading").show();
                    $.post("/order/deleteproduct", { productId: id, OrderId: orderId }, function (resp) {
                        if (resp == 1) {
                            $("#popdh").css("z-index", "9999");
                            $(".modal-backdrop.in").css("opacity", "0.2");
                            $(".loading").hide();
                            var desending = 0;
                            var data = {
                                orderID: orderId,
                                From: "",
                                To: "",
                                nameOrder: "ModifiedUTCDate",
                                desending: desending == 0 ? false : true,
                                pageIndex: 1,
                                pageSize: 1000
                            }
                            $.get("/OrdersShop/LoadOrderShop", data, function (respView) {
                                $(".loading").hide();
                                if (respView.View.length > 10) {
                                    setTimeout(function () {
                                        $("#main").html(respView.View);
                                        $("#popdh").modal("show");
                                        $("#IdOrder").text("#" + ordercode);
                                        $("#IdOrder").attr("data-orderid", orderId);

                                        //$(".ht-s").addClass("gtshow");
                                        //$(".ht-h").removeClass("gtshows");
                                        //$(".ht-hide-" + clas).addClass("gtshows");
                                        //$(".ht-show-" + clas).removeClass("gtshow");
                                        //$(".ht-pop-it").slideUp();
                                        //$("#list-pro-1").slideDown();

                                        $(".loading").hide();
                                        LoadData(status, pagesizedefine);
                                        //location.reload();
                                    }, 100);
                                } else {
                                    $("#main").html(respView.View);
                                    $("#popdh").modal("hide");
                                    $("#IdOrder").text("#" + ordercode);
                                    $("#IdOrder").attr("data-orderCode", ordercode);
                                    $("#IdOrder").attr("data-orderid", orderId);
                                    LoadData(status, pagesizedefine);
                                    //location.reload();
                                }
                            });
                        }
                        else {
                            $("#IdOrder").text("#" + ordercode);
                            $("#IdOrder").attr("data-orderCode", ordercode);
                            $("#IdOrder").attr("data-orderid", orderId);
                            $(".loading").hide();
                            $("#popdh").css("z-index", "9999");
                            $(".modal-backdrop.in").css("opacity", "0.2");
                            swal("Đơn hàng chưa được cập nhật thành công. Bạn vui lòng thử lại", "", "warning");
                        }
                    });
                }
                else {
                    $("#popdh").css("z-index", "9999");
                    $(".modal-backdrop.in").css("opacity", "0.2");
                }
            });
        });

        $(document).on("change", ".txtQuantity", function () {
            var _this = $(this);
            var orderId = $("#IdOrder").attr("data-orderid");
            var ordercode = $("#IdOrder").attr("data-orderCode");
            var productID = parseInt(_this.attr("data-productId"));
            var quantity = parseInt(_this.val());
            var clas = $(this).parents(".ht-pop-dhitem").attr("data-mvd");
            $(".loading").show();
            $.post("/order/updatequantity", { productId: productID, quantity: quantity, orderId: orderId }, function (resp) {
                if (resp != null) {
                    if (resp == 1) {
                        $(".loading").hide();
                        var desending = 0;
                        var data = {
                            orderID: orderId,
                            From: "",
                            To: "",
                            nameOrder: "ModifiedUTCDate",
                            desending: desending == 0 ? false : true,
                            pageIndex: 1,
                            pageSize: 1000
                        }
                        $.get("/OrdersShop/LoadOrderShop", data, function (respView) {
                            $(".loading").hide();
                            if (respView.View.length > 10) {
                                setTimeout(function () {
                                    $("#main").html(respView.View);
                                    $("#popdh").modal("show");
                                    $("#IdOrder").text("#" + ordercode);
                                    $("#IdOrder").attr("data-orderCode", ordercode);
                                    $("#IdOrder").attr("data-orderid", orderId);
                                    $(".loading").hide();

                                    LoadData(status, pagesizedefine);
                                }, 100);
                            } else {
                                $("#main").html(respView.View);
                                $("#popdh").modal("hide");
                                $("#IdOrder").text("#" + ordercode);
                                $("#IdOrder").attr("data-orderCode", ordercode);
                                $("#IdOrder").attr("data-orderid", orderId);
                                LoadData(status, pagesizedefine);
                            }
                        });
                    }
                    else {
                        $("#IdOrder").text("#" + ordercode);
                        $("#IdOrder").attr("data-orderCode", ordercode);
                        $("#IdOrder").attr("data-orderid", orderId);
                        $(".loading").hide();
                        swal("Số lượng chưa được cập nhật thành công. Bạn vui lòng thử lại", "", "warning");
                    }
                }
            });
        });

        $(document).on("change", ".op1, .op2, .op3, .op4, .op5", function () {
            $(".loading").show();
            var selected = "";
            var orderId = $("#IdOrder").attr("data-orderid");
            var ordercode = $("#IdOrder").attr("data-orderCode");
            var shopId = parseInt($(this).parents(".nhnshopId").attr("data-ordershopId"));
            var clas = $(this).parents(".ht-pop-dhitem").attr("data-mvd");

            if (($(this).hasClass("op3") || $(this).hasClass("op4") || $(this).hasClass("op5")) && $(this).prop("checked")) {
                $(this).parents('.nhnshopId').find('.op3, .op4, .op5').prop("checked", false);
                $(this).prop("checked", true);
            }

            if ($(this).parents('.nhnshopId').find('.op1:checkbox:checked').length > 0) {
                selected += "1";
            }
            if ($(this).parents('.nhnshopId').find('.op2:checkbox:checked').length > 0) {
                if (selected.length >= 1) {
                    selected += ",2";
                } else {
                    selected += "2";
                }
            }
            if ($(this).parents('.nhnshopId').find('.op3').prop("checked")) {
                if (selected.length >= 1) {
                    selected += ",3";
                } else {
                    selected += "3";
                }
            }
            if ($(this).parents('.nhnshopId').find('.op4').prop("checked")) {
                if (selected.length >= 1) {
                    selected += ",4";
                } else {
                    selected += "4";
                }
            }
            if ($(this).parents('.nhnshopId').find('.op5').prop("checked")) {
                if (selected.length >= 1) {
                    selected += ",5";
                } else {
                    selected += "5";
                }
            }

            $.post("/order/UpdateSelectedShopOrder", { orderID: orderId, orderShopID: shopId, value: selected }, function (resp) {
                if (resp == 1) {
                    $(".loading").hide();
                    var desending = 0;
                    var data = {
                        orderID: orderId,
                        From: "",
                        To: "",
                        nameOrder: "ModifiedUTCDate",
                        desending: desending == 0 ? false : true,
                        pageIndex: 1,
                        pageSize: 1000
                    }
                    $.get("/OrdersShop/LoadOrderShop", data, function (respView) {
                        $(".loading").hide();
                        if (respView.View.length > 10) {
                            setTimeout(function () {
                                $("#main").html(respView.View);
                                $("#popdh").modal("show");
                                $("#IdOrder").text("#" + ordercode);
                                $("#IdOrder").attr("data-orderCode", ordercode);
                                $("#IdOrder").attr("data-orderid", orderId);
                                $(".loading").hide();
                                LoadData(status, pagesizedefine);
                            }, 100);
                        } else {
                            $("#main").html(respView.View);
                            $("#popdh").modal("hide");
                            $("#IdOrder").text("#" + ordercode);
                            $("#IdOrder").attr("data-orderCode", ordercode);
                            $("#IdOrder").attr("data-orderid", orderId);
                            LoadData(status, pagesizedefine);
                        }
                    });
                }
                else {
                    $("#IdOrder").text("#" + ordercode);
                    $("#IdOrder").attr("data-orderCode", ordercode);
                    $("#IdOrder").attr("data-orderid", orderId);
                    $(".loading").hide();
                    swal("Cập nhật dữ liệu không thành công. Bạn vui lòng thử lại", "", "warning");
                }
            });

        });

        $(document).on("click", ".edit-icon", function () {
            $(this).hide();
            $(this).parents("li").find(".ht-ctredit").css("display", "inline-block");
            $(this).parents("li").find(".tp-edit").css("display", "inline-block");
        });

        $(document).on("click", ".btnedit", function () {
            $(this).parents("li").find(".ht-ctredit").hide();
            $(this).parents("li").find(".tp-edit").hide();
            $(this).parents(".ht-pop-tbtsul").find(".edit-icon").show();
        });

        $(document).on("click", ".editnote", function (e) {
            e.preventDefault();
            var id = $(this).attr("data-productId");
            var orderId = $("#IdOrder").attr("data-orderid");
            var ordercode = $("#IdOrder").attr("data-orderCode");
            var clas = $(this).parents(".ht-pop-dhitem").attr("data-mvd");
            if ($(this).parents("li").find("textarea ").val() == "") {
                $(this).parents("li").find("textarea ").notify("Bạn vui lòng nhập vào ghi chú!", "error", { position: "bottom left" });
            } else {
                $(".loading").show();
                $.post("/order/updatenoteproduct", { orderId: orderId, productId: id, note: $(this).parents("li").find("input").val() }, function (resp) {
                    if (resp != null) {
                        if (resp == 1) {
                            $(".loading").hide();
                            var desending = 0;
                            var data = {
                                orderID: orderId,
                                From: "",
                                To: "",
                                nameOrder: "ModifiedUTCDate",
                                desending: desending == 0 ? false : true,
                                pageIndex: 1,
                                pageSize: 1000
                            }
                            $.get("/OrdersShop/LoadOrderShop", data, function (respView) {
                                $(".loading").hide();
                                if (respView.View.length > 10) {
                                    setTimeout(function () {
                                        $("#main").html(respView.View);
                                        $("#popdh").modal("show");
                                        $("#IdOrder").text("#" + ordercode);
                                        $("#IdOrder").attr("data-orderCode", ordercode);
                                        $("#IdOrder").attr("data-orderid", orderId);
                                        $(".loading").hide();


                                        //$(".ht-s").addClass("gtshow");
                                        //$(".ht-h").removeClass("gtshows");
                                        //$(".ht-hide-" + clas).addClass("gtshows");
                                        //$(".ht-show-" + clas).removeClass("gtshow");
                                        //$(".ht-pop-it").slideUp();
                                        //$("#list-pro-" + clas).slideDown();

                                        LoadData(status, pagesizedefine);
                                    }, 100);
                                } else {
                                    $("#main").html(respView.View);
                                    $("#popdh").modal("hide");
                                    $("#IdOrder").text("#" + ordercode);
                                    $("#IdOrder").attr("data-orderCode", ordercode);
                                    $("#IdOrder").attr("data-orderid", orderId);
                                    LoadData(status, pagesizedefine);
                                }
                            });
                        }
                        else {
                            $("#IdOrder").text("#" + ordercode);
                            $("#IdOrder").attr("data-orderCode", ordercode);
                            $("#IdOrder").attr("data-orderid", orderId);
                            $(".loading").hide();
                            swal("Bạn chưa cập nhật được ghi chú đơn hàng", "", "warning");
                        }
                    }
                });
            }
        });

        $(document).on("click", ".btndeposit", function (e) {
            e.preventDefault();
            var id = parseInt($(this).attr("data-orderid"));
            var code = $(this).attr("data-ordercode");
            swal({
                title: "",
                text: "Bạn có chắc muốn đặt cọc đơn hàng này không?",
                type: "warning",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $(".loading").show();
                    $.post("/order/Deponsit", { orderId: id, orderCode: code }, function (resp) {
                        $(".loading").hide();
                        if (resp == 1) {
                            //notifyToAdmin(4, $('#check-order-id').data('id'));
                            //notifyToAdmin(4, 99);
                            //notifyToAdmin(4, 48);
                            swal("Thông báo", "Đặt cọc thành công", "success");
                            //LoadData(status, pagesizedefine);
                            location.reload();
                        } else {
                            if (resp == 2) {
                                swal("Thông báo!", "Không tìm thấy đơn hàng đặt cọc", "warning");
                            } else if (resp == 3) {
                                swal("Thông báo!", "Đơn hàng đã được đặt cọc. Vui lòng f5 để cập nhật dữ liệu mới nhất", "warning");
                            } else if (resp == 4) {
                                setTimeout(function () {
                                    swal({
                                        title: "Thông báo!",
                                        text: "Số dư quý khách không đủ.Vui lòng nạp tiền để đặt cọc đơn hàng",
                                        type: "warning",
                                        confirmButtonText: "Đồng ý",
                                        closeOnConfirm: true
                                    }, function (_isConfirm) {
                                        if (_isConfirm) {
                                            window.open('/hinh-thuc-thanh-toan', '_blank');
                                        }
                                    });
                                }, 50);
                            } else {
                                swal("Thông báo!", "Hệ thống gặp sự cố trong quá trình update dữ liệu", "warning");
                            }
                        }
                    });
                }
            });
        });

        $(document).on("click", ".btnchot", function (e) {
            e.preventDefault();
            var id = parseInt($(this).attr("data-orderid"));
            var code = $(this).attr("data-ordercode");
            swal({
                title: "",
                text: "Bạn có chắc muốn chốt đơn hàng này không?",
                type: "warning",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Đóng",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $(".loading").show();
                    $.post("/OrdersShop/ChangeStatusOrder", { orderId: id, orderCode: code }, function (resp) {
                        $(".loading").hide();
                        if (resp == 1) {
                            swal("Bạn đã chốt đơn hàng thành công", "", "success");
                            setTimeout(function () {
                                location.reload();
                            }, 500);
                            return false;
                        }
                        else {
                            swal("Hệ thống gặp sự cố trong quá trình update dữ liệu!", "", "warning");
                        }
                    });
                }
            });
        });


    });

    function LoadData(status, pagesizedefine) {
        fn_xnk_js.xnk_js().loadDataAndPaging("/Order/LoadData", "list_data", $("#dropTrangThai").val(), $("#dropKhoNhan").val(), $("#dropQuota").val(), $("#txtfrom").val(), $("#txtto").val(), 1, pagesizedefine, "");
    }
    function ConvertCurrency(str) {
        return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
})(window.jQuery);
function bindingDetailOrder(Model) {
    var EnumTranformation = [{ ChuyenNhanh: 1 }, { ChuyenNhanh: 2 }];
    var j = 0;
    var jj = 1;
    var tongPhiKiemDem = 0;
    var total_price_china = 0.00;
    var exchange = 0.00;
    var totalshipTQ = 0.00;
    var totalshipTQVN = 0;
    var serverper = 0.00;
    var total_PhiDongKien = 0.00;
    var total_PhiKiemDem = 0.00;
    var total_ShipCsKh = 0.00;
    var totalServiceperTQ = 0;
    var totalServiceperTQVND = 0;
    var totalproduct = 0;
    var totalPriceTQ = 0;
    var totalPriceVN = 0;
    var content = `<style>
    .edit-icon {
        color: red;
        cursor: pointer;
    }

    .tp-edit {
        width: 80%;
        display: none;
    }

    .btnedit {
        padding: 6px 10px;
    }

    .ht-ctredit {
        display: none;
    }

    .note-text {
        height: 165px !important;
    }

    .select {
        height: 32px !important;
        border: 1px solid #999 !important;
        border-radius: 3px !important;
    }
</style>`;
    if (Model != null) {
        content += `<div class="ht-pop-header">
            <h2 class="ht-pop-dhtit">
                Chi tiết đơn hàng  <span id="IdOrder" data-orderid="`+ Model.Id + `" data-ordershopId="">#` + Model.OrderCode + `"</span> Hình thức vận chuyển:`;
        if (Model.Quota == 1) {
            content += `<span style="color:blue">Chuyển nhanh</span>`;
        }
        else {
            content += `<span style="color:red">Chuyển thường </span>`;
        }
        content += `</h2>
            <span data-dismiss="modal" aria-label="Close" class="fa fa-times ht-pop-dhclose" aria-hidden="true"></span>
        </div>
            <div class="ht-pop-dhmain">`;
        jQuery.each(Model.ListShop, function (index, shop) {
            tongPhiKiemDem += shop.TongPhiKiemDem;


            exchange = shop.ExchangeRate;
            serverper = Model.ServicePer;
            var gtshows = "";
            content += `<div class="ht-pop-dhprod">
                    <div class="ht-pop-dhtop">
                        <ul class="ht-pop-dhtul">
                            <li><p class="ht-pop-dhtname"><span>`+ shop.ShopName + `</span> </p></li>`
            if (shop.StatusId < 6) {
                content += `<li><p class="ht-pop-dhstt">Trạng thái: <span>` + shop.Status + `</span></p></li>`
            }
            else {
                jQuery.each(Model.ListCodeShipping, function (index, item) {
                    if (item.OrderShopId == shop.Id) {
                        content += `<li><p class="ht-pop-dhstt">` + item.MVD + `: <span>` + item.NameStatus + `</span></p></li>`;
                    }
                })

            }
            content += `</ul>
                        <ul class="ht-pop-dhbtnul">
                            <li><a href="javascript:;"><i class="fa fa-comments-o"></i></a></li>
                        </ul>
                        <ul class="ht-pop-dhbtnuls">
                            <li id="ht-show" class="ht-s ht-show-`+ jj + ` ht-s-` + shop.Id + ` " data-mvd="` + jj + `"><a href="javascript:;"><i class="fa fa-chevron-up" aria-hidden="true"></i></a></li>
                            <li id="ht-hide" class="ht-h ht-hide-`+ jj + ` ht-h-` + shop.Id + ` gtshows" data-mvd="` + jj + `"><a href="javascript:;"><i class="fa fa-chevron-down" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                    <div class="ht-pop-it ht-pop-dhitem  ht-`+ shop.Id + ` ` + gtshows + `" id="list-pro-` + jj + `" data-mvd="` + jj + `">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Stt</th>
                                    <th>Hình ảnh</th>
                                    <th style="width:35%">Thông số</th>
                                    <th>Số lượng</th>
                                    <th>Giá bán</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>`;

            var i = 1;
            var totalQuantity = 0;
            jQuery.each(shop.ListProduct, function (index, pro) {
                content += `<tr>
                            <td><p>`+ i + `</p></td>
                            <td class="ht-pop-image"><a href="`+ pro.Link + `" class="ht-pop-pimg" target="_blank"><img src="` + pro.LinkImage + `" alt="Chi tiết"></a></td>
                                <td>
                                    <ul class="ht-pop-tbtsul">
                                        <li>
                                            <p>
                                                Size: <span>`+ pro.Size + `</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Màu: <span> `+ pro.Color + `</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Khách ghi chú: <span>`+ pro.Note + `</span>
                                            </p>
                                            <p>
                                                Nhân viên ghi chú: <span>
                                                    `+ pro.OrderNote + `
                                                    </span>
                                            </p>
                                        </li>
                                        <li>`;

                content += `<ul class="list_image">`
                jQuery.each(pro.ListPicture, function (index, pt) {
                    content += `<li class="image_note">
                                    <a class="fancybox" href="`+ pt.LinkImage + `">
                                        <img class="img_note" src="`+ pt.LinkImage + `">
                                                                </a>
                                                            </li>`
                });
                content += `</ul>
                                            </li>
                                        </ul>
                                    </td>`;
                if (pro.OutOfStock) {
                    content += `<td class="ht-pop-isl">
                                    <p>0</p>
                                    <label style="color: red; font-size: 12px; font-weight: 400;">Hết hàng</label>
                                </td>`;
                }
                else {
                    content += `
                                <td class="ht-pop-isl">
                                    <p>`+ pro.Quantity + `</p>`;
                    if (pro.Quantity == 0) {
                        content + `=<label style="color: red; font-size: 12px; font-weight: 400;">Hết hàng</label>`;
                    }
                    content += `</td>`;
                }
                content += `<td>`;
                if (pro.OutOfStock) {
                    content += `<p class="ht-pop-tbprime"> 0 VNĐ <span>¥ 0</span></p>`;
                }
                else {
                    content += `<p class="ht-pop-tbprime">` + FormatMoney(pro.PriceTQ) + ` <span style="color:#000;">VNĐ</span><br /><span style="color:#000;">¥</span> ` + pro.UnitPrice + `</p>`;
                }
                content += `</td>
                                <td>`
                if (pro.OutOfStock) {
                    content += `<p class="ht-pop-tbprime"> 0 VNĐ <span>¥ 0</span></p>`;
                }
                else {
                    content += `<p class="ht-pop-tbprime">` + FormatMoney(pro.MoneyVN) + `<span style="color:#000;"> VNĐ</span><br /><span style="color:#000;">¥</span> ` + (pro.MoneyTQ) + `</p>`;
                }
                content += `</td>
                                </tr>`;
                i++;
                jj++;
                //if (!pro.OutOfStock) {
                //    totalQuantity += pro.Quantity;
                //    totalproduct = totalproduct + parseInt(pro.Quantity);
                //    totalPrice = totalPrice + parseFloat(pro.MoneyTQ);
                //}
            });
            totalproduct += shop.TotalProduct;
            totalPriceTQ += shop.TotalPriceTQ;
            totalPriceVN += shop.TotalPriceVN;
            content += `<tr>
                                                    <td colspan="3" class="td-50">
                                                        <div class="cost-content">
                                                            <div class="item">
                                                                <span class="float-left">
                                                                    Tiền hàng
                                                <i class="fa fa-question-circle"></i>
                                                                </span>
                                                                <span class="float-right">
                                                                    <span>`+ FormatMoney(shop.TotalPriceTQ) + `</span > ¥ / <span>` + FormatMoney(shop.TotalPriceVN) + `</span > Vnđ
                                            </span>
                                                            </div>
                                                            <div class="item">
                                                                <span class="float-left">
                                                                    Phí dịch vụ mua hàng (`+ serverper + `%)
                                                <i class="fa fa-question-circle"></i>
                                                                </span>
                                                                <span class="float-right">
                                                                    <span> `+  FormatMoney(shop.TotalServiceChargeTQ.toFixed(2)) + ` </span> ¥ / <span> ` + FormatMoney(parseInt(Math.round(shop.TotalServiceChargeVN))) + ` </span> Vnđ
                                            </span>
                                                            </div>
                                                            <div class="item">
                                                                <span class="float-left">
                                                                    Phí ship vận chuyển Trung Quốc
                                                <i class="fa fa-question-circle"></i>
                                                                </span>
                                                                <span class="float-right">
                                                                    <span> `+ shop.ShipChina + `</span> ¥ / <span> ` + FormatMoney(shop.ShipChinaVN) + `</span> Vnđ
                                            </span>
                                                            </div>
                                                            <div class="item border-none">
                                                                <span class="float-left">
                                                                    Phí ship vận chuyển từ kho TQ về kho Vn
                                                <i class="fa fa-question-circle"></i>
                                                                </span>
                                                                <span class="float-right">
                                                                    <span> - </span>Vnđ
                                            </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td colspan="3" class="td-50">
                                                        <div class="cost-content">
                                                            <div class="item">
                                                                <span class="float-left">
                                                                    Tổng số lượng sản phẩm trong shop
                                            </span>
                                                                <span class="float-right">
                                                                    <span> `+ FormatMoney(shop.TotalProduct) + `</span> sp
                                            </span>
                                                            </div>
                                                            <div class="item">
                                                                <span class="float-left">
                                                                    <input class="ht-checkbox" type="checkbox" disabled `;
            if (shop.Option2 == true) {
                content += `checked='checked'>`;
            }
            else {
                content += `>`;
            }
            content += ` Phí dịch vụ kiểm đếm<i class="fa fa-question-circle"></i>
                                                                </span>
                                                                <span class="float-right">
                                                                    <span>`+ shop.TongPhiKiemDem + `</span> Vnđ
                                            </span>
                                                            </div>
                                                            <div class="item">
                                                                <span class="float-left">
                                                                    <input class="ht-checkbox" type="checkbox" disabled `;
            if (shop.Option1 == true) {
                content += `checked='checked'>`;
            }
            else {
                content += `>`;
            }
            content += ` Phí dịch vụ gia cố <i class="fa fa-question-circle"></i>
                                                                </span>
                                                                <span class="float-right">
                                                                    <span> `+ FormatMoney(shop.PhiDongKien * exchange) + `</span> Vnđ
                                            </span>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>`;
            j++;
            total_price_china += shop.TotalPriceTQ;
            totalshipTQ += shop.ShipChina;
            totalshipTQVN += shop.ShipChinaVN;
            totalServiceperTQVND += shop.TotalServiceChargeVN;
            total_PhiDongKien = total_PhiDongKien + parseFloat(shop.PhiDongKien);
            total_PhiKiemDem = total_PhiKiemDem + parseFloat(shop.TongPhiKiemDem);
            total_ShipCsKh = total_ShipCsKh + parseFloat(shop.ShipCskh);
        });


        content += `</div>
                            <div class="ht-pop-dhprods">
                                <div class="left-content">
                                    <div class="header">TỔNG TIỀN ĐƠN HÀNG</div>
                                    <div class="cost-content">`;
        var phiphuThu = 0;
        if (phiphuThu <= Model.CheckPhuThu) {
            phiphuThu = Model.ConfigPhuThu;
        }
        var total = Model.TotalPriceTQ + Model.TotalServiceperTQ + totalshipTQ + total_PhiDongKien;
        content += `<table class="table table-bordered ht-table-tbody">
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <td style="text-align:center; font-weight:bold">
                                                        CNY(¥)
                                </td>
                                                    <td style="text-align:center; font-weight:bold">
                                                        VNĐ
                                </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Tổng sản phẩm
                                </td>
                                                    <td>
                                                        <span class="table-fr"> - </span>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr">  `+ FormatMoney(totalproduct) + ` <span style="color:#000;">sản phẩm</span></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Tỉ giá <i class="fa fa-question-circle"></i>
                                                    </td>
                                                    <td>
                                                        <span class="table-fr"> - </span>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr">`+ FormatMoney(exchange) + `</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Tổng tiền hàng <i class="fa fa-question-circle"></i>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr"> `+ FormatMoney(Model.TotalPriceTQ.toFixed(2)) + ` </span>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr"> `+ FormatMoney(parseInt(Math.round(Model.TotalPriceVN))) + `</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Tổng phí dịch vụ mua hàng (<span class="note-import"> `+ serverper + `%</span>) <i class="fa fa-question-circle"></i>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr">  `+ FormatMoney(Model.TotalServiceperTQ.toFixed(2)) + `</span>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr"> `+ FormatMoney(parseInt(Math.round(Model.TotalServicePerTQVN))) + `</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Tổng phí dịch vụ kiểm đếm <i class="fa fa-question-circle"></i>
                                                    </td>
                                                    <td>
                                                        <span class="table-fr"> - </span>
                                                    </td>
                                                    <td>
                                                        <span class="note-import table-fr">`+ FormatMoney(tongPhiKiemDem) + `</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tổng phí ship TQ <i class="fa fa-question-circle"></i></td>
                                                    <td><span class="note-import table-fr"> `+ FormatMoney(totalshipTQ) + `</span></td>
                                                    <td><span class="note-import table-fr">`+ FormatMoney(totalshipTQVN) + `</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Tổng phí dịch vụ gia cố <i class="fa fa-question-circle"></i></td>
                                                    <td><span class="note-import table-fr">`+ FormatMoney(total_PhiDongKien) + `</span></td>
                                                    <td><span class="note-import table-fr">`+ FormatMoney(total_PhiDongKien * exchange) + `</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Tổng phí phụ thu <i class="fa fa-question-circle"></i></td>
                                                    <td>
                                                        <span class="table-fr"> - </span>
                                                    </td>
                                                    <td><span class="note-import table-fr"> `+ FormatMoney(phiphuThu) + `</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span class="note-import" style="font-weight:bold">TIỀN THANH TOÁN TẠM TÍNH <i class="fa fa-question-circle"></i></span></td>
                                                    <td>
                                                        <span style="font-weight:bold;" class="note-import table-fr"> `+ FormatMoney(total.toFixed(2)) + `</span>
                                                    </td>
                                                    <td>
                                                        <span style="font-weight:bold;" class="note-import table-fr"> `+ FormatMoney(parseInt(Math.round(total * exchange + tongPhiKiemDem + phiphuThu))) + `</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

            </div>
                                </div>
                                <div class="right-content">
                                    <div class="cost-content">
                                        <div class="header">GHI CHÚ ĐƠN HÀNG KHÁCH</div>
                                        <textarea class="note-text" disabled> `+ Model.Note + `</textarea> <br />
                                        <div class="header">GHI CHÚ CSKH</div>
                                        <textarea class="note-text" disabled> `+ Model.NoteCskh + `</textarea>
                                    </div>
                                </div>

                            </div>`;
    }
    return content;
}
function FormatMoney(num) {

    var listNum = (num + '').split('.');
    var number = listNum[0].replace(/\,/g, '');
    if (!$.isNumeric(number)) {
        number = number.substring(0, number.length - 1);
    }
    var result = "0";
    if (parseInt(number) > 0) {
        result = parseInt(number) + '';
    }
    var i = 0;
    var count = 0;
    while (i < number.length) {
        if (i % 3 == 0 && i > 0) {
            var index = number.length - i;
            result = result.insertAt(index, ",");
            count++;
        }
        i++;
    }
    if (listNum.length > 1) {
        return result + "." + listNum[1];
    }
    return result;

}

function FormatMoneyInt(num) {
    var listNum = (num + '').split('.');
    var number = listNum[0].replace(/\,/g, '');
    if (!$.isNumeric(number)) {
        number = number.substring(0, number.length - 1);
    }
    var result = "0";
    if (parseInt(number) > 0) {
        result = parseInt(number) + '';
    }
    var i = 0;
    var count = 0;
    while (i < number.length) {
        if (i % 3 == 0 && i > 0) {
            var index = number.length - i;
            result = result.insertAt(index, ",");
            count++;
        }
        i++;
    }
    return result;

}

String.prototype.insertAt = function (index, string) {
    return this.substr(0, index) + string + this.substr(index);
}