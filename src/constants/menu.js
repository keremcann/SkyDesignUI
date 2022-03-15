const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.dashboard',
    to: '/app/dashboard/start',
    subs: [
      {
        icon: 'simple-icon-book-open',
        label: 'menu.dashboard.start',
        to: '/app/dashboard/start',
      },
    ],
  },
  {
    icon: 'iconsminds-plug-in',
    label: 'menu.diyagramlar',
    to: '/app/dashboard/diyagramlar',
    subs: [
      {
        icon: 'iconsminds-plug-in',
        label: 'menu.diyagramlar.altyapi-mimarisi',
        to: '/app/dashboard/diyagramlar/altyapi-mimarisi',
      },
      {
        icon: 'iconsminds-plug-in',
        label: 'menu.diyagramlar.uygulama-mimarisi',
        to: '/app/dashboard/diyagramlar/uygulama-mimarisi',
      },
    ]
  },
  {
    id: 'strateji-katalogu',
    icon: 'iconsminds-atom',
    label: 'menu.strateji-katalogu',
    to: '/app/strateji-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.strateji-katalogu.vizyon',
        to: '/app/strateji-katalogu/vizyon'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.strateji-katalogu.misyon',
        to: '/app/strateji-katalogu/misyon'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.strateji-katalogu.stratejik-donem',
        to: '/app/strateji-katalogu/stratejik-donem'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.strateji-katalogu.odak-alanlari',
        to: '/app/strateji-katalogu/odak-alanlari'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.strateji-katalogu.stratejik-perspektif',
        to: '/app/strateji-katalogu/stratejik-perspektif'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.strateji-katalogu.stratejik-hedefler',
        to: '/app/strateji-katalogu/stratejik-hedefler'
      },

    ]
  },

  {
    id: 'portfoy-katalogu',
    icon: 'iconsminds-band-aid',
    label: 'menu.portfoy-katalogu',
    to: '/app/portfoy-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.portfoy-katalogu.portfoy-hizalama',
        to: '/app/portfoy-katalogu/portfoy-hizalama'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.portfoy-katalogu.programlar',
        to: '/app/portfoy-katalogu/programlar'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.portfoy-katalogu.projeler',
        to: '/app/portfoy-katalogu/projeler'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.portfoy-katalogu.talepler',
        to: '/app/portfoy-katalogu/talepler'
      },

    ]
  },

  {
    id: 'is-katalogu',
    icon: 'iconsminds-bio-hazard',
    label: 'menu.is-katalogu',
    to: '/app/is-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.is-katalogu.is-kabiliyetleri',
        to: '/app/is-katalogu/is-kabiliyetleri'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.is-katalogu.urunler',
        to: '/app/is-katalogu/urunler'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.is-katalogu.organizasyon-mimarisi',
        to: '/app/is-katalogu/organizasyon-mimarisi',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.is-katalogu.organizasyon-mimarisi.kisiler',
            to: '/app/is-katalogu/organizasyon-mimarisi/kisiler'
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.is-katalogu.organizasyon-mimarisi.roller',
            to: '/app/is-katalogu/organizasyon-mimarisi/roller'
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.is-katalogu.organizasyon-mimarisi.ortamlar',
            to: '/app/is-katalogu/organizasyon-mimarisi/ortamlar'
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.is-katalogu.organizasyon-mimarisi.lokasyonlar',
            to: '/app/is-katalogu/organizasyon-mimarisi/lokasyonlar'
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.is-katalogu.organizasyon-mimarisi.organizasyon-birimleri',
            to: '/app/is-katalogu/organizasyon-mimarisi/organizasyon-birimleri'
          },

        ]
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.is-katalogu.kanallar',
        to: '/app/is-katalogu/kanallar'
      },

    ]
  },

  {
    id: 'uygulama-katalogu',
    icon: 'iconsminds-biotech',
    label: 'menu.uygulama-katalogu',
    to: '/app/uygulama-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.uygulama-katalogu.uygulamalar',
        to: '/app/uygulama-katalogu/uygulamalar'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.uygulama-katalogu.uygulama-modulleri',
        to: '/app/uygulama-katalogu/uygulama-modulleri'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.uygulama-katalogu.uygulama-bilesenleri',
        to: '/app/uygulama-katalogu/uygulama-bilesenleri'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.uygulama-katalogu.uygulama-servisleri',
        to: '/app/uygulama-katalogu/uygulama-servisleri'
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.uygulama-katalogu.uygulama-alanlari',
        to: '/app/uygulama-katalogu/uygulama-alanlari'
      },

    ]
  },

  {
    id: 'veri-katalogu',
    icon: 'iconsminds-brain',
    label: 'menu.veri-katalogu',
    to: '/app/veri-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.veri-katalogu.fiziksel-veri-modelleme',
        to: '/app/veri-katalogu/fiziksel-veri-modelleme',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.fiziksel-veri-modelleme.veri-ogeleri',
            to: '/app/veri-katalogu/fiziksel-veri-modelleme/veri-ogeleri',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.fiziksel-veri-modelleme.veritabanlari',
            to: '/app/veri-katalogu/fiziksel-veri-modelleme/veritabanlari',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.fiziksel-veri-modelleme.semalar',
            to: '/app/veri-katalogu/fiziksel-veri-modelleme/semalar',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.fiziksel-veri-modelleme.tablolar',
            to: '/app/veri-katalogu/fiziksel-veri-modelleme/tablolar',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.fiziksel-veri-modelleme.veri-sozlugu',
            to: '/app/veri-katalogu/fiziksel-veri-modelleme/veri-sozlugu',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.fiziksel-veri-modelleme.veri-tipleri',
            to: '/app/veri-katalogu/fiziksel-veri-modelleme/veri-tipleri',
          },

        ]
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.veri-katalogu.raporlar',
        to: '/app/veri-katalogu/raporlar'
      },

      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.veri-katalogu.is-sozlugu',
        to: '/app/veri-katalogu/is-sozlugu',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.is-sozlugu.veri-politikalari',
            to: '/app/veri-katalogu/is-sozlugu/veri-politikalari',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.is-sozlugu.terimler',
            to: '/app/veri-katalogu/is-sozlugu/terimler',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.is-sozlugu.mevzuatlar',
            to: '/app/veri-katalogu/is-sozlugu/mevzuatlar',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.is-sozlugu.veri-standartlari',
            to: '/app/veri-katalogu/is-sozlugu/veri-standartlari',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.is-sozlugu.is-kurallari',
            to: '/app/veri-katalogu/is-sozlugu/is-kurallari',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.veri-katalogu.is-sozlugu.kisaltmalar',
            to: '/app/veri-katalogu/is-sozlugu/kisaltmalar',
          },

        ]
      },



    ]
  },

  {
    id: 'teknoloji-katalogu',
    icon: 'iconsminds-physics',
    label: 'menu.teknoloji-katalogu',
    to: '/app/teknoloji-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari',
        to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.sunucular',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/sunucular',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.sunucu-gruplari',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/sunucu-gruplari',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.switch',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/switch',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.router',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/router',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.depolama-aygitlari',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/depolama-aygitlari',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.istemciler',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/istemciler',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.sertifikalar',
            to: '/app/teknoloji-katalogu/fiziksel-teknoloji-varliklari/sertifikalar',
          },

        ]
      },

      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.teknoloji-katalogu.altyapi-teknoloji-varliklari',
        to: '/app/teknoloji-katalogu/altyapi-teknoloji-varliklari',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.altyapi-teknoloji-varliklari.ipac',
            to: '/app/teknoloji-katalogu/altyapi-teknoloji-varliklari/ipac',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.altyapi-teknoloji-varliklari.tipa',
            to: '/app/teknoloji-katalogu/altyapi-teknoloji-varliklari/tipa',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.altyapi-teknoloji-varliklari.altyapi-platform-bilesenleri',
            to: '/app/teknoloji-katalogu/altyapi-teknoloji-varliklari/altyapi-platform-bilesenleri',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.altyapi-teknoloji-varliklari.teknolojik-altyapi-platformlari',
            to: '/app/teknoloji-katalogu/altyapi-teknoloji-varliklari/teknolojik-altyapi-platformlari',
          },

        ]
      },

      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.teknoloji-katalogu.teknolojik-portfoyu',
        to: '/app/teknoloji-katalogu/teknolojik-portfoyu',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.teknolojik-portfoyu.mantiksal-teknoloji-bilesenleri',
            to: '/app/teknoloji-katalogu/teknolojik-portfoyu/mantiksal-teknoloji-bilesenleri',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.teknolojik-portfoyu.fiziksel-teknoloji-bilesenleri',
            to: '/app/teknoloji-katalogu/teknolojik-portfoyu/fiziksel-teknoloji-bilesenleri',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.teknolojik-portfoyu.standart-teknoloji-bilesenleri',
            to: '/app/teknoloji-katalogu/teknolojik-portfoyu/standart-teknoloji-bilesenleri',
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.teknoloji-katalogu.teknolojik-portfoyu.ftb-yasam-dongusu-yonetimi',
            to: '/app/teknoloji-katalogu/teknolojik-portfoyu/ftb-yasam-dongusu-yonetimi',
          },

        ]
      }

    ]
  },

  {
    id: 'surec-katalogu',
    icon: 'iconsminds-plaster',
    label: 'menu.surec-katalogu',
    to: '/app/surec-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.ana-surec-gruplari',
        to: '/app/surec-katalogu/ana-surec-gruplari',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.surec-gruplari',
        to: '/app/surec-katalogu/surec-gruplari',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.alt-surec-gruplari',
        to: '/app/surec-katalogu/alt-surec-gruplari',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.surecler',
        to: '/app/surec-katalogu/surecler',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.gorevler',
        to: '/app/surec-katalogu/gorevler',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.havuzlar',
        to: '/app/surec-katalogu/havuzlar',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.surec-katalogu.kulvarlar',
        to: '/app/surec-katalogu/kulvarlar',
      },

    ]
  },

  {
    id: 'risk-katalogu',
    icon: 'iconsminds-pulse',
    label: 'menu.risk-katalogu',
    to: '/app/risk-katalogu',
    subs: [
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.risk-katalogu.bt-riskleri',
        to: '/app/risk-katalogu/bt-riskleri',
      },
      {
        icon: 'simple-icon-arrow-right',
        label: 'menu.risk-katalogu.is-riskleri',
        to: '/app/risk-katalogu/is-riskleri',
      },

    ]
  }
];
export default data;
