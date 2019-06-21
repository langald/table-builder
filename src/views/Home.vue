<template>
  <div class="container">
    <h1 class="page-title">{{ $store.state.title }}</h1>

    <top-panel @onCreate="setCreateModal" @onDelete="deleteActiveRow" />
    <app-table
      @onEditBtn="setUpdateModal($event)"
      @onDeleteBtn="removeData($event)"
      @onTrClick="setActiveRow($event)"
      :activeRow="activeRow"
    />
    <pagination :pagination="getPagination" />
    <transition name="fade">
      <modal
        :item-id="editedItemId"
        v-if="isModalShown"
        @closeModal="toggleModal"
      />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from "@/components/AppTable";
import TopPanel from "@/components/TopPanel";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      isModalShown: false,
      editedItemId: -1,
      activeRow: -1
    };
  },
  components: { AppTable, TopPanel, Pagination, Modal },
  computed: {
    ...mapGetters(["getPagination"])
  },
  watch: {
    "$route.query": {
      handler(query, oldQuery) {
        this.setPage(query.page);
      }
    }
  },
  mounted() {
    this.getData("users");
  },
  methods: {
    ...mapMutations(["removeData", "setPage"]),
    ...mapActions(["getData"]),
    setUpdateModal(e) {
      this.editedItemId = e.itemId;
      this.toggleModal();
    },
    setCreateModal() {
      this.editedItemId = -1;
      this.toggleModal();
    },
    toggleModal() {
      this.isModalShown = !this.isModalShown;
    },
    setActiveRow(e) {
      this.activeRow = e.id;
    },
    deleteActiveRow() {
      this.removeData({ id: this.activeRow });
    }
  }
};
</script>
