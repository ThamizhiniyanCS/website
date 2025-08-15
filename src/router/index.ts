// import { me, signin, signup } from "./auth";
// import { createPlanet, findPlanet, listPlanets, updatePlanet } from "./planet";
// import { sse } from "./sse";
import { getMetaJson } from "./content";

export const router = {
  // auth: {
  //   signup,
  //   signin,
  //   me,
  // },
  content: {
    getMetaJson,
  },
};
