(function($){

    $(document).ready(function (){

        $('.ck-tooltip, .ht-dskn-iftxt').tooltip();

        $('#form_datetime1, #form_datetime2').datetimepicker({
            format: 'dd/mm/yyyy',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });

        $('.ck-pop-lgfb').click(function (){
            $('#ck-popdnf').modal('show');
            $('#ck-popdk').modal('hide');
        });
    });

})(window.jQuery);