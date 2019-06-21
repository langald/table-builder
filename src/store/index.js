import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    title: "",
    setting: {},
    data: [],
    filters: {
      read: "",
      search: ""
    }
  },
  getters: {
    getDisplayData: state => page => {
      let displayData = state.data;

      switch (state.filters.read) {
        case true:
          displayData = displayData.filter(item => item.read);
          break;
        case false:
          displayData = displayData.filter(item => !item.read);
          break;
      }

      let search = state.filters.search;
      if (search) {
        displayData = displayData.filter(item => {
          //return item.name.includes(search);
          let contain;
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              if (
                key !== "read" &&
                item[key]
                  .toString()
                  .toLowerCase()
                  .includes(search)
              ) {
                contain = true;
              }
            }
          }

          return contain;
        });
      }

      console.log(displayData.length);

      return displayData;
    },
    getColumns(state) {
      if (state.data.length) {
        let array = Object.keys(state.data[0]);
        let readIndex = array.indexOf("read");
        if (readIndex !== -1) array.splice(readIndex, 1);
        return array;
      } else {
        return [];
      }
    }
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setSetting(state, payload) {
      state.setting = payload;
    },
    setTitle(state, payload) {
      state.title = payload;
    },
    setFilters(state, payload) {
      state.filters[payload.type] = payload.val;
    }
  },
  actions: {
    getData(store, payload) {
      let table;

      switch (payload) {
        case "users":
          table = require("@/data/users").default;
          break;
        case "products":
          table = require("@/data/products").default;
          break;
      }

      store.commit("setTitle", table.title);
      store.commit("setSetting", table.setting);
      store.commit("setData", table.data);
    }
  }
});
