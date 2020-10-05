const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async listAction(){
    const model = this.model('thinkjsplus_category');//实例化model
    const categorylist = await model.select();//获取'thinkjsplus_category'数据表中的内容
    return this.json(categorylist);//以json的方式输出内容
  }

  async addAction(){
    return this.display();
  }
};
