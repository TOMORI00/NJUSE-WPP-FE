<template>
  <a-form :form="form" class="login-form" @submit="handleSubmit">
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [
              { required: true, message: '请输入您的账号!' },
              { max: 10, message: '账户最大长度为10' },
              { min: 4, message: '账户最小长度为4' },
            ],
          },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              { required: true, message: '请输入您的密码!' },
              { max: 10, message: '密码最大长度为10' },
              { min: 6, message: '密码最小长度为6' },
            ],
          },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        记住我
      </a-checkbox>
      <a class="login-form-forgot" href="">
        忘记密码
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
      或
      <a href="">
        现在注册!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    ...mapMutations(['loginMethod']),
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = {
            username: values.userName,
            password: values.password,
          };
          this.$api.user.login(formData).then(() => {
            // 执行某些操作
            this.loginMethod(formData);
            const path = this.$route.query.redirect;
            this.$router.replace({
              path: path === '/' || path === undefined ? '/home' : path,
            });
          });
        }
      });
    },
  },
};
</script>
<style>
.login-form {
  max-width: 300px;
  position: absolute;
  left: 50%; /* 定位父级的50% */
  top: 25%;
  transform: translate(-50%, -50%); /*自己的50% */
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
