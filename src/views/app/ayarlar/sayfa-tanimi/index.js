import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from 'reactstrap';
import { Colxx, Separator } from './../../../../components/common/CustomBootstrap';
import { useStore } from '../../../../app/stores/store';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { ColumnBuilder } from '../../../../app/utils/ColumnBuilder';
import IntlMessages from '../../../../helpers/IntlMessages';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Notifier from '../../../../app/utils/Notifier';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import SkyModal from '../../../../components/common/SkyModal';
import _ from 'lodash'
import TreeHelper from '../../../../app/utils/TreeManagement/TreeHelper';
import TreeBuilder from '../../../../app/utils/TreeManagement/TreeBuilder';
import SkyTable from '../../../../app/utils/SkyTable/SkyTable';
import SkyTableColumnBuilder from '../../../../app/utils/SkyTable/SkyTableColumnBuilder';
import Select, { components } from 'react-select';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
const { Option } = components;

const SayfaTanimi = ({ match }) => {
    const { pageStore } = useStore();
    const {
        data,
        loading,
        loadPages, createPage,

        updateModalOpen, toggleUpdateModal,
        addModalOpen, toggleAddModal,
        deleteModalOpen, toggleDeleteModal
    } = pageStore;

    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedMenuItem, setSelectedMenuItem] = useState(null)
    const [secondLevelMenu, setSecondLevelMenu] = useState([])
    const [thirdLevelMenu, setThirdLevelMenu] = useState([])

    useEffect(() => {
        loadPages();
    }, [loadPages, pageStore.addPage])

    const columns = React.useMemo(() => [
        new ColumnBuilder('pageId', 'Page ID').isIdField().sortable().withTextFilter(true).build(),
        new ColumnBuilder('pageName', 'Page Name').isIdField().sortable().withTextFilter().build(),
        new ColumnBuilder('pageIcon', 'Page Icon').isIdField().sortable().withSelectFilter(data).build(),
        new ColumnBuilder('pageUrl', 'Page URL').isIdField().sortable().withTextFilter().build(),
        new ColumnBuilder('operations', 'Operations').isDummyField().withFormat((cell, row, rowIndex) => {
            return <>
                <button
                    type='button'
                    className="btn-sd iconsminds-folder-edit"
                    onClick={(e) => {
                        setSelectedItem(row);
                        toggleUpdateModal();
                    }}> Düzenle</button>


                <button
                    type='button'
                    className="btn-sd iconsminds-folder-delete"
                    onClick={(e) => {
                        setSelectedItem(row);
                        toggleDeleteModal();
                    }}> Sil</button>
            </>
        }).build()

    ], []);

    const AddOrUpdateModal = (datam) => {
        return <div>HEY!</div>

        // <Formik
        //     initialValues={
        //         data.data == null ? {
        //             subCatalogId: 1,
        //             name: '',
        //             type: '',
        //             description: '',
        //             status: ''
        //         } : data.data}
        //     validationSchema={
        //         Yup.object().shape({
        //             name: Yup.string().required('Catalog name is required!'),
        //             type: Yup.string().required('Type is required!'),
        //             description: Yup.string().required('Description is required!'),
        //             status: Yup.string().required('Status is required!'),

        //         })
        //     }
        //     onSubmit={onSubmit}
        // >
        //     {({
        //         errors,
        //         touched,
        //     }) => (
        //         <>
        //             <Form className="av-tooltip tooltip-label-bottom">
        //                 <SkyModal.Body>

        //                     <FormGroup className="form-group has-float-label">
        //                         <Label>
        //                             Katalog adı
        //                         </Label>
        //                         <Field className="form-control" name="name" />
        //                         {errors.name && touched.name ? (
        //                             <div className="invalid-feedback d-block">
        //                                 {errors.name}
        //                             </div>
        //                         ) : null}
        //                     </FormGroup>

        //                     <FormGroup className="form-group has-float-label">
        //                         <Label>
        //                             Açıklama
        //                         </Label>
        //                         <Field className="form-control" name="description" />
        //                         {errors.description && touched.description ? (
        //                             <div className="invalid-feedback d-block">
        //                                 {errors.description}
        //                             </div>
        //                         ) : null}
        //                     </FormGroup>

        //                     <FormGroup className="form-group has-float-label">
        //                         <Label>
        //                             Tipi
        //                         </Label>
        //                         <Field className="form-control" name="type" />
        //                         {errors.type && touched.type ? (
        //                             <div className="invalid-feedback d-block">
        //                                 {errors.type}
        //                             </div>
        //                         ) : null}
        //                     </FormGroup>

        //                     <FormGroup className="form-group has-float-label">
        //                         <Label>
        //                             Durumu
        //                         </Label>
        //                         <Field className="form-control" name="status" />
        //                         {errors.status && touched.status ? (
        //                             <div className="invalid-feedback d-block">
        //                                 {errors.status}
        //                             </div>
        //                         ) : null}
        //                     </FormGroup>

        //                 </SkyModal.Body>
        //                 <SkyModal.Footer>
        //                     <Button color="primary" type="submit">
        //                         Kaydet
        //                     </Button>
        //                 </SkyModal.Footer>
        //             </Form>
        //         </>

        //     )}

        // </Formik>
    }

    function getAllRelatedDataFromTreeByPageId(pageId) {
        return _.filter(data, (val) => {
            return val.parentId === pageId;
        })
    }


    const firstLevelMenuRef = useRef();
    const secondLevelMenuRef = useRef();
    const thirdLevelMenuRef = useRef();

    const treeColumnDefinition = (level, filterData) => [
        new ColumnBuilder('pageId', 'Sayfa').isHidden().isIdField().build(),
        new ColumnBuilder('pageName', level + '. Seviye').build(),

    ];

    const iconUrls = [
        'simple-icon-user',
        'simple-icon-people',
        'simple-icon-user-female',
        'simple-icon-user-follow',
        'simple-icon-user-following',
        'simple-icon-user-unfollow',
        'simple-icon-login',
        'simple-icon-logout',
        'simple-icon-emotsmile',
        'simple-icon-phone',
        'simple-icon-call-end',
        'simple-icon-call-in',
        'simple-icon-call-out',
        'simple-icon-map',
        'simple-icon-location-pin',
        'simple-icon-direction',
        'simple-icon-directions',
        'simple-icon-compass',
        'simple-icon-layers',
        'simple-icon-menu',
        'simple-icon-list',
        'simple-icon-options-vertical',
        'simple-icon-options',
        'simple-icon-arrow-down',
        'simple-icon-arrow-left',
        'simple-icon-arrow-right',
        'simple-icon-arrow-up',
        'simple-icon-arrow-up-circle',
        'simple-icon-arrow-left-circle',
        'simple-icon-arrow-right-circle',
        'simple-icon-arrow-down-circle',
        'simple-icon-check',
        'simple-icon-clock',
        'simple-icon-plus',
        'simple-icon-minus',
        'simple-icon-close',
        'simple-icon-event',
        'simple-icon-exclamation',
        'simple-icon-organization',
        'simple-icon-trophy',
        'simple-icon-screen-smartphone',
        'simple-icon-screen-desktop',
        'simple-icon-plane',
        'simple-icon-notebook',
        'simple-icon-mustache',
        'simple-icon-mouse',
        'simple-icon-magnet',
        'simple-icon-energy',
        'simple-icon-disc',
        'simple-icon-cursor',
        'simple-icon-cursor-move',
        'simple-icon-crop',
        'simple-icon-chemistry',
        'simple-icon-speedometer',
        'simple-icon-shield',
        'simple-icon-screen-tablet',
        'simple-icon-magic-wand',
        'simple-icon-hourglass',
        'simple-icon-graduation',
        'simple-icon-ghost',
        'simple-icon-game-controller',
        'simple-icon-fire',
        'simple-icon-eyeglass',
        'simple-icon-envelope-open',
        'simple-icon-envelope-letter',
        'simple-icon-bell',
        'simple-icon-badge',
        'simple-icon-anchor',
        'simple-icon-wallet',
        'simple-icon-vector',
        'simple-icon-speech',
        'simple-icon-puzzle',
        'simple-icon-printer',
        'simple-icon-present',
        'simple-icon-playlist',
        'simple-icon-pin',
        'simple-icon-picture',
        'simple-icon-handbag',
        'simple-icon-globe-alt',
        'simple-icon-globe',
        'simple-icon-folder-alt',
        'simple-icon-folder',
        'simple-icon-film',
        'simple-icon-feed',
        'simple-icon-drop',
        'simple-icon-drawer',
        'simple-icon-docs',
        'simple-icon-doc',
        'simple-icon-diamond',
        'simple-icon-cup',
        'simple-icon-calculator',
        'simple-icon-bubbles',
        'simple-icon-briefcase',
        'simple-icon-book-open',
        'simple-icon-basket-loaded',
        'simple-icon-basket',
        'simple-icon-bag',
        'simple-icon-action-undo',
        'simple-icon-action-redo',
        'simple-icon-wrench',
        'simple-icon-umbrella',
        'simple-icon-trash',
        'simple-icon-tag',
        'simple-icon-support',
        'simple-icon-frame',
        'simple-icon-size-fullscreen',
        'simple-icon-size-actual',
        'simple-icon-shuffle',
        'simple-icon-share-alt',
        'simple-icon-share',
        'simple-icon-rocket',
        'simple-icon-question',
        'simple-icon-pie-chart',
        'simple-icon-pencil',
        'simple-icon-note',
        'simple-icon-loop',
        'simple-icon-home',
        'simple-icon-grid',
        'simple-icon-graph',
        'simple-icon-microphone',
        'simple-icon-music-tone-alt',
        'simple-icon-music-tone',
        'simple-icon-earphones-alt',
        'simple-icon-earphones',
        'simple-icon-equalizer',
        'simple-icon-like',
        'simple-icon-dislike',
        'simple-icon-control-start',
        'simple-icon-control-rewind',
        'simple-icon-control-play',
        'simple-icon-control-pause',
        'simple-icon-control-forward',
        'simple-icon-control-end',
        'simple-icon-volume-1',
        'simple-icon-volume-2',
        'simple-icon-volume-off',
        'simple-icon-calendar',
        'simple-icon-bulb',
        'simple-icon-chart',
        'simple-icon-ban',
        'simple-icon-bubble',
        'simple-icon-camrecorder',
        'simple-icon-camera',
        'simple-icon-cloud-download',
        'simple-icon-cloud-upload',
        'simple-icon-envelope',
        'simple-icon-eye',
        'simple-icon-flag',
        'simple-icon-heart',
        'simple-icon-info',
        'simple-icon-key',
        'simple-icon-link',
        'simple-icon-lock',
        'simple-icon-lock-open',
        'simple-icon-magnifier',
        'simple-icon-magnifier-add',
        'simple-icon-magnifier-remove',
        'simple-icon-paper-clip',
        'simple-icon-paper-plane',
        'simple-icon-power',
        'simple-icon-refresh',
        'simple-icon-reload',
        'simple-icon-settings',
        'simple-icon-star',
        'simple-icon-symbol-female',
        'simple-icon-symbol-male',
        'simple-icon-target',
        'simple-icon-credit-card',
        'simple-icon-paypal',
        'simple-icon-social-tumblr',
        'simple-icon-social-twitter',
        'simple-icon-social-facebook',
        'simple-icon-social-instagram',
        'simple-icon-social-linkedin',
        'simple-icon-social-pinterest',
        'simple-icon-social-github',
        'simple-icon-social-google',
        'simple-icon-social-reddit',
        'simple-icon-social-skype',
        'simple-icon-social-dribbble',
        'simple-icon-social-behance',
        'simple-icon-social-foursqare',
        'simple-icon-social-soundcloud',
        'simple-icon-social-spotify',
        'simple-icon-social-stumbleupon',
        'simple-icon-social-youtube',
        'simple-icon-social-dropbox',
        'simple-icon-social-vkontakte',
        'simple-icon-social-steam',
        'iconsminds-add-space-after-paragraph',
        'iconsminds-add-space-before-paragraph',
        'iconsminds-align-center',
        'iconsminds-align-justify-all',
        'iconsminds-align-justify-center',
        'iconsminds-align-justify-left',
        'iconsminds-align-justify-right',
        'iconsminds-align-left',
        'iconsminds-align-right',
        'iconsminds-decrase-inedit',
        'iconsminds-increase-inedit',
        'iconsminds-indent-first-line',
        'iconsminds-indent-left-margin',
        'iconsminds-indent-right-margin',
        'iconsminds-line-spacing',
        'iconsminds-arrow-fork',
        'iconsminds-arrow-from',
        'iconsminds-arrow-inside-45',
        'iconsminds-arrow-inside-gap-45',
        'iconsminds-arrow-inside-gap',
        'iconsminds-arrow-inside',
        'iconsminds-arrow-into',
        'iconsminds-arrow-junction',
        'iconsminds-arrow-loop',
        'iconsminds-arrow-merge',
        'iconsminds-arrow-mix',
        'iconsminds-arrow-out-left',
        'iconsminds-arrow-out-right',
        'iconsminds-arrow-outside-45',
        'iconsminds-arrow-outside-gap-45',
        'iconsminds-arrow-outside-gap',
        'iconsminds-arrow-outside',
        'iconsminds-arrow-over',
        'iconsminds-arrow-shuffle',
        'iconsminds-arrow-squiggly',
        'iconsminds-arrow-through',
        'iconsminds-arrow-to',
        'iconsminds-double-circle',
        'iconsminds-full-view-2',
        'iconsminds-full-view',
        'iconsminds-maximize',
        'iconsminds-minimize',
        'iconsminds-resize',
        'iconsminds-three-arrow-fork',
        'iconsminds-view-height',
        'iconsminds-view-width',
        'iconsminds-arrow-around',
        'iconsminds-arrow-barrier',
        'iconsminds-arrow-circle',
        'iconsminds-arrow-cross',
        'iconsminds-arrow-back-2',
        'iconsminds-arrow-back-3',
        'iconsminds-arrow-back',
        'iconsminds-arrow-down-2',
        'iconsminds-arrow-down-3',
        'iconsminds-arrow-down-in-circle',
        'iconsminds-arrow-down',
        'iconsminds-arrow-forward-2',
        'iconsminds-arrow-forward',
        'iconsminds-arrow-left-2',
        'iconsminds-arrow-left-in-circle',
        'iconsminds-arrow-left',
        'iconsminds-arrow-next',
        'iconsminds-arrow-refresh-2',
        'iconsminds-arrow-refresh',
        'iconsminds-arrow-right-2',
        'iconsminds-arrow-right-in-circle',
        'iconsminds-arrow-right',
        'iconsminds-arrow-turn-left',
        'iconsminds-arrow-turn-right',
        'iconsminds-arrow-up-2',
        'iconsminds-arrow-up-3',
        'iconsminds-arrow-up-in-circle',
        'iconsminds-arrow-up',
        'iconsminds-arrow-x-left',
        'iconsminds-arrow-x-right',
        'iconsminds-bottom-to-top',
        'iconsminds-down',
        'iconsminds-down-2',
        'iconsminds-down-3',
        'iconsminds-download',
        'iconsminds-end',
        'iconsminds-fit-to-2',
        'iconsminds-fit-to',
        'iconsminds-full-screen-2',
        'iconsminds-full-screen',
        'iconsminds-go-bottom',
        'iconsminds-go-top',
        'iconsminds-left---right-3',
        'iconsminds-left---right',
        'iconsminds-left',
        'iconsminds-left-2',
        'iconsminds-left-3',
        'iconsminds-left-to-right',
        'iconsminds-loop',
        'iconsminds-navigate-end',
        'iconsminds-navigat-start',
        'iconsminds-reload',
        'iconsminds-reload-2',
        'iconsminds-repeat',
        'iconsminds-repeat-2',
        'iconsminds-repeat-3',
        'iconsminds-repeat-4',
        'iconsminds-right',
        'iconsminds-right-2',
        'iconsminds-right-3',
        'iconsminds-right-to-left',
        'iconsminds-shuffle',
        'iconsminds-shuffle-2',
        'iconsminds-start',
        'iconsminds-sync',
        'iconsminds-to-bottom-2',
        'iconsminds-to-bottom',
        'iconsminds-to-left',
        'iconsminds-top-to-bottom',
        'iconsminds-to-right',
        'iconsminds-to-top-2',
        'iconsminds-to-top',
        'iconsminds-triangle-arrow-down',
        'iconsminds-triangle-arrow-left',
        'iconsminds-triangle-arrow-right',
        'iconsminds-triangle-arrow-up',
        'iconsminds-turn-down-2',
        'iconsminds-turn-down-from-left',
        'iconsminds-turn-down-from-right',
        'iconsminds-turn-down',
        'iconsminds-turn-left-3',
        'iconsminds-turn-left',
        'iconsminds-turn-right-3',
        'iconsminds-turn-right',
        'iconsminds-turn-up-2',
        'iconsminds-turn-up',
        'iconsminds-up---down-3',
        'iconsminds-up---down',
        'iconsminds-up',
        'iconsminds-up-2',
        'iconsminds-up-3',
        'iconsminds-upload', 'iconsminds-billing',
        'iconsminds-binocular',
        'iconsminds-bone',
        'iconsminds-box-close',
        'iconsminds-box-with-folders',
        'iconsminds-brush',
        'iconsminds-bucket',
        'iconsminds-camera-3',
        'iconsminds-camera-4',
        'iconsminds-candle',
        'iconsminds-candy',
        'iconsminds-chair',
        'iconsminds-control',
        'iconsminds-control-2',
        'iconsminds-crop-2',
        'iconsminds-crown-2',
        'iconsminds-dashboard',
        'iconsminds-data-center',
        'iconsminds-data-cloud',
        'iconsminds-data-download',
        'iconsminds-data-storage',
        'iconsminds-delete-file',
        'iconsminds-dice',
        'iconsminds-drill',
        'iconsminds-duplicate-layer',
        'iconsminds-electricity',
        'iconsminds-factory',
        'iconsminds-feather',
        'iconsminds-file',
        'iconsminds-file-clipboard-file---text',
        'iconsminds-file-clipboard',
        'iconsminds-file-copy',
        'iconsminds-file-edit',
        'iconsminds-file-horizontal',
        'iconsminds-files',
        'iconsminds-file-zip',
        'iconsminds-filter-2',
        'iconsminds-flash-2',
        'iconsminds-folder',
        'iconsminds-folder-add--',
        'iconsminds-folder-block',
        'iconsminds-folder-close',
        'iconsminds-folder-cloud',
        'iconsminds-folder-delete',
        'iconsminds-folder-edit',
        'iconsminds-folder-open',
        'iconsminds-folders',
        'iconsminds-folder-zip',
        'iconsminds-funny-bicycle',
        'iconsminds-gas-pump',
        'iconsminds-gear',
        'iconsminds-gear-2',
        'iconsminds-gears',
        'iconsminds-gift-box',
        'iconsminds-grave',
        'iconsminds-headphone',
        'iconsminds-headset',
        'iconsminds-hipster-men',
        'iconsminds-hub',
        'iconsminds-idea',
        'iconsminds-information',
        'iconsminds-key',
        'iconsminds-knife',
        'iconsminds-lantern',
        'iconsminds-layer-backward',
        'iconsminds-layer-forward',
        'iconsminds-library',
        'iconsminds-light-bulb-2',
        'iconsminds-loading',
        'iconsminds-loading-2',
        'iconsminds-loading-3',
        'iconsminds-magic-wand',
        'iconsminds-magnifi-glass--',
        'iconsminds-magnifi-glass',
        'iconsminds-memory-card-2',
        'iconsminds-mine',
        'iconsminds-mustache-2',
        'iconsminds-office-lamp',
        'iconsminds-old-sticky-2',
        'iconsminds-on-off',
        'iconsminds-on-off-2',
        'iconsminds-on-off-3',
        'iconsminds-palette',
        'iconsminds-paper',
        'iconsminds-pen',
        'iconsminds-photo',
        'iconsminds-photo-album-2',
        'iconsminds-power-station',
        'iconsminds-preview',
        'iconsminds-pricing',
        'iconsminds-profile',
        'iconsminds-project',
        'iconsminds-puzzle',
        'iconsminds-refinery',
        'iconsminds-remove-file',
        'iconsminds-rename',
        'iconsminds-repair',
        'iconsminds-ruler',
        'iconsminds-save',
        'iconsminds-scissor',
        'iconsminds-scroller',
        'iconsminds-scroller-2',
        'iconsminds-share',
        'iconsminds-smoking-pipe',
        'iconsminds-solar',
        'iconsminds-statistic',
        'iconsminds-suitcase',
        'iconsminds-support',
        'iconsminds-switch',
        'iconsminds-tripod-with-camera',
        'iconsminds-upgrade',
        'iconsminds-user',
        'iconsminds-windmill',
        'iconsminds-witch-hat',
        'iconsminds-wrench',
        'iconsminds-add-file',
        'iconsminds-affiliate',
        'iconsminds-anchor',
        'iconsminds-balloon',
        'iconsminds-beard-3',
        'iconsminds-bicycle',
        'iconsminds-big-data',
        'iconsminds-printer',
        'iconsminds-sheep',
        'iconsminds-cow',
        'iconsminds-dog',
        'iconsminds-deer',
        'iconsminds-pantone',
        'iconsminds-digital-drawing',
        'iconsminds-trophy-2',
        'iconsminds-life-safer',
        'iconsminds-usb',
        'iconsminds-flowerpot', 'iconsminds-eifel-tower',
        'iconsminds-el-castillo',
        'iconsminds-embassy',
        'iconsminds-empire-state-building',
        'iconsminds-factory-1',
        'iconsminds-fire-staion',
        'iconsminds-home',
        'iconsminds-home-3',
        'iconsminds-home-4',
        'iconsminds-hotel',
        'iconsminds-japanese-gate',
        'iconsminds-leaning-tower',
        'iconsminds-lighthouse',
        'iconsminds-museum',
        'iconsminds-office',
        'iconsminds-opera-house',
        'iconsminds-piramids',
        'iconsminds-police-station',
        'iconsminds-post-office',
        'iconsminds-prater',
        'iconsminds-roof',
        'iconsminds-space-needle',
        'iconsminds-the-white-house',
        'iconsminds-tower',
        'iconsminds-bank',
        'iconsminds-berlin-tower',
        'iconsminds-big-bang',
        'iconsminds-building',
        'iconsminds-castle',
        'iconsminds-chinese-temple',
        'iconsminds-chrysler-building',
        'iconsminds-city-hall',
        'iconsminds-clothing-store',
        'iconsminds-colosseum',
        'iconsminds-column',
        'iconsminds-taj-mahal', 'iconsminds-coins',
        'iconsminds-coins-2',
        'iconsminds-diamond',
        'iconsminds-dollar',
        'iconsminds-dollar-sign-2',
        'iconsminds-euro',
        'iconsminds-euro-sign-2',
        'iconsminds-financial',
        'iconsminds-handshake',
        'iconsminds-pie-chart-3',
        'iconsminds-pie-chart',
        'iconsminds-pound',
        'iconsminds-pound-sign-2',
        'iconsminds-safe-box',
        'iconsminds-wallet',
        'iconsminds-bar-chart-4',
        'iconsminds-calendar-1',
        'iconsminds-calendar-4',
        'iconsminds-line-chart-1',
        'iconsminds-line-chart-3', 'iconsminds-jeans',
        'iconsminds-sunglasses-w-3',
        'iconsminds-tie',
        'iconsminds-t-shirt',
        'iconsminds-baby-clothes',
        'iconsminds-belt',
        'iconsminds-bikini',
        'iconsminds-blouse',
        'iconsminds-boot',
        'iconsminds-bow-3',
        'iconsminds-bra',
        'iconsminds-cap',
        'iconsminds-coat',
        'iconsminds-dress',
        'iconsminds-glasses-3',
        'iconsminds-gloves',
        'iconsminds-hanger',
        'iconsminds-heels-2',
        'iconsminds-jacket',
        'iconsminds-walkie-talkie', 'iconsminds-wifi',
        'iconsminds-address-book-2',
        'iconsminds-bell',
        'iconsminds-bird-delivering-letter',
        'iconsminds-communication-tower-2',
        'iconsminds-fax',
        'iconsminds-megaphone',
        'iconsminds-newspaper',
        'iconsminds-old-telephone',
        'iconsminds-router',
        'iconsminds-telephone-2',
        'iconsminds-smartphone-4',
        'iconsminds-tablet-3',
        'iconsminds-computer',
        'iconsminds-laptop---phone',
        'iconsminds-laptop---tablet',
        'iconsminds-laptop-3',
        'iconsminds-monitor',
        'iconsminds-monitor---laptop',
        'iconsminds-monitor---phone',
        'iconsminds-monitor---tablet',
        'iconsminds-monitor-3',
        'iconsminds-monitor-vertical',
        'iconsminds-orientation',
        'iconsminds-phone-3',
        'iconsminds-smartphone-3', 'iconsminds-quill-3',
        'iconsminds-student-hat',
        'iconsminds-blackboard',
        'iconsminds-book',
        'iconsminds-bookmark',
        'iconsminds-books',
        'iconsminds-compass-2',
        'iconsminds-diploma-2',
        'iconsminds-eraser-2',
        'iconsminds-formula',
        'iconsminds-notepad',
        'iconsminds-open-book',
        'iconsminds-pen-2',
        'iconsminds-pi',
        'iconsminds-pipette', 'iconsminds-mail-block',
        'iconsminds-mailbox-empty',
        'iconsminds-mailbox-full',
        'iconsminds-mail-delete',
        'iconsminds-mail-favorite',
        'iconsminds-mail-forward',
        'iconsminds-mail-gallery',
        'iconsminds-mail-inbox',
        'iconsminds-mail-link',
        'iconsminds-mail-lock',
        'iconsminds-mail-love',
        'iconsminds-mail-money',
        'iconsminds-mail-open',
        'iconsminds-mail-outbox',
        'iconsminds-mail-password',
        'iconsminds-mail-photo',
        'iconsminds-mail-read',
        'iconsminds-mail-remove-x',
        'iconsminds-mail-reply-all',
        'iconsminds-mail-reply',
        'iconsminds-mail-search',
        'iconsminds-mail-send',
        'iconsminds-mail-settings',
        'iconsminds-mail-unread',
        'iconsminds-mail-video',
        'iconsminds-mail-with-at-sign',
        'iconsminds-mail-with-cursors',
        'iconsminds-new-mail',
        'iconsminds-post-mail-2',
        'iconsminds-post-mail',
        'iconsminds-spam-mail',
        'iconsminds-stamp',
        'iconsminds-stamp-2',
        'iconsminds-voicemail',
        'iconsminds-at-sign',
        'iconsminds-box-full',
        'iconsminds-empty-box',
        'iconsminds-envelope',
        'iconsminds-envelope-2',
        'iconsminds-inbox',
        'iconsminds-inbox-empty',
        'iconsminds-inbox-forward',
        'iconsminds-inbox-full',
        'iconsminds-inbox-into',
        'iconsminds-inbox-out',
        'iconsminds-inbox-reply',
        'iconsminds-letter-close',
        'iconsminds-letter-open',
        'iconsminds-letter-sent',
        'iconsminds-mail',
        'iconsminds-mail-2',
        'iconsminds-mail-3',
        'iconsminds-mail-add--',
        'iconsminds-mail-attachement',
        'iconsminds-ice-cream',
        'iconsminds-lollipop',
        'iconsminds-open-banana',
        'iconsminds-pepper',
        'iconsminds-tee-mug',
        'iconsminds-tomato',
        'iconsminds-apple',
        'iconsminds-apple-bite',
        'iconsminds-beer-glass',
        'iconsminds-birthday-cake',
        'iconsminds-bread',
        'iconsminds-cake',
        'iconsminds-can',
        'iconsminds-can-2',
        'iconsminds-cheese',
        'iconsminds-chef-hat',
        'iconsminds-chopsticks',
        'iconsminds-cocktail',
        'iconsminds-coffee',
        'iconsminds-coffee-bean',
        'iconsminds-coffee-to-go',
        'iconsminds-cookies',
        'iconsminds-croissant',
        'iconsminds-cupcake',
        'iconsminds-doughnut',
        'iconsminds-fish',
        'iconsminds-glass-water',
        'iconsminds-hamburger',
        'iconsminds-hot-dog',
        'iconsminds-webcam',
        'iconsminds-battery-0',
        'iconsminds-battery-100',
        'iconsminds-battery-charge',
        'iconsminds-charger',
        'iconsminds-cpu',
        'iconsminds-disk',
        'iconsminds-dvd',
        'iconsminds-fan',
        'iconsminds-gamepad-2',
        'iconsminds-hdd',
        'iconsminds-keyboard',
        'iconsminds-mouse',
        'iconsminds-mouse-3',
        'iconsminds-plug-in',
        'iconsminds-power',
        'iconsminds-power-cable',
        'iconsminds-remote-controll-2',
        'iconsminds-server-2',
        'iconsminds-speaker',
        'iconsminds-start-ways',
        'iconsminds-synchronize',
        'iconsminds-synchronize-2',
        'iconsminds-undo',
        'iconsminds-up-1',
        'iconsminds-upload-1',
        'iconsminds-upward',
        'iconsminds-yes',
        'iconsminds-add',
        'iconsminds-back',
        'iconsminds-broken-link',
        'iconsminds-check',
        'iconsminds-close',
        'iconsminds-cursor',
        'iconsminds-cursor-click-2',
        'iconsminds-cursor-click',
        'iconsminds-cursor-move-2',
        'iconsminds-cursor-select',
        'iconsminds-down-1',
        'iconsminds-download-1',
        'iconsminds-downward',
        'iconsminds-endways',
        'iconsminds-forward',
        'iconsminds-left-1',
        'iconsminds-link',
        'iconsminds-next',
        'iconsminds-orientation-1',
        'iconsminds-pointer',
        'iconsminds-previous',
        'iconsminds-redo',
        'iconsminds-refresh',
        'iconsminds-reload-1',
        'iconsminds-remove',
        'iconsminds-repeat-1',
        'iconsminds-reset',
        'iconsminds-rewind',
        'iconsminds-right-1',
        'iconsminds-rotation',
        'iconsminds-rotation-390',
        'iconsminds-spot',
        'iconsminds-satelite-2',
        'iconsminds-compass-1',
        'iconsminds-direction-east',
        'iconsminds-edit-map',
        'iconsminds-geo2',
        'iconsminds-geo2--',
        'iconsminds-globe-2',
        'iconsminds-location-2',
        'iconsminds-map2',
        'iconsminds-map-marker-2',
        'iconsminds-map-marker',
        'iconsminds-stop',
        'iconsminds-stop-2',
        'iconsminds-back-1',
        'iconsminds-back-2',
        'iconsminds-eject',
        'iconsminds-eject-2',
        'iconsminds-end-1',
        'iconsminds-end-2',
        'iconsminds-next-1',
        'iconsminds-next-2',
        'iconsminds-pause',
        'iconsminds-pause-2',
        'iconsminds-power-2',
        'iconsminds-power-3',
        'iconsminds-record',
        'iconsminds-record-2',
        'iconsminds-repeat-5',
        'iconsminds-repeat-6',
        'iconsminds-shuffle-1',
        'iconsminds-shuffle-3',
        'iconsminds-start-1',
        'iconsminds-start-2',
        'iconsminds-volume-down',
        'iconsminds-volume-up',
        'iconsminds-back-music',
        'iconsminds-cd-2',
        'iconsminds-clef',
        'iconsminds-earphones-2',
        'iconsminds-equalizer',
        'iconsminds-first',
        'iconsminds-headphones',
        'iconsminds-last',
        'iconsminds-loudspeaker',
        'iconsminds-mic',
        'iconsminds-microphone-4',
        'iconsminds-next-music',
        'iconsminds-old-radio',
        'iconsminds-play-music',
        'iconsminds-radio',
        'iconsminds-record-1',
        'iconsminds-record-music',
        'iconsminds-sound',
        'iconsminds-speaker-1',
        'iconsminds-stop-music',
        'iconsminds-trumpet',
        'iconsminds-voice',
        'iconsminds-electric-guitar',
        'iconsminds-guitar',
        'iconsminds-tree-3',
        'iconsminds-eci-icon',
        'iconsminds-environmental',
        'iconsminds-environmental-3',
        'iconsminds-fire-flame-2',
        'iconsminds-green-energy',
        'iconsminds-green-house',
        'iconsminds-leafs',
        'iconsminds-light-bulb-leaf',
        'iconsminds-palm-tree',
        'iconsminds-plant',
        'iconsminds-recycling-2',
        'iconsminds-seed',
        'iconsminds-trash-with-men',
        'iconsminds-forest-1',
        'iconsminds-id-card',
        'iconsminds-king-2',
        'iconsminds-male',
        'iconsminds-male-female',
        'iconsminds-male-2',
        'iconsminds-man-sign',
        'iconsminds-mens',
        'iconsminds-network',
        'iconsminds-student-female',
        'iconsminds-student-male',
        'iconsminds-student-male-female',
        'iconsminds-students',
        'iconsminds-woman-man',
        'iconsminds-add-user',
        'iconsminds-administrator',
        'iconsminds-assistant',
        'iconsminds-business-man',
        'iconsminds-business-man-woman',
        'iconsminds-business-mens',
        'iconsminds-business-woman',
        'iconsminds-conference',
        'iconsminds-doctor',
        'iconsminds-engineering',
        'iconsminds-female',
        'iconsminds-female-2',
        'iconsminds-temperature',
        'iconsminds-test-tube',
        'iconsminds-ambulance',
        'iconsminds-atom',
        'iconsminds-band-aid',
        'iconsminds-bio-hazard',
        'iconsminds-biotech',
        'iconsminds-brain',
        'iconsminds-chemical',
        'iconsminds-clinic',
        'iconsminds-danger',
        'iconsminds-dna',
        'iconsminds-dna-2',
        'iconsminds-first-aid',
        'iconsminds-flask',
        'iconsminds-medical-sign',
        'iconsminds-medicine-3',
        'iconsminds-microscope',
        'iconsminds-physics',
        'iconsminds-plasmid',
        'iconsminds-plaster',
        'iconsminds-pulse',
        'iconsminds-radioactive',
        'iconsminds-stethoscope',
        'iconsminds-security-settings',
        'iconsminds-securiy-remove',
        'iconsminds-shield',
        'iconsminds-ssl',
        'iconsminds-type-pass',
        'iconsminds-unlock-2',
        'iconsminds-finger-print',
        'iconsminds-firewall',
        'iconsminds-key-lock',
        'iconsminds-laptop-secure',
        'iconsminds-lock-2',
        'iconsminds-password',
        'iconsminds-password-field',
        'iconsminds-police',
        'iconsminds-security-block',
        'iconsminds-security-bug',
        'iconsminds-security-camera',
        'iconsminds-security-check',
        'iconsminds-testimonal',
        'iconsminds-broke-link-2',
        'iconsminds-coding',
        'iconsminds-consulting',
        'iconsminds-copyright',
        'iconsminds-idea-2',
        'iconsminds-link-2',
        'iconsminds-management',
        'iconsminds-monitor-analytics',
        'iconsminds-monitoring',
        'iconsminds-optimization',
        'iconsminds-tag',
        'iconsminds-target',
        'iconsminds-target-market',
        'iconsminds-shopping-bag',
        'iconsminds-shopping-basket',
        'iconsminds-shopping-cart',
        'iconsminds-tag-3',
        'iconsminds-add-bag',
        'iconsminds-add-basket',
        'iconsminds-add-cart',
        'iconsminds-bag-items',
        'iconsminds-bag-quantity',
        'iconsminds-basket-coins',
        'iconsminds-basket-items',
        'iconsminds-basket-quantity',
        'iconsminds-car-items',
        'iconsminds-cart-quantity',
        'iconsminds-cash-register-2',
        'iconsminds-checkout',
        'iconsminds-checkout-bag',
        'iconsminds-checkout-basket',
        'iconsminds-home-1',
        'iconsminds-qr-code',
        'iconsminds-receipt-4',
        'iconsminds-remove-bag',
        'iconsminds-remove-basket',
        'iconsminds-remove-cart',
        'iconsminds-shop',
        'iconsminds-shop-2',
        'iconsminds-shop-3',
        'iconsminds-calculator',
        'iconsminds-scale',
        'iconsminds-shop-4',
        'iconsminds-credit-card',
        'iconsminds-credit-card-3',
        'iconsminds-money-bag',
        'iconsminds-ying-yang',
        'iconsminds-bisexual',
        'iconsminds-cancer',
        'iconsminds-couple-sign',
        'iconsminds-family-sign',
        'iconsminds-female-1',
        'iconsminds-gey',
        'iconsminds-heart',
        'iconsminds-homosexual',
        'iconsminds-inifity',
        'iconsminds-lesbian',
        'iconsminds-lesbians',
        'iconsminds-love',
        'iconsminds-male-1',
        'iconsminds-men',
        'iconsminds-no-smoking',
        'iconsminds-paw',
        'iconsminds-quotes',
        'iconsminds-redirect',
        'iconsminds-ribbon',
        'iconsminds-venn-diagram',
        'iconsminds-wheelchair',
        'iconsminds-women',
        'iconsminds-instagram',
        'iconsminds-last-fm',
        'iconsminds-like',
        'iconsminds-linkedin-2',
        'iconsminds-livejournal',
        'iconsminds-newsvine',
        'iconsminds-picasa',
        'iconsminds-pinterest',
        'iconsminds-plaxo',
        'iconsminds-plurk',
        'iconsminds-posterous',
        'iconsminds-qik',
        'iconsminds-reddit',
        'iconsminds-reverbnation',
        'iconsminds-rss',
        'iconsminds-sharethis',
        'iconsminds-skype',
        'iconsminds-soundcloud',
        'iconsminds-stumbleupon',
        'iconsminds-technorati',
        'iconsminds-tumblr',
        'iconsminds-twitter',
        'iconsminds-unlike',
        'iconsminds-ustream',
        'iconsminds-viddler',
        'iconsminds-vimeo',
        'iconsminds-wordpress',
        'iconsminds-xanga',
        'iconsminds-yahoo',
        'iconsminds-yelp',
        'iconsminds-youtube',
        'iconsminds-ask',
        'iconsminds-behance',
        'iconsminds-bing',
        'iconsminds-blinklist',
        'iconsminds-blogger',
        'iconsminds-delicious',
        'iconsminds-deviantart',
        'iconsminds-digg',
        'iconsminds-diigo',
        'iconsminds-dribble',
        'iconsminds-email',
        'iconsminds-evernote',
        'iconsminds-facebook',
        'iconsminds-feedburner',
        'iconsminds-flickr',
        'iconsminds-formspring',
        'iconsminds-forsquare',
        'iconsminds-friendster',
        'iconsminds-google',
        'iconsminds-gowalla',
        'iconsminds-icq',
        'iconsminds-imdb',
        'iconsminds-speach-bubble',
        'iconsminds-speach-bubbles',
        'iconsminds-speach-bubble-2',
        'iconsminds-speach-bubble-3',
        'iconsminds-speach-bubble-4',
        'iconsminds-speach-bubble-5',
        'iconsminds-speach-bubble-6',
        'iconsminds-speach-bubble-7',
        'iconsminds-speach-bubble-8',
        'iconsminds-speach-bubble-9',
        'iconsminds-speach-bubble-10',
        'iconsminds-speach-bubble-11',
        'iconsminds-speach-bubble-12',
        'iconsminds-speach-bubble-13',
        'iconsminds-speach-bubble-asking',
        'iconsminds-speach-bubble-comic-2',
        'iconsminds-speach-bubble-comic-3',
        'iconsminds-speach-bubble-comic-4',
        'iconsminds-speach-bubble-comic',
        'iconsminds-speach-bubble-dialog',
        'iconsminds-trekking',
        'iconsminds-trophy',
        'iconsminds-weight-lift',
        'iconsminds-aerobics',
        'iconsminds-archery',
        'iconsminds-ballet-shoes',
        'iconsminds-baseball',
        'iconsminds-basket-ball',
        'iconsminds-bowling',
        'iconsminds-box',
        'iconsminds-chess',
        'iconsminds-cricket',
        'iconsminds-dumbbell',
        'iconsminds-football',
        'iconsminds-football-2',
        'iconsminds-footprint',
        'iconsminds-footprint-2',
        'iconsminds-golf',
        'iconsminds-gymnastics',
        'iconsminds-hokey',
        'iconsminds-jump-rope',
        'iconsminds-life-jacket',
        'iconsminds-medal',
        'iconsminds-pilates-2',
        'iconsminds-rafting',
        'iconsminds-running-shoes',
        'iconsminds-skydiving',
        'iconsminds-snorkel',
        'iconsminds-soccer-ball',
        'iconsminds-swimming',
        'iconsminds-tennis',
        'iconsminds-tennis-ball',
        'iconsminds-over-time-2',
        'iconsminds-sand-watch-2',
        'iconsminds-stopwatch',
        'iconsminds-time-backup',
        'iconsminds-timer',
        'iconsminds-watch',
        'iconsminds-24-hour',
        'iconsminds-alarm-clock-2',
        'iconsminds-alarm-clock',
        'iconsminds-clock',
        'iconsminds-clock-2',
        'iconsminds-clock-back',
        'iconsminds-clock-forward',
        'iconsminds-old-clock',
        'iconsminds-scooter',
        'iconsminds-ship',
        'iconsminds-skateboard',
        'iconsminds-taxi-sign',
        'iconsminds-traffic-light',
        'iconsminds-train',
        'iconsminds-yacht',
        'iconsminds-bicycle-1',
        'iconsminds-bus-2',
        'iconsminds-car',
        'iconsminds-gaugage',
        'iconsminds-gaugage-2',
        'iconsminds-helicopter',
        'iconsminds-jeep',
        'iconsminds-jet',
        'iconsminds-motorcycle',
        'iconsminds-plane',
        'iconsminds-road-2',
        'iconsminds-sailing-ship',
        'iconsminds-air-balloon-1',
        'iconsminds-tractor',
        'iconsminds-video-tripod',
        'iconsminds-3d-eyeglasses',
        'iconsminds-cinema',
        'iconsminds-director',
        'iconsminds-film',
        'iconsminds-film-video',
        'iconsminds-old-tv',
        'iconsminds-tv',
        'iconsminds-video',
        'iconsminds-video-5',
        'iconsminds-video-6',
        'iconsminds-video-len',
        'iconsminds-sunrise',
        'iconsminds-sunset',
        'iconsminds-temperature-2',
        'iconsminds-thunder',
        'iconsminds-umbrella-2',
        'iconsminds-wave',
        'iconsminds-wind-turbine',
        'iconsminds-windy',
        'iconsminds-cloud-hail',
        'iconsminds-cloud-moon',
        'iconsminds-cloud-rain',
        'iconsminds-cloud-snow',
        'iconsminds-cloud-sun',
        'iconsminds-cloud-weather',
        'iconsminds-drop',
        'iconsminds-dry',
        'iconsminds-fog-day',
        'iconsminds-fog-night',
        'iconsminds-half-moon',
        'iconsminds-rain-drop',
        'iconsminds-snow',
        'iconsminds-snowflake-3',
        'iconsminds-snow-storm',
        'iconsminds-spring',
        'iconsminds-storm',
        'iconsminds-summer',
        'iconsminds-sun',
        'iconsminds-sun-cloudy-rain',
    ];

    let treeBuilder = TreeBuilder(data, 'pageId', 'parentId');

    const [selectedOption, setSelectedOption] = useState('');

    return (
        <>
            <SkyModal
                headerText={'Yeni kayıt'}
                modalOpen={addModalOpen}
                toggleModal={toggleAddModal}
            >
                <AddOrUpdateModal />
            </SkyModal>

            <SkyModal
                headerText={'Güncelleme'}
                modalOpen={updateModalOpen}
                toggleModal={toggleUpdateModal}
            >
                <AddOrUpdateModal data={selectedItem} />
            </SkyModal>

            <SkyModal
                headerText={'Silme işlemi onayı'}
                modalOpen={deleteModalOpen}
                toggleModal={toggleDeleteModal}
            >
                <SkyModal.Body>

                    <p><b>{selectedItem?.name}</b> isimli kayıt silinmek üzere. İşlemi onaylıyor musunuz?</p>

                </SkyModal.Body>
                <SkyModal.Footer>
                    <Button style={{ backgroundColor: 'red' }} color="secondary" type="button" onClick={async () => {
                        alert('deleted id: ' + selectedItem.subCatalogDetailId);
                        toggleDeleteModal();
                        await loadPages();
                    }}>
                        Sil
                    </Button>

                    <Button color="secondary" type="button" onClick={async () => {
                        toggleDeleteModal();
                    }}>
                        İptal
                    </Button>

                </SkyModal.Footer>
            </SkyModal>
            <Row>
                <Col>
                    <Select
                        components={{
                            Input: CustomSelectInput,
                            Option: (props) => {
                                return <Option {...props}>
                                    <i
                                        className={props.data.icon}
                                        style={{ width: 36 }}
                                    />
                                    {props.data.label}
                                </Option>
                            }
                        }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={[
                            { label: 'Cake', value: 'cake', key: 0, icon: 'iconsminds-ship' },
                            { label: 'Cupcake', value: 'cupcake', key: 1, icon: 'iconsminds-ship' },
                            { label: 'Dessert', value: 'dessert', key: 2, icon: 'iconsminds-ship' }
                        ]}
                    />
                </Col>

                <Col>

                    {/* Icons:<br />
                    <table>
                        {iconUrls.map(icon => {
                            return (<tr>
                                <td>{icon}</td>
                                <td><i className={icon} style={{ fontSize: '24px' }} /></td>
                            </tr>)
                        })}
                    </table> */}

                    <select>
                        {iconUrls.map(icon => {
                            // alert(JSON.stringify(icon))
                            return (
                                <option value={icon}><i className={icon} />{icon}</option>)
                        })}
                    </select>

                </Col>
            </Row>
            <Row>
                <Colxx className="mb-12">

                    <Breadcrumb heading={'menu.ayarlar.sayfa-tanimi'} match={match} />

                    <div className="text-zero top-right-button-container">
                        <Button
                            color="primary"
                            size="lg"
                            className="top-right-button"
                            onClick={() => {
                                toggleAddModal();
                            }}
                        >
                            <IntlMessages id="pages.add-new" />
                        </Button>
                    </div>

                    <Separator className="mb-5" />

                    <Card className="mb-4">
                        <CardBody>

                            {/* <Row>
                                <Colxx xs='12'>
                                    <pre>
                                        first level tree: {JSON.stringify(getAllFirstLevelTree(), null, 4)}
                                        <br />
                                        <br />
                                        selected tree: {JSON.stringify(getAllRelatedDataFromTreeByPageId(13), null, 4)}
                                        transformed: {JSON.stringify(transformToTree(getAllRelatedDataFromTreeByPageId(13)), null, 4)}
                                        data: {JSON.stringify(transformToTree(data), null, 4)}
                                    </pre>
                                </Colxx>
                            </Row> */}
                            <Row>
                                <button onClick={async () => {
                                    await pageStore.addPage()
                                }}>Click here</button>
                            </Row>
                            <Row>
                                <Colxx style={{ textAlign: 'right' }}>
                                    {<button
                                        disabled={selectedMenuItem == null}
                                        className='btn btn-primary'
                                        style={{ marginRight: '14px' }}
                                        onClick={() => {
                                            firstLevelMenuRef.current.selectionContext.selected = [];
                                            secondLevelMenuRef.current.selectionContext.selected = [];
                                            thirdLevelMenuRef.current.selectionContext.selected = [];
                                            setSecondLevelMenu([]);
                                            setThirdLevelMenu([]);
                                            setSelectedMenuItem(null);
                                        }}>

                                        Seçimleri temizle</button>}
                                    {<button
                                        className='btn btn-primary'
                                        style={{ marginRight: '14px' }}
                                        disabled={selectedMenuItem?.level == 3 || selectedMenuItem == null}
                                    >{(selectedMenuItem?.level == 3 || selectedMenuItem == null) && 'Ekle'}{selectedMenuItem?.level != 3 && selectedMenuItem != null && `${selectedMenuItem?.pageName} altına ${selectedMenuItem?.level + 1}. seviye sayfa ekle`}
                                    </button>}
                                    {<button className='btn btn-primary' disabled={selectedMenuItem == null}>Sil - {selectedMenuItem?.pageName}</button>}
                                </Colxx>
                            </Row>
                            <br></br>
                            <Row>
                                <Colxx xs='4'>

                                    {/* <SkyTable
                                        columns={[
                                            new SkyTableColumnBuilder('pageId', 'ID').isIdColumn(true).build(),
                                            new SkyTableColumnBuilder('pageName', '1. Seviye').build()
                                        ]}
                                        data={treeBuilder.getAllRelatedDataFromTreeById(null)}
                                        onRowSelected={(row) => {
                                            row = {
                                                ...row,
                                                level: 1
                                            }

                                            secondLevelMenuRef.current.selectionContext.selected = [];
                                            setThirdLevelMenu([])
                                            setSelectedMenuItem(row);
                                            setSecondLevelMenu(getAllRelatedDataFromTreeByPageId(row.pageId))
                                        }}
                                    /> */}

                                    <BootstrapTable
                                        keyField='pageId'
                                        ref={firstLevelMenuRef}
                                        data={treeBuilder.getAllRelatedDataFromTreeByParentId(null)}
                                        columns={treeColumnDefinition(1, treeBuilder.getAllRelatedDataFromTreeByParentId(null))}
                                        filter={filterFactory()}
                                        selectRow={{
                                            mode: 'radio',
                                            clickToSelect: true,
                                            hideSelectColumn: true,
                                            classes: 'btn-primary',
                                            onSelect: (row) => {
                                                row = {
                                                    ...row,
                                                    level: 1
                                                }

                                                secondLevelMenuRef.current.selectionContext.selected = [];
                                                setThirdLevelMenu([])
                                                setSelectedMenuItem(row);
                                                setSecondLevelMenu(getAllRelatedDataFromTreeByPageId(row.pageId))
                                            }
                                        }}
                                    />

                                </Colxx>
                                <Colxx xs='4'>
                                    <BootstrapTable
                                        keyField='pageId'
                                        ref={secondLevelMenuRef}
                                        data={secondLevelMenu}
                                        columns={treeColumnDefinition(2, secondLevelMenu)}
                                        filter={filterFactory()}
                                        selectRow={{
                                            mode: 'radio',
                                            clickToSelect: true,
                                            hideSelectColumn: true,
                                            classes: 'btn-primary',
                                            onSelect: (row) => {

                                                row = {
                                                    ...row,
                                                    level: 2
                                                }
                                                thirdLevelMenuRef.current.selectionContext.selected = [];
                                                setSelectedMenuItem(row);
                                                setThirdLevelMenu(getAllRelatedDataFromTreeByPageId(row.pageId))
                                            }
                                        }}
                                    />

                                </Colxx>
                                <Colxx xs='4'>
                                    <BootstrapTable
                                        keyField='pageId'
                                        ref={thirdLevelMenuRef}
                                        data={thirdLevelMenu}
                                        columns={treeColumnDefinition(3, thirdLevelMenu)}
                                        filter={filterFactory()}
                                        selectRow={{
                                            mode: 'radio',
                                            clickToSelect: true,
                                            hideSelectColumn: true,
                                            classes: 'btn-primary',
                                            onSelect: (row) => {
                                                row = {
                                                    ...row,
                                                    level: 3
                                                }
                                                setSelectedMenuItem(row);
                                            }
                                        }} />
                                </Colxx>
                            </Row>
                            <Row>

                                <Colxx>
                                    <pre className='btn-primary'>
                                        Selected menu item: {JSON.stringify(selectedMenuItem, null, 4)}
                                    </pre>
                                </Colxx>
                            </Row>
                        </CardBody>
                    </Card>

                </Colxx>
            </Row>
        </>
    )

};

export default observer(SayfaTanimi);