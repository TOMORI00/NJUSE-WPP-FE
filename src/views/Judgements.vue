<template>
  <div>
    <div>
      <a-form :form="searchForm" class="searchBar" layout="inline">
        <a-form-item label="案件名称">
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请输入案件名称' }],
              },
            ]"
            style="width: 360px"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="formItemLayout.wrapperCol"
          style="margin-left: 30px"
        >
          <a-button type="primary" @click="query">
            查询
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
        <a-modal :title="formTitle"
                 :visible="visibility_commonModel"
                 cancel-text="取消"
                 ok-text="确认"
                 @cancel="handleModelCancel"
                 @ok="handleModelOK">
          <a-form :form="commonForm">
            <a-form-item label="案件标题">
              <a-input v-decorator="[ 'title', { rules: [{ required: true, message: '请输入案件名称' }] } ]"
                       placeholder="请输入案件标题"/>
            </a-form-item>
            <a-form-item label="案件类型">
              <a-input v-decorator="[ 'type', { rules: [{ required: true, message: '请输入案件名称' }] } ]"
                       placeholder="请输入案件类型"/>
            </a-form-item>
            <a-form-item label="法院名称">
              <a-input v-decorator="[ 'court', { rules: [{ required: true, message: '请输入案件名称' }] } ]"
                       placeholder="请输入法院名称"/>
            </a-form-item>
            <a-form-item label="案由">
              <a-input v-decorator="[ 'cause', { rules: [{ required: true, message: '请输入案件名称' }] } ]"
                       placeholder="请输入案由"/>
            </a-form-item>
            <a-form-item label="案件正文">
              <a-upload v-decorator="[ 'file',{
                          valuePropName: 'fileList',
                          getValueFromEvent: normFile,
                          rules: [{required: true, message: '请选择文件'}]
                        } ]"
                        :before-upload="beforeUpload"
                        :show-upload-list="{showRemoveIcon:false}"
              >
                <a-button>{{ uploadTip }}</a-button>
              </a-upload>
            </a-form-item>
          </a-form>
        </a-modal>
        <a-button type="primary" @click="toModify">
          修改
        </a-button>
        <a-button type="primary" @click="del">
          删除
        </a-button>
        <a-button type="primary" @click="publish">
          发布
        </a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'radio',
        }"
        :rowKey="(record,index)=>index"
      />
    </div>
  </div>
</template>

<script>
import judgement from '../api/judgement';

const formTitle = '新建条目';
const rowCount = 10;
const uploadTip = '上传正文文件';
const fileList = [];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const columns = [
  {
    title: '案件名称',
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

export default {
  data() {
    return {
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
    };
  },
  mounted() {
    this.getPage(6, rowCount);
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
    getPage(pageSize, pageNum) {
      judgement.getPageAPI({ pageSize, pageNum })
        .then((res) => {
          // todo 分页查询 返回值
          console.log(res);
          this.data = res.data.data.docs;
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    query() {
      this.searchForm.validateFields((err, values) => {
        if (!err) {
          judgement.queryAPI(values)
            .then((res) => {
              // todo 条件查询 返回值
              console.log(res);
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
          if (this.formTitle === '新建条目') {
            judgement.createAPI(values)
              .then((res) => {
                // todo 创建 返回值
                console.log(res);
                if (res.data.retCode !== 0) {
                  this.$message.info('创建成功');
                  this.commonForm.setFieldsValue({ title: '', type: '', court: '', cause: '', file: [] });
                  this.visibility_commonModel = false;
                }
              })
              .catch((e) => {
                this.$message.error(e);
              });
          } else if (this.formTitle === '修改条目') {
            judgement.modifyAPI(values)
              .then((res) => {
                // todo 创建 返回值
                console.log(res);
                if (res.data.retCode !== 0) {
                  this.$message.info('修改成功');
                  this.commonForm.setFieldsValue({ title: '', type: '', court: '', cause: '', file: [] });
                  this.visibility_commonModel = false;
                }
              })
              .catch((e) => {
                this.$message.error(e);
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
      console.log(this.data);
      judgement.deleteAPI(this.data[this.selectedRowKeys[0]].id)
        .then((res) => {
          // todo 删除 返回值
          console.log(res);
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    publish() {
      judgement.publishAPI(this.selectedRowKeys[0])
        .then((res) => {
          // todo 发布 返回值
          console.log(res);
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    modify() {
      judgement.modifyAPI()
        .then((res) => {
          // todo 修改 返回值
          console.log(res);
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
  },
};
</script>

<style>
.searchBar {
  display: flex;
  justify-content: center;
  margin-top: 3vh;
  width: 710px;
}
</style>
