import type { StaticImageData } from "next/image";
import img1 from "@/assets/images/information/1.jpg";
import img2 from "@/assets/images/information/2.jpg";
import img3 from "@/assets/images/information/3.jpg";
import img4 from "@/assets/images/information/4.jpg";
import img5 from "@/assets/images/information/5.jpg";
import img6 from "@/assets/images/information/6.jpg";
import img7 from "@/assets/images/information/7.jpg";
import img8 from "@/assets/images/information/8.jpg";
import img9 from "@/assets/images/information/9.jpg";
import img10 from "@/assets/images/information/10.jpg";
import img11 from "@/assets/images/information/11.jpg";

export const informationImages = {
  formation: img1 as StaticImageData,
  overview: img2 as StaticImageData,
  legacy: img3 as StaticImageData,
  occasion: img4 as StaticImageData,
  collector: img5 as StaticImageData,
  companion: img6 as StaticImageData,
  crown: img7 as StaticImageData,
  eliteLifestyle: img8 as StaticImageData,
  performance: img9 as StaticImageData,
  fineJewelry: img10 as StaticImageData,
  hauteHorlogerie: img11 as StaticImageData,
} as const;
