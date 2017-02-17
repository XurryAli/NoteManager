/**
 * By Xurry
 * time  2015/10/21
 */

/* 测试数据 catObj:目录测试数据，*/
var catObj = '[{"id":"cat1","name":"HTML","count":2},{"id":"cat2","name":"Javascript","count":2},{"id":"cat3","name":"CSS","count":0},{"id":"cat4","name":"Jquery","count":1},{"id":"cat5","name":"AngularJS","count":0},{"id":"cat5","name":"Vue","count":0},{"id":"cat5","name":"React","count":2}]';
var postObj = '[{"id":"p1","catId":"cat1","title":"JavaScript开发规范要求","detail":"1、保证代码压缩后不出错;2、保证代码能通过特定IDE的自动格式化功能;3、使用标准的文档注释;4、使用规范有意义的变量名;5、不使用生偏语法;6、不在语句非赋值地方出生中文..."},{"id":"p2","catId":"cat1","title":"图片排版与字体排版","detail":"如果两张图片风格、内容、色调相近，颜色的安排符合某种规律，那么观众的眼睛就会非常流畅地路过你的图片，走到下一个关注点那里，这叫做对齐；观众的关注点就会停留在..."}]';

/* 简略的模版渲染 */
studyTplEngine = function(obj, itemTpl, tag) {
  var catHtml = '';
  var regId = new RegExp("\\${data.id}", "g");
  if (tag == 1) {
    var regName = new RegExp("\\${data.name}", "g");
    var regNum = new RegExp("\\${data.num}", "g");

    for (var i = 0; i < obj.length; i++) {
      var idTpl = itemTpl.replace(regId, obj[i].id);
      var nameTpl = idTpl.replace(regName, obj[i].name);
      var html = nameTpl.replace(regNum, obj[i].count);
      catHtml += html;
    }
  } else {
    var regTitle = new RegExp("\\${data.title}", "g");
    var regDetail = new RegExp("\\${data.detail}", "g");

    for (var i = 0; i < obj.length; i++) {
      var idTpl = itemTpl.replace(regId, obj[i].id);
      var titleTpl = idTpl.replace(regTitle, obj[i].title);
      var html = titleTpl.replace(regDetail, obj[i].detail);
      catHtml += html;
    }
  }
  return catHtml;
}

if (window.localStorage) {

  //初始化用户
  if (localStorage.user != null) {

  }
  else {
    localStorage.user = "user";
  }

  // 初始化笔记分类
  if (localStorage.catList != null) {
    localStorage.catList = catObj;
    var catStr = localStorage.catList;
    var obj = JSON.parse(catStr);
    var itemTpl = $('#noteCatItemTmpl').html();
    var html = studyTplEngine(obj, itemTpl, 1);
    $('.note-cat-list ul').html(html);
    $('.note-cat-list ul li a:first').addClass('active');
  }
  else {
    localStorage.catList = catObj;
  }

  // 初始化文章
  if (localStorage.noteList != null) {
    localStorage.postList = postObj;
    var postStr = localStorage.postList;
    var obj = JSON.parse(postStr);
    var itemTpl = $('#noteListTmpl').html();
    var html = studyTplEngine(obj, itemTpl, 2);
    $('.note-content-list ul').html(html);
    $('.note-content-list ul li a:first').addClass('active');
  }
  else {
    localStorage.postList = postObj;
  }

} else {
  alert('您的浏览器不支持本地存储');
}
