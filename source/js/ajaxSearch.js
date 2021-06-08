function ajaxSearch() {
    function get_result() {
        //очищаем результаты поиска
        $('#search_result').html('');
        $('#search_result').css('display', 'block');

        $('#reset_live_search').css('display', 'block');
        //пока не получили результаты поиска - отобразим прелоадер
        // $('#search_result').append('<div><img width="30" src="/search/preloader.GIF"></div>');
        $.ajax({
            type: "POST",
            url: "/search/ajax_search.php",
            data: "q=" + q,
            dataType: 'json',
            success: function(json) {
                //очистим прелоадер
                $('#search_result').html('');
                $('#search_result').append('<div class="live-search"></div>');
                //добавляем каждый элемент массива json внутрь div-ника с class="live-search" (вёрстку можете использовать свою)
                $.each(json, function(index, element) {
                    $('#search_result').find('.live-search').append('<a href="' + element.URL + '" class="live-search__item no-barba"><span class="live-search__item-inner"><span class="live-search__item-name"><span class="live-search__item-hl">' + element.TITLE + '</span><p style="color:#999;">' + element.DATE_CHANGE + '</p></a>');
                    //console.log (element.BODY_FORMATED);
                });
            }
        });
    }
    var timerAjax = 0;
    var q = '';
    $(document).ready(function() {
        $('#q').keyup(function() {

            q = this.value;
            clearTimeout(timerAjax);
            timerAjax = setTimeout(get_result, 100);
        });
        $('#reset_live_search').click(function() {
            $('#search_result').html('');
            $('#search_result').css('display', 'none');
            $('#reset_live_search').css('display', 'none');
        });
        $(".vac-d-form-test2").on("click", function() {

                $(".vac-d-form2").hide(200),
                    $(".share_wrap").fadeOut(200)
            }),
            document.addEventListener('click', function(event) {

                // let target = event.target;
                if (event.target != $('.press-searchbar')) {
                    $('#search_result').css('display', 'none');
                    $('#reset_live_search').css('display', 'none');
                }
            });
    });
}