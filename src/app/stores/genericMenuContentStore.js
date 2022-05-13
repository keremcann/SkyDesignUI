import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import BaseCRUDStore from "../base/BaseCRUDStore";
import Notifier from "../utils/Notifier";

export default class GenericMenuContentStore extends BaseCRUDStore {
  loading = true;
  columnList = [];
  data = [];

  constructor() {
    super();
    makeObservable(this, {
      columnList: observable,
      data: observable,
      addOrUpdateColumnList: observable
    });
  }

  loadContent = async (level1Menu = '', level2Menu = '', level3Menu = '') => {
    // this.loading = true;
    try {
      const content = await agent.Page.getPageDetail(level1Menu, level2Menu, level3Menu);
      if (content.success === false) Notifier.error(content.errorMessage, "ERROR!", 30000);
      runInAction(() => {
        this.columnList = content.value.result.columnList;
        this.data = content.value.result.data;
        // this.loading = false;
      });

    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
      // this.loading = false;
    }
  }

  addOrUpdateColumnList = [];
  loadContentForAddOrUpdate = async (level1Menu = '', level2Menu = '', level3Menu = '', id = null) => {
    this.loading = true;
    try {
      const content = await agent.Page.getAddOrUpdateModalDetailPageByPage(level1Menu, level2Menu, level3Menu, id);
      runInAction(() => {
        if (content.success === false) Notifier.error(content.errorMessage, "ERROR!", 30000);
        this.addOrUpdateColumnList = content.value.result;
        this.loading = false;
      });
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
      // this.loading = false;
    }
  }

  createContent = async (data) => {
    try {
      const content = await agent.Page.createContent(data);
      Notifier.error(content.errorMessage);
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
    }
  }

  updateContent = async (data) => {
    try {
      const content = await agent.Page.updateContent(data);
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
    }
  }

  deleteContent = async (id, tableName) => {
    try {
      const content = await agent.Page.deleteContent(id, tableName);
    } catch (error) {
      // Notifier.error('There occured an error while getting the page list');
    }
  }


}