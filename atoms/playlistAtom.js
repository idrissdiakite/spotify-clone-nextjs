import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: "null",
});

export const playlistIdState = atom({
  key: "playlistIdState", // needs to be unique
  default: "42CVOw2LSMXDgi4nw0KT0F", // = HIPHOP
});
