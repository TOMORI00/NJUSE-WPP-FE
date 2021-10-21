<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <h3 class="title">举头三尺天气晴</h3>
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
              <span>打卡</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="edit" />
              <span>记账</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title">
                <a-icon type="setting" />
                <span>反思</span>
              </span>
              <a-menu-item key="3">
                打卡一览
              </a-menu-item>
              <a-menu-item key="4">
                记账一览
              </a-menu-item>
              <a-menu-item key="5">
                相册
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
