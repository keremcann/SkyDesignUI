import React from 'react'
import { makeObservable, observable } from "mobx";

import BaseCRUDStore from "../base/BaseCRUDStore";

export default class ColumnListStore extends BaseCRUDStore {
  data = [];

  constructor() {
    super();
    makeObservable(this, {
      data: observable
    });
  }
}