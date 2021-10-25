/**
 * judgement模块接口列表
 */

import axios from '../request/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const judgement = {
  // 分页获取文书
  getPageAPI(para) {
    return axios({
      url: 'http://127.0.0.1:4523/mock/441026/api/judgement/getPage',
      method: 'POST',
      para,
    });
  },
  // 按条件分页检索
  queryAPI(para) {
    return axios({
      url: '\thttp://127.0.0.1:4523/mock/441026/api/judgement/query',
      method: 'POST',
      para,
    });
  },
  // 新建裁判文书
  createAPI(para) {
    return axios({
      url: 'http://127.0.0.1:4523/mock/441026/api/judgement/create',
      method: 'POST',
      para,
    });
  },
  // 删除裁判文书
  deleteAPI(para) {
    return axios({
      url: 'http://127.0.0.1:4523/mock/441026/api/judgement/delete',
      method: 'POST',
      para,
    });
  },
  // 发布裁判文书
  publishAPI(para) {
    return axios({
      url: 'http://127.0.0.1:4523/mock/441026/api/judgement/publish',
      method: 'POST',
      para,
    });
  },
  // 修改裁判文书
  modifyAPI(para) {
    return axios({
      url: 'http://127.0.0.1:4523/mock/441026/api/judgement/modify',
      method: 'POST',
      para,
    });
  },
};

export default judgement;
