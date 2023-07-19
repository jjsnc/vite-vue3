<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger/index.vue";
import { mapState } from "pinia";
import { useAppStore, useUserStore } from "@/store";
import { removeToken } from "@/utils/auth";
export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapState(useAppStore, ["sidebar", "device"]),
    ...mapState(useUserStore, ["avatar", "user"]),
  },
  methods: {
    toggleSideBar() {
      let appStore = useAppStore();
      appStore.handleToggleSidebar();
    },
    async logout() {
      sessionStorage.clear();
      localStorage.clear();
      removeToken();
      let userStore = useUserStore();
      await userStore.handleLogout();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    .doc-area {
      display: inline-block;
      padding: 8px 30px 0;
      .fa-question-circle {
        color: #909399;
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .name {
          font-size: 14px;
          color: #909399;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
