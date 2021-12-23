/**
 * judgement模块接口列表
 */

import axios from '../request/http'; // 导入http中创建的axios实例

// const baseURL = 'http://101.132.253.222:8081/api/judgement';
const baseURL = 'http://localhost:8081/api/judgement';

const judgement = {
  // 分页获取文书
  getPageAPI(data) {
    return axios.post(`${baseURL}/getPage`, data);
  },
  // 按条件分页检索
  queryAPI(data) {
    return axios.post(`${baseURL}/query`, data);
  },
  // 新建裁判文书
  createAPI(data) {
    return axios.post(`${baseURL}/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  // 删除裁判文书
  deleteAPI(data) {
    return axios.delete(`${baseURL}/delete/${data}`);
  },
  // 发布裁判文书
  publishAPI(data) {
    return axios.get(`${baseURL}/publish/${data}`);
  },
  // 修改裁判文书
  modifyAPI(data, id) {
    return axios.post(`${baseURL}/modifyFile/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export default judgement;
