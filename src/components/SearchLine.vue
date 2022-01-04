<template>
  <a-form :form="searchForm" layout="inline" id="search-line-body">
    <div style="display: flex; flex-direction: column">
      <a-form-item :label="searchLabel">
        <a-input v-decorator="['title']" aria-multiline="true" placeholder="请输入文书标题" style="width: 300px;"/>
      </a-form-item>
      <a-form-item v-if="checked" :key="1" label="案件类型">
        <a-input v-decorator="['type']" placeholder="请输入案件类型" style="width: 300px;"/>
      </a-form-item>
      <a-form-item v-if="checked" :key="2" label="法院名称">
        <a-input v-decorator="['court']" placeholder="请输入法院名称" style="width: 300px;"/>
      </a-form-item>
      <a-form-item v-if="checked" :key="3" label="案件时间">
        <a-input v-decorator="['judge_date']" placeholder="请输入案件时间，格式为yyyy-mm-dd" style="width: 300px;"/>
      </a-form-item>
    </div>
    <span style="margin-top: 8px; font-size: small; color: #7b7bff">高级检索
      <a-switch :checked="checked" style="margin-bottom: 4px" @change="handleCheckChange"/>
    </span>
    <a-form-item :wrapper-col="formItemLayout.wrapperCol" style="margin-left: 30px">
      <a-button type="primary" @click="handleQuery">
        检索
      </a-button>
    </a-form-item>
    <a-form-item :wrapper-col="formItemLayout.wrapperCol">
      <a-button type="primary" @click="resetSearchLine">
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {
  Button as AButton,
  Form as AForm,
  Input as AInput,
  Switch as ASwitch,
  message,
} from 'ant-design-vue';
import Vue from 'vue';

Vue.prototype.$message = message;

export default {
  name: 'SearchLine',
  components: {
    AForm,
    AButton,
    AInput,
    ASwitch,
    AFormItem: AForm.Item,
  },
  props: {
    searchForm: Object,
  },
  data() {
    return {
      checked: false,
      // searchForm: this.$form.createForm(this, { name: 'judgementSearch' }),
      searchLabel: '文书检索',
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
      },
    };
  },
  methods: {
    handleCheckChange() {
      this.checked = this.checked !== true;
      this.searchLabel = this.checked ? '文书标题' : '文书检索';
    },
    handleQuery() {
      this.$emit('query', this.searchForm);
    },
    resetSearchLine() {
      this.searchForm.setFieldsValue({
        title: '',
        type: '',
        court: '',
        judge_date: '',
      });
    },
  },
};
</script>

<style scoped>
#search-line-body {
  display: flex;
  justify-content: center;
  margin-top: 4vh;
  width: 810px;
}
</style>
