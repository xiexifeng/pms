layui.use(['element','table'], function(){

  var element = layui.element;
  var table = layui.table;
  var $ = layui.$ //重点处

  //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
  var layid = location.hash.replace(/^#operateCenter=/, '');
  element.tabChange('operateCenter', layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项
  
  //监听Tab切换，以改变地址hash值
  element.on('tab(operateCenter)', function(){
    location.hash = 'operateCenter='+ this.getAttribute('lay-id');
  });
  //监听选项卡删除
  element.on('tabDelete(operateCenter)', function(data){
    console.log(this); //当前Tab标题所在的原始DOM元素
    console.log(data.index); //得到当前Tab的所在下标
    console.log(data.elem); //得到当前的Tab大容器
  });
  //监听导航菜单的点击
  element.on('nav(operateCenter)', function(elem){
    console.log(elem); //得到当前点击的DOM对象
  });
  //监听折叠面板
  element.on('collapse(filter)', function(data){
    console.log(data.show); //得到当前面板的展开状态，true或者false
    console.log(data.title); //得到当前点击面板的标题区域DOM对象
    console.log(data.content); //得到当前点击面板的内容区域DOM对象
  });
  //第一个实例
  table.render({
    elem: '#userList'
    ,height: 312
    ,url: '/demo/table/user/' //数据接口
    ,method:'post'
    ,data:{tourId:'111',rounds:1,playerName:2}
    ,page: true //开启分页
    ,cols: [[ //表头
      {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
      ,{field: 'username', title: '用户名', width:80}
      ,{field: 'sex', title: '性别', width:80, sort: true}
      ,{field: 'city', title: '城市', width:80} 
      ,{field: 'sign', title: '签名', width: 177}
      ,{field: 'experience', title: '积分', width: 80, sort: true}
      ,{field: 'score', title: '评分', width: 80, sort: true}
      ,{field: 'classify', title: '职业', width: 80}
      ,{field: 'wealth', title: '财富', width: 135, sort: true}
    ]]
  });

  //触发事件
  var active = {
    tabAdd: function(){
      //新增一个Tab项
      element.tabAdd('operateCenter', {
        title: '新选项'+ (Math.random()*1000|0) //用于演示
        ,content: '内容'+ (Math.random()*1000|0)
        ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
      })
    }
    ,tabDelete: function(othis){
      //删除指定Tab项
      element.tabDelete('operateCenter', '111'); //删除：“商品管理”
      
      
      othis.addClass('layui-btn-disabled');
    }
    ,tabChange: function(){
      //切换到指定Tab项
      element.tabChange('operateCenter', '112'); //切换到：用户管理
    }
  };

  var openMenu = function(title, content, id) {
   
    if(existMenu(id)){
        element.tabChange('operateCenter', id); //切换到：用户管理
    }else{
        element.tabAdd('operateCenter', {
            title: title 
            ,width: '100%'
            ,height: '100%'
            ,content: '<iframe id="modularpage" name="modularpage" width="980px" height="700px" frameborder="0" scrolling="no" src="' + content + '"></iframe>'
            ,id: id //实际使用一般是规定好的id，这里以时间戳模拟下
          }) 
       element.tabChange('operateCenter', id);
    }
  }

  var existMenu = function(id){
      return $("li[lay-id='"+id+"']").length > 0;
  }
  
  $('a').on('click', function(){
    var othis = $(this);
    var menuId = othis.attr("id");
    var menuName = othis.text();
    var tabId = menuId + 'Tab';
    var content = othis.attr("content");
    openMenu(menuName,content,tabId)
    //active[tabName] ? active[type].call(this, othis) : '';
  });
  
  //Hash地址的定位
  var layid = location.hash.replace(/^#operateCenter=/, '');
  element.tabChange('operateCenter', layid);
  
  element.on('tab(operateCenter)', function(elem){
    location.hash = 'operateCenter='+ $(this).attr('lay-id');
  });
});