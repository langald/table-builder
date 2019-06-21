<template>
  <div class="container">
    <h1 class="page-title">{{ $store.state.title }}</h1>

    <top-panel />
    <app-table />
    <pagination :pagination="testPagination" />
    <modal :item-id="-1" />
  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from "@/components/AppTable";
import TopPanel from "@/components/TopPanel";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      testPagination: {
        current_page: 8,
        last_page: 10
      }
    };
  },
  components: { AppTable, TopPanel, Pagination, Modal },
  mounted() {
    this.getData("users");
  },
  methods: {
    ...mapActions(["getData"])
  }
};
</script>
