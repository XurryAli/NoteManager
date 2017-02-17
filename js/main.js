/**
 * By Xurry
 * time  2015/10/21
 */


$(document).ready(function(){

    var markedOptions = {
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        smartLists: true,
        breaks: true
    };

    function doPreview(){
        // Title preview
        var $title_node = $('#note_title');
        titlePreview();
        $title_node.on('keyup', delayTitlePreview);

        // Content preview
        var $content_node = $('#note_content');
        $content_node.on('keyup', delayContentPreview)
    }

    var delayTitlePreview = function(){
        setTimeout(titlePreview, 500)
    };

    var delayContentPreview = function(){
        setTimeout(contentPreview, 500)
    };

    var titlePreview = function(){
        var $title_node = $('#note_title');
        var $preview_title_node = $('#pre_title');
        var title_text = $title_node.text();
        $preview_title_node.text(title_text);
    };

    var contentPreview = function(){
        var $note_content = $('#note_content');
        var $markdown_node = $('.markdown-body');
        console.log($note_content.text());
        var html = marked($note_content.val(), markedOptions);
        $markdown_node.html(html)
    };

    doPreview();



    // Calculate height
    var WINDOW_HEIGHT = $(window).height();
    console.log(WINDOW_HEIGHT);

    var setContentHeight = function(){
        var title_height = $('#note_title').outerHeight(true);
        var content_height = WINDOW_HEIGHT - title_height;

        $('#note_content').outerHeight(content_height);
        $('.preview').outerHeight(WINDOW_HEIGHT);
    };
    setContentHeight();

});
