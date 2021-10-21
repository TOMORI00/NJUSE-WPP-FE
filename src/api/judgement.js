/**
 * judgement模块接口列表
 */

import axios from '../request/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const judgement = {
  login() {
    return axios.get('http://localhost:8088');
  },
};

export default judgement;
