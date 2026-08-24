import localFont from "next/font/local";

export const bangla = localFont({
  src: [
    {
      path: "./bangla/FNRakibBornomalaUnicode.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./bangla/FNRakibBornomalaUnicodeItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-bangla",
  display: "swap",
});
