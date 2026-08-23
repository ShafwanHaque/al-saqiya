import localFont from "next/font/local";

export const bornobangla = localFont({
  src: [
    {
      //   path: './bangla/FNBornobangla-Regular.ttf',
      path: "./bangla/FNRakibBornomalaUnicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      //   path: './bangla/FNBornobangla-Italic.ttf',
      path: "./bangla/FNRakibBornomalaUnicodeItalic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-bangla",
  display: "swap",
});
