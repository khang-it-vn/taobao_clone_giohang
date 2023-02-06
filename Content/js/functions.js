(function ($) {

    $(document).ready(function () {
        $('.ck-tooltip').tooltip();
        $('#txtfrom, #txtto').datetimepicker({
            format: 'dd-mm-yyyy',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });

        $(document).on("click", ".ht-sebtn", function () {
            var OrderID = "";
            if ($(".txtsearch").val() != "") {
                OrderID = $(".txtsearch").val();
                var link = "/don-hang/" + OrderID;
                window.location.href = link;
            } else {
                $(".txtsearch").notify("Bạn vui lòng nhập từ khóa tìm kiếm!", "error", { position: "bottom left" });
            }
        });
        $(document).on('change', '.txtsearch', function (e) {
            if (e.which = 13 || event.keyCode == 13) {
                var OrderID = "";
                if ($(".txtsearch").val() != "") {
                    OrderID = $(".txtsearch").val();
                    var link = "/don-hang/" + OrderID;
                    window.location.href = link;
                } else {
                    $(".txtsearch").notify("Bạn vui lòng nhập từ khóa tìm kiếm!", "error", { position: "bottom left" });
                }
            }
        })

    });

})(window.jQuery);