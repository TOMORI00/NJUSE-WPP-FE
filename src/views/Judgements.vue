<template>
  <div>
    <div>
      <a-form :form="searchForm" class="searchBar" layout="inline">
        <div
          style="display: flex; justify-content: center; flex-direction: column"
        >
          <a-form-item :label="searchTitle">
            <a-input
              v-decorator="['title']"
              placeholder="请输入文书标题"
              style="width: 300px;"
            />
          </a-form-item>
          <a-form-item
            v-if="checked"
            :key="1"
            label="案件类型"
            style="margin-left: 15px"
          >
            <a-input
              v-decorator="['type']"
              placeholder="请输入案件类型"
              style="width: 300px;"
            />
          </a-form-item>
          <a-form-item
            v-if="checked"
            :key="2"
            label="法院名称"
            style="margin-left: 15px"
          >
            <a-input
              v-decorator="['court']"
              placeholder="请输入法院名称"
              style="width: 300px;"
            />
          </a-form-item>
          <a-form-item
            v-if="checked"
            :key="3"
            label="时间"
            style="margin-left: 43px"
          >
            <a-input
              v-decorator="['judgeDate']"
              placeholder="请输入案件时间,格式为yyyy-mm-dd"
              style="width: 300px;"
            />
          </a-form-item>
        </div>
        <span style="margin-top: 8px; font-size: small; color: #7b7bff">
          高级检索
          <a-switch
            :checked="checked"
            style="margin-bottom: 4px"
            @change="handleCheckChange"
          />
        </span>
        <a-form-item
          :wrapper-col="formItemLayout.wrapperCol"
          style="margin-left: 30px"
        >
          <a-button type="primary" @click="query">
            检索
          </a-button>
        </a-form-item>
        <a-form-item :wrapper-col="formItemLayout.wrapperCol">
          <a-button type="primary" @click="resetSearchLine">
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-divider />
    <div>
      <div style="margin-bottom: 16px; margin-left: 3vw;">
        <a-button type="primary" @click="toCreate">
          新建
        </a-button>
        <a-button type="primary" @click="toModify">
          修改
        </a-button>
        <a-button type="primary" @click="del">
          删除
        </a-button>
        <a-button type="primary" @click="publish">
          发布
        </a-button>
        <a-modal
          :title="formTitle"
          :visible="visibility_commonModel"
          cancel-text="取消"
          ok-text="确认"
          @cancel="handleModelCancel"
          @ok="handleModelOK"
        >
          <a-form :form="commonForm">
            <a-form-item label="文书标题">
              <a-input
                v-decorator="[
                  'title',
                  { rules: [{ required: true, message: '请输入案件名称' }] },
                ]"
                placeholder="请输入文书标题"
              />
            </a-form-item>
            <a-form-item label="案件类型">
              <a-input
                v-decorator="[
                  'type',
                  { rules: [{ required: true, message: '请输入案件名称' }] },
                ]"
                placeholder="请输入案件类型"
              />
            </a-form-item>
            <a-form-item label="法院名称">
              <a-input
                v-decorator="[
                  'court',
                  { rules: [{ required: true, message: '请输入案件名称' }] },
                ]"
                placeholder="请输入法院名称"
              />
            </a-form-item>
            <a-form-item label="案由">
              <a-input
                v-decorator="[
                  'brief',
                  { rules: [{ required: true, message: '请输入案件名称' }] },
                ]"
                placeholder="请输入案由"
              />
            </a-form-item>
            <a-form-item label="案件正文">
              <a-upload
                v-decorator="[
                  'file',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                    rules: [{ required: true, message: '请选择文件' }],
                  },
                ]"
                :before-upload="beforeUpload"
                :show-upload-list="{ showRemoveIcon: false }"
              >
                <a-button>{{ uploadTip }}</a-button>
              </a-upload>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'radio',
        }"
        :rowKey="(record, index) => index"
        @change="handleTableChange"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Button as AButton,
  Divider as ADivider,
  Form as AForm,
  Input as AInput,
  message,
  Modal as AModal,
  Switch as ASwitch,
  Table as ATable,
  Upload as AUpload,
} from 'ant-design-vue';
import judgement from '../api/judgement';

const moment = require('moment');

Vue.use(AModal);
Vue.prototype.$message = message;

const checked = false;
const searchTitle = '按标题检索';
const formTitle = '新建条目';
const uploadTip = '上传正文文件';
const fileList = [];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const columns = [
  {
    title: '案件标题',
    dataIndex: 'title',
  },
  {
    title: '案件类型',
    dataIndex: 'type',
  },
  {
    title: '法院名称',
    dataIndex: 'court',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];
// 假数据
const data = [
  {
    brief: '借款合同纠纷 ',
    court: '太原市中级人民法院',
    id: 1,
    judgeDate: {},
    status: '0',
    title:
      '山西当代红华房地产开发有限公司与中信银行股份有限公司太原分行、李志鹏等借款合同纠纷二审民事裁定书',
    type: '民事案件',
  },
  {
    brief: '金融借款合同纠纷 ',
    court: '江苏省张家港市人民法院',
    id: 2,
    judgeDate: {},
    status: '0',
    title:
      '江苏张家港农村商业银行股份有限公司与孟兴、王小允金融借款合同纠纷执行裁定书',
    type: '执行案件',
  },
  {
    brief: '金融借款合同纠纷 ',
    court: '贵州省贵阳市中级人民法院',
    id: 333,
    judgeDate: {},
    status: '0',
    title:
      '浙越资产管理有限公司、招商银行股份有限公司贵阳分行金融借款合同纠纷执行审查类执行裁定书',
    type: '执行案件',
  },
  {
    brief: '金融借款合同纠纷 ',
    court: '筠连县人民法院',
    id: 4214,
    judgeDate: {},
    status: '0',
    title:
      '中国邮政储蓄银行股份有限公司筠连县支行与冯章连、陈静金融借款合同纠纷一审民事判决书',
    type: '民事案件',
  },
  {
    brief: '金融借款合同纠纷 ',
    court: '江苏省常熟市人民法院',
    id: 345,
    judgeDate: {},
    status: '0',
    title: '中国建设银行股份有限公司常熟分行与匡槿金融借款合同纠纷执行裁定书',
    type: '执行案件',
  },
  {
    brief: '借款合同纠纷 ',
    court: '宽城满族自治县人民法院',
    id: 6,
    judgeDate: {},
    status: '0',
    title:
      '河北宽城农村商业银行股份有限公司、王淑芹借款合同纠纷执行实施类执行裁定书',
    type: '执行案件',
  },
];

const emptyForm = {
  title: '',
  type: '',
  court: '',
  brief: '',
  file: [],
};

export default {
  data() {
    return {
      checked,
      searchTitle,
      formTitle,
      uploadTip,
      commonForm: this.$form.createForm(this, { name: 'judgementCreate' }),
      fileList,
      caseName: '',
      visibility_commonModel: false,
      data,
      formItemLayout,
      searchForm: this.$form.createForm(this, { name: 'judgementSearch' }),
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pagination: {
        defaultPageSize: 6,
        total: 0,
      },
    };
  },
  components: {
    AForm,
    AButton,
    ATable,
    AInput,
    AUpload,
    ASwitch,
    ADivider,
    AFormItem: AForm.Item,
  },
  mounted() {
    this.getPage(1);
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    resetSearchLine() {
      this.searchForm.setFieldsValue({
        title: '',
      });
    },
    getPage(pageNum) {
      this.loading = true;
      const pageSize = this.pagination.defaultPageSize;
      judgement
        .getPageAPI({ pageSize, pageNum })
        .then((res) => {
          this.pagination.total = res.data.data.docs.totalNum;
          this.data = res.data.data.docs.documents.map((o) => ({
            ...o,
            status: o.status === '0' ? '未发布' : '已发布',
          }));
          this.loading = false;
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    query() {
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          judgement
            .queryAPI({
              ...values,
              pageSize: 6,
              pageNum: 1,
            })
            .then((res) => {
              this.pagination.total = res.data.data.docs.totalNum;
              this.data = res.data.data.docs.documents.map((o) => ({
                ...o,
                status: o.status === '0' ? '未发布' : '已发布',
              }));
              this.loading = false;
            })
            .catch((e) => {
              this.$message.error(e);
            });
        }
      });
    },
    toCreate() {
      this.formTitle = '新建条目';
      this.visibility_commonModel = true;
    },
    toModify() {
      this.formTitle = '修改条目';
      this.visibility_commonModel = true;
    },
    handleModelOK() {
      this.commonForm.validateFields((err, values) => {
        if (!err) {
          const param = {
            ...values,
            judge_date: moment(this.nowDate).format('YYYY-MM-DD'),
          };
          console.log('创建的参数:', param);
          if (this.formTitle === '新建条目') {
            judgement
              .createAPI(param)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message.success('创建成功');
                  this.commonForm.setFieldsValue(emptyForm);
                  this.visibility_commonModel = false;
                } else {
                  this.$message.warn('创建失败');
                }
              })
              .catch((e) => {
                this.$message.error(e);
              })
              .finally(() => {
                this.getPage(1);
              });
          } else if (this.formTitle === '修改条目') {
            judgement
              .modifyAPI(values)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message.success('修改成功');
                  this.commonForm.setFieldsValue(emptyForm);
                  this.visibility_commonModel = false;
                } else {
                  this.$message.warn('修改失败');
                }
              })
              .catch((e) => {
                this.$message.error(e);
              })
              .finally(() => {
                this.getPage(1);
              });
          }
        }
      });
    },
    handleModelCancel() {
      this.visibility_commonModel = false;
    },
    beforeUpload(file) {
      this.fileList = [file];
      this.uploadTip = '重新上传';
      return false;
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && [e.file];
    },
    del() {
      judgement
        .deleteAPI(this.data[this.selectedRowKeys[0]].id)
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success('删除成功');
          } else {
            this.$message.warn('删除失败');
          }
        })
        .catch((e) => {
          this.$message.error(e);
        })
        .finally(() => {
          this.getPage(1);
          this.onSelectChange([]);
        });
    },
    publish() {
      judgement
        .publishAPI(this.data[this.selectedRowKeys[0]].id)
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success('发布成功');
          } else {
            this.$message.warn('发布失败');
          }
        })
        .catch((e) => {
          this.$message.error(e);
        })
        .finally(() => {
          this.getPage(1);
        });
    },
    handleTableChange(pagination) {
      this.getPage(pagination.current);
    },
    handleCheckChange() {
      this.checked = this.checked !== true;
    },
  },
};
</script>

<style>
.searchBar {
  display: flex;
  justify-content: center;
  margin-top: 4vh;
  width: 810px;
}
</style>
