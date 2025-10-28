import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ...
<Link
  to="/"
  className="mb-4 inline-block px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
>
  ◀ กลับหน้าแรก
</Link>
export type Plant = {
  id: number;
  name: string;
  scientificName?: string;
  price: number;
  img: string;
  tag: string;
  shortDesc: string;
  origin?: string;
  description?: string;
  care?: {
    light: string;
    water: string;
    humidity: string;
    soil: string;
    fertilizer: string;
    repotEvery: string;
    difficulty: "ง่าย" | "ปานกลาง" | "ยาก";
  };
  toxicity?: string;
  benefits?: string[];
  size?: string;
  pests?: string[];
  propagation?: string;
};

const plants: Plant[] = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    price: 690,
    img: "https://www.harmony-plants.com/cdn/shop/products/5BCD4C1A-3AC6-4651-87A5-4E3B4E534A39.jpg?v=1707750703q=80&w=800&auto=format&fit=crop",
    tag: "ยอดนิยม",
    shortDesc: "ไม้ใบรูปทรงทรอปิคอล ใบมีรู (fenestration) ดูโดดเด่น",
    origin: "เม็กซิโกและอเมริกากลาง",
    description:
      "Monstera Deliciosa เป็นไม้เถาที่นิยมปลูกเป็นไม้ประดับในบ้าน เพราะใบขนาดใหญ่มีรูธรรมชาติที่ให้ลุคทรอปิคอล มีความทนทานและปรับตัวได้ดีในสภาพแสงสว่างปานกลาง",
    care: {
      light: "แสงสว่างปานกลาง — หลีกเลี่ยงแดดจัด",
      water: "รดเมื่อต้นแห้งบนผิวหน้าดิน ประมาณ 7–10 วัน ขึ้นกับสภาพอากาศ",
      humidity: "ชอบความชื้นปานกลางถึงสูง",
      soil: "ดินร่วนผสมปุ๋ยหมัก และปุ๋ยคอก ระบายดี",
      fertilizer: "ปุ๋ยน้ำสูตรสมดุล ทุก 4–6 สัปดาห์ในช่วงฤดูการเติบโต",
      repotEvery: "ทุก 1–2 ปี หรือเมื่อรากแน่น",
      difficulty: "ปานกลาง",
    },
    toxicity: "เป็นพิษต่อสัตว์เลี้ยง (แมว/สุนัข) หากกิน",
    benefits: ["ฟอกอากาศเล็กน้อย", "ให้บรรยากาศทรอปิคอล"],
    size: "สูงได้ถึง 2–3 เมตรในร่ม (ขึ้นกับการตัดแต่ง)",
    pests: ["ไรแมงมุม", "เพลี้ย", "หนอนกินใบ"],
    propagation:
      "ปักชำปลายกิ่งที่มีข้อและรากอากาศ (air roots) ลงในน้ำหรือดิน ช่วยให้ติดง่าย",
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    price: 1290,
    img: "https://www.dekorcompany.com/cdn/shop/files/HAL8615.png?v=1746881023q=80&w=800&auto=format&fit=crop",
    tag: "แนะนำ",
    shortDesc: "ใบใหญ่ทรงสวย เหมาะกับมุมสูงของห้องนั่งเล่น",
    origin: "แอฟริกาตะวันตก",
    description:
      "Fiddle Leaf Fig เป็นต้นไม้ที่ได้รับความนิยมสูงในการแต่งบ้านสไตล์มินิมอลและสตูดิโอ เพราะใบรูปคล้ายไวโอลินให้ความรู้สึกหรูหรา ต้องการแสงสว่างสม่ำเสมอและการดูแลที่พอเหมาะ",
    care: {
      light: "ชอบแสงสว่างจ้าแบบกรองแสง ต้องวางใกล้หน้าต่างที่ได้แสงสว่างแต่ไม่โดนแดดจ้าโดยตรง",
      water: "รดเมื่อดินด้านบนแห้ง อย่าให้แฉะ",
      humidity: "ชอบความชื้นปานกลาง",
      soil: "ดินระบายน้ำดี ผสมเพอร์ไลต์",
      fertilizer: "ปุ๋ยสูตรสมดุลช่วงฤดูร้อนทุก 4 สัปดาห์",
      repotEvery: "ทุก 1–2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "อาจเป็นพิษต่อสัตว์เลี้ยงหากกิน",
    benefits: ["เป็นของตกแต่งที่โดดเด่น", "ช่วยสร้างโฟกัสให้ห้อง"],
    size: "สามารถสูง 2–3 เมตรในร่มเมื่อโตเต็มที่",
    pests: ["ไรแมงมุม", "เพลี้ย", "ไรขาว"],
    propagation: "ปักชำกิ่งหรือตัดยอดแล้วปักชำในน้ำ/ดิน",
  },
  {
    id: 3,
    name: "Snake Plant",
    scientificName: "Sansevieria (Dracaena) trifasciata",
    price: 390,
    img: "https://shop-static.arborday.org/media/0004367_snake-plant.jpeg?q=80&w=800&auto=format&fit=crop",
    tag: "ราคาดี",
    shortDesc: "แข็งแรง ทนทาน เหมาะสำหรับมือใหม่และมุมที่มีแสงน้อย",
    origin: "แอฟริกาตะวันตก",
    description:
      "Snake Plant เป็นต้นไม้ที่เลี้ยงง่ายมาก ทนแล้งได้ดี เหมาะกับคอนโดหรือห้องที่มีแสงน้อย ใบตั้งตรงและมีลวดลายสวย",
    care: {
      light: "ทนได้ทั้งแสงน้อยและแสงจ้า แต่เติบโตดีที่สุดในแสงสว่างปานกลาง",
      water: "รดน้อย — ปล่อยให้ดินแห้งระหว่างรด",
      humidity: "ไม่ต้องการความชื้นสูง",
      soil: "ดินผสมสำหรับกระบองเพชร/อากาศถ่ายเทดี",
      fertilizer: "เล็กน้อยช่วงฤดูเติบโต",
      repotEvery: "ทุก 2–3 ปี",
      difficulty: "ง่าย",
    },
    toxicity: "มีความเป็นพิษเล็กน้อยต่อสัตว์เลี้ยง",
    benefits: ["ฟอกอากาศได้ดี", "ต้องการการดูแลต่ำ"],
    size: "ขนาดตั้งแต่ 30–120 ซม. ขึ้นกับสายพันธุ์",
    pests: ["ราโคน้ำ", "เพลี้ย"],
    propagation: "แยกหัว (division) หรือปักชำใบในบางสายพันธุ์",
  },
  {
    id: 4,
    name: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    price: 590,
    img: "https://glasswingshop.com/cdn/shop/products/8D2A2069.jpg?v=1595400475?q=80&w=800&auto=format&fit=crop",
    tag: "ทนทาน",
    shortDesc: "อยู่รอดได้เก่ง เหมาะกับผู้ที่ชอบปล่อยของ",
    origin: "แอฟริกาตะวันออก",
    description:
      "ZZ Plant เป็นไม้ที่เลี้ยงง่ายมาก ทนต่อการขาดแสงและการรดน้ำไม่บ่อย ให้ใบมันวาวสวย เหมาะสำหรับตั้งมุมห้องและสำนักงาน",
    care: {
      light: "แสงสว่างปานกลางถึงแสงน้อย",
      water: "รดเมื่อต้นแห้ง — ทนน้ำท่วมไม่ค่อยได้",
      humidity: "ความชื้นปกติในบ้าน",
      soil: "ดินร่วนระบายน้ำดี",
      fertilizer: "ปุ๋ยอ่อนในช่วงฤดูปลูก",
      repotEvery: "ทุก 2–3 ปี",
      difficulty: "ง่าย",
    },
    toxicity: "พิษต่อสัตว์เลี้ยงหากกิน",
    benefits: ["ต้องดูแลน้อย", "ให้ลุคโมเดิร์น"],
    size: "สูง 40–90 ซม.",
    pests: ["เพลี้ยอ่อน", "ไร"],
    propagation: "แยกเหง้า (division) หรือปักชำกิ่ง",
  },
  {
    id: 5,
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    price: 290,
    img: "https://abeautifulmess.com/wp-content/uploads/2023/06/GoldenPothos-1-1024x1024.jpg?q=80&w=800&auto=format&fit=crop",
    tag: "มือใหม่",
    shortDesc: "เถาเลื้อย ดูแลง่าย ฟอกอากาศได้ดี",
    origin: "หมู่เกาะโซโลมอน",
    description:
      "Pothos หรือ Scindapsus เป็นต้นไม้เลื้อยที่ติดง่าย ปลูกได้ทั้งในน้ำและดิน เหมาะสำหรับแขวนหรือวางบนชั้น ให้ความสดชื่นและช่วยลดสารพิษบางชนิดในอากาศ",
    care: {
      light: "แสงสว่างกรองแสง — ไม่ชอบแดดจัด",
      water: "รดเมื่อผิวหน้าดินแห้ง",
      humidity: "ชอบความชื้นเล็กน้อย",
      soil: "ดินระบายน้ำดี",
      fertilizer: "ปุ๋ยน้ำเดือนละครั้งในฤดูการเติบโต",
      repotEvery: "ทุก 1–2 ปี",
      difficulty: "ง่าย",
    },
    toxicity: "เป็นพิษต่อสัตว์เลี้ยง",
    benefits: ["ฟอกอากาศ", "ปลูกในน้ำได้"],
    size: "เลื้อยยาวได้หลายเมตรถ้าให้พื้นที่",
    pests: ["ไรแมงมุม", "เพลี้ย"],
    propagation: "ปักชำปลายกิ่งในน้ำ — ง่ายและเร็ว",
  },
  {
    id: 6,
    name: "Peace Lily",
    scientificName: "Spathiphyllum spp.",
    price: 450,
    img: "https://radhakrishnaagriculture.in/cdn/shop/files/peacelily.jpg?v=1709184309?q=80&w=800&auto=format&fit=crop",
    tag: "ออกดอก",
    shortDesc: "ดอกสีขาวบริสุทธิ์ ให้บรรยากาศสงบ",
    origin: "อเมริกากลางและใต้",
    description:
      "Peace Lily เป็นไม้ที่ออกดอกสวยในร่ม ดอกสีขาว (spathes) ตัดกับใบสีเขียวเข้ม ช่วยฟอกอากาศแต่ควรระวังว่ามีพิษหากกิน",
    care: {
      light: "แสงที่กรองแล้ว — แสงจ้าแต่หลบแดดตรง",
      water: "ชอบดินชื้นแต่ไม่ขังน้ำ — รดสม่ำเสมอ",
      humidity: "ต้องการความชื้นปานกลางถึงสูง",
      soil: "ดินร่วนที่เก็บความชื้นได้ดี",
      fertilizer: "ปุ๋ยเหลวทุก 6–8 สัปดาห์",
      repotEvery: "ทุก 1–2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "พิษต่อสัตว์เลี้ยงและเด็กหากเคี้ยวกิน",
    benefits: ["ฟอกอากาศได้ดี", "ออกดอกสวยในบ้าน"],
    size: "สูง 30–60 ซม.",
    pests: ["ไร", "เพลี้ย"],
    propagation: "แยกกอ (division) ขณะที่ repot",
  },
  {
    id: 7,
    name: "Calathea",
    scientificName: "Calathea spp.",
    price: 520,
    img: "https://cdn.shopify.com/s/files/1/0550/4771/6948/files/Spring_Starter_Pack_Flowers_Instagram_Post_Instagram_Post_7__mMLFt9674J.jpg?v=1743786856?q=80&w=800&auto=format&fit=crop",
    tag: "ลายสวย",
    shortDesc: "ใบมีลวดลายสวย เปิด-ปิดตามจังหวะกลางวัน-กลางคืน",
    origin: "อเมริกาใต้",
    description:
      "Calathea เป็นไม้ใบที่ได้รับความนิยมเพราะมีลวดลายหน้าต่างต่างกันหลายชนิด ต้องการความชื้นและการดูแลมากกว่าพืชทั่วไป แต่ให้ผลลัพธ์ที่สวยงาม",
    care: {
      light: "แสงกรอง — หลีกเลี่ยงแดดจัด",
      water: "ชอบความชื้นสม่ำเสมอ แต่ไม่ขังน้ำ",
      humidity: "สูง — ควรใช้เครื่องเพิ่มความชื้นหรือฉีดพ่นบ่อย",
      soil: "ดินร่วนระบายน้ำปานกลาง",
      fertilizer: "ปุ๋ยอ่อนในฤดูเติบโต",
      repotEvery: "ทุก 1–2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "ไม่เป็นพิษมาก แต่ควรหลีกเลี่ยงการกิน",
    benefits: ["ความสวยงาม", "การเคลื่อนไหวของใบน่าสนใจ"],
    size: "สูง 30–90 ซม.",
    pests: ["ไร", "เพลี้ย"],
    propagation: "แยกกอขณะ repot เป็นวิธีที่ดีที่สุด",
  },
  {
    id: 8,
    name: "Aloe Vera",
    scientificName: "Aloe vera",
    price: 240,
    img: "https://m.media-amazon.com/images/I/41HjuO7VwjL._UF1000,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop",
    tag: "ดูแลง่าย",
    shortDesc: "กุหลาบทะเลทรายที่มีวุ้นในใบ ใช้ประโยชน์ได้",
    origin: "คาบสมุทรอาระเบีย",
    description:
      "Aloe Vera เป็นพืชอวบน้ำที่แข็งแรง มีวุ้นในใบที่ใช้บำรุงผิวและรักษาบาดแผลเล็กน้อย เป็นตัวเลือกที่ดีสำหรับผู้ที่ต้องการต้นไม้ที่มีประโยชน์และเลี้ยงง่าย",
    care: {
      light: "ชอบแสงจ้า — เหมาะวางกลางแจ้งหรือริมหน้าต่าง",
      water: "รดน้อย — ปล่อยให้ดินแห้งก่อนรด",
      humidity: "ชอบสภาพแห้ง",
      soil: "ดินทราย/ดินสำหรับกระบองเพชร",
      fertilizer: "ปุ๋ยเจือจางช่วงฤดูปลูก",
      repotEvery: "ทุก 2–3 ปี",
      difficulty: "ง่าย",
    },
    toxicity: "บางสายพันธุ์มีพิษหากกิน",
    benefits: ["วุ้นช่วยรักษาแผลผิวหนัง", "ต้องดูแลน้อย"],
    size: "สูง 20–60 ซม.",
    pests: ["แมลงหวี่ขาว", "ไร"],
    propagation: "แยกหน่อ (pups) เพื่อปลูกต่อ",
  },
  {
    id: 9,
    name: "Philodendron Birkin",
    scientificName: "Philodendron Birkin",
    price: 650,
    img: "https://www.moffatts.co.nz/cdn/shop/products/Birkin-whitepot.png?v=1659558097?q=80&w=800&auto=format&fit=crop",
    tag: "ดูหรูหรา",
    shortDesc: "ใบมีลายขาวครีม เปรียบเสมือนงานดีไซน์ในกระถาง",
    origin: "ลูกผสมจากอเมริกาใต้",
    description:
      "Philodendron Birkin มีลายเส้นสีขาวครีมบนใบสีเขียวเข้ม ให้ความรู้สึกหรูหราเป็นไม้ประดับภายในบ้านที่นิยม",
    care: {
      light: "แสงกรองสว่าง",
      water: "รดเมื่อดินชั้นบนแห้ง",
      humidity: "ชอบความชื้นเล็กน้อย",
      soil: "ดินร่วนผสมปุ๋ยหมัก",
      fertilizer: "ปุ๋ยเหลวทุกเดือนในฤดูการเติบโต",
      repotEvery: "ทุก 1–2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "เป็นพิษต่อสัตว์เลี้ยงหากกิน",
    benefits: ["รูปลักษณ์พรีเมียม", "เทรนด์การแต่งบ้าน"],
    size: "สูง 30–60 ซม.",
    pests: ["ไร", "เพลี้ย"],
    propagation: "ปักชำกิ่งหรือแยกต้นเมื่อ repot",
  },
  {
    id: 10,
    name: "Areca Palm",
    scientificName: "Dypsis lutescens",
    price: 1200,
    img: "https://potsforplants.ph/cdn/shop/products/areca-palm-palmera-849528_1200x1200.jpg?v=1697027415?q=80&w=800&auto=format&fit=crop",
    tag: "ช่วยฟอกอากาศ",
    shortDesc: "ต้นปาล์มขนาดกลาง ให้บรรยากาศรีสอร์ตในบ้าน",
    origin: "มาดากัสการ์",
    description:
      "Areca Palm เป็นไม้ที่ให้บรรยากาศโปร่งสบาย ช่วยเพิ่มความชื้นและฟอกอากาศ เหมาะกับมุมห้องที่ต้องการความรู้สึกเป็นธรรมชาติ",
    care: {
      light: "ชอบแสงสว่างกรอง",
      water: "รดสม่ำเสมอ แต่ไม่ขังน้ำ",
      humidity: "ชอบความชื้นสูง",
      soil: "ดินร่วนที่ระบายได้ดี",
      fertilizer: "ปุ๋ยเม็ด/เหลวในฤดูการเติบโต",
      repotEvery: "ทุก 2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "ปลอดภัยกับสัตว์เลี้ยง (โดยทั่วไป)",
    benefits: ["ฟอกอากาศ", "เพิ่มความชื้นในห้อง"],
    size: "สูง 1–3 เมตร ขึ้นกับการดูแล",
    pests: ["ไร", "แมลงหวี่ขาว"],
    propagation: "แยกกอเมื่อต้นโตเต็มที่",
  },
  {
    id: 11,
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    price: 850,
    img: "https://shop-static.arborday.org/media/0004362_tineke-variegated-rubber-tree_510.jpeg?q=80&w=800&auto=format&fit=crop",
    tag: "สวยทน",
    shortDesc: "ใบเงางาม แข็งแรง ดูแลไม่ยาก",
    origin: "เอเชียตะวันออกเฉียงใต้",
    description:
      "Rubber Plant มีใบหนาเป็นมันวาว ให้ลุคโมเดิร์นและทนทาน เหมาะกับมุมที่ต้องการต้นใหญ่เป็นจุดเด่น",
    care: {
      light: "ชอบแสงสว่างปานกลางถึงจ้า",
      water: "รดเมื่อดินชั้นบนแห้ง",
      humidity: "ชอบความชื้นปานกลาง",
      soil: "ดินร่วนระบายน้ำดี",
      fertilizer: "ปุ๋ยเดือนละครั้งในฤดูการเติบโต",
      repotEvery: "ทุก 2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "มีน้ำยางที่สามารถระคายเคืองผิวหนังและเป็นพิษหากกิน",
    benefits: ["ใบทำความสะอาดอากาศ", "ทนทานต่อสภาพแวดล้อม"],
    size: "สูง 1–3 เมตรในร่ม",
    pests: ["ไร", "เพลี้ย"],
    propagation: "ปักชำยอดหรือแยกกอ",
  },
  {
    id: 12,
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    price: 390,
    img: "https://www.thejunglecollective.com.au/wp-content/uploads/2020/03/1829.-Boston-Fern-_.__e.m.i.l.y_.__.png?q=80&w=800&auto=format&fit=crop",
    tag: "เพิ่มความชื้น",
    shortDesc: "พุ่มใบฟู เติมความสดใสในมุมเงียบ",
    origin: "อเมริกาเขตร้อน",
    description:
      "Boston Fern เป็นเฟิร์นที่ใบฟูสวย เหมาะกับการแขวนหรือวางบนชั้น ต้องการความชื้นและการดูแลระดับปานกลาง",
    care: {
      light: "แสงกรอง—ไม่ชอบแดดจ้า",
      water: "ชอบดินชื้น ต้องรดสม่ำเสมอ",
      humidity: "สูง—ควรฉีดพ่นหรือตั้งบนถาดน้ำ",
      soil: "ดินร่วนผสมที่เก็บความชื้นได้",
      fertilizer: "ปุ๋ยอ่อนทุกเดือนในฤดูปลูก",
      repotEvery: "ทุก 1–2 ปี",
      difficulty: "ปานกลาง",
    },
    toxicity: "ไม่เป็นพิษแต่ควรหลีกเลี่ยงการกิน",
    benefits: ["เพิ่มความชื้น", "ลุคธรรมชาติในบ้าน"],
    size: "พุ่มกว้าง 30–100 ซม.",
    pests: ["ไร", "หนอน"],
    propagation: "แยกกอหรือปักชำส่วนของกอ",
  },
];

const currency = (n: number) => n.toLocaleString("th-TH", { style: "currency", currency: "THB" });

const PlantDictionary: React.FC = () => {
  const [selected, setSelected] = useState<Plant | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // lock scroll when modal open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const openModal = (p: Plant) => {
    setSelected(p);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-4">Plant Dictionary 🌿</h1>

      <p className="text-sm text-gray-600 mb-6">คลิกการ์ดเพื่อดูรายละเอียดเต็ม — โมดอลสไตล์ Minimal + White</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plants.map((p) => (
          <article
            key={p.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer"
            onClick={() => openModal(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") openModal(p);
            }}
          >
            <div className="h-40 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img src={p.img} alt={p.name} className="object-cover h-full w-full" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium">{p.name}</h2>
                  <p className="text-xs text-gray-500">{p.scientificName}</p>
                </div>
                <span className="text-sm px-2 py-1 rounded-md bg-green-50 text-green-700">{p.tag}</span>
              </div>

              <p className="text-sm text-gray-600 mt-2">{p.shortDesc}</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{currency(p.price)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(p);
                  }}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200"
                  aria-label={`ดูรายละเอียด ${p.name}`}
                >
                  รายละเอียด
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal (Minimal + White) */}
      {isOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={closeModal} aria-hidden />

          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h3 id="modal-title" className="text-2xl font-semibold">
                  {selected.name}
                </h3>
                <p className="text-xs text-gray-500">{selected.scientificName} • {selected.origin}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-gray-500">ราคา</div>
                  <div className="font-semibold">{currency(selected.price)}</div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="ปิดหน้าต่าง"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img src={selected.img} alt={selected.name} className="w-full rounded-lg object-cover h-64" />

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div>
                    <strong>Tag:</strong> {selected.tag}
                  </div>
                  <div>
                    <strong>ขนาด:</strong> {selected.size}
                  </div>
                  <div>
                    <strong>พิษ:</strong> {selected.toxicity}
                  </div>
                  <div>
                    <strong>การขยายพันธุ์:</strong> {selected.propagation}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <section className="mb-4">
                  <h4 className="text-lg font-medium">คำอธิบาย</h4>
                  <p className="text-gray-700 mt-2">{selected.description}</p>
                </section>

                <section className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">การดูแล (Care)</h5>
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      <li><strong>แสง:</strong> {selected.care?.light}</li>
                      <li><strong>การรดน้ำ:</strong> {selected.care?.water}</li>
                      <li><strong>ความชื้น:</strong> {selected.care?.humidity}</li>
                      <li><strong>ดินที่แนะนำ:</strong> {selected.care?.soil}</li>
                      <li><strong>ปุ๋ย:</strong> {selected.care?.fertilizer}</li>
                      <li><strong>เปลี่ยนกระถาง:</strong> {selected.care?.repotEvery}</li>
                      <li><strong>ระดับความยาก:</strong> {selected.care?.difficulty}</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">ประโยชน์ & ศักยภาพ</h5>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      {selected.benefits?.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>

                    <div className="mt-3">
                      <strong>ปัญหาที่พบบ่อย:</strong>
                      <ul className="mt-1 text-sm list-disc list-inside">
                        {selected.pests?.map((pest, idx) => (
                          <li key={idx}>{pest}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-6">
                  <h5 className="font-medium">คำแนะนำเพิ่มเติม</h5>
                  <ul className="mt-2 text-sm text-gray-700 space-y-2">
                    <li>
                      • ตรวจใบสม่ำเสมอ ถ้าใบเหลืองอาจเกิดจากการรดน้ำมากหรือน้อยเกินไป
                    </li>
                    <li>• หลีกเลี่ยงการเปลี่ยนตำแหน่งบ่อยเกินไป เพราะต้นอาจเครียด</li>
                    <li>• ใช้ปุ๋ยเจือจางตามคำแนะนำเพื่อไม่ให้รากช็อก</li>
                    <li>• หากมีสัตว์เลี้ยง ควรวางต้นให้พ้นมือแมว/สุนัขหรือตรวจสอบความเป็นพิษก่อน</li>
                  </ul>
                </section>

                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">เพิ่มลงตะกร้า</button>
                  <button onClick={closeModal} className="px-4 py-2 rounded-md border">ปิด</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDictionary;
