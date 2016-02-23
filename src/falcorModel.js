const falcor = require('falcor/dist/falcor.browser');

const $ref = falcor.Model.ref;
const $atom = falcor.Model.atom;

export default new falcor.Model({
  "cache": {
    v1: {
      user: {
        me: {
          firstName: 'test',
          lastName: 'admin',
          role: 'admin',
          verified: false,
          profilePic: 'http://lorempixel.com/100/100/people/',
          token: 'magic-login-token'
        }
      }
    },
    menuItemsById: {
      7975821618456393: {
        id: "7975821618456393",
        title: "Spaghetti Bolognese",
        description: "Lorem ipsum Consectetur commodo culpa ut velit voluptate magna enim minim pariatur elit sint do dolor sit pariatur nostrud ea est proident in consectetur ut incididunt sunt dolore enim irure sed quis officia non nostrud laboris irure labore quis proident pariatur voluptate. Lorem ipsum Amet dolor dolor voluptate qui in dolor sit Excepteur pariatur voluptate quis in et officia id aliquip est consectetur consectetur. Lorem ipsum Commodo in magna Duis sed exercitation occaecat ullamco in amet ex consectetur dolor sit dolore ex minim deserunt culpa magna. Lorem ipsum Consequat nulla anim fugiat sed reprehenderit cillum consectetur quis commodo ut adipisicing irure qui eiusmod dolor deserunt velit pariatur elit qui consequat Ut. Lorem ipsum Do sunt cupidatat pariatur aliqua fugiat sunt deserunt incididunt ut nisi sed laborum aute ex qui consectetur aute sed Duis dolore magna fugiat in commodo amet labore non enim tempor dolore minim laboris proident voluptate dolore fugiat. Lorem ipsum Occaecat aute consequat ut sed eu non ex enim cupidatat irure consectetur dolore deserunt sed in est dolore commodo mollit ad sit esse Ut irure consectetur Duis. Lorem ipsum Velit Ut in sint pariatur sunt minim sunt Excepteur in ut amet amet et dolore reprehenderit tempor consequat laborum ex officia in nulla ut est sunt ut veniam esse et laboris amet dolore in officia pariatur velit consequat aute eiusmod proident ullamco adipisicing in cillum nostrud Ut adipisicing velit cillum nostrud dolor occaecat mollit quis dolore fugiat reprehenderit voluptate tempor consectetur est est pariatur officia culpa esse commodo fugiat magna consectetur aute dolore veniam ut do fugiat Excepteur nostrud aute in culpa consequat proident veniam elit ut Duis sed ad dolore sunt in in nostrud nisi sunt est deserunt deserunt laboris ex ad fugiat commodo fugiat proident ex Ut cupidatat mollit id magna aliqua Duis nulla commodo incididunt velit proident in cillum dolore consequat elit amet esse in Ut fugiat ex fugiat fugiat irure sit et Duis id commodo laboris enim velit consequat minim commodo tempor ullamco exercitation aliquip mollit ut qui proident in elit dolore in adipisicing incididunt dolore Excepteur occaecat id nulla irure.",
        picUrl: "http://lorempixel.com/700/500/food/"
      },
      7003244936931878: {
        id: "7003244936931878",
        title: "Sandwich 2",
        description: "Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.",
        picUrl: "http://lorempixel.com/100/200/food/"
      },
      8612184282392263: {
        id: "8612184282392263",
        title: "Sandwich",
        description: "Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.",
        picUrl: "http://lorempixel.com/500/300/food/"
      },
      38720544055104256: {
        id: "38720544055104256",
        title: "Sandwich",
        description: "Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.",
        picUrl: "http://lorempixel.com/500/300/food/"
      },
      6603445904329419: {
        id: "6603445904329419",
        title: "Sandwich",
        description: "Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.",
        picUrl: "http://lorempixel.com/500/300/food/"
      },
      7270940095186234: {
        id: "7270940095186234",
        title: "Sandwich",
        description: "Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.",
        picUrl: "http://lorempixel.com/500/300/food/"
      }
    },
    sectionsById: {
      7085243347100914: {
        id: "7085243347100914",
        title: "Breakfast",
        category: "Brunch",
        items: [
          $ref(['menuItemsById', 8612184282392263]),
          $ref(['menuItemsById', 7003244936931878])
        ]
      },
      320549983298406: {
        id: "320549983298406",
        title: "Lunch",
        category: "Brunch",
        items: [
          $ref(['menuItemsById', 7003244936931878])
        ]
      },
      49486919422633946: {
        id: "49486919422633946",
        title: "Salads",
        category: "Lunch",
        items: null
      },
      3741015521809459: {
        id: "3741015521809459",
        title: "Mains",
        category: "Lunch",
        items: [
          $ref(['menuItemsById', 6603445904329419]),
          $ref(['menuItemsById', 7003244936931878]),
          $ref(['menuItemsById', 7975821618456393])
        ]
      },
      15430756635032594: {
        id: "15430756635032594",
        title: "Prix Fixe",
        category: "Dinner",
        items: null
      },
      7557792635634542: {
        id: "7557792635634542",
        title: "Appetizers",
        category: "Dinner",
        items: [
          $ref(['menuItemsById', 7975821618456393])
        ]
      }
    },
    menusById: {
      27324184332974255: {
        id: "27324184332974255",
        createdAt: "Wed Jan 27 2016 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Jan 27 2016 16:45:00 GMT+0100 (CET)",
        title: "Vegetarian menu",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: null
      },
      5042458197567612: {
        id: "5042458197567612",
        createdAt: "Wed Jan 22 2016 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Jan 22 2016 16:45:00 GMT+0100 (CET)",
        title: "Chef recommends",
        description: "Lorem ipsum Consectetur anim Duis tempor quis pariatur aute est magna in qui dolore.",
        sections: [
          $ref(['sectionsById', 7085243347100914]),
          $ref(['sectionsById', 7557792635634542])
        ]
      },
      6918394977692515: {
        id: "6918394977692515",
        createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        title: "Mock Menu 1",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: [
          $ref(['sectionsById', 320549983298406])
        ]
      },
      746502079302445: {
        id: "746502079302445",
        createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        title: "Mock Menu 2",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: null
      },
      8058349746279418: {
        id: "8058349746279418",
        createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        title: "Mock Menu 3",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: null
      },
      7171383046079427: {
        id: "7171383046079427",
        createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        title: "Mock Menu 4",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: [
          $ref(['sectionsById', 3741015521809459]),
          $ref(['sectionsById', 320549983298406]),
          $ref(['sectionsById', 15430756635032594])
        ]
      },
      3937371058855206: {
        id: "3937371058855206",
        createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        title: "Mock Menu 5",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: null
      },
      8333667400293052: {
        id: "8333667400293052",
        createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
        title: "Mock Menu 6",
        description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
        sections: null
      }
    },
    restaurants: {
      0: {
        menus: [
          $ref(['menusById', 27324184332974255]),
          $ref(['menusById', 5042458197567612]),
          $ref(['menusById', 6918394977692515]),
          $ref(['menusById', 746502079302445]),
          $ref(['menusById', 8058349746279418]),
          $ref(['menusById', 7171383046079427]),
          $ref(['menusById', 3937371058855206]),
          $ref(['menusById', 8333667400293052])
        ]
      }
    }
  }
});
