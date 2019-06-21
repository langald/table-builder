<template>
  <div class="pagination">
    <button
      type="button"
      class="pagination-link"
      v-if="pagination.current_page > 1"
    >
      Back
    </button>

    <button
      type="button"
      v-for="(page, i) in pagesNumber"
      :key="i"
      class="pagination-btn"
      :class="{ 'pagination-btn--active': page == pagination.current_page }"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="pagination-link"
      v-if="pagination.current_page < pagination.last_page"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      required: true
    },
    offset: {
      type: Number,
      default: 4
    }
  },
  computed: {
    pagesNumber() {
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      let pagesArray = [];
      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    }
  }
};
</script>
