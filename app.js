"use scrit";
let budgetController = (function () {
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
    allItems: {
      exp: [],
      inc: [],
    },

    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      let newItem, id;
      //create new id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // create new item based on the "inc" or "exp" type
      if (type === "exp") {
        newItem = new Expense(id, des, val);
      } else if (type === "inc") {
        newItem = new Income(id, des, val);
      }
      // push newItem into our data structure
      data.allItems[type].push(newItem);

      // return the new item
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

// *************************************************************************
// *************************************************************************
// UI Controller
let uiController = (function () {
  let domStr = {
    inputType: ".add-type",
    inputDescription: ".add-description",
    inputValue: ".add-value",
    inputBtn: ".btn",
  };
  return {
    getinput: function () {
      return {
        type: document.querySelector(domStr.inputType).value,
        description: document.querySelector(domStr.inputDescription).value,
        value: document.querySelector(domStr.inputValue).value,
      };
    },
    addListItem: function (obj, type) {
      // create Html string with some placeholder text
      //replace the placeholder text with some actual data
    },

    getDomStr: function () {
      return domStr;
    },
  };
})();
// *************************************************************************
// *************************************************************************
//Global app controller
let controller = (function (budgetCtrl, uiCtrl) {
  // eventListeners
  let setEventListeners = function () {
    let dom = uiCtrl.getDomStr();
    document.querySelector(dom.inputBtn).addEventListener("click", ctrlAdd);
    document.addEventListener("keypress", function (event) {
      if (event.keycode === 13 || event.which === 13) {
        ctrlAdd();
      }
    });
  };

  let ctrlAdd = function () {
    let input, newItem;
    // Get the field input data
    input = uiCtrl.getinput();

    // Add the Item to the budget controller

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  };

  return {
    init: function () {
      setEventListeners();
    },
  };
})(budgetController, uiController);

controller.init();
