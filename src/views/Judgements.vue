<template>
  <div>
    <SearchLine></SearchLine>
    <a-divider/>
    <div>
      <div style="margin-bottom: 16px; margin-left: 3vw;">
        <a-button type="primary" @click="toCreate">新建</a-button>
        <a-button type="primary" @click="toModify">修改</a-button>
        <a-button type="primary" @click="del">删除</a-button>
        <a-button type="primary" @click="publish">发布</a-button>
        <a-modal
          :title="formTitle"
          :visible="visibility_commonModel"
          cancel-text="取消"
          ok-text="确认"
          @cancel="handleModelCancel"
          @ok="handleModelOK"
        >
          <a-form :form="commonForm">
            <a-form-item label="案件标题">
              <a-textarea
                v-decorator="['title', { rules: [{ required: true, message: '请输入案件标题' }] },]"
                placeholder="请输入案件标题"
              />
            </a-form-item>
            <a-form-item label="案件类型">
              <a-input
                v-decorator="['type', { rules: [{ required: true, message: '请输入案件类型' }] },]"
                placeholder="请输入案件类型"
              />
            </a-form-item>
            <a-form-item label="审理法院">
              <a-input
                v-decorator="['court', { rules: [{ required: true, message: '请输入审理法院' }] },]"
                placeholder="请输入审理法院"
              />
            </a-form-item>
            <a-form-item label="起诉方">
              <a-input
                v-decorator="['accuser', { rules: [{ required: true, message: '请输入起诉方' }] },]"
                placeholder="请输入起诉方"
              />
            </a-form-item>
            <a-form-item label="应诉方">
              <a-input
                v-decorator="['defendant', { rules: [{ required: true, message: '请输入应诉方' }] },]"
                placeholder="请输入应诉方"
              />
            </a-form-item>
            <a-form-item label="涉案银行">
              <a-input
                v-decorator="['bank', { rules: [{ required: true, message: '请输入涉案银行' }] },]"
                placeholder="请输入涉案银行"
              />
            </a-form-item>
            <a-form-item label="银行涉诉身份">
              <a-input
                v-decorator="['bankCharacter', { rules: [{ required: true, message: '请输入银行涉诉身份' }] },]"
                placeholder="请输入银行涉诉身份"
              />
            </a-form-item>
            <a-form-item label="原由">
              <a-input
                v-decorator="['cause', { rules: [{ required: true, message: '请输入原由' }] },]"
                placeholder="请输入原由"
              />
            </a-form-item>
            <a-form-item label="判决内容">
              <a-input
                v-decorator="['judgement', { rules: [{ required: true, message: '请输入判决内容' }] },]"
                placeholder="请输入判决内容"
              />
            </a-form-item>
            <a-form-item label="判决结果分类">
              <a-input
                v-decorator="['judgementType', { rules: [{ required: true, message: '请输入判决结果分类' }] },]"
                placeholder="请输入判决结果分类"
              />
            </a-form-item>
            <a-form-item label="处罚措施">
              <a-input
                v-decorator="['measure', { rules: [{ required: true, message: '请输入处罚措施' }] },]"
                placeholder="请输入处罚措施"
              />
            </a-form-item>
            <a-form-item label="涉案金额">
              <a-input
                v-decorator="['amount', { rules: [{ required: true, message: '请输入涉案金额' }] },]"
                placeholder="请输入涉案金额"
              />
            </a-form-item>
            <a-form-item label="司法依据">
              <a-input
                v-decorator="['basis', { rules: [{ required: true, message: '请输入司法依据' }] },]"
                placeholder="请输入司法依据"
              />
            </a-form-item>
            <a-form-item label="案件年份">
              <a-input
                v-decorator="['occurrenceYear', { rules: [{ required: true, message: '请输入案件年份' }] },]"
                placeholder="请输入案件年份"
              />
            </a-form-item>
            <a-form-item label="裁判日期">
              <a-input
                v-decorator="['judgementDate', { rules: [{ required: true, message: '请输入裁判日期' }] },]"
                placeholder="请输入裁判日期"
              />
            </a-form-item>
            <a-form-item label="案件正文">
              <a-upload
                v-decorator="['transcript', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                  rules: [{ required: true, message: '请选择文件' }]
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
      >
        <div slot="expandedRowRender" slot-scope="record" class="expandedRow">
          <div class="subExpandedRow">
            <strong>审理法院：</strong>
            <p>{{ record.court }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>起诉方：</strong>
            <p>{{ record.accuser }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>应诉方：</strong>
            <p>{{ record.defendant }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>原由：</strong>
            <p>{{ record.cause }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>判决内容：</strong>
            <p>{{ record.judgement }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>涉案金额：</strong>
            <p>{{ record.amount }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>处罚措施：</strong>
            <p>{{ record.measure }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>司法依据：</strong>
            <p>{{ record.basis }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>案件年份：</strong>
            <p>{{ record.occurrenceYear }}</p>
          </div>
          <div class="subExpandedRow">
            <strong>文书全文：</strong>
            <p id="to-transcript" @click="transcriptVisible = !transcriptVisible">点击查看</p>
            <a-modal v-model="transcriptVisible" centered>
              <template slot="footer">
                <a-button key="submit" type="primary" @click="transcriptVisible = !transcriptVisible">
                  返回
                </a-button>
              </template>
              <strong>文书全文：</strong>
              <p>{{ record.transcript }}</p>
            </a-modal>
          </div>
        </div>
      </a-table>
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
import SearchLine from '../components/SearchLine';

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
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: '案件类型',
    dataIndex: 'type',
  },
  {
    title: '涉案银行名称',
    dataIndex: 'bank',
  },
  {
    title: '银行涉诉身份',
    dataIndex: 'bankCharacter',
  },
  {
    title: '判决结果分类',
    dataIndex: 'judgementType',
  },
  {
    title: '案件年份',
    dataIndex: 'occurrenceYear',
  },
  {
    title: '裁判日期',
    dataIndex: 'judgementDate',
  },
];
const data = [
  {
    id: 1,
    title: 'xxx',
    type: '1',
    court: 'yyy',
    accuser: 'a',
    defendant: 'b',
    bank: 'zzz',
    bankCharacter: '2',
    cause: 'abc',
    judgement: 'def',
    judgementType: '3',
    measure: 'ghi',
    amount: '123',
    basis: 'jkl',
    judgementDate: 'yyyy-mm-dd',
    occurrenceYear: '1234',
    transcript: 'aaabbbcccdddeeefff1',
  },
  {
    id: 2,
    title: 'xxy',
    type: '1',
    court: 'yyy',
    accuser: 'a',
    defendant: 'b',
    bank: 'zzz',
    bankCharacter: '2',
    cause: 'abc',
    judgement: 'def',
    judgementType: '3',
    measure: 'ghi',
    amount: '123',
    basis: 'jkl',
    judgementDate: 'yyyy-mm-dd',
    occurrenceYear: '1234',
    transcript: 'aaabbbcccdddeeefff2',
  },
  {
    id: 3,
    title: 'xxz',
    type: '1',
    court: 'yyy',
    accuser: 'a',
    defendant: 'b',
    bank: 'zzz',
    bankCharacter: '2',
    cause: 'abc',
    judgement: 'def',
    judgementType: '3',
    measure: 'ghi',
    amount: '123',
    basis: 'jkl',
    judgementDate: 'yyyy-mm-dd',
    occurrenceYear: '1234',
    transcript: 'aaabbbcccdddeeefff3',
  },
];
const emptyForm = {
  title: '',
  type: '',
  court: '',
  accuser: '',
  defendant: '',
  bank: '',
  bankCharacter: '',
  cause: '',
  judgement: '',
  judgementType: '',
  measure: '',
  amount: '',
  basis: '',
  judgementDate: '',
  occurrenceYear: '',
  transcript: [],
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
      transcriptVisible: false,
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
    SearchLine,
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
      // this.loading = true;
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
                      this.$set(this.pagination, 'current', 1);
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
                      this.$set(this.pagination, 'current', 1);
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
          this.$set(this.pagination, 'current', 1);
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
          this.onSelectChange([]);
          this.$set(this.pagination, 'current', 1);
        });
    },
    handleTableChange(pagination) {
      this.$set(this.pagination, 'current', pagination.current);
      // 如果是默认的结果
      if (!this.searchStatus) {
        this.getPage(pagination.current);
      } else {
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
      }
    },
    handleCheckChange() {
      this.checked = this.checked !== true;
    },
  },
};
</script>
<!--<script>-->
<!--import Vue from 'vue';-->
<!--import {-->
<!--  Button as AButton,-->
<!--  Divider as ADivider,-->
<!--  message,-->
<!--  Modal as AModal,-->
<!--  Table as ATable,-->
<!--} from 'ant-design-vue';-->
<!--import judgement from '../api/judgement';-->
<!--import SearchLine from '../components/SearchLine';-->
<!--import CommonModal from '../components/CommonModal';-->

<!--Vue.use(AModal);-->
<!--Vue.prototype.$message = message;-->

<!--const formTitle = '新建条目';-->
<!--const fileList = [];-->
<!--const columns = [-->
<!--  {-->
<!--    title: '案件标题',-->
<!--    dataIndex: 'title',-->
<!--    sorter: (a, b) => a.title.localeCompare(b.title),-->
<!--  },-->
<!--  {-->
<!--    title: '案件类型',-->
<!--    dataIndex: 'type',-->
<!--  },-->
<!--  {-->
<!--    title: '涉案银行名称',-->
<!--    dataIndex: 'bank',-->
<!--  },-->
<!--  {-->
<!--    title: '银行涉诉身份',-->
<!--    dataIndex: 'bankCharacter',-->
<!--  },-->
<!--  {-->
<!--    title: '判决结果分类',-->
<!--    dataIndex: 'judgementType',-->
<!--  },-->
<!--  {-->
<!--    title: '案件年份',-->
<!--    dataIndex: 'occurrenceYear',-->
<!--  },-->
<!--  {-->
<!--    title: '裁判日期',-->
<!--    dataIndex: 'judgementDate',-->
<!--  },-->
<!--];-->
<!--const data = [-->
<!--  {-->
<!--    title: 'xxx',-->
<!--    type: '1',-->
<!--    court: 'yyy',-->
<!--    accuser: 'a',-->
<!--    defendant: 'b',-->
<!--    bank: 'zzz',-->
<!--    bankCharacter: '2',-->
<!--    cause: 'abc',-->
<!--    judgement: 'def',-->
<!--    judgementType: '3',-->
<!--    measure: 'ghi',-->
<!--    amount: '123',-->
<!--    basis: 'jkl',-->
<!--    judgementDate: 'yyyy-mm-dd',-->
<!--    occurrenceYear: '1234',-->
<!--    transcript: 'aaabbbcccdddeeefff',-->
<!--  },-->
<!--  {-->
<!--    title: 'xxy',-->
<!--    type: '1',-->
<!--    court: 'yyy',-->
<!--    accuser: 'a',-->
<!--    defendant: 'b',-->
<!--    bank: 'zzz',-->
<!--    bankCharacter: '2',-->
<!--    cause: 'abc',-->
<!--    judgement: 'def',-->
<!--    judgementType: '3',-->
<!--    measure: 'ghi',-->
<!--    amount: '123',-->
<!--    basis: 'jkl',-->
<!--    judgementDate: 'yyyy-mm-dd',-->
<!--    occurrenceYear: '1234',-->
<!--    transcript: 'aaabbbcccdddeeefff',-->
<!--  },-->
<!--  {-->
<!--    title: 'xxz',-->
<!--    type: '1',-->
<!--    court: 'yyy',-->
<!--    accuser: 'a',-->
<!--    defendant: 'b',-->
<!--    bank: 'zzz',-->
<!--    bankCharacter: '2',-->
<!--    cause: 'abc',-->
<!--    judgement: 'def',-->
<!--    judgementType: '3',-->
<!--    measure: 'ghi',-->
<!--    amount: '123',-->
<!--    basis: 'jkl',-->
<!--    judgementDate: 'yyyy-mm-dd',-->
<!--    occurrenceYear: '1234',-->
<!--    transcript: 'aaabbbcccdddeeefff',-->
<!--  },-->
<!--];-->
<!--const emptyForm = {-->
<!--  title: '',-->
<!--  type: '',-->
<!--  court: '',-->
<!--  accuser: '',-->
<!--  defendant: '',-->
<!--  bank: '',-->
<!--  bankCharacter: '',-->
<!--  cause: '',-->
<!--  judgement: '',-->
<!--  judgementType: '',-->
<!--  measure: '',-->
<!--  amount: '',-->
<!--  basis: '',-->
<!--  judgementDate: '',-->
<!--  occurrenceYear: '',-->
<!--  transcript: [],-->
<!--};-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      data,-->
<!--      fileList,-->
<!--      caseName: '',-->
<!--      visibility_commonModel: false,-->
<!--      formTitle,-->
<!--      commonForm: this.$form.createForm(this, { name: 'judgementCreate' }),-->
<!--      emptyForm,-->
<!--      searchForm: this.$form.createForm(this, { name: 'judgementSearch' }),-->
<!--      columns,-->
<!--      selectedRowKeys: [], // Check here to configure the default column-->
<!--      loading: false,-->
<!--      transcriptVisible: false,-->
<!--      pagination: {-->
<!--        defaultPageSize: 6,-->
<!--        defaultCurrent: 1,-->
<!--        total: 0,-->
<!--      },-->
<!--      searchStatus: false,-->
<!--      searchCondition: {},-->
<!--    };-->
<!--  },-->
<!--  components: {-->
<!--    CommonModal,-->
<!--    SearchLine,-->
<!--    AButton,-->
<!--    ATable,-->
<!--    ADivider,-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getPage(1);-->
<!--  },-->
<!--  methods: {-->
<!--    onSelectChange(selectedRowKeys) {-->
<!--      this.selectedRowKeys = selectedRowKeys;-->
<!--    },-->
<!--    getPage(pageNum) {-->
<!--      // this.loading = true;-->
<!--      const pageSize = this.pagination.defaultPageSize;-->
<!--      judgement-->
<!--        .getPageAPI({ pageSize, pageNum })-->
<!--        .then((res) => {-->
<!--          this.pagination.total = res.data.data.docs.totalNum;-->
<!--          this.data = res.data.data.docs.documents.map((o) => ({-->
<!--            ...o,-->
<!--            status: o.status === '0' ? '未发布' : '已发布',-->
<!--          }));-->
<!--          this.loading = false;-->
<!--          console.log(this.data);-->
<!--        })-->
<!--        .catch((e) => {-->
<!--          this.$message.error(e);-->
<!--        });-->
<!--    },-->
<!--    query() {-->
<!--      this.searchStatus = true;-->
<!--      this.searchForm.validateFields((err, values) => {-->
<!--        if (!err) {-->
<!--          this.loading = true;-->
<!--          const tempValue = values;-->
<!--          for (const key of Object.keys(tempValue)) {-->
<!--            if (tempValue[key] === '') {-->
<!--              tempValue[key] = undefined;-->
<!--            }-->
<!--          }-->
<!--          this.searchCondition = {-->
<!--            ...tempValue,-->
<!--            pageSize: 6,-->
<!--            pageNum: 1,-->
<!--          };-->
<!--          judgement-->
<!--            .queryAPI({-->
<!--              ...tempValue,-->
<!--              pageSize: 6,-->
<!--              pageNum: 1,-->
<!--            })-->
<!--            .then((res) => {-->
<!--              // 不能直接写this.pagination.current = 1; 由于Vue不能动态的检测到对象属性变化所致-->
<!--              this.$set(this.pagination, 'current', 1);-->
<!--              this.pagination.total = res.data.data.docs.totalNum;-->
<!--              this.data = res.data.data.docs.documents.map((o) => ({-->
<!--                ...o,-->
<!--                status: o.status === '0' ? '未发布' : '已发布',-->
<!--              }));-->
<!--              this.loading = false;-->
<!--            })-->
<!--            .catch((e) => {-->
<!--              this.$message.error(e);-->
<!--            });-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    toCreate() {-->
<!--      this.formTitle = '新建条目';-->
<!--      this.visibility_commonModel = true;-->
<!--      this.$nextTick(() => {-->
<!--        setTimeout(() => {-->
<!--          this.commonForm.setFieldsValue(emptyForm);-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--    toModify() {-->
<!--      if (this.selectedRowKeys[0] === undefined) {-->
<!--        message.warn('请选择条目');-->
<!--      } else {-->
<!--        this.formTitle = '修改条目';-->
<!--        this.uploadTip = '重新上传';-->
<!--        this.visibility_commonModel = true;-->
<!--        this.$nextTick(() => {-->
<!--          setTimeout(() => {-->
<!--            this.commonForm.setFieldsValue({-->
<!--              title: this.data[this.selectedRowKeys[0]].title,-->
<!--              type: this.data[this.selectedRowKeys[0]].type,-->
<!--              court: this.data[this.selectedRowKeys[0]].court,-->
<!--              brief: this.data[this.selectedRowKeys[0]].brief,-->
<!--              file: [],-->
<!--            });-->
<!--          });-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    del() {-->
<!--      judgement-->
<!--        .deleteAPI(this.data[this.selectedRowKeys[0]].keyId)-->
<!--        .then((res) => {-->
<!--          if (res.data.code === 200) {-->
<!--            this.$message.success('删除成功');-->
<!--          } else {-->
<!--            this.$message.warn('删除失败');-->
<!--          }-->
<!--        })-->
<!--        .catch((e) => {-->
<!--          this.$message.error(e);-->
<!--        })-->
<!--        .finally(() => {-->
<!--          this.getPage(1);-->
<!--          this.onSelectChange([]);-->
<!--          this.$set(this.pagination, 'current', 1);-->
<!--        });-->
<!--    },-->
<!--    publish() {-->
<!--      judgement-->
<!--        .publishAPI(this.data[this.selectedRowKeys[0]].keyId)-->
<!--        .then((res) => {-->
<!--          if (res.data.code === 200) {-->
<!--            this.$message.success('发布成功');-->
<!--          } else {-->
<!--            this.$message.warn('发布失败');-->
<!--          }-->
<!--        })-->
<!--        .catch((e) => {-->
<!--          this.$message.error(e);-->
<!--        })-->
<!--        .finally(() => {-->
<!--          this.getPage(1);-->
<!--          this.onSelectChange([]);-->
<!--          this.$set(this.pagination, 'current', 1);-->
<!--        });-->
<!--    },-->
<!--    handleTableChange(pagination) {-->
<!--      this.$set(this.pagination, 'current', pagination.current);-->
<!--      // 如果是默认的结果-->
<!--      if (!this.searchStatus) {-->
<!--        this.getPage(pagination.current);-->
<!--      } else {-->
<!--        // 按条件检索-->
<!--        this.searchCondition.pageNum = pagination.current;-->
<!--        judgement-->
<!--          .queryAPI(this.searchCondition)-->
<!--          .then((res) => {-->
<!--            this.pagination.total = res.data.data.docs.totalNum;-->
<!--            this.data = res.data.data.docs.documents.map((o) => ({-->
<!--              ...o,-->
<!--              status: o.status === '0' ? '未发布' : '已发布',-->
<!--            }));-->
<!--            this.$set(this.pagination, 'current', pagination.current);-->
<!--            this.loading = false;-->
<!--          })-->
<!--          .catch((e) => {-->
<!--            this.$message.error(e);-->
<!--          });-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<style>

.expandedRow {
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  white-space: pre-line;
}

.subExpandedRow {
  display: flex;
}

strong {
  white-space: nowrap;
}

#to-transcript {
  color: #7b7bff;
}

#to-transcript:hover {
  cursor: pointer;
  color: #5252fd;
}
</style>
