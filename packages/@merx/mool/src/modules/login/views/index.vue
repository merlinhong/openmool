<template>
  <div class="page-login">
    <div class="box">
      <!-- <div class="logo">
				<img src="/logo.png" alt="Logo" />
				<div class="name">
					<span v-for="text in app.info.name" :key="text">{{ text }}</span>
				</div>
			</div> -->

      <p class="desc" style="font-size: 28px;font-weight: bold;letter-spacing: 5px;">MlDesigner低代码设计平台</p>

      <div class="form">
        <el-form label-position="top" class="form" :disabled="saving">
          <el-form-item label="用户名">
            <input
              v-model="form.username"
              placeholder="请输入用户名"
              maxlength="20"
              type="text"
              :readonly="readonly"
              autocomplete="off"
              @focus="readonly = false"
            />
          </el-form-item>

          <el-form-item label="密码">
            <input v-model="form.password" type="password" placeholder="请输入密码" maxlength="20" autocomplete="off" />
          </el-form-item>

          <el-form-item label="验证码">
            <div class="row">
              <input v-model="form.verifyCode" placeholder="图片验证码" maxlength="4" />

              <pic-captcha
                v-model="form.captchaId"
                @change="
                  () => {
                    form.verifyCode = '';
                  }
                "
              />
            </div>
          </el-form-item>

          <div class="op">
            <el-button type="primary" :loading="saving" @click="toLogin">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bg">
      <svg class="cl-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 350">
        <g transform="">
          <g transform="translate(628,-17) scale(100)" opacity="0.3">
            <path
              d="M4.10125 0 C4.10125 0.5525 4.3542 0.8338 4.1835 1.3593 S3.6427 1.9637 3.318 2.4107 S3.0325 3.2339 2.5855 3.5587 S1.7928 3.7298 1.2674 3.9005 S0.5525 4.3988 0 4.3988 S-0.7419 4.0713 -1.2674 3.9005 S-2.1385 3.8834 -2.5855 3.5587 S-2.9932 2.8576 -3.318 2.4107 S-4.0127 1.8847 -4.1835 1.3593 S-4.1013 0.5525 -4.1013 0 S-4.3542 -0.8338 -4.1835 -1.3593 S-3.6427 -1.9637 -3.318 -2.4107 S-3.0325 -3.2339 -2.5855 -3.5587 S-1.7928 -3.7298 -1.2674 -3.9005 S-0.5525 -4.3988 0 -4.3988 S0.7419 -4.0713 1.2674 -3.9005 S2.1385 -3.8834 2.5855 -3.5587 S2.9932 -2.8576 3.318 -2.4107 S4.0127 -1.8847 4.1835 -1.3593 S4.1013 -0.5525 4.1013 0"
              stroke-width="0"
              transform="rotate(19)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="10s"
                repeatCount="indefinite"
                values="0;36"
              ></animateTransform>
            </path>
          </g>
          <g transform="translate(704,-56) scale(100)" opacity="0.9">
            <path
              d="M4.9215 0 C4.9215 0.663 5.225 1.0006 5.0202 1.6311 S4.3713 2.3564 3.9816 2.8928 S3.639 3.8807 3.1026 4.2704 S2.1514 4.4757 1.5208 4.6806 S0.663 5.2785 0 5.2785 S-0.8903 4.8855 -1.5208 4.6806 S-2.5662 4.6601 -3.1026 4.2704 S-3.5919 3.4292 -3.9816 2.8928 S-4.8153 2.2617 -5.0202 1.6311 S-4.9215 0.663 -4.9215 0 S-5.225 -1.0006 -5.0202 -1.6311 S-4.3713 -2.3564 -3.9816 -2.8928 S-3.639 -3.8807 -3.1026 -4.2704 S-2.1514 -4.4757 -1.5208 -4.6806 S-0.663 -5.2785 0 -5.2785 S0.8903 -4.8855 1.5208 -4.6806 S2.5662 -4.6601 3.1026 -4.2704 S3.5919 -3.4292 3.9816 -2.8928 S4.8153 -2.2617 5.0202 -1.6311 S4.9215 -0.663 4.9215 0"
              stroke-width="0"
              transform="rotate(2.04427)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="6s"
                repeatCount="indefinite"
                values="0;36"
              ></animateTransform>
            </path>
          </g>
        </g>
      </svg>
    </div>

    <a href="https://cool-js.com" class="copyright"> Copyright © MlDesign </a>
  </div>
</template>

<script lang="tsx" name="login" setup>
import { reactive, ref } from "vue";
// import { useCool } from "/@/cool";
// import { useBase } from "/$/base";
import PicCaptcha from "../components/pic-captcha.vue";
// import { storage } from "/@/cool/utils";
const useCool = () => {
  return {
    refs: {},
    setRefs: {},
    router: {},
    service: {},
  };
};
const useBase = () => {
  return {
    user: {},
    app: { info: { name: "admin" } },
  };
};

const { refs, setRefs, router, service } = useCool();
const { user, app } = useBase();

// 状态
const saving = ref(false);

// 避免自动填充
const readonly = ref(true);

// 表单数据
const form = reactive({
  username: "",
  password: "",
  captchaId: "",
  verifyCode: "",
});

// 登录
async function toLogin() {
	if (!form.username) {
		return ElMessage.error("用户名不能为空");
	}

	if (!form.password) {
		return ElMessage.error("密码不能为空");
	}

	if (!form.verifyCode) {
		return ElMessage.error("图片验证码不能为空");
	}

	saving.value = true;

	try {
		// 登录
		await service.base.open.login(form).then(user.setToken);

		// token 事件
		await Promise.all(app.events.hasToken.map((e) => e()));

		// 设置缓存
		storage.set("username", form.username);

		// 跳转首页
		router.push("/homepage");
	} catch (err: any) {
		// 刷新验证码
		refs.picCaptcha.refresh();

		// 提示错误
		ElMessage.error(err.message);
	}

	saving.value = false;
}
</script>

<style lang="less" scoped>

.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #fff;
  color: @login-bg-color;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 90%;
    pointer-events: none;
    transform: rotate(180deg) scaleY(-1);

    .cl-svg {
      height: 100%;
      width: 100%;
      fill: @login-bg-color;
    }
  }

  .copyright {
    position: absolute;
    bottom: 15px;
    left: 0;
    text-align: center;
    width: 100%;
    color: #666;
    font-size: 14px;
  }

  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;

    .logo {
      height: 50px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      img {
        height: 46px;
        background-color: $color;
        border-radius: 50px;
        border: 3px solid $color;
        margin-right: 10px;
      }

      span {
        display: inline-block;
        font-size: 38px;
        font-weight: bold;
        line-height: 1;
        letter-spacing: 3px;

        &:nth-child(6) {
          animation: dou 1s infinite linear;
        }
      }
    }

    .desc {
      font-size: 15px;
      letter-spacing: 1px;
      margin-bottom: 50px;
    }

    .form {
      width: 300px;

      :deep(.el-form) {
        .el-form-item {
          margin-bottom: 20px;
        }

        .el-form-item__label {
          padding-left: 5px;
        }

        input {
          height: 45px;
          width: 100%;
          box-sizing: border-box;
          font-size: 17px;
          border: 0;
          border-radius: 0;
          background-color: #f8f8f8;
          padding: 0 15px;
          border-radius: 6px;
          position: relative;

          &:-webkit-autofill {
            box-shadow: none;
            -webkit-box-shadow: 0 0 0 1000px #f8f8f8 inset;
            box-shadow: 0 0 0 1000px #f8f8f8 inset;
          }

          &::placeholder {
            font-size: 14px;
          }
        }

        .row {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;

          .pic-captcha {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }

    .op {
      display: flex;
      justify-content: center;
      margin-top: 40px;

      :deep(.el-button) {
        height: 45px;
        width: 100%;
        font-size: 15px;
        border-radius: 6px;
        letter-spacing: 1px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .page-login {
    .box {
      width: 100%;
    }
  }
}
</style>
