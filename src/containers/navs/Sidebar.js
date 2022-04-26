import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import IntlMessages from '../../helpers/IntlMessages';

import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from '../../redux/actions';

import externalMenuItems from '../../constants/menu';
import externalEndMenuItems from '../../constants/lastmenu';
import { observable } from 'mobx';
import { observer, Observer } from 'mobx-react-lite';
import DashboardStore from '../../app/stores/dashboardStore';
import { useStore } from '../../app/stores/store';
import PageStore from '../../app/stores/pageStore';
import TreeHelper from '../../app/utils/TreeManagement/TreeHelper';

const customPageType = [
  {
    type: 'diyagram',
    route: '/app/dashboard/diyagramlar/altyapi-mimarisi',
  }
]

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
      collapsedMenus: [],
      menuItems: [...externalMenuItems, ...externalEndMenuItems]
    };


    // const fetch = async () => {
    //   let datam = new DashboardStore();
    //   await datam.loadMenus().then(res => {
    //     this.setState({
    //       ...this.state,
    //       menus: datam.data
    //     });
    //   });
    //   alert(JSON.stringify(this.state.menus));
    // }
    // fetch();
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: '',
    });
    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active');
    if (oldli != null) {
      oldli.classList.remove('active');
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active');
    if (oldliSub != null) {
      oldliSub.classList.remove('active');
    }

    /* set selected parent menu */
    const selectedSublink = document.querySelector(
      '.third-level-menu  a.active'
    );
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add('active');
    }

    const selectedlink = document.querySelector('.sub-menu  a.active');
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active');
      this.setState(
        {
          selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
            'data-parent'
          ),
        },
        callback
      );
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      );
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu: selectedParentNoSubItem.getAttribute(
              'data-flag'
            ),
          },
          callback
        );
      } else if (this.state.selectedParentMenu === '') {
        this.setState(
          {
            selectedParentMenu: this.state.menuItems[0].pageId,
          },
          callback
        );
      }
    }
  };

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state;
    const menuItem = this.state.menuItems.find((x) => x.pageId === selectedParentMenu);
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);

    return false;
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  async componentDidMount() {
    // const menu = {
    //   "value": [
    //     {
    //       "pageId": 1,
    //       "parentId": 0,
    //       "pageName": "İş Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "is-katalogu"
    //     },
    //     {
    //       "pageId": 2,
    //       "parentId": 0,
    //       "pageName": "Uygulama Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "uygulama-katalogu"
    //     },
    //     {
    //       "pageId": 3,
    //       "parentId": 0,
    //       "pageName": "Veri Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "veri-katalogu"
    //     },
    //     {
    //       "pageId": 4,
    //       "parentId": 0,
    //       "pageName": "Teknoloji Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "teknoloji-katalogu"
    //     },
    //     {
    //       "pageId": 5,
    //       "parentId": 0,
    //       "pageName": "Strateji Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "strateji-katalogu"
    //     },
    //     {
    //       "pageId": 6,
    //       "parentId": 0,
    //       "pageName": "Portföy Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "portfoy-katalogu"
    //     },
    //     {
    //       "pageId": 7,
    //       "parentId": 0,
    //       "pageName": "Süreç Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "surec-katalogu"
    //     },
    //     {
    //       "pageId": 8,
    //       "parentId": 0,
    //       "pageName": "Risk Kataloğu",
    //       "pageIcon": null,
    //       "pageUrl": "risk-katalogu"
    //     },
    //     {
    //       "pageId": 9,
    //       "parentId": 0,
    //       "pageName": "Diyagramlar",
    //       "pageIcon": null,
    //       "pageUrl": "diyagramlar"
    //     },
    //     {
    //       "pageId": 10,
    //       "parentId": 1,
    //       "pageName": "İş Kabiliyetleri",
    //       "pageIcon": null,
    //       "pageUrl": "is-kabiliyetleri"
    //     },
    //     {
    //       "pageId": 11,
    //       "parentId": 1,
    //       "pageName": "Ürünler",
    //       "pageIcon": null,
    //       "pageUrl": "urunler"
    //     },
    //     {
    //       "pageId": 12,
    //       "parentId": 1,
    //       "pageName": "Kanallar",
    //       "pageIcon": null,
    //       "pageUrl": "kanallar"
    //     },
    //     {
    //       "pageId": 13,
    //       "parentId": 1,
    //       "pageName": "Organizasyon Şeması",
    //       "pageIcon": null,
    //       "pageUrl": "organizasyon-semasi"
    //     },
    //     {
    //       "pageId": 14,
    //       "parentId": 2,
    //       "pageName": "Uygulamalar",
    //       "pageIcon": null,
    //       "pageUrl": "uygulamalar"
    //     },
    //     {
    //       "pageId": 15,
    //       "parentId": 2,
    //       "pageName": "Uygulama Modülleri",
    //       "pageIcon": null,
    //       "pageUrl": "uygulama-modulleri"
    //     },
    //     {
    //       "pageId": 16,
    //       "parentId": 2,
    //       "pageName": "Uygulama Bileşenleri",
    //       "pageIcon": null,
    //       "pageUrl": "uygulama-bilesenleri"
    //     },
    //     {
    //       "pageId": 17,
    //       "parentId": 2,
    //       "pageName": "Uygulama Servisleri",
    //       "pageIcon": null,
    //       "pageUrl": "uygulama-servisleri"
    //     },
    //     {
    //       "pageId": 18,
    //       "parentId": 2,
    //       "pageName": "Uygulama Alanları",
    //       "pageIcon": null,
    //       "pageUrl": "uygulama-alanlari"
    //     },
    //     {
    //       "pageId": 19,
    //       "parentId": 3,
    //       "pageName": "Fiziksel Veri Modelleme",
    //       "pageIcon": null,
    //       "pageUrl": "fiziksel-veri-modelleme"
    //     },
    //     {
    //       "pageId": 20,
    //       "parentId": 3,
    //       "pageName": "Raporlar",
    //       "pageIcon": null,
    //       "pageUrl": "raporlar"
    //     },
    //     {
    //       "pageId": 21,
    //       "parentId": 3,
    //       "pageName": "İş Sözlüğü",
    //       "pageIcon": null,
    //       "pageUrl": "is-sozlugu"
    //     },
    //     {
    //       "pageId": 22,
    //       "parentId": 4,
    //       "pageName": "Fiziksel Teknoloji Varlıkları",
    //       "pageIcon": null,
    //       "pageUrl": "fiziksel-teknoloji-varliklari"
    //     },
    //     {
    //       "pageId": 23,
    //       "parentId": 4,
    //       "pageName": "Altyapı Teknoloji Varlıkları",
    //       "pageIcon": null,
    //       "pageUrl": "altyapi-teknoloji-varliklari"
    //     },
    //     {
    //       "pageId": 24,
    //       "parentId": 4,
    //       "pageName": "Teknoloji Portföyü",
    //       "pageIcon": null,
    //       "pageUrl": "teknoloji-portfoyu"
    //     },
    //     {
    //       "pageId": 25,
    //       "parentId": 5,
    //       "pageName": "Vizyon",
    //       "pageIcon": null,
    //       "pageUrl": "vizyon"
    //     },
    //     {
    //       "pageId": 26,
    //       "parentId": 5,
    //       "pageName": "Misyon",
    //       "pageIcon": null,
    //       "pageUrl": "misyon"
    //     },
    //     {
    //       "pageId": 27,
    //       "parentId": 5,
    //       "pageName": "Stratejik Dönemler",
    //       "pageIcon": null,
    //       "pageUrl": "stratejik-donemler"
    //     },
    //     {
    //       "pageId": 28,
    //       "parentId": 5,
    //       "pageName": "Odak Alanları",
    //       "pageIcon": null,
    //       "pageUrl": "odak-alanlari"
    //     },
    //     {
    //       "pageId": 29,
    //       "parentId": 5,
    //       "pageName": "Stratejik Perspektifler",
    //       "pageIcon": null,
    //       "pageUrl": "stratejik-perspektifler"
    //     },
    //     {
    //       "pageId": 30,
    //       "parentId": 5,
    //       "pageName": "Stratejik Hedefler",
    //       "pageIcon": null,
    //       "pageUrl": "stratejik-hedefler"
    //     },
    //     {
    //       "pageId": 31,
    //       "parentId": 6,
    //       "pageName": "Programlar",
    //       "pageIcon": null,
    //       "pageUrl": "programlar"
    //     },
    //     {
    //       "pageId": 32,
    //       "parentId": 6,
    //       "pageName": "Projeler",
    //       "pageIcon": null,
    //       "pageUrl": "projeler"
    //     },
    //     {
    //       "pageId": 33,
    //       "parentId": 6,
    //       "pageName": "Talepler",
    //       "pageIcon": null,
    //       "pageUrl": "talepler"
    //     },
    //     {
    //       "pageId": 34,
    //       "parentId": 6,
    //       "pageName": "Portföy Hizalama",
    //       "pageIcon": null,
    //       "pageUrl": "portfoy-hizalama"
    //     },
    //     {
    //       "pageId": 35,
    //       "parentId": 7,
    //       "pageName": "Ana Süreç Grupları",
    //       "pageIcon": null,
    //       "pageUrl": "ana-surec-gruplari"
    //     },
    //     {
    //       "pageId": 36,
    //       "parentId": 7,
    //       "pageName": "Süreç Grupları",
    //       "pageIcon": null,
    //       "pageUrl": "surec-gruplari"
    //     },
    //     {
    //       "pageId": 37,
    //       "parentId": 7,
    //       "pageName": "Alt Süreç Grupları",
    //       "pageIcon": null,
    //       "pageUrl": "alt-surec-gruplari"
    //     },
    //     {
    //       "pageId": 38,
    //       "parentId": 7,
    //       "pageName": "Süreçler",
    //       "pageIcon": null,
    //       "pageUrl": "surecler"
    //     },
    //     {
    //       "pageId": 39,
    //       "parentId": 7,
    //       "pageName": "Görevler",
    //       "pageIcon": null,
    //       "pageUrl": "gorevler"
    //     },
    //     {
    //       "pageId": 40,
    //       "parentId": 7,
    //       "pageName": "Havuzlar",
    //       "pageIcon": null,
    //       "pageUrl": "havuzlar"
    //     },
    //     {
    //       "pageId": 41,
    //       "parentId": 7,
    //       "pageName": "Kulvarlar",
    //       "pageIcon": null,
    //       "pageUrl": "kulvarlar"
    //     },
    //     {
    //       "pageId": 42,
    //       "parentId": 8,
    //       "pageName": "BT Riskleri",
    //       "pageIcon": null,
    //       "pageUrl": "bt-riskleri"
    //     },
    //     {
    //       "pageId": 43,
    //       "parentId": 8,
    //       "pageName": "İş Riskleri",
    //       "pageIcon": null,
    //       "pageUrl": "is-riskleri"
    //     },
    //     {
    //       "pageId": 44,
    //       "parentId": 9,
    //       "pageName": "Altyapı Mimarisi",
    //       "pageIcon": null,
    //       "pageUrl": "altyapi-mimarisi"
    //     },
    //     {
    //       "pageId": 45,
    //       "parentId": 9,
    //       "pageName": "Uygulama Mimarisi",
    //       "pageIcon": null,
    //       "pageUrl": "uygulama-mimarisi"
    //     },
    //     {
    //       "pageId": 46,
    //       "parentId": 13,
    //       "pageName": "Kişiler",
    //       "pageIcon": null,
    //       "pageUrl": "kisiler"
    //     },
    //     {
    //       "pageId": 47,
    //       "parentId": 13,
    //       "pageName": "Roller",
    //       "pageIcon": null,
    //       "pageUrl": "roller"
    //     },
    //     {
    //       "pageId": 48,
    //       "parentId": 13,
    //       "pageName": "Ortamlar",
    //       "pageIcon": null,
    //       "pageUrl": "ortamlar"
    //     },
    //     {
    //       "pageId": 49,
    //       "parentId": 13,
    //       "pageName": "Lokasyonlar",
    //       "pageIcon": null,
    //       "pageUrl": "lokasyonlar"
    //     },
    //     {
    //       "pageId": 50,
    //       "parentId": 13,
    //       "pageName": "Organizasyon Birimleri",
    //       "pageIcon": null,
    //       "pageUrl": "organizasyon-birimleri"
    //     },
    //     {
    //       "pageId": 51,
    //       "parentId": 19,
    //       "pageName": "Veri Öğeleri",
    //       "pageIcon": null,
    //       "pageUrl": "veri-ogeleri"
    //     },
    //     {
    //       "pageId": 52,
    //       "parentId": 19,
    //       "pageName": "Veritabanları",
    //       "pageIcon": null,
    //       "pageUrl": "veritabanlari"
    //     },
    //     {
    //       "pageId": 53,
    //       "parentId": 19,
    //       "pageName": "Şemalar",
    //       "pageIcon": null,
    //       "pageUrl": "semalar"
    //     },
    //     {
    //       "pageId": 54,
    //       "parentId": 19,
    //       "pageName": "Tablolar",
    //       "pageIcon": null,
    //       "pageUrl": "tablolar"
    //     },
    //     {
    //       "pageId": 55,
    //       "parentId": 19,
    //       "pageName": "Veri Sözlüğü",
    //       "pageIcon": null,
    //       "pageUrl": "veri-sozlugu"
    //     },
    //     {
    //       "pageId": 56,
    //       "parentId": 19,
    //       "pageName": "Veri Tipleri",
    //       "pageIcon": null,
    //       "pageUrl": "veri-tipleri"
    //     },
    //     {
    //       "pageId": 57,
    //       "parentId": 21,
    //       "pageName": "Veri Politikaları",
    //       "pageIcon": null,
    //       "pageUrl": "veri-politikalari"
    //     },
    //     {
    //       "pageId": 58,
    //       "parentId": 21,
    //       "pageName": "Terimler",
    //       "pageIcon": null,
    //       "pageUrl": "terimler"
    //     },
    //     {
    //       "pageId": 59,
    //       "parentId": 21,
    //       "pageName": "Mevuzatlar",
    //       "pageIcon": null,
    //       "pageUrl": "mevuzatlar"
    //     },
    //     {
    //       "pageId": 60,
    //       "parentId": 21,
    //       "pageName": "Veri Standartları",
    //       "pageIcon": null,
    //       "pageUrl": "veri-standartlari"
    //     },
    //     {
    //       "pageId": 61,
    //       "parentId": 21,
    //       "pageName": "İş Kuralları",
    //       "pageIcon": null,
    //       "pageUrl": "is-kurallari"
    //     },
    //     {
    //       "pageId": 62,
    //       "parentId": 21,
    //       "pageName": "Kısaltmalar",
    //       "pageIcon": null,
    //       "pageUrl": "kisaltmalar"
    //     },
    //     {
    //       "pageId": 63,
    //       "parentId": 22,
    //       "pageName": "Sunucular",
    //       "pageIcon": null,
    //       "pageUrl": "sunucular"
    //     },
    //     {
    //       "pageId": 64,
    //       "parentId": 22,
    //       "pageName": "Sunucu Grupları",
    //       "pageIcon": null,
    //       "pageUrl": "sunucu-gruplari"
    //     },
    //     {
    //       "pageId": 65,
    //       "parentId": 22,
    //       "pageName": "Switch",
    //       "pageIcon": null,
    //       "pageUrl": "switch"
    //     },
    //     {
    //       "pageId": 66,
    //       "parentId": 22,
    //       "pageName": "Router",
    //       "pageIcon": null,
    //       "pageUrl": "router"
    //     },
    //     {
    //       "pageId": 67,
    //       "parentId": 22,
    //       "pageName": "Depolama Aygıtları",
    //       "pageIcon": null,
    //       "pageUrl": "depolama-aygitlari"
    //     },
    //     {
    //       "pageId": 68,
    //       "parentId": 22,
    //       "pageName": "İstemciler",
    //       "pageIcon": null,
    //       "pageUrl": "istemciler"
    //     },
    //     {
    //       "pageId": 69,
    //       "parentId": 22,
    //       "pageName": "Sertifikalar",
    //       "pageIcon": null,
    //       "pageUrl": "sertifikalar"
    //     },
    //     {
    //       "pageId": 70,
    //       "parentId": 23,
    //       "pageName": "IPAC",
    //       "pageIcon": null,
    //       "pageUrl": "ipac"
    //     },
    //     {
    //       "pageId": 71,
    //       "parentId": 23,
    //       "pageName": "TIPA",
    //       "pageIcon": null,
    //       "pageUrl": "tipa"
    //     },
    //     {
    //       "pageId": 72,
    //       "parentId": 23,
    //       "pageName": "Altyapı Platform Bileşenleri",
    //       "pageIcon": null,
    //       "pageUrl": "altyapi-platform-bilesenleri"
    //     },
    //     {
    //       "pageId": 73,
    //       "parentId": 23,
    //       "pageName": "Teknolojik Altyapı Platformları",
    //       "pageIcon": null,
    //       "pageUrl": "teknolojik-altyapi-platformlari"
    //     },
    //     {
    //       "pageId": 74,
    //       "parentId": 24,
    //       "pageName": "Mantıksal Teknoloji Bileşenleri",
    //       "pageIcon": null,
    //       "pageUrl": "mantiksal-teknoloji-bilesenleri"
    //     },
    //     {
    //       "pageId": 75,
    //       "parentId": 24,
    //       "pageName": "Fiziksel Teknoloji Bileşenleri",
    //       "pageIcon": null,
    //       "pageUrl": "fiziksel-teknoloji-bilesenleri"
    //     },
    //     {
    //       "pageId": 76,
    //       "parentId": 24,
    //       "pageName": "Standart Teknoloji Bileşenleri",
    //       "pageIcon": null,
    //       "pageUrl": "standart-teknoloji-bilesenleri"
    //     },
    //     {
    //       "pageId": 77,
    //       "parentId": 24,
    //       "pageName": "FTB - Yaşam Döngüsü Yönetimi",
    //       "pageIcon": null,
    //       "pageUrl": "ftb---yasam-dongusu-yonetimi"
    //     }
    //   ],
    //   "success": true,
    //   "infoMessage": null,
    //   "errorMessage": null
    // };
    let datam = new PageStore();
    const fetch = async () => {
      await datam.loadPages();
    }
    await fetch();

    const menuTree = TreeHelper.transformToTree(datam.data, 'pageId', 'parentId');

    let datas = [];
    for (var key in menuTree) {
      let level2 = [];

      let level1 = {
        pageId: menuTree[key].pageName,
        parentId: menuTree[key].parentId,
        pageName: menuTree[key].pageName,
        pageIcon: menuTree[key]?.pageIcon ?? 'iconsminds-atom',
        pageUrl: '/app/' + menuTree[key].pageUrl,
        isCustom: menuTree[key].isCustom ?? false,
        subs: level2
      };
      for (var key1 in menuTree[key].subs) {
        let level3 = [];

        level2.push({
          pageId: menuTree[key].subs[key1].pageName,
          parentId: menuTree[key].subs[key1].parentId,
          pageName: menuTree[key].subs[key1].pageName,
          pageIcon: menuTree[key].subs[key1]?.pageIcon ?? 'iconsminds-atom',
          pageUrl: '/app/' + menuTree[key].pageUrl + '/' + menuTree[key].subs[key1].pageUrl,
          // isCustom: menuTree[key].subs[key1].isCustom ?? false,
          isCustom: true,
          subs: level3,

          type: 'diyagram'
        })
        for (var key2 in menuTree[key].subs[key1].subs) {
          level3.push({
            pageId: menuTree[key].subs[key1].subs[key2].pageName,
            parentId: menuTree[key].subs[key1].subs[key2].parentId,
            pageName: menuTree[key].subs[key1].subs[key2].pageName,
            pageIcon: menuTree[key].subs[key1].subs[key2]?.pageIcon ?? 'iconsminds-atom',
            pageUrl: '/app/' + menuTree[key].pageUrl + '/' + menuTree[key].subs[key1].pageUrl + '/' + menuTree[key].subs[key1].subs[key2].pageUrl,
            isCustom: menuTree[key].subs[key1].subs[key2].isCustom ?? false,
          });
        }
      }
      datas.push(level1);
    }

    this.state.menuItems = externalMenuItems.concat(datas).concat(externalEndMenuItems)

    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive(this.setHasSubItemStatus);

  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.pageId;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();

    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  render() {
    const {
      selectedParentMenu,
      viewingParentMenu,
      collapsedMenus,
      menuItems
    } = this.state;
    return (
      <div className="sidebar">
        {/* <pre>
          {JSON.stringify(this.state.datas, null, 4)}

        </pre> */}
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">


                {menuItems &&
                  menuItems.map((item) => {
                    return (
                      <NavItem
                        key={item.pageId}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.pageId &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.pageId,
                        })}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.pageUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.pageIcon} />{' '}
                            <IntlMessages id={item.pageName} />
                          </a>
                        ) : (
                          <NavLink
                            to={item.pageUrl}
                            onClick={(e) => this.openSubMenu(e, item)}
                            data-flag={item.pageId}
                          >
                            <i className={item.pageIcon} />{' '}
                            <IntlMessages id={item.pageName} />
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >


              {menuItems &&
                menuItems.map((item) => {
                  return (
                    <Nav
                      key={item.pageId}
                      className={classnames({
                        'd-block':
                          (this.state.selectedParentMenu === item.pageId &&
                            this.state.viewingParentMenu === '') ||
                          this.state.viewingParentMenu === item.pageId,
                      })}
                      data-parent={item.pageId}
                    >
                      {item.subs && item.subs.length > 0 &&
                        item.subs.map((sub, index) => {
                          return (
                            <NavItem
                              key={`${item.pageId}_${index}`}
                              className={`${sub.subs && sub.subs.length > 0
                                ? 'has-sub-item'
                                : ''
                                }`}
                            >
                              {sub.newWindow ? (
                                <>
                                  <a
                                    href={sub.pageUrl}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    <i className={sub.pageIcon} />{' '}
                                    <IntlMessages id={sub.pageName} />
                                  </a>

                                </>
                              ) : sub.subs && sub.subs.length > 0 ? (
                                <>
                                  <NavLink
                                    className={`rotate-arrow-icon opacity-50 ${collapsedMenus.indexOf(
                                      `${item.pageId}_${index}`
                                    ) === -1
                                      ? ''
                                      : 'collapsed'
                                      }`}
                                    to={sub.pageUrl}
                                    id={`${item.pageId}_${index}`}
                                    onClick={(e) =>
                                      this.toggleMenuCollapse(
                                        e,
                                        `${item.pageId}_${index}`
                                      )
                                    }
                                  >
                                    <i className="simple-icon-arrow-down" />{' '}
                                    <IntlMessages id={sub.pageName} />
                                  </NavLink>

                                  <Collapse
                                    isOpen={
                                      collapsedMenus.indexOf(
                                        `${item.pageId}_${index}`
                                      ) === -1
                                    }
                                  >
                                    <Nav className="third-level-menu">
                                      {sub.subs.map((thirdSub, thirdIndex) => {
                                        return (
                                          <NavItem
                                            key={`${item.pageId}_${index}_${thirdIndex}`}
                                          >
                                            {thirdSub.newWindow ? (
                                              <>
                                                <a
                                                  href={thirdSub.pageUrl}
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                                >
                                                  <i className={thirdSub.pageIcon} />{' '}
                                                  <IntlMessages
                                                    id={thirdSub.pageName}
                                                  />
                                                </a>

                                              </>
                                            ) : (
                                              <>
                                                <NavLink to={thirdSub.pageUrl}>
                                                  <i className={thirdSub.pageIcon} />{' '}
                                                  <IntlMessages
                                                    id={thirdSub.pageName}
                                                  />
                                                </NavLink>
                                              </>
                                            )}
                                          </NavItem>
                                        );
                                      })}
                                    </Nav>
                                  </Collapse>
                                </>
                              ) : (
                                <>
                                  {/* <NavLink to={sub.pageUrl}>
                                    <i className={sub.pageIcon} />{' '}
                                    <IntlMessages id={sub.pageName} />
                                  </NavLink> */}
                                  {(sub.isCustom && customPageType.some(x => x.type === sub.type))
                                    ? <>
                                      <NavLink to={sub.pageUrl}>
                                        <i className={sub.pageIcon} />{' '}
                                        <IntlMessages id={sub.pageName} />
                                      </NavLink>
                                    </>
                                    : <NavLink to={sub.pageUrl}>
                                      <i className={sub.pageIcon} />{' '}
                                      <IntlMessages id={sub.pageName} />
                                    </NavLink>
                                  }
                                </>
                              )}
                            </NavItem>
                          );
                        })}
                    </Nav>
                  );
                })}

            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  };
};
export default withRouter(
  observable(
    connect(mapStateToProps, {
      setContainerClassnames,
      addContainerClassname,
      changeDefaultClassnames,
      changeSelectedMenuHasSubItems,
    })(Sidebar))
);
