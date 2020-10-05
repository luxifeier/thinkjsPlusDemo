module.exports = class extends think.Controller {
async __before() {
    if(this.ctx.controller === 'admin' && this.ctx.action === 'index' || this.ctx.action === 'login'){
      //如果请求的是/admin/index,直接返回
      return;
    }
    //判断用户是否登录,通过session，创建一个会话，保存当前登录的信息
    let userinfo = await this.session('userinfo')//获取当前session会话中，userinfo
    if(think.isEmpty(userinfo)){//判断userinfo的值是否为空
      //userinfo为空，说明用户未登录，那么就重定向到/admin/index,登录页面去执行登录操作
      return this.redirect('/admin/index');//this.redirect()，重定向后，不会执行__beofre()后的对应xxxAaction()
    }
    else{
      return this.assign('userinfo',userinfo);//this.assign()给模板赋值，前端就可以通过{{userinfo.username}}调用，获取当前用户名
    }
  }
};
