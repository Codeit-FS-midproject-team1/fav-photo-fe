// src/styles/globals.css.js
import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("a", {
  textDecoration: "none",
  color: "inherit",
});

globalStyle("*", {
  boxSizing: "border-box",
});