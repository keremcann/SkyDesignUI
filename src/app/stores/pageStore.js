import { makeObservable, observable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import BaseCRUDStore from "../base/BaseCRUDStore";
import Notifier from "../utils/Notifier";


export default class PageStore extends BaseCRUDStore {
  data = [];
  loading = true;

  selectedItem = null;
  selectedMenuItem = null;
  secondLevelMenu = [];
  thirdLevelMenu = [];

  setSelectedItem = (data) => {
    runInAction(() => {
      this.selectedItem = data;
    });
  }
  setSelectedMenuItem = (data) => {
    runInAction(() => {
      this.selectedMenuItem = data;
    });
  }
  setSecondLevelMenu = (data) => {
    runInAction(() => {
      this.secondLevelMenu = data;
    });
  }
  setThirdLevelMenu = (data) => {
    runInAction(() => {
      this.thirdLevelMenu = data;
    });
  }

  constructor() {
    super();
    makeObservable(this, {
      data: observable,
      loading: observable
    });
  }

  addPage = async (data) => {
    runInAction(() => {
      this.data = [
        ...this.data,
        data
      ]
    })
  }

  loadPages = async () => {
    this.loading = true;
    try {
      const result = await agent.Page.getAllPages();
      runInAction(() => {
        this.data = result.value;
        this.loading = false;
      });
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
      this.loading = false;
    }
  }

  createPage = async (data) => {
    try {
      const result = await agent.Page.createPage(data);

      runInAction(() => {
        this.data = result.value;
      });
    } catch (error) {
      Notifier.success('Error!');
    }
  }

  loadContent = async (level1Menu, level2Menu, level3Menu) => {
    this.loading = true;
    try {
      const content = await agent.Page.getPageDetail(level1Menu, level2Menu, level3Menu);
      runInAction(() => {
        this.columnList = content.value.columnList;
        this.data = content.value.data;
      });
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
      this.loading = false;
    }
  }
}