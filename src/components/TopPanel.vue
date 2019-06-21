<template>
  <div class="top-panel">
    <button type="button" class="btn">Создать колонку</button>
    <button type="button" class="btn">Удалить колонку</button>
    <button
      type="button"
      class="btn"
      :class="{ 'btn--active': filters.read === true }"
      @click="setFilter('read', true)"
    >
      Прочитанные
    </button>
    <button
      type="button"
      class="btn"
      :class="{ 'btn--active': filters.read === false }"
      @click="setFilter('read', false)"
    >
      Непрочитанные
    </button>
    <input
      type="text"
      class="input"
      placeholder="Поиск"
      @input="setFilter('search', $event.target.value)"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TopPanel",
  computed: {
    ...mapState(["filters"])
  },
  methods: {
    ...mapMutations(["setFilters"]),
    setFilter(type, value) {
      let val = value;

      if (type === "read") {
        val = this.filters.read === val ? "" : val;
      }

      this.setFilters({
        type,
        val
      });
    }
  }
};
</script>
