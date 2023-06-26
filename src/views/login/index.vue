<template>
  <div class="page">
    <div class="login-container">
      <div class="signin-logo center-block"></div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="grid-content">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="rules"
              onsubmit="handleLogin"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  name="username"
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入账户名称"
                  @keyup.enter.native="handleLogin"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  name="password"
                  ref="password"
                  v-model="loginForm.password"
                  placeholder="请输入账户密码"
                  @keyup.enter.native="handleLogin"
                ></el-input>
              </el-form-item>
              <!-- 验证码 -->
       

              <el-form-item>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width: 100%"
                  @click="handleLogin"
                  >登陆</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <p class="copyright">
            Copyright © 2006 - {{ year }} Madhouse Inc. All rights reserved
          </p>
          <p class="correlation-line">
            <a href="/terms-of-use.html" class="service" target="_blank"
              >Terms Of Service</a
            >
            and
            <a href="/privacy-policy.html" class="policy" target="_blank"
              >Privacy Policy</a
            >
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { useUserStore } from "@/store";
export default {
  name: "Login",
  data() {
    return {
      year: new Date().getFullYear(),
      showIdentifyCode: false, //显示图形验证码与否
      loginErrorNumber: 0,
      identifyCodes: "1234567890", //随机图形验证码初始化值
      identifyCode: "", //显示的验证码值
      loginForm: {
        username: "",
        password: "",
        verificationCode: "", //输入的验证码值
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入账户名称" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入账户密码" },
        ],
        verificationCode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              this.identifyCode == value
                ? callback()
                : callback(new Error("请输入正确的验证码"));
            },
            trigger: "blur",
          },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.refreshCode();
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 是否显示校验验证码
          this.loginErrorNumber++;
          this.loginErrorNumber >= 5 && (this.showIdentifyCode = true);
          // 上面显示是否校验验证码
          let userStore = useUserStore();
          userStore
            .handleLogin(this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch((err) => {
              this.refreshCode();
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },

    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // 生成验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #fcfcfc;

  .login-container {
    padding: 0 20px;
    width: 100%;

    .copyright {
      font-size: 14px;
      padding: 10px 0;
      text-align: center;
    }

    .correlation-line {
      font-size: 14px;
      text-align: center;
    }

    .signin-logo {
      background-image: url("@/assets/logo.png");
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: auto 90%;
      height: 70px;
      margin-bottom: 18px;
      width: 100%;
    }
  }
  a {
    color: #58406e;
  }
}
</style>
