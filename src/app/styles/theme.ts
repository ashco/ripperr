﻿export const theme = {
  color: {
    logo: 'rgba(84, 255, 180, 1)',
    neutral: {
      100: 'hsl(210, 17%, 98%)',
      200: 'hsl(207, 22%, 90%)',
      300: 'hsl(206, 18%, 83%)',
      400: 'hsl(209, 24%, 74%)',
      500: 'hsl(213, 16%, 63%)',
      600: 'hsl(214, 11%, 49%)',
      700: 'hsl(215, 14%, 40%)',
      800: 'hsl(215, 17%, 30%)',
      900: 'hsl(212, 23%, 16%)',
    },
    purple: {
      // 100: 'hsl(206, 100%, 97%)',
      // 200: 'hsl(206, 79%, 81%)',
      // 300: 'hsl(207, 70%, 71%)',
      // 400: 'hsl(208, 60%, 62%)',
      500: 'hsl(270.3, 45%, 55.1%)',
      // 600: 'hsl(207, 65%, 38%)',
      // 700: 'hsl(208, 64%, 32%)',
      // 800: 'hsl(208, 63%, 27%)',
      // 900: 'hsl(206, 46%, 23%)',
    },
    blue: {
      100: 'hsl(206, 100%, 97%)',
      200: 'hsl(206, 79%, 81%)',
      300: 'hsl(207, 70%, 71%)',
      400: 'hsl(208, 60%, 62%)',
      500: 'hsl(207, 61%, 49%)',
      600: 'hsl(207, 65%, 38%)',
      700: 'hsl(208, 64%, 32%)',
      800: 'hsl(208, 63%, 27%)',
      900: 'hsl(206, 46%, 23%)',
    },
    green: {
      100: 'hsl(180, 92%, 95%)',
      200: 'hsl(177, 67%, 80%)',
      300: 'hsl(178, 57%, 64%)',
      400: 'hsl(176, 53%, 54%)',
      500: 'hsl(174, 49%, 46%)',
      600: 'hsl(174, 54%, 37%)',
      700: 'hsl(174, 56%, 32%)',
      800: 'hsl(174, 59%, 25%)',
      900: 'hsl(179, 62%, 17%)',
    },
    yellow: {
      100: 'hsl(44, 100%, 98%)',
      200: 'hsl(44, 90%, 92%)',
      300: 'hsl(44, 90%, 80%)',
      400: 'hsl(44, 88%, 74%)',
      500: 'hsl(43, 86%, 67%)',
      600: 'hsl(44, 57%, 52%)',
      700: 'hsl(43, 61%, 43%)',
      800: 'hsl(43, 64%, 34%)',
      900: 'hsl(44, 67%, 21%)',
    },
    orange: {
      500: 'hsl(6, 77.2%, 57.1%)',
    },
    red: {
      100: 'hsl(0, 77%, 95%)',
      200: 'hsl(359, 79%, 81%)',
      300: 'hsl(0, 75%, 72%)',
      400: 'hsl(0, 70%, 64%)',
      500: 'hsl(0, 71%, 52%)',
      600: 'hsl(0, 71%, 42%)',
      700: 'hsl(359, 69%, 37%)',
      800: 'hsl(359, 68%, 32%)',
      900: 'hsl(1, 62%, 24%)',
    },
  },
  font: {
    0: '12px',
    1: '14px',
    2: '16px',
    3: '18px',
    4: '20px',
    5: '24px',
    6: '30px',
    7: '36px',
    8: '48px',
    9: '60px',
    10: '72px',
  },
  shadow: {
    0: '0 1px 3px hsla(0, 0%, 0%, .2)',
    1: '0 4px 6px hsla(0, 0%, 0%, .2)',
    2: '0 5px 15px hsla(0, 0%, 0%, .2)',
    3: '0 10px 24px hsla(0, 0%, 0%, .2)',
    4: '0 15px 35px hsla(0, 0%, 0%, .2)',
  },
  space: {
    0: '0.25rem', // 4
    1: '0.5rem', // 8
    2: '0.75rem', // 12
    3: '1rem', // 16
    4: '1.5rem', // 24
    5: '2rem', // 32
    6: '3rem', // 48
    7: '4rem', // 64
    8: '6rem', // 96
    9: '8rem', // 128
    10: '12rem', // 192
    11: '16rem', // 256
    12: '24rem', // 387
    13: '32rem', // 512
    14: '40rem', // 640
    15: '48rem', // 768
  },
  maxWidth: '1000px',
};
export const darkMode = {
  type: 'Dark',
  background: {
    100: 'hsl(0, 0%, 7%)',
    200: 'hsl(0, 0%, 9%)',
    300: 'hsl(0, 0%, 13%)',
    400: 'hsl(240, 0.7%, 29.6%)',
  },
  backgroundOpacity: {
    100: 'hsla(0, 0%, 7%, .9)',
  },
  color: {
    100: 'hsl(0, 0%, 100%)',
    200: 'hsl(240, 1%, 47%)',
  },
  colorOpacity: {
    100: 'hsla(0, 0%, 100%, 0.15)',
    200: 'hsla(240, 1%, 47%, 0.5)',
  },
};

export const lightMode = {
  type: 'Light',
  background: {
    100: 'hsl(180, 6.2%, 93%)',
    200: 'hsl(300, 14.3%, 98.6%)',
    300: 'hsl(0, 0%, 99.6%)',
    400: 'hsl(240, 0.7%, 72.7%)',
  },
  backgroundOpacity: {
    100: 'hsla(180, 6.2%, 93%, .9)',
  },
  color: {
    100: 'hsl(0, 0%, 13%)',
    200: 'hsl(240, 1%, 47%)',
  },
  colorOpacity: {
    100: 'hsla(0, 0%, 13%, 0.15)',
    200: 'hsla(240, 1%, 47%, 0.5)',
  },
};
