import fs from "node:fs";
import path from "node:path";

const dir = path.resolve(import.meta.dirname, "..", "messages");

const education = {
  scrollHint: {
    th: "เลื่อนเพื่อสำรวจ",
    vi: "Cuộn để khám phá",
    lo: "ເລື່ອນເພື່ອສຳຫຼວດ",
    zh: "滚动探索",
    en: "Scroll to Explore",
  },
  propertiesEyebrow: {
    th: "รูปลักษณ์ทางกายภาพของเพชรดำ",
    vi: "Đặc điểm vật lý của kim cương đen",
    lo: "ລັກສະນະທາງກາຍະພາບຂອງເພັດດຳ",
    zh: "黑钻石的物理特征",
    en: "The Physical Character of Black Diamonds",
  },
  investmentEyebrow: {
    th: "การลงทุน",
    vi: "Đầu tư",
    lo: "ການລົງທຶນ",
    zh: "投资",
    en: "Investment",
  },
  rawEyebrow: {
    th: "ความดิบเถื่อนจากธรรมชาติ",
    vi: "Sự thô ráp nguyên bản từ thiên nhiên",
    lo: "ຄວາມດິບຈາກທຳມະຊາດ",
    zh: "源自自然的原始粗犷",
    en: "Raw, Untamed by Nature",
  },
  cutEyebrow: {
    th: "ความแม่นยำจากฝีมือมนุษย์",
    vi: "Sự chính xác từ bàn tay con người",
    lo: "ຄວາມແມ່ນຍຳຈາກຝີມືມະນຸດ",
    zh: "源自人手的精准工艺",
    en: "Precision by Human Hand",
  },
  caratLight: { th: "แผ่วเบา", vi: "Nhẹ nhàng", lo: "ເບົາບາງ", zh: "轻盈", en: "Subtle" },
  caratNotable: { th: "โดดเด่น", vi: "Nổi bật", lo: "ໂດດເດັ່ນ", zh: "醒目", en: "Notable" },
  caratGrand: { th: "อลังการ", vi: "Tráng lệ", lo: "ອາລັງການ", zh: "恢弘", en: "Magnificent" },
  nebulaAlt: {
    th: "เนบิวลาในห้วงอวกาศลึก",
    vi: "Tinh vân trong không gian sâu thẳm",
    lo: "ເນບິວລາໃນອະວະກາດເລິກ",
    zh: "深空星云",
    en: "A deep-space nebula",
  },
};

const membership = {
  bespokeEyebrow: {
    th: "การสั่งทำ",
    vi: "Đặt hàng riêng",
    lo: "ການສັ່ງເຮັດພິເສດ",
    zh: "定制委托",
    en: "Custom Commission",
  },
  sizeSelectedLabel: {
    th: "2.5 กะรัต ที่เลือก",
    vi: "Đã chọn 2.5 carat",
    lo: "ເລືອກ 2.5 ກະລັດ",
    zh: "已选择 2.5 克拉",
    en: "2.5 Carats Selected",
  },
  shadeName: {
    th: "ออบซิเดียนเข้ม (ด้าน)",
    vi: "Obsidian đậm (mờ)",
    lo: "ອອບຊິດຽນເຂັ້ມ (ດ້ານ)",
    zh: "深邃黑曜岩（哑光）",
    en: "Deep Obsidian (Matte)",
  },
  cutOptions: {
    th: ["ทรงดิบไม่สมมาตร", "เอเมอรัลด์เชิงสถาปัตยกรรม", "เบรียนท์แห่งความว่างเปล่า", "คุชชั่นคาร์บอน"],
    vi: ["Cắt thô bất đối xứng", "Emerald kiến trúc", "Brilliant của khoảng trống", "Cushion carbon"],
    lo: ["ຮູບຊົງດິບບໍ່ສົມມາດ", "ເອເມຣາລດເຊີງສະຖາປັດຕະຍະກຳ", "ບຣິລລຽນແຫ່ງຄວາມຫວ່າງເປົ່າ", "ຄາບອນຄູຊັນ"],
    zh: ["不对称原石切割", "建筑感祖母绿型", "虚空明亮式", "碳素垫形"],
    en: ["Asymmetric Raw Cut", "Architectural Emerald", "Void Brilliant", "Carbon Cushion"],
  },
  conciergeAlt: {
    th: "คอนเซียร์จ",
    vi: "Quản gia riêng",
    lo: "ພະນັກງານໃຫ້ບໍລິການສ່ວນຕົວ",
    zh: "礼宾专员",
    en: "Concierge",
  },
  conciergeRole: {
    th: "ผู้อำนวยการฝ่ายจัดหาอาวุโส",
    vi: "Giám đốc Cấp cao phụ trách Nguồn cung",
    lo: "ຜູ້ອຳນວຍການອາວຸໂສຝ່າຍຈັດຫາ",
    zh: "高级采购总监",
    en: "Senior Sourcing Director",
  },
};

const catalog = {
  detailCarat: { th: "กะรัต", vi: "Carat", lo: "ກະລັດ", zh: "克拉", en: "Carat" },
  detailCut: { th: "การเจียระไน", vi: "Kiểu cắt", lo: "ການຕັດ", zh: "切工", en: "Cut" },
  detailMetal: { th: "โลหะ", vi: "Kim loại", lo: "ໂລຫະ", zh: "金属", en: "Metal" },
  detailSetting: { th: "ตัวเรือน", vi: "Khung nạm", lo: "ໂຄງຮ່າງຝັງ", zh: "镶嵌底座", en: "Setting" },
  detailOrigin: { th: "แหล่งที่มา", vi: "Xuất xứ", lo: "ແຫຼ່ງກຳເນີດ", zh: "产地", en: "Origin" },
  detailCertLabel: { th: "ใบรับรอง", vi: "Chứng nhận", lo: "ໃບຮັບຮອງ", zh: "证书", en: "Certification" },
  detailGemSpecs: {
    th: "ข้อมูลจำเพาะอัญมณี",
    vi: "Thông số kỹ thuật đá quý",
    lo: "ຂໍ້ມູນສະເພາະອັນຍະມະນີ",
    zh: "宝石规格",
    en: "Gemstone Specifications",
  },
  detailSettingSpecs: {
    th: "ตัวเรือนและการฝัง",
    vi: "Khung nạm và cách gắn",
    lo: "ໂຄງຮ່າງແລະການຝັງ",
    zh: "镶嵌与底座工艺",
    en: "Setting & Mounting",
  },
  priceMinLabel: { th: "ต่ำสุด", vi: "Thấp nhất", lo: "ຕ່ຳສຸດ", zh: "最低", en: "Min" },
  priceMaxLabel: { th: "สูงสุด", vi: "Cao nhất", lo: "ສູງສຸດ", zh: "最高", en: "Max" },
  bespokeBackgroundWord: { th: "ว่างเปล่า", vi: "Hư Vô", lo: "ຫວ່າງເປົ່າ", zh: "虚空", en: "Void" },
  bespokeImageAlt: {
    th: "คอลเลกชันเพชรดำคัดสรรบนกำมะหยี่สีเข้ม",
    vi: "Bộ sưu tập kim cương đen được tuyển chọn trên nhung sẫm màu",
    lo: "ຄໍເລັກຊັນເພັດດຳຄັດສັນເທິງກຳມະຫຍີ່ສີເຂັ້ມ",
    zh: "精选黑钻藏品置于深色天鹅绒之上",
    en: "A curated black diamond collection on dark velvet",
  },
  detailInDepth: {
    th: "การวิเคราะห์เชิงลึก",
    vi: "Phân tích chuyên sâu",
    lo: "ການວິເຄາະເຊິງເລິກ",
    zh: "深度分析",
    en: "In-Depth Analysis",
  },
};

const blog = {
  postCountSuffix: { th: "บทความ", vi: "bài viết", lo: "ບົດຄວາມ", zh: "篇文章", en: "Articles" },
  moreArticlesLabel: {
    th: "บทความทั้งหมด",
    vi: "Tất cả bài viết",
    lo: "ບົດຄວາມທັງໝົດ",
    zh: "全部文章",
    en: "More Articles",
  },
};

const home = {
  heroImageAlt: {
    th: "ภาพระยะใกล้ของอัญมณีสีเข้มหายากสะท้อนแสงเพียงเล็กน้อย",
    vi: "Cận cảnh một viên đá quý sẫm màu hiếm phản chiếu ánh sáng nhẹ nhàng",
    lo: "ພາບໃກ້ຊິດຂອງອັນຍະມະນີສີເຂັ້ມທີ່ຫາຍາກສະທ້ອນແສງເລັກນ້ອຍ",
    zh: "稀有深色宝石的特写，微微反射着光芒",
    en: "Close-up of a rare dark gemstone reflecting a faint light",
  },
};

const investment = {
  standardsEyebrow: {
    th: "โครงสร้างการตรวจสอบ",
    vi: "Khung xác minh",
    lo: "ໂຄງສ້າງການກວດສອບ",
    zh: "验证框架",
    en: "Verification Framework",
  },
  channelsEyebrow: {
    th: "วงในผู้คัดสรร",
    vi: "Vòng trong tuyển chọn",
    lo: "ວົງໃນຜູ້ຄັດເລືອກ",
    zh: "甄选核心圈",
    en: "The Curated Inner Circle",
  },
};

const common = {
  mainNavLabel: {
    th: "การนำทางหลัก",
    vi: "Điều hướng chính",
    lo: "ການນຳທາງຫຼັກ",
    zh: "主导航",
    en: "Main Navigation",
  },
};

const locales = ["th", "vi", "lo", "zh", "en"];

function apply(sectionKey, defs) {
  for (const locale of locales) {
    const file = path.join(dir, `${locale}.json`);
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!json[sectionKey]) throw new Error(`${sectionKey} missing in ${locale}.json`);
    for (const [key, values] of Object.entries(defs)) {
      json[sectionKey][key] = values[locale];
    }
    fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  }
}

apply("education", education);
apply("membership", membership);
apply("catalog", catalog);
apply("blog", blog);
apply("home", home);
apply("investment", investment);
apply("common", common);

console.log("Done.");
