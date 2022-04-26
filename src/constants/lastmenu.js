const data = [
    {
        pageId: 'ayarlar',
        pageIcon: 'iconsminds-air-balloon-1',
        pageName: 'menu.ayarlar',
        pageUrl: '/app/ayarlar',
        subs: [
            {
                pageIcon: 'iconsminds-air-balloon-1',
                pageName: 'menu.ayarlar.kullanici-tanimi',
                pageUrl: '/app/ayarlar/kullanici-tanimi',

            },
            {
                pageIcon: 'iconsminds-air-balloon-1',
                pageName: 'menu.ayarlar.rol-tanimi',
                pageUrl: '/app/ayarlar/rol-tanimi',

            },
            {
                pageIcon: 'iconsminds-air-balloon-1',
                pageName: 'menu.ayarlar.yetkilendirme',
                pageUrl: '/app/ayarlar/yetkilendirme',
                subs: [
                    {
                        pageIcon: 'iconsminds-air-balloon-1',
                        pageName: 'menu.ayarlar.yetkilendirme.sayfa-yetkilendirme',
                        pageUrl: '/app/ayarlar/yetkilendirme/sayfa-yetkilendirme'
                    },
                    {
                        pageIcon: 'iconsminds-air-balloon-1',
                        pageName: 'menu.ayarlar.yetkilendirme.rol-yetkilendirme',
                        pageUrl: '/app/ayarlar/yetkilendirme/rol-yetkilendirme'
                    },
                ]
            },
            {
                pageIcon: 'iconsminds-air-balloon-1',
                pageName: 'menu.ayarlar.sayfa-tanimi',
                pageUrl: '/app/ayarlar/sayfa-tanimi',

            },
            {
                pageIcon: 'iconsminds-air-balloon-2',
                pageName: 'menu.ayarlar.kolon-listesi',
                pageUrl: '/app/ayarlar/kolon-listesi',

            },
        ]
    },
]

export default data;