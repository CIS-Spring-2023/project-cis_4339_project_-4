import { defineStore } from 'pinia'

//defining a store
export const useLoggedInUserStore = defineStore({

  id: 'loggedInUser',
  state: () => {
    return {
      name: "",
      role: 0,
      isLoggedIn: false,
    }
  },


  actions: {
    async login(username, password) {
      try {
        const response = await apiLogin(username, password);
        this.$patch({
          isLoggedIn: response.isAllowed,
          role: response.role,
          name: response.name
        })
        if (response.isAllowed) {
          this.$router.push("/");
        } else {
          this.$store.commit("setUser", null);
          alert("Invalid credentials. Please try again.");
        }
      } catch(error) {
        console.log(error)
        alert("Invalid credentials. Please try again.");
      }
    },
    logout() {
      this.patch({
        name: "",
        isLoggedIn: false,
        role: 0
      });
    }
  }
});

function apiLogin(u, p) {
  if (u === "admin" && p === "admin") {
    return Promise.resolve({ isAllowed: true,role: 1,name: "Admin" });
  }
  if (u === "viewer" && p === "viewer") {
    return Promise.resolve({ isAllowed: true,role: 2,name: "Viewer" });
  }
  if (p === u) {
    return Promise.resolve({ isAllowed: false });
  }
  return Promise.reject(new Error("invalid"));
}