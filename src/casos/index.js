/*
 * Proyectos con ficha de diseño propio (`header`: color de la cabecera de la web sobre su portada). Para añadir uno: componente (.jsx), estilos (.css) y
 * comportamiento (.js) en esta carpeta, sus archivos en public/casos/<proyecto>/ y su entrada aquí
 * y en `data/projects.js` (con `ficha: true`).
 */
import { FichaJuanaBrava } from "./FichaJuanaBrava.jsx";
import { FichaMarcen } from "./FichaMarcen.jsx";
import { FichaSegundoTelon } from "./FichaSegundoTelon.jsx";
import { FichaSoyDeMoto } from "./FichaSoyDeMoto.jsx";
import { FichaVyrk } from "./FichaVyrk.jsx";
import juanaBravaCss from "./juana-brava.css?inline";
import { run as juanaBravaRun } from "./juana-brava.js";
import marcenCss from "./marcen-gt.css?inline";
import { run as marcenRun } from "./marcen-gt.js";
import telonCss from "./segundo-telon.css?inline";
import { run as telonRun } from "./segundo-telon.js";
import motoCss from "./soy-de-moto.css?inline";
import { run as motoRun } from "./soy-de-moto.js";
import vyrkCss from "./vyrk-r01.css?inline";
import { run as vyrkRun } from "./vyrk-r01.js";

export const fichas = {
  "juana-brava": { Content: FichaJuanaBrava, css: juanaBravaCss, run: juanaBravaRun, header: "light" },
  "vyrk-r01": { Content: FichaVyrk, css: vyrkCss, run: vyrkRun, header: "dark" },
  "soy-de-moto": { Content: FichaSoyDeMoto, css: motoCss, run: motoRun, anchorOffset: 100, header: "light" },
  "marcen-gt": { Content: FichaMarcen, css: marcenCss, run: marcenRun, header: "light" },
  "segundo-telon": { Content: FichaSegundoTelon, css: telonCss, run: telonRun, header: "light" },
};
