import Vue from "vue";
import { provide } from "@vue/composition-api";
import { useCurrency } from "@mgt-pwa/composables";
import { formatPrice } from "@mgt-pwa/theme/helpers";

export default ({ app }) => {
  app.setup = () => {
    const { currencySymbol } = useCurrency();

    provide(
      Vue.filter("price", (price) =>
        formatPrice(price, { symbol: currencySymbol.value })
      )
    );
  };
};
