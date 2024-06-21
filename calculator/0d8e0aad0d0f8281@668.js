import define1 from "./9bed702f80a3797e@402.js";
import define2 from "./6bc3c08c4545a7e2@3827.js";

function _1(md){return(
md`# Oxygen Diffusion and Flux in Cell Culture`
)}

function _2(toc){return(
toc("h2, h3, h4")
)}

function _3(md){return(
md`---`
)}

function _4(md){return(
md`## Overview
Oxygen is an important factor to consider when conducting in vitro research [1]. In typical multi-well plate cell culture, oxygen is provided to the cells by diffusion from the atmospheric air down thru the culture media.  In this document, we will describe the laws that govern this diffusion, model the oxygen concentration in the media, and calculate how it varies based on media volume, aggregate oxygen consumption rate (i.e. Flux), and saturated oxygen concentration.`
)}

function _5(tex,md){return(
md`## Fick's 1st Law

Fick's 1st law defines Flux.  In 1 dimension:

  ${tex.block` 
\Large
 J = -D  \frac{dC}{dz} 
`
}

where J is flux, C is concentration, D is the diffusion coefficient, and z is position (vertical position for our purposes).`
)}

function _6(tex,md){return(
md`## Fick's 2nd Law

Fick's 2nd law defines the change in concentration over time as diffusion occurs as a partial derivative of spatial concentrations.  In 1 dimension:

  ${tex.block` 
\Large
\frac{\partial C}{\partial t} = D\frac{\partial ^2C}{\partial z^2}
`
}

where C is concentration, z is vertical position, and t is time`
)}

function _7(tex,md){return(
md`## Steady State Solution

At steady state, concentration does not change over time so:

  ${tex.block` 
\Large
\frac{\partial C}{\partial t} = 0
`}
And the solution for the 2nd law equation becomes:
  ${tex.block` 
\Large
C(z) = C(0) + z\frac{dC}{dz}
`
}

Combining this with the first law, we get a linear steady state relationship between flux and concentration:

  ${tex.block` 
\Large
C(z) = C(0) - \frac{J}{D}z
`
}


`
)}

async function _8(FileAttachment,md){return(
md`## Modeling the Diffusion of Media in a Well
${await FileAttachment(
  "well_with_csat@1.png"
).image()}
For a volume of media in the well of a standard culture plate, we can model z as the depth below the media surface where C(0) is the saturation concentration at the liquid-air interface Csat.
`
)}

function _9(D,md){return(
md`For a typical mono-layer cell culture we will assume all oxygen consumption occurs uniformly across the bottom of the well and the saturation concentration Csat stays constant. Though a small amount of oxygen diffusion occurs through the plastic walls of the well, we will ignore it.  Therefore the oxygen consumption rate of the cells in aggregate is equal to the net flux of oxygen from the air above through the media and down into the cells.

To calculate actual values for steady state oxygen diffusion, we'll need values for J, D, and Csat. 

Estimates of the diffusion coefficient D of oxygen in water at 37C vary widely [2] but let's assume ${D} mm2/sec. [3]`
)}

function _D(){return(
3e-3
)}

function _11(md){return(
md`### Media Volume and Height`
)}

function _12(well_diameter,md){return(
md`We'll also need to determine the relative positions between the media height and the well bottom.  This is determined by the well diameter and the media volume.  For a 96-well plate, we have a cylinder with diameter ${well_diameter}mm (though the well is slightly tapered its close enough to a cylinder for our purposes).`
)}

function _well_diameter(){return(
6.4
)}

function _14(md){return(
md`Researchers choose the media volume based on various factors.  Importantly, it is one of the primary variables for oxygen concentration at the cells as it defines the media height (or depth from the surface).  100uL and 200uL are commonly used volumes, but for our calculations we can select from a wide range: `
)}

function _media_volume_uL(Inputs){return(
Inputs.range([50, 300], {
  step: 1,
  value: 100,
  label: "Media Volume (uL)"
})
)}

function _16(md){return(
md`Using the media volume, we calculate the media column height based on the definition of a cylinder.`
)}

function _media_height(calculateMediaHeight,well_diameter,media_volume_uL){return(
parseFloat(
  calculateMediaHeight(well_diameter, media_volume_uL).toFixed(2)
)
)}

function _18(media_volume_uL,media_height,md){return(
md`So for ${media_volume_uL} uL of media in a standard 96-well plate, the media occupies a height of about **${media_height} mm** above the cells.`
)}

function _19(md){return(
md`Oxygen saturation at the top of the media is a function of the oxygen partial pressure in the air which in turn is a function of atmospheric pressure, relative humidity, and CO2 level.  For a 5% CO2 in high humidity with standard atmospheric pressure, the oxygen saturation level Csat is around 175-204 micromolar [2].`
)}

function _saturation(Inputs){return(
Inputs.range([10, 400], {
  step: 1,
  value: 185,
  label: "Saturated O2 Concentration (uM)"
})
)}

function _21(md){return(
md`### Maximum Flux`
)}

function _22(saturation,J_max,md){return(
md`Since the oxygen concentration cannot drop below zero, the max change in concentration across the entire height of the media (max dC) is Csat of ${saturation} uM.  Applying Fick's first law gives a max flux of **${J_max.toFixed(0)} fmols/mm2/sec**.`
)}

function _23(J_max,md){return(
md`The Flux (aggregate cellular OCR) can now be anywhere in the range of 0 and ${J_max.toFixed(0)}:`
)}

function _J_input(Inputs){return(
Inputs.range([0, 400], {
  step: 1,
  value: 50,
  label: "Flux (fmols/mm2/sec)"
})
)}

function _25(J,err_text,md){return(
md`Using Flux = ${J}  fmols/mm2/sec ${err_text}`
)}

function _26(md){return(
md`## Oxygen Concentration Calculator`
)}

function _27(plotConcentration,data,saturation,media_height){return(
plotConcentration(data, saturation, media_height)
)}

function _28(cbot,md){return(
md`O2 at bottom is **${Math.max(0, cbot).toFixed(1)} uM**`
)}

function _29(md){return(
md`## Summary Results`
)}

function _30(media_height,J_max,J,cbot,md){return(
md`The maximum oxygen flux thru ${media_height}mm of media in a 96-well plate is **${J_max.toFixed(0)} fmols/mm2/sec**.  For a flux (aggregate OCR) of ${J} fmols/mm2/sec, the oxygen concentration at the cells is **${Math.max(0, cbot).toFixed(1)} uM**.`
)}

function _31(md){return(
md`## References
[1]  Oxygen is a critical regulator of cellular metabolism and function in cell culture
Joycelyn Tan, Sam Virtue, Dougall M. Norris, Olivia J. Conway, Ming Yang, Christopher Gribben, Fatima Lugtu, James R. Krycer, Richard J. Mills, Ioannis Kamzolas, Conceição Pereira, Martin Dale, Amber S. Shun-Shion, Harry J. M. Baird, James A. Horscroft, Alice P. Sowton, Marcella Ma, Stefania Carobbio, Evangelia Petsalaki, Andrew J. Murray, David C. Gershlick, James E. Hudson, Ludovic Vallier, Kelsey H. Fisher-Wellman, Christian Frezza, Antonio Vidal-Puig, Daniel J. Fazakerley
bioRxiv 2022.11.29.516437; doi: https://doi.org/10.1101/2022.11.29.516437 

[2] Al-Ani A, Toms D, Kondro D, Thundathil J, Yu Y, Ungrin M (2018) Oxygenation in cell culture: Critical parameters for reproducibility are routinely not reported. PLoS ONE 13(10): e0204269. https://doi.org/10.1371/journal.pone.0204269

[3] Wei Xing, Min Yin, Qing Lv, Yang Hu, Changpeng Liu, Jiujun Zhang,
1 - Oxygen Solubility, Diffusion Coefficient, and Solution Viscosity,
Editor(s): Wei Xing, Geping Yin, Jiujun Zhang,
Rotating Electrode Methods and Oxygen Reduction Electrocatalysts,
Elsevier,
2014,
Pages 1-31,
ISBN 9780444632784,
https://doi.org/10.1016/B978-0-444-63278-4.00001-X.
(https://www.sciencedirect.com/science/article/pii/B978044463278400001X)
`
)}

function _32(md){return(
md`## Appendix`
)}

function _J_max(D,saturation,media_height){return(
(1e3 * D * saturation) / media_height
)}

function _J(J_input,J_max){return(
Math.round(Math.min(J_input, J_max))
)}

function _cbot(cs){return(
cs[0]
)}

function _heights(d3,media_height){return(
d3.ticks(0, media_height, 100)
)}

function _cs(heights,saturation,J,D,media_height){return(
heights.map((h) => saturation - (J / D / 1e3) * (media_height - h))
)}

function _data(heights,saturation,J,D,media_height){return(
heights.map((h) => ({
  h: h,
  c: saturation - (J / D / 1e3) * (media_height - h)
}))
)}

function _err_text(J_input,J_max)
{
  if (J_input > J_max) {
    return " since " + J_input + " exceeds max flux physically possible";
  } else {
    return "";
  }
}


function _40(md){return(
md`----`
)}

function _calculateMediaHeight(){return(
function calculateMediaHeight(well_diameter, media_volume) {
  /* calculate media height using definition of cylinder volume 
      - diameter in mm
      - volume in uL
  */
  let radius = well_diameter / 2;

  let height = media_volume / (radius * radius * Math.PI);
  return height;
}
)}

function _plotConcentration(Plot){return(
function plotConcentration(data, c_max, h_max) {
  return Plot.plot({
    y: {
      grid: true,
      domain: [0, c_max]
    },
    x: {
      domain: [0, h_max]
    },
    marks: [
      Plot.line(data, { x: "h", y: "c", strokeWidth: 4, stroke: "lightblue" }),
      Plot.dot(data, {
        x: 0,
        y: data[0].c,
        strokeWidth: 3,
        stroke: "lightblue",
        r: 10
      }),
      Plot.axisX({ label: "Height (mm)", labelAnchor: "center" }),
      Plot.axisY({ label: "O2 Concentration (uM)", labelAnchor: "center" })
    ]
  });
}
)}

function _calcConcentrations(d3,J){return(
function calcConcentrations(saturation, flux, D, media_height){
let heights = d3.ticks(0, media_height, 100)
return heights.map((h) => ({
  h: h,
  c: saturation - (J / D / 1e3) * (media_height - h)
}))}
)}

function _calcO2CatBotttom(J){return(
function calcO2CatBotttom(saturation, flux, D, media_height) {
  return saturation - (J / D / 1e3) * media_height;
}
)}

function _concentrationLabel(){return(
function concentrationLabel(c) {
  if (c < 30) {
    return "hypoxic";
  }

  if (c < 80) {
    return "physoxic";
  }

  return "hyperoxic";
}
)}

function _temperature(){return(
37
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["well_with_csat@1.png", {url: new URL("./files/93e1db8606fef9445314613ff3ca33f1b447c869d3a0e676c17569c8c0a1e7b333d0840527d321b5ea352e99b733d36de250d21ffceb74d828d734c3002539df.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["tex","md"], _5);
  main.variable(observer()).define(["tex","md"], _6);
  main.variable(observer()).define(["tex","md"], _7);
  main.variable(observer()).define(["FileAttachment","md"], _8);
  main.variable(observer()).define(["D","md"], _9);
  main.variable(observer("D")).define("D", _D);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["well_diameter","md"], _12);
  main.variable(observer("well_diameter")).define("well_diameter", _well_diameter);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof media_volume_uL")).define("viewof media_volume_uL", ["Inputs"], _media_volume_uL);
  main.variable(observer("media_volume_uL")).define("media_volume_uL", ["Generators", "viewof media_volume_uL"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("media_height")).define("media_height", ["calculateMediaHeight","well_diameter","media_volume_uL"], _media_height);
  main.variable(observer()).define(["media_volume_uL","media_height","md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof saturation")).define("viewof saturation", ["Inputs"], _saturation);
  main.variable(observer("saturation")).define("saturation", ["Generators", "viewof saturation"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["saturation","J_max","md"], _22);
  main.variable(observer()).define(["J_max","md"], _23);
  main.variable(observer("viewof J_input")).define("viewof J_input", ["Inputs"], _J_input);
  main.variable(observer("J_input")).define("J_input", ["Generators", "viewof J_input"], (G, _) => G.input(_));
  main.variable(observer()).define(["J","err_text","md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["plotConcentration","data","saturation","media_height"], _27);
  main.variable(observer()).define(["cbot","md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["media_height","J_max","J","cbot","md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("J_max")).define("J_max", ["D","saturation","media_height"], _J_max);
  main.variable(observer("J")).define("J", ["J_input","J_max"], _J);
  main.variable(observer("cbot")).define("cbot", ["cs"], _cbot);
  main.variable(observer("heights")).define("heights", ["d3","media_height"], _heights);
  main.variable(observer("cs")).define("cs", ["heights","saturation","J","D","media_height"], _cs);
  main.variable(observer("data")).define("data", ["heights","saturation","J","D","media_height"], _data);
  main.variable(observer("err_text")).define("err_text", ["J_input","J_max"], _err_text);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("calculateMediaHeight")).define("calculateMediaHeight", _calculateMediaHeight);
  main.variable(observer("plotConcentration")).define("plotConcentration", ["Plot"], _plotConcentration);
  main.variable(observer("calcConcentrations")).define("calcConcentrations", ["d3","J"], _calcConcentrations);
  main.variable(observer("calcO2CatBotttom")).define("calcO2CatBotttom", ["J"], _calcO2CatBotttom);
  main.variable(observer("concentrationLabel")).define("concentrationLabel", _concentrationLabel);
  main.variable(observer("temperature")).define("temperature", _temperature);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
