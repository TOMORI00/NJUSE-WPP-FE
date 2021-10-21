<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <h3 class="title" @click="test">裁判文书网</h3>
        <img
          src="https://ydl8023.oss-cn-beijing.aliyuncs.com/IMG_1297.JPG"
          id="avator"
        />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :style="{
            overflow: 'auto',
            height: '92vh',
            left: 0,
          }"
        >
          <a-menu
            :default-selected-keys="['1']"
            :open-keys.sync="openKeys"
            mode="inline"
            theme="dark"
            @click="handleClick"
          >
            <a-menu-item key="1">
              <a-icon type="check" />
              <span>条目1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="edit" />
              <span>条目2</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title">
                <a-icon type="setting" />
                <span>条目3</span>
              </span>
              <a-menu-item key="3">
                条目3.1
              </a-menu-item>
              <a-menu-item key="4">
                条目3.2
              </a-menu-item>
              <a-menu-item key="5">
                条目3.3
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content
          :style="{
            overflow: 'auto',
            height: '92vh',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openKeys: [],
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    test() {
      this.$api.judgement.login().then((res) => {
        console.log('hi', res);
      });
    },
  },
};
</script>

<style>
#components-layout-demo-basic .ant-layout-header {
  background-color: #fff;
  height: 8vh;
  position: relative;
}
#components-layout-demo-basic .ant-layout-container {
  background-color: #fff;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
#avator {
  float: right;
  width: 60px;
  height: 60px;
  right: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
}
.title {
  position: absolute;
  left: 36px;
}
</style>
