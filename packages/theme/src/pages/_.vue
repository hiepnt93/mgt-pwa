<template>
  <div :key="$route.fullPath">
    <component :is="getComponent" :cms-page="cmsPage" :page="page" />
  </div>
</template>
<script>
import { useCms } from "@shopware-pwa/composables";

const pagesMap = {
  "frontend.navigation.page": "CategoryView",
  "frontend.detail.page": "ProductView"
};

export function getComponentBy(resourceType) {
  if (!resourceType || !pagesMap[resourceType]) return;
  let componentName = pagesMap[resourceType];
  if (!componentName) componentName = "SwNoComponent";
  return () =>
    import(`@shopware-pwa/default-theme/components/views/${componentName}`);
}

export default {
  name: "DynamicRoute",
  components: {},
  asyncData: async ({ req, params, query, error: errorView }) => {
    const { search, page, error } = useCms();
    // TODO fix this after meeting
    const path =
      params.pathMatch[0] === "/"
        ? params.pathMatch.substring(1)
        : params.pathMatch;
    const searchResult = await search(path, query);

    // direct user to the error page (keep http status code - so do not redirect)
    if (error.value) {
      errorView(error.value);
    }

    const unwrappedPage = page && page.value ? page.value : searchResult;

    const name =
      unwrappedPage && unwrappedPage.cmsPage && unwrappedPage.cmsPage.name;
    const breadcrumbs = unwrappedPage && unwrappedPage.breadcrumb;
    const cmsPage = unwrappedPage && unwrappedPage.cmsPage;

    return {
      cmsPageName: name,
      page: unwrappedPage,
      breadcrumbs,
      cmsPage
    };
  },
  computed: {
    getComponent() {
      return this.page && getComponentBy(this.page.resourceType);
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";
</style>
