const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.display();//显示'/admin/index'登录页面
  }

  async loginAction() {//登录调用
    if(this.isPost){//判断是否为POST请求
      let username = this.post('username');//获取前端提交过来的username的值
      let password = this.post('password');//获取前端提交过来的password的值
      let usermodel = this.model('thinkjsplus_user');//获取模型的实例
      let data = await usermodel.where({username:username,password:password}).find();//从数据表中查找对应的用户名和密码
      let flag = think.isEmpty(data);//判断data是否为空，为空说明用户不存在，不为空说明用户存在
      if(flag){
        return this.fail(403,'账户密码错误!请重新填写');//登录失败，返回错误信息
      }
      else{
        this.session('userinfo',data);//创建一个session保存登录的用户信息,判断是否是当前用户登录
        return this.redirect('/index/index');//登录成功跳转到'/index/index'页面
      }
    }
    else{
      //return this.display();//应该渲染'/admin/login'页面，由于页面不存在报错
      return this.fail(404,'请求页面不存在!');
    }
  }

  async logoutAction(){//注销调用
    await this.session(null);//删除当前用户session信息
    return this.redirect('/index/index');//如果当前用户登录成功，重定向到'/index/index'页面
  }
};
