<template>
  <div id="login" :key="$route.fullPath">
    <SfHeading class="login__header desktop-only" :level="3" title="Log in" />
    <SwLogin class="login__component" @success="redirectToMyAccount" />
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue";

import SwLogin from "@shopware-pwa/default-theme/components/SwLogin";
import { PAGE_ACCOUNT } from "@shopware-pwa/default-theme/helpers/pages";
import authMiddleware from "@shopware-pwa/default-theme/middleware/auth";

export default {
  name: "Login",
  components: {
    SwLogin,
    SfHeading
  },
  middleware: authMiddleware,
  data() {
    return {};
  },
  computed: {},
  methods: {
    redirectToMyAccount() {
      this.$router.push(PAGE_ACCOUNT);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";
#login {
  height: 65vh;
  margin-bottom: 10vh;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    justify-content: center;
  }
  .login__component {
    width: 100%;
    @include for-desktop {
      max-width: 450px;
    }
  }
}
</style>
