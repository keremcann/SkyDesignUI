import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
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
const SidebarArrow = ({ props }) => {

  const [initialData, setInitialData] = useState({
    selectedParentMenu: '',
    viewingParentMenu: '',
    collapsedMenus: [],
    menuItems: [...externalMenuItems, ...externalEndMenuItems]
  })

  const handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = props;
    const nextClasses = getMenuClassesForResize(containerClassnames);
    props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      props.selectedMenuHasSubItems
    );
  };

  const handleDocumentClick = (e) => {
    const container = getContainer();
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
    //TODO - setinitialdata?
    // this.setState({
    //   viewingParentMenu: '',
    // });

    setInitialData({
      ...initialData,
      viewingParentMenu: '',

    })

    toggle();
  };

  const getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = props;
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

  const getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  const toggle = () => {
    const hasSubItems = getIsHasSubItem();
    props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = props;
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
      props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  const handleProps = () => {
    addEvents();
  };

  const addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, handleDocumentClick, true)
    );
  };

  const removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, handleDocumentClick, true)
    );
  };

  const setSelectedLiActive = (callback) => {
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
      //TODO: 
      setInitialData({
        ...initialData,

        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          'data-parent'
        ),
        callback
      })

      // this.setState(
      //   {
      //     selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
      //       'data-parent'
      //     ),
      //   },
      //   callback
      // );
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      );
      if (selectedParentNoSubItem != null) {
        setInitialData({
          ...initialData,
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            'data-flag'
          ),
          callback
        })
        // this.setState(
        //   {
        //     selectedParentMenu: selectedParentNoSubItem.getAttribute(
        //       'data-flag'
        //     ),
        //   },
        //   callback
        // );
      } else if (initialData.selectedParentMenu === '') {
        setInitialData({
          ...initialData,
          selectedParentMenu: initialData.menuItems[0].pageId,
          callback
        })
        // this.setState(
        //   {
        //     selectedParentMenu: this.state.menuItems[0].pageId,
        //   },
        //   callback
        // );
      }
    }
  };

  const setHasSubItemStatus = () => {
    const hasSubmenu = getIsHasSubItem();
    props.changeSelectedMenuHasSubItems(hasSubmenu);
    toggle();
  };

  const getIsHasSubItem = () => {
    const { selectedParentMenu } = initialData;
    const menuItem = initialData.menuItems.find((x) => x.pageId === selectedParentMenu);
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);

    return false;
  };

  useLayoutEffect((prevProps) => {

    if (props.location.pathname !== prevProps.location.pathname) {
      setSelectedLiActive(setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    handleProps();

  }, [])

  // const componentDidUpdate = (prevProps) => {
  //   if (props.location.pathname !== prevProps.location.pathname) {
  //     setSelectedLiActive(setHasSubItemStatus);

  //     window.scrollTo(0, 0);
  //   }
  //   handleProps();
  // }

  useEffect(() => {
    let datam = new PageStore();
    const fetch = async () => {
      await datam.loadPages();
    }
    fetch();

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

    initialData.menuItems = externalMenuItems.concat(datas).concat(externalEndMenuItems)

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    handleProps();
    setSelectedLiActive(setHasSubItemStatus);

    return () => {
      removeEvents();
      window.removeEventListener('resize', handleWindowResize);

    }
  }, []);

  const openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.pageId;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      setInitialData({
        ...initialData,
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      setInitialData({
        ...initialData,
        viewingParentMenu: selectedParent,

      })
      // this.setState({
      //   viewingParentMenu: selectedParent,
      // });
    }
  };

  const toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();

    const { collapsedMenus } = initialData;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      setInitialData({
        ...initialData,
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),

      })
      // this.setState({
      //   collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      // });
    } else {
      collapsedMenus.push(menuKey);
      setInitialData({
        ...initialData,
        collapsedMenus,

      })
      // this.setState({
      //   collapsedMenus,
      // });
    }
    return false;
  };

  const {
    selectedParentMenu,
    viewingParentMenu,
    collapsedMenus,
    menuItems
  } = initialData;

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
                          onClick={(e) => openSubMenu(e, item)}
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
                        (
                          initialData.selectedParentMenu === item.pageId &&
                          initialData.viewingParentMenu === '') ||
                        initialData.viewingParentMenu === item.pageId,
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
                                    toggleMenuCollapse(
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
  // @ts-ignore
  observable(
    connect(mapStateToProps, {
      setContainerClassnames,
      addContainerClassname,
      changeDefaultClassnames,
      changeSelectedMenuHasSubItems,
    })(SidebarArrow))
);
