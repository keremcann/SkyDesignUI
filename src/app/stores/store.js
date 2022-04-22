import { createContext, useContext } from "react";
import CatalogStore from "./catalogStore";
import CommonStore from "./commonStore";
import DashboardStore from "./dashboardStore";
import GenericMenuContentStore from "./genericMenuContentStore";
import ModalStore from "./modalStore";
import PageStore from "./pageStore";
import RoleStore from "./roleStore";
import SubCatalogDetailStore from "./subCatalogDetailStore";
import UserStore from './userStore';

export const store = {
  catalogStore: new CatalogStore(),
  modalStore: new ModalStore(),
  subCatalogDetailStore: new SubCatalogDetailStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  dashboardStore: new DashboardStore(),
  pageStore: new PageStore(),
  genericMenuContentStore: new GenericMenuContentStore(),
  roleStore: new RoleStore()

}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}