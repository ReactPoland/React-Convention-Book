const falcor = require('falcor/dist/falcor.browser');

const $ref = falcor.Model.ref;
const $atom = falcor.Model.atom;

const cache = {
  v1: {
    user: {
      me: {
        firstName: 'test',
        lastName: 'admin',
        email: 'test@admin.com',
        role: 'admin',
        verified: false,
        imageUrl: 'http://lorempixel.com/100/100/people/',
        token: 'magic-login-token',
        gender: 'male'
      }
    }
  },
  usersById: {
    length: 3,
    1162953910005334: {
      "id": "1162953910005334",
      "createdAt": "2016-01-15T05:48:51.112472-05:00",
      "updatedAt": "2016-01-15T05:48:51.112472-05:00",
      "firstName": "Jim",
      "lastName": "Example",
      "imageUrl": "http://lorempixel.com/500/500/people",
      "email": "jim@mailinator.com",
      "verified": false,
      "position": "Chef",
      "location": "123 Wall St., 12345 New York, NY",
      "address": "123 Wall St., 12345 New York, NY",
      "startDate": "2016-01-15T05:48:51.112472-05:00"
    },
    1162953910005337: {
      "id": "1162953910005337",
      "createdAt": "2016-01-15T05:48:51.112472-05:00",
      "updatedAt": "2016-01-15T05:48:51.112472-05:00",
      "firstName": "John",
      "lastName": "Smith",
      "imageUrl": "http://lorempixel.com/200/300/people",
      "email": "john@mailinator.com",
      "verified": false,
      "position": "Vice Chef",
      "location": "123 Wall St., 12345 New York, NY",
      "address": "123 Wall St., 12345 New York, NY",
      "startDate": "2016-01-15T05:48:51.112472-05:00"
    },
    2162953910005337: {
      "id": "2162953910005337",
      "createdAt": "2016-01-15T05:48:51.112472-05:00",
      "updatedAt": "2016-01-15T05:48:51.112472-05:00",
      "firstName": "Jane",
      "lastName": "Doe",
      "imageUrl": "http://lorempixel.com/700/300/people",
      "email": "jane@mailinator.com",
      "verified": false,
      "position": "Vice Chef",
      "location": "123 Wall St., 12345 New York, NY",
      "address": "123 Wall St., 12345 New York, NY",
      "startDate": "2016-01-15T05:48:51.112472-05:00"
    }
  },
  menuItemsById: {
    length: 6,
    7975821618456393: {
      id: "7975821618456393",
      title: "Spaghetti Bolognese",
      description: "Lorem ipsum Consectetur commodo culpa ut velit voluptate magna enim minim pariatur elit sint do dolor sit pariatur nostrud ea est proident in consectetur ut incididunt sunt dolore enim irure sed quis officia non nostrud laboris irure labore quis proident pariatur voluptate. Lorem ipsum Amet dolor dolor voluptate qui in dolor sit Excepteur pariatur voluptate quis in et officia id aliquip est consectetur consectetur. Lorem ipsum Commodo in magna Duis sed exercitation occaecat ullamco in amet ex consectetur dolor sit dolore ex minim deserunt culpa magna. Lorem ipsum Consequat nulla anim fugiat sed reprehenderit cillum consectetur quis commodo ut adipisicing irure qui eiusmod dolor deserunt velit pariatur elit qui consequat Ut. Lorem ipsum Do sunt cupidatat pariatur aliqua fugiat sunt deserunt incididunt ut nisi sed laborum aute ex qui consectetur aute sed Duis dolore magna fugiat in commodo amet labore non enim tempor dolore minim laboris proident voluptate dolore fugiat. Lorem ipsum Occaecat aute consequat ut sed eu non ex enim cupidatat irure consectetur dolore deserunt sed in est dolore commodo mollit ad sit esse Ut irure consectetur Duis. Lorem ipsum Velit Ut in sint pariatur sunt minim sunt Excepteur in ut amet amet et dolore reprehenderit tempor consequat laborum ex officia in nulla ut est sunt ut veniam esse et laboris amet dolore in officia pariatur velit consequat aute eiusmod proident ullamco adipisicing in cillum nostrud Ut adipisicing velit cillum nostrud dolor occaecat mollit quis dolore fugiat reprehenderit voluptate tempor consectetur est est pariatur officia culpa esse commodo fugiat magna consectetur aute dolore veniam ut do fugiat Excepteur nostrud aute in culpa consequat proident veniam elit ut Duis sed ad dolore sunt in in nostrud nisi sunt est deserunt deserunt laboris ex ad fugiat commodo fugiat proident ex Ut cupidatat mollit id magna aliqua Duis nulla commodo incididunt velit proident in cillum dolore consequat elit amet esse in Ut fugiat ex fugiat fugiat irure sit et Duis id commodo laboris enim velit consequat minim commodo tempor ullamco exercitation aliquip mollit ut qui proident in elit dolore in adipisicing incididunt dolore Excepteur occaecat id nulla irure.",
      picUrl: "http://lorempixel.com/700/500/food/"
    },
    7003244936931878: {
      id: "7003244936931878",
      title: "Barbarian Sandwich",
      description: "Lorem ipsum Adipisicing est eiusmod enim ex in culpa esse ex dolore elit id id ea deserunt in tempor voluptate consequat cillum labore quis in ex cillum id mollit exercitation eiusmod non id culpa enim.",
      picUrl: "http://lorempixel.com/100/200/food/"
    },
    8612184282392263: {
      id: "8612184282392263",
      title: "Ham and mayo sandwich",
      description: "Lorem ipsum Sed deserunt irure nisi consequat nulla esse sed fugiat fugiat sed sed laborum occaecat nulla ex reprehenderit veniam.",
      picUrl: "http://lorempixel.com/450/450/food/"
    },
    3872054405510425: {
      id: "38720544055104256",
      title: "Sandwich",
      description: "Lorem ipsum Exercitation aliqua ad commodo culpa sunt labore do anim in do sed sint ad Ut cupidatat anim nostrud cupidatat eu irure amet laborum veniam laboris veniam mollit aliqua esse nulla deserunt minim aute pariatur est anim Duis voluptate.",
      picUrl: "http://lorempixel.com/500/500/food/"
    },
    6603445904329419: {
      id: "6603445904329419",
      title: "Cheesburger",
      description: "Lorem ipsum Commodo in qui in do consectetur magna pariatur pariatur minim quis minim in aliquip id magna elit anim nostrud.",
      picUrl: "http://lorempixel.com/300/300/food/"
    },
    7270940095186234: {
      id: "7270940095186234",
      title: "Pizza margaritha",
      description: "Lorem ipsum Sint fugiat fugiat labore consectetur.",
      picUrl: "http://lorempixel.com/500/800/food/"
    }
  },
  sectionsById: {
    length: 4,
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
      itemsLength: 1,
      items: [
        $ref(['menuItemsById', 7003244936931878])
      ]
    },
    4948691942263394: {
      id: "49486919422633946",
      title: "Salads",
      category: "Lunch",
      itemsLength: 0,
      items: null
    },
    3741015521809459: {
      id: "3741015521809459",
      title: "Mains",
      category: "Lunch",
      itemsLength: 3,
      items: [
        $ref(['menuItemsById', 6603445904329419]),
        $ref(['menuItemsById', 7003244936931878]),
        $ref(['menuItemsById', 7975821618456393])
      ]
    },
    1543075663503259: {
      id: "1543075663503259",
      title: "Prix Fixe",
      category: "Dinner",
      itemsLength: 0,
      items: null
    },
    7557792635634542: {
      id: "7557792635634542",
      title: "Appetizers",
      category: "Dinner",
      itemsLength: 2,
      items: [
        $ref(['menuItemsById', 7975821618456393]),
        $ref(['menuItemsById', 7270940095186234])
      ]
    }
  },
  menusById: {
    length: 8,
    2732418433297425: {
      id: "2732418433297425",
      createdAt: "Wed Jan 27 2016 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Jan 27 2016 16:45:00 GMT+0100 (CET)",
      title: "Vegetarian menu",
      description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
      sectionsLength: 0,
      sections: null
    },
    5042458197567612: {
      id: "5042458197567612",
      createdAt: "Wed Jan 22 2016 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Jan 22 2016 16:45:00 GMT+0100 (CET)",
      title: "Chef recommends",
      description: "Lorem ipsum Consectetur anim Duis tempor quis pariatur aute est magna in qui dolore.",
      sectionsLength: 3,
      sections: [
        $ref(['sectionsById', 7085243347100914]),
        $ref(['sectionsById', 7557792635634542]),
        $ref(['sectionsById', 1543075663503259])
      ]
    },
    6918394977692515: {
      id: "6918394977692515",
      createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      title: "Mock Menu 1",
      description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
      sectionsLength: 1,
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
      sectionsLength: 0,
      sections: null
    },
    8058349746279418: {
      id: "8058349746279418",
      createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      title: "Mock Menu 3",
      description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
      sectionsLength: 0,
      sections: null
    },
    7171383046079427: {
      id: "7171383046079427",
      createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      title: "Mock Menu 4",
      description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
      sectionsLength: 3,
      sections: [
        $ref(['sectionsById', 3741015521809459]),
        $ref(['sectionsById', 320549983298406]),
        $ref(['sectionsById', 1543075663503259])
      ]
    },
    3937371058855206: {
      id: "3937371058855206",
      createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      title: "Mock Menu 5",
      description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
      sectionsLength: 0,
      sections: null
    },
    8333667400293052: {
      id: "8333667400293052",
      createdAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      updatedAt: "Wed Dec 17 2015 16:45:00 GMT+0100 (CET)",
      title: "Mock Menu 6",
      description: "Lorem ipsum Ex ad officia pariatur nisi qui officia elit mollit laborum.",
      sectionsLength: 0,
      sections: null
    }
  },
  restaurants: {
    length: 1,
    0: {
      id: 0,
      name: "My awesome testing restaurant",
      menusLength: 8,
      menus: [
        $ref(['menusById', 2732418433297425]),
        $ref(['menusById', 5042458197567612]),
        $ref(['menusById', 6918394977692515]),
        $ref(['menusById', 746502079302445]),
        $ref(['menusById', 8058349746279418]),
        $ref(['menusById', 7171383046079427]),
        $ref(['menusById', 3937371058855206]),
        $ref(['menusById', 8333667400293052])
      ],
      sectionsLength: 6,
      sections: [
        $ref(['sectionsById', 7085243347100914]),
        $ref(['sectionsById', 320549983298406]),
        $ref(['sectionsById', 4948691942263394]),
        $ref(['sectionsById', 3741015521809459]),
        $ref(['sectionsById', 1543075663503259]),
        $ref(['sectionsById', 7557792635634542])
      ],
      menuItemsLength: 6,
      menuItems: [
        $ref(['menuItemsById', 7975821618456393]),
        $ref(['menuItemsById', 7003244936931878]),
        $ref(['menuItemsById', 8612184282392263]),
        $ref(['menuItemsById', 3872054405510425]),
        $ref(['menuItemsById', 6603445904329419]),
        $ref(['menuItemsById', 7270940095186234])
      ],
      staffLength: 3,
      staff: [
        $ref(['usersById', 1162953910005334]),
        $ref(['usersById', 1162953910005337]),
        $ref(['usersById', 2162953910005337])
      ]
    }
  }
}
const model = new falcor.Model({
  "cache": cache
});

export default model;
