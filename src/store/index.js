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
      search: "",
      sortCol: "",
      sortType: "asc"
    }
  },
  getters: {
    getDisplayData: state => page => {
      let displayData = [...state.data];

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

      let sortCol = state.filters.sortCol;
      let sortType = state.filters.sortType;
      if (sortCol) {
        displayData.sort((a, b) => {
          if (sortType === "asc") {
            return a[sortCol] > b[sortCol]
              ? 1
              : b[sortCol] > a[sortCol]
              ? -1
              : 0;
          } else {
            return a[sortCol] > b[sortCol]
              ? -1
              : b[sortCol] > a[sortCol]
              ? 1
              : 0;
          }
        });
      }

      //console.log(displayData.length);

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
    },
    getItemById: state => id => state.data.find(item => item.id === id)
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    addData(state, payload) {
      state.data.push(payload);
    },
    updateData(state, payload) {
      let editedItem = state.data.find(item => item.id === payload.id);
      console.log(editedItem);
      for (var key in payload) {
        if (payload.hasOwnProperty(key)) {
          editedItem[key] = payload[key];
        }
      }
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
