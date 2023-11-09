const openSidebarOnClick = {
  setup({ content, navigation, menuButton, xButton }) {
    this._contentElement = content;
    this._navigationElement = navigation;
    this._menuButtonElement = menuButton;
    this._xButtonElement = xButton;

    this._handler();
  },

  _handler() {
    this._menuButtonElement.addEventListener('click', (event) => {
      this._open(event, this._navigationElement);
    });

    this._xButtonElement.addEventListener('click', (event) => {
      this._close(event, this._navigationElement);
    });

    this._contentElement.addEventListener('click', (event) => {
      this._close(event, this._navigationElement);
    });
  },

  _open(event, element) {
    event.stopPropagation();

    if (!element.classList.contains('navigation--enabled')) {
      element.classList.add('navigation--enabled');
    }
  },

  _close(event, element) {
    event.stopPropagation();

    if (element.classList.contains('navigation--enabled')) {
      element.classList.remove('navigation--enabled');
    }
  },
};

const expandDropdownOnClick = {
  setup({ content, navigation, navigationArrow, dropdown, dropdownButton }) {
    this._contentElement = content;
    this._navigationElement = navigation;
    this._navigationArrowElement = navigationArrow;
    this._dropdownElement = dropdown;
    this._dropdownButtonElement = dropdownButton;

    this._handler();
  },

  _handler() {
    this._dropdownButtonElement.addEventListener('click', (event) => {
      this._open(event, this._dropdownElement);
    });

    this._contentElement.addEventListener('click', (event) => {
      this._close(event, this._dropdownElement);
    });

    this._navigationElement.addEventListener('click', (event) => {
      this._close(event, this._dropdownElement);
    });
  },

  _open(event, element) {
    event.stopPropagation();

    if (!element.classList.contains('dropdown--enabled')) {
      element.classList.add('dropdown--enabled');
    } else {
      element.classList.remove('dropdown--enabled');
    }

    this._rotate();
  },

  _close(event, element) {
    event.stopPropagation();

    if (element.classList.contains('dropdown--enabled')) {
      element.classList.remove('dropdown--enabled');
      this._rotate();
    }

  },

  _rotate() {
    const element = this._navigationArrowElement;

    if (!element.classList.contains('navigation__arrow--rotated')) {
      element.classList.add('navigation__arrow--rotated');
    } else {
      element.classList.remove('navigation__arrow--rotated');
    }
  },
};

const changeBackgroundOnScroll = {
  setup({ header, navigation }) {
    this._headerElement = header;
    this._navigationElement = navigation;

    this._handler();
  },

  _handler() {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 72) {
        this._headerElement.classList.add('header--custom');
        this._navigationElement.classList.add('navigation--custom');
      }

      if (window.scrollY < 72) {
        this._headerElement.classList.remove('header--custom');
        this._navigationElement.classList.remove('navigation--custom')
      }
    });
  },
};

const enableBoxesDetailOnClick = {
  setup({ boxes, boxesDetail }) {
    this._boxesElement = boxes;
    this._boxesDetailElement = boxesDetail;

    this._handler();
  },

  _handler() {
    for (let i = 0; i < this._boxesElement.length; i += 1) {
      this._boxesElement[i].addEventListener('click', (event) => {
        this._open(event, this._boxesDetailElement[i]);
      });

      this._boxesElement[i].addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          this._open(event, this._boxesDetailElement[i]);
        }
      });
    }
  },

  _open(event, element) {
    event.stopPropagation();

    if (!element.classList.contains('boxes__detail--enabled')) {
      element.classList.add('boxes__detail--enabled');
    } else {
      element.classList.remove('boxes__detail--enabled');
    }
  }
};

const contentElement = document.querySelector('#content');
const navigationElement = document.querySelector('.navigation');
const navigationArrowElement = document.querySelector('.navigation__arrow');

const menuButtonElement = document.querySelector('#menuButton');
const xButtonElement = document.querySelector('#xButton');

const dropdownElement = document.querySelector('.dropdown');
const dropdownButtonElement = document.querySelector('#dropdownButton');

const headerElement = document.querySelector('.header');

const boxesElement = document.getElementsByClassName('boxes');
const boxesDetailElement = document.getElementsByClassName('boxes__detail');

openSidebarOnClick.setup({
  content: contentElement,
  navigation: navigationElement,
  menuButton: menuButtonElement,
  xButton: xButtonElement,
});

expandDropdownOnClick.setup({
  content: contentElement,
  navigation: navigationElement,
  navigationArrow: navigationArrowElement,
  dropdown: dropdownElement,
  dropdownButton: dropdownButtonElement,
});

changeBackgroundOnScroll.setup({
  header: headerElement,
  navigation: navigationElement,
});

enableBoxesDetailOnClick.setup({
  boxes: boxesElement,
  boxesDetail: boxesDetailElement,
});
