/**
 * By Xurry
 * time  2015/10/21
 * tip controller
 */
$(function() {

  /* 开启/取消全屏效果 */
  var startFullScreen = function() {
    $('.note-detail').addClass('fullscreen');
    $(".note-detail-top").addClass('fullscreen');
    $('.note-category').addClass('fullscreen');
    $('.note-content').addClass('fullscreen');
    $('.preview').removeClass('hidden');
  }
  var cancelFullScreen = function() {
    $('.note-detail').removeClass('fullscreen');
    $(".note-detail-top").removeClass('fullscreen');
    $('.note-category').removeClass('fullscreen');
    $('.note-content').removeClass('fullscreen');
    $('.preview').addClass('hidden');
  }

  /* 获取分类列表 */
  var getAllCat = function() {
    var catStr = localStorage.catList;
    var obj = JSON.parse(catStr);
    var itemTpl = $('#noteCatItemTmpl').html();
    var html = studyTplEngine(obj, itemTpl, 1);
    $('.note-cat-list ul').html(html);
  };

  /* 删除分类列表 */
  var delCat = function(id) {
    var catStr = localStorage.catList;
    var obj = JSON.parse(catStr);
    var index = 0;
    for(var i = 0; i<obj.length ; i++){
      if(obj[i].id == id){
        index = i;
      }
    }
    var tarObj = obj.splice(index,1);
    return obj;
  };

  /* 获取文章列表 */
  var getPostByCat = function(cid) {
    var postArr = new Array();
    var postList = JSON.parse(localStorage.postList);
    var index = 0;
    for(var i =0 ; i<postList.length; i++){
      var catId = postList[i].catId;
      if(catId == cid){
        postArr[index] = postList[i];
        index++;
      }
    }
    var itemTpl = $('#noteListTmpl').html();
    if(postArr.length == 0){
      $('.note-content-tips').removeClass('hidden');
    }
    else{
      $('.note-content-tips').addClass('hidden');
    }
    var html = studyTplEngine(postArr,itemTpl,2);
    $('.note-content-list ul').html(html);
  }

  /* 获得文章详情 */
  var getPostById = function(id) {
    var postArr = new Array();
    var postList = JSON.parse(localStorage.postList);
    var title,content;
    if(typeof(id)=='undefined' || id==null || id==""){
      title = '';
      content = '';
    }
    for(var i=0;i<postList.length;i++){
      if(postList[i].id == id){
        title = postList[i].title;
        content = postList[i].detail;
      }
    }
    $('.note-detail-title').html(title);
    console.log(content);
    $('.note-detail-content').val(content);
  }
  /* 新建笔记分类按钮 */
  $('.note-cat-addBtn a').bind({
    click: function() {
      $('#new-cat-input').removeClass('hidden');
      $('#new-cat-input')
      return false;
    }
  });

  /* 删除笔记分类按钮 */
  $('.note-cat-delBtn a').bind({
    click: function() {
      var catId = $('.note-cat-list ul li a.active').attr('data-id');
      var allObj = delCat(catId);
      localStorage.catList = JSON.stringify(allObj);
      getAllCat();
      $('.note-cat-list ul li a:first').addClass('active');
      getPostByCat();
      getPostById();
      return false;
    }
  });

  /* 新建分类输入框*/
  $('#new-cat-input').bind({
    focus: function() {

    },
    blur: function() {
      var cat = $(this).val();
      var catStr = localStorage.catList;
      var allObj = JSON.parse(catStr);
      var catObj = {
        "id":"cat"+(allObj.length+1),
        "name":cat,
        "count":0
      };
      allObj.push(catObj);
      localStorage.catList = JSON.stringify(allObj);
      getAllCat();
      $(this).addClass('hidden');
    }
  });

  /* 新建笔记按钮 */
  $('.note-content-addBtn a').bind({
    click: function() {
      var postList = localStorage.postList;
      var allObj = JSON.parse(postList);
      var cid = $('.note-cat-list ul li a.active').attr('data-id');
      console.log(cid);
      var postObj = {
        "id":"p"+(allObj.length+1),
        "catId":cid,
        "title":"无标题",
        "detail":"无内容"
      };
      allObj.push(postObj);
      localStorage.postList = JSON.stringify(allObj);
      getPostByCat($('.note-cat-list ul li a.active').attr('data-id'));
      $('.note-content-list ul li a:last').addClass('active');
      getPostById($('.note-content-list ul li a.active').attr('data-id'));
      return false;
    }
  });

  $(document).on('click','.note-cat-list ul li a',function(){
    $('.note-cat-list ul li a').removeClass('active');
    $(this).addClass('active');
    getPostByCat($(this).attr("data-id"));
    return false;
  });

  $(document).on('click','.note-content-list ul li a',function(){
    $('.note-content-list ul li a').removeClass('active');
    $(this).addClass('active');
    getPostById($(this).attr('data-id'))

    return false;
  });

  /* 关闭笔记按钮 */
  $('.note-detail-closeBtn a').bind({
    mouseenter: function() {
      $(this).addClass('spin');
    },
    mouseleave: function() {
      $(this).removeClass('spin');
    },
    click: function() {
      cancelFullScreen();
      return false;
    }
  });

  /* 编辑编辑区域 */
  $('.note-detail-title').bind({
    click: function() {
      startFullScreen();
    }
  });
  $('.note-detail-content').bind({
    click: function() {
      startFullScreen();
    }
  });
});
