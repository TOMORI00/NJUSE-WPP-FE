/**
 * judgement模块接口列表
 */

import axios from '../request/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const judgement = {
  // 分页获取文书
  getPageAPI(data) {
    return axios.post('http://127.0.0.1:4523/mock/441026/api/judgement/getPage', data);
  },
  // 按条件分页检索
  queryAPI(data) {
    return axios.post('http://127.0.0.1:4523/mock/441026/api/judgement/query', data);
  },
  // 新建裁判文书
  createAPI(data) {
    return axios.post('http://127.0.0.1:4523/mock/441026/api/judgement/create', data);
  },
  // 删除裁判文书
  deleteAPI(data) {
    return axios.delete('http://127.0.0.1:4523/mock/441026/api/judgement/delete', { params: { id: data } });
  },
  // 发布裁判文书
  publishAPI(data) {
    return axios.get('http://127.0.0.1:4523/mock/441026/api/judgement/publish', { params: { id: data } });
  },
  // 修改裁判文书
  modifyAPI(data) {
    return axios.post('http://127.0.0.1:4523/mock/441026/api/judgement/modify', data);
  },
};

export default judgement;
