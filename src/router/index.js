import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "@/components/signup/Signup.vue";
import Login from "@/components/signup/Login.vue";
import Profile from "@/views/Profile.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import UpdateProfile from "@/views/UpdateProfile.vue";
import UpdateLocation from "@/components/UpdateLocation.vue";
import Menu from "@/views/Menu.vue";
import AddNewCatego from "@/components/AddNewCatego.vue";
import ViewCatego from "@/components/ViewCatego.vue";
import UpdateCategory from "@/components/UpdateCategory.vue";
import DeleteCategory from "@/components/DeleteCategory.vue";
import AddNewItem from "@/views/AddNewItem.vue";
import UpdateItem from "@/views/UpdateItem.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "HomePage",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "AboutPage",
    },
  },
  {
    path: "/sign-up",
    name: "signup",
    component: Signup,
    meta: {
      title: "Sign-Up",
    },
  },
  {
    path: "/login",
    name: "log-in",
    component: Login,
    meta: {
      title: "Log In",
    },
  },
  {
    path: "/profile",
    name: "profile-page",
    component: Profile,
    meta: {
      title: "Profile-Page",
    },
  },
  {
    path: "/updateprofile",
    name: "update-profile",
    component: UpdateProfile,
    meta: {
      title: "Update-Profile",
    },
  },
  {
    path: "/UpdateLocation/:locationId",
    name: "Update-Location",
    component: UpdateLocation,
    meta: {
      title: "UpdateLocations",
    },
  },
  {
    path: "/menu/location/:locationId",
    name: "Menu",
    component: Menu,
    meta: {
      title: "Add Menu",
    },
  },
  {
    path: "/menu/location/AddNewCatego/:locationId",
    name: "AddNewCatego",
    component: AddNewCatego,
    meta: {
      title: "Add New Catego",
    },
  },
  {
    path: "/menu/location/ViewCatego/:locationId",
    name: "ViewCategories",
    component: ViewCatego,
    meta: {
      title: "View Categor",
    },
  },
  {
    path: "/menu/location/ViewCatego/UpdateCateogry/:locationId/:catId",
    name: "updateCategory",
    component: UpdateCategory,
    meta: {
      title: "UpdateCategory",
    },
  },
  {
    path: "/menu/location/ViewCatego/DeleteCategory/:locationId/:catId",
    name: "deleteCategory",
    component: DeleteCategory,
    meta: {
      title: "deleteCategory",
    },
  },
  {
    path: "/menu/location/AddNewItem/:locationId",
    name: "AddNewItem",
    component: AddNewItem,
    meta: {
      title: "AddNewItem",
    },
  },
  {
    path: "/menu/location/Update/Item/itemId/loc/:locationId",
    name: "UpdateItem",
    component: UpdateItem,
    meta: {
      title: "UpdateItem",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "error-page",
    component: ErrorPage,
    meta: {
      title: "Page Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
