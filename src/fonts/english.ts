import localFont from "next/font/local";


export const english = localFont({
  src: [
    {
      path: "./english/PlayfairDisplay-VariableFont_wght.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./english/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-english",
  display: "swap",
});
