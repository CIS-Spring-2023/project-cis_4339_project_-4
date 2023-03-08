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
      } catch (error) {
        console.log(error)
        alert("Invalid credentials. Please try again.");
      }
    },
    logout() {
      this.patch({
        name: "",
        role: 0,
        isLoggedIn: false,
      });
    }
  }
});

function apiLogin(u, p) {
  if (u === "admin" && p === "admin") {
    return Promise.resolve({ isAllowed: true, role: 1, name: "Admin" });
  }
  if (u === "viewer" && p === "viewer") {
    return Promise.resolve({ isAllowed: true, role: 2, name: "Viewer" });
  }
  return Promise.reject(new Error("invalid"));
}

//defining a store for findServices.Vue
export const findServicesStore = defineStore({

  id: 'findServicesStore',
  state: () => {
    return {
      services: [
        {
          serviceID: 101,
          serviceName: 'Family Support',
          serviceDescription: 'Offering support to family members.',
          serviceStatus: 'active'
        },
        {
          serviceID: 102,
          serviceName: 'Adult Education',
          serviceDescription: 'Adult teaching session.',
          serviceStatus: 'active'
        },
        {
          serviceID: 103,
          serviceName: 'Youth Services Program',
          serviceDescription: 'Various activities dedicated to young people.',
          serviceStatus: 'active'
        },
        {
          serviceID: 104,
          serviceName: 'Childhood Education',
          serviceDescription: 'Children teaching session.',
          serviceStatus: 'active'
        }

      ]
    }
  },


  actions: {

  }
});

