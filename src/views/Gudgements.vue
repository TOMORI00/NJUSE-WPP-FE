<template>
  <div>
    <div>
      <a-form :form="form" layout="inline" class="searchBar">
        <a-form-item label="案件名称">
          <a-input
            style="width: 360px"
            v-decorator="[
              'caseName',
              {
                rules: [{ required: true, message: '请输入案件名称' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="formItemLayout.wrapperCol"
          style="margin-left: 30px"
        >
          <a-button type="primary">
            查询
          </a-button>
        </a-form-item>
        <a-form-item :wrapper-col="formItemLayout.wrapperCol">
          <a-button type="primary">
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-divider />
    <div>
      <div style="margin-bottom: 16px; margin-left: 3vw;">
        <a-button type="primary">
          新建
        </a-button>
        <a-button type="primary">
          修改
        </a-button>
        <a-button type="primary">
          删除
        </a-button>
        <a-button type="primary">
          发布
        </a-button>
      </div>
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'radio',
        }"
        :columns="columns"
        :data-source="data"
      />
    </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};
const columns = [
  {
    title: '案件名称',
    dataIndex: 'name',
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
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    type: 32,
    court: `London, Park Lane no. ${i}`,
    status: '未发布',
  });
}
export default {
  data() {
    return {
      data,
      formItemLayout,
      form: this.$form.createForm(this, { name: 'judgementSearch' }),
      columns,
      selectedRowKeys: [], // Check here to configure the default column
    };
  },
  methods: {
    /**
     * todo: 传进来的这个参数是具体点击的某一行的信息，拿着这个信息再来进行后续处理(删、改)
     */
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRowKeys[0], data[selectedRowKeys[0]]);
      this.selectedRowKeys = selectedRowKeys;
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
