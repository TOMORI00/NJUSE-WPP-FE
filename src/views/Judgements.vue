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
              aria-multiline="true"
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
              v-decorator="['judge_date']"
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
    <a-divider/>
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
              <a-textarea
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
    title: 'id',
    dataIndex: 'keyId',
  },
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
const data = [];

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
        defaultCurrent: 1,
        total: 0,
      },
      searchStatus: false,
      searchCondition: {},
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
    ATextarea: AInput.TextArea,
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
        type: '',
        court: '',
        judge_date: '',
      });
      this.searchStatus = false;
      this.getPage(1);
      this.$set(this.pagination, 'current', 1);
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
          console.log(this.data);
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    query() {
      this.searchStatus = true;
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          const tempValue = values;
          for (const key of Object.keys(tempValue)) {
            if (tempValue[key] === '') {
              tempValue[key] = undefined;
            }
          }
          this.searchCondition = {
            ...tempValue,
            pageSize: 6,
            pageNum: 1,
          };
          judgement
            .queryAPI({
              ...tempValue,
              pageSize: 6,
              pageNum: 1,
            })
            .then((res) => {
              // 不能直接写this.pagination.current = 1; 由于Vue不能动态的检测到对象属性变化所致
              this.$set(this.pagination, 'current', 1);
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
      this.$nextTick(() => {
        setTimeout(() => {
          this.commonForm.setFieldsValue(emptyForm);
        });
      });
    },
    toModify() {
      if (this.selectedRowKeys[0] === undefined) {
        message.warn('请选择条目');
      } else {
        this.formTitle = '修改条目';
        this.uploadTip = '重新上传';
        this.visibility_commonModel = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.commonForm.setFieldsValue({
              title: this.data[this.selectedRowKeys[0]].title,
              type: this.data[this.selectedRowKeys[0]].type,
              court: this.data[this.selectedRowKeys[0]].court,
              brief: this.data[this.selectedRowKeys[0]].brief,
              file: [],
            });
          });
        });
      }
    },
    handleModelOK() {
      this.commonForm.validateFields((err, values) => {
        if (!err) {
          if (this.formTitle === '新建条目') {
            let tempId = 0;
            const formData = new FormData();
            formData.append('file', values.file[0]);
            judgement
              .createUploadAPI(formData)
              .then((res) => {
                if (res.status === 200) {
                  tempId = res.data.data.id;
                  const { file, ...paramWithoutFile } = {
                    ...values,
                    judge_date: moment(this.nowDate).format('YYYY-MM-DD'),
                    id: tempId,
                  };
                  judgement
                    .createAPI(paramWithoutFile)
                    .then((r) => {
                      if (r.data.code === 200) {
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
                }
              });
          } else if (this.formTitle === '修改条目') {
            const formData = new FormData();
            formData.append('file', values.file[0]);
            judgement
              .modifyUploadAPI(formData, this.data[this.selectedRowKeys[0]].keyId)
              .then((res) => {
                if (res.status === 200) {
                  const { file, ...paramWithoutFile } = { ...values, keyId: this.data[this.selectedRowKeys[0]].keyId };
                  judgement
                    .modifyAPI(paramWithoutFile)
                    .then((r) => {
                      if (r.data.code === 200) {
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
        .deleteAPI(this.data[this.selectedRowKeys[0]].keyId)
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
        .publishAPI(this.data[this.selectedRowKeys[0]].keyId)
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
      // 如果是默认的结果
      if (!this.searchStatus) {
        this.getPage(pagination.current);
        return;
      }
      // 按条件检索
      this.searchCondition.pageNum = pagination.current;
      judgement
        .queryAPI(this.searchCondition)
        .then((res) => {
          this.pagination.total = res.data.data.docs.totalNum;
          this.data = res.data.data.docs.documents.map((o) => ({
            ...o,
            status: o.status === '0' ? '未发布' : '已发布',
          }));
          this.$set(this.pagination, 'current', pagination.current);
          this.loading = false;
        })
        .catch((e) => {
          this.$message.error(e);
        });
      this.pagination.current = 1;
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
