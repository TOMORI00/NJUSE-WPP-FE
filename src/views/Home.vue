<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <h3 class="title">裁判文书网</h3>
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
            :default-open-keys="['sub1']"
            mode="inline"
            theme="dark"
            @click="handleClick"
          >
            <a-sub-menu key="sub1">
              <span slot="title">
                <a-icon type="setting" />
                <span>违规案例库</span>
              </span>
              <a-menu-item key="1">
                裁判文书库
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content
          style="overflow: scroll; height: 92vh; min-width: 710px; background-color: #fff;"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout as ALayout, Menu as AMenu, Icon as AIcon } from 'ant-design-vue';

export default {
  data() {
    return {};
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
  components: {
    ALayout,
    AMenu,
    AMenuItem: AMenu.Item,
    ASubMenu: AMenu.SubMenu,
    ALayoutHeader: ALayout.Header,
    ALayoutSider: ALayout.Sider,
    ALayoutContent: ALayout.Content,
    AIcon,
  },
};
</script>

<style>
#components-layout-demo-basic .ant-layout-header {
  background-color: rgb(248, 236, 236);
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
  width: 8vh;
  height: 8vh;
  right: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
}
.title {
  position: absolute;
  left: 36px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
