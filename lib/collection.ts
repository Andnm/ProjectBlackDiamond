import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Price } from "@/lib/format-price";

import piece1 from "@/assets/images/collection/piece_1.png";
import piece2 from "@/assets/images/collection/piece_2.png";
import piece3 from "@/assets/images/collection/piece_3.png";
import piece4 from "@/assets/images/collection/piece_4.png";
import piece5 from "@/assets/images/collection/piece_5.png";
import piece6 from "@/assets/images/collection/piece_6.png";
import piece7 from "@/assets/images/collection/piece_7.png";
import piece8 from "@/assets/images/collection/piece_8.png";

type LocalizedText = Record<Locale, string>;

export type Certificate = {
  authority: "GIA" | "IGI" | "Internal";
  reportNumber: string;
  reportType: string;
  issueDate: string;
  verifyUrl: string;
  pdfUrl?: string;
};

export type CollectionPiece = {
  slug: string;
  image: string | StaticImageData;
  imageAlt: LocalizedText;
  source: {
    label: string;
    url: string;
  };
  name: LocalizedText;
  line: LocalizedText;
  summary: LocalizedText;
  price: Price | null;
  priceNote: LocalizedText;
  rarityIndex: number;
  origin: LocalizedText;
  certificate: Certificate | null;
  specs: {
    carat: string;
    dimensions: string;
    cut: LocalizedText;
    setting: LocalizedText;
    metal: LocalizedText;
    origin: LocalizedText;
    certification: string;
    hardness: string;
    luster: LocalizedText;
    treatment: LocalizedText;
  };
  analysis: Record<Locale, string[]>;
  acquisition: Record<Locale, string[]>;
  inclusionProfile: LocalizedText;
  lightBehavior: LocalizedText;
  provenance: LocalizedText;
  wearability: LocalizedText;
  care: LocalizedText;
  investmentNote: LocalizedText;
  tags: string[];
};

export const collectionPieces: CollectionPiece[] = [
  {
    slug: "obsidian-radiant",
    image: piece1,
    imageAlt: {
      en: "Close-up of a polished black diamond with radiant cut, reflecting sharp architectural facets against dark velvet",
      vi: "Cận cảnh kim cương đen đánh bóng giác radiant, các mặt facet kiến trúc sắc gọn trên nền nhung tối",
    },
    source: {
      label: "Pexels",
      url: "https://www.pexels.com/photo/1458867/",
    },
    name: { en: "The Obsidian Radiant", vi: "The Obsidian Radiant" },
    line: { en: "Architectural solitaire", vi: "Kiến tác độc bản" },
    summary: {
      en: "A sharply composed collector stone for clients who want the visual gravity of black carbon with the discipline of a modern gallery object. The radiant geometry keeps the stone visually alive without compromising the severe black silhouette.",
      vi: "Một tuyệt phẩm sưu tầm được chắt lọc kỹ lưỡng — mang sức nặng thị giác của carbon đen thuần khiết trong dáng dấp kỷ luật của một vật thể gallery đương đại. Hình học radiant duy trì nhịp thị giác mà không đánh mất đường bóng đen nghiêm và sắc đặc trưng.",
    },
    price: { amount: 18400, currency: "USD" },
    priceNote: {
      en: "Stone-only pricing. Setting and finishing quoted separately.",
      vi: "Giá đá rời. Ổ và hoàn thiện được báo giá riêng.",
    },
    rarityIndex: 88,
    origin: { en: "Brazilian carbonado selection", vi: "Tuyển chọn carbonado Brazil" },
    certificate: {
      authority: "GIA",
      reportNumber: "6204693532",
      reportType: "GIA Diamond Dossier",
      issueDate: "2023-09-14",
      verifyUrl: "https://www.gia.edu/report-check?reportno=6204693532",
      pdfUrl: "https://www.gia.edu/report-check?reportno=6204693532",
    },
    tags: ["Radiant", "Collector", "GIA Certified", "Brazilian Carbonado"],
    specs: {
      carat: "8.42 ct",
      dimensions: "14.8 × 12.1 × 8.6 mm",
      cut: { en: "Radiant modified brilliant", vi: "Radiant biến thể brilliant" },
      setting: { en: "Low architectural bezel", vi: "Ổ bezel kiến trúc thấp" },
      metal: { en: "18K white gold with black rhodium finish", vi: "Vàng trắng 18K phủ rhodium đen" },
      origin: { en: "Brazilian carbonado selection", vi: "Tuyển chọn carbonado Brazil" },
      certification: "GIA dossier + BlackDiamond provenance file",
      hardness: "10 (Mohs)",
      luster: { en: "Sub-adamantine to metallic", vi: "Cận kim cương đến ánh kim" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Dense graphite concentration with stable microscopic hematite veining. No dominant surface-reaching fracture is visible across the table. The polycrystalline matrix remains intact under 10× magnification.",
      vi: "Mật độ graphite dày đặc với vi mạch hematite ổn định toàn thân. Không xuất hiện vết nứt lớn nào chạm tới vùng table — tiêu chí hiếm ở dòng carbonado. Ma trận đa tinh thể còn nguyên vẹn dưới kính 10×.",
    },
    lightBehavior: {
      en: "The stone does not try to sparkle like a white diamond. Its value is in controlled surface reflection: sharp, metallic, and nearly architectural. Under directional light the facets read as a geometric map of the stone's internal density.",
      vi: "Viên đá không cố tranh lấp lánh với kim cương trắng. Sức hút nằm ở phản xạ bề mặt được kiểm soát tuyệt đối: sắc bén, ánh kim và đậm chất kiến trúc. Dưới ánh sáng định hướng, các facet hiện ra như bản đồ hình học của mật độ nội tâm viên đá.",
    },
    provenance: {
      en: "Sourced from a carefully screened Brazilian carbonado parcel. Full gemological dossier available, including macro imagery, crystal structure analysis, and origin verification. Conflict-free and ethically extracted.",
      vi: "Tuyển từ lô carbonado Brazil qua quy trình kiểm định nghiêm ngặt. Hồ sơ ngọc học đầy đủ đi kèm: ảnh macro, phân tích cấu trúc tinh thể và xác nhận xuất xứ. Khai thác không xung đột, minh bạch chuỗi giám sát.",
    },
    wearability: {
      en: "The low bezel lowers impact risk and makes the piece appropriate for disciplined daily wear. The modified radiant cut distributes stress evenly across the setting, reducing chipping risk.",
      vi: "Ổ bezel thấp phân tán lực va chạm đều lên toàn viền đá, phù hợp đeo hằng ngày có kiểm soát. Giác radiant biến thể phân bổ ứng suất đồng đều trên ổ, giảm đáng kể nguy cơ mẻ cạnh.",
    },
    care: {
      en: "Avoid ultrasonic cleaning. Use a soft brush with warm water and mild soap. Professional inspection recommended after heavy wear. Store separately from other gemstones to prevent surface contact.",
      vi: "Tránh vệ sinh bằng sóng siêu âm. Dùng bàn chải lông mềm, nước ấm và xà phòng trung tính. Khuyến nghị kiểm tra chuyên nghiệp định kỳ sau thời gian đeo nhiều. Cất riêng để tránh tiếp xúc bề mặt với đá quý khác.",
    },
    investmentNote: {
      en: "Rarity index 88/100 places this stone in the upper collector tier. The carat weight above eight carats represents a significant supply threshold. Documentation supports private insurance valuation.",
      vi: "Chỉ số hiếm 88/100 xếp viên đá này vào tầng sưu tầm cao. Trọng lượng vượt tám carat đại diện cho ngưỡng khan hiếm nguồn cung đáng kể. Hồ sơ đi kèm hỗ trợ định giá bảo hiểm độc lập.",
    },
    analysis: {
      en: [
        "The radiant geometry keeps the stone visually alive without compromising the severe black silhouette.",
        "A low bezel makes the diamond read as a sculptural object rather than a sparkle-first jewel.",
        "This is the closest evolution of the legacy catalog card: retail-ready, but with enough documentation to satisfy a serious collector.",
      ],
      vi: [
        "Hình học radiant duy trì nhịp thị giác mà không làm mất đường bóng đen nghiêm và sắc — sự cân bằng hiếm có trong thiết kế trang sức đương đại.",
        "Ổ bezel thấp định vị viên kim cương như một vật thể điêu khắc — trọng tâm là hình khối và chiều sâu, không phải độ lấp lánh.",
        "Phiên bản kế thừa và nâng cấp từ catalog truyền thống: đủ điều kiện bán lẻ, nhưng sức thuyết phục đạt tầm nhà sưu tầm khắt khe nhất.",
      ],
    },
    acquisition: {
      en: ["Private appointment recommended", "Stone-only or finished ring", "Lead time: 6–8 weeks"],
      vi: ["Khuyến nghị đặt lịch xem tại phòng trưng bày", "Tùy chọn đá rời hoặc nhẫn hoàn thiện", "Thời gian thực hiện: 6–8 tuần"],
    },
  },
  {
    slug: "midnight-emerald",
    image: piece2,
    imageAlt: {
      en: "Emerald cut black diamond ring displayed against dark marble surface, step-cut facets visible",
      vi: "Nhẫn kim cương đen giác emerald trên nền đá cẩm thạch tối, các bậc facet rõ nét",
    },
    source: {
      label: "Pexels",
      url: "https://www.pexels.com/photo/9978722/",
    },
    name: { en: "Midnight Emerald", vi: "Midnight Emerald" },
    line: { en: "Stepped collector geometry", vi: "Hình học bậc — dành cho kẻ am tường" },
    summary: {
      en: "A restrained emerald-cut composition built around proportion, edge discipline, and a quieter form of prestige. The stepped facets allow specialists to judge cutting precision at a glance.",
      vi: "Một bố cục emerald tiết chế và chuẩn mực — được xây dựng quanh tỷ lệ, kỷ luật cạnh cắt và một dạng uy tín trầm hơn, sâu hơn. Các bậc facet phản chiếu sự am hiểu của người sở hữu hơn là thu hút ánh nhìn bên ngoài.",
    },
    price: { amount: 12900, currency: "USD" },
    priceNote: {
      en: "Includes IGI certification and setting consultation.",
      vi: "Bao gồm chứng nhận IGI và tư vấn ổ đá.",
    },
    rarityIndex: 84,
    origin: { en: "Natural black diamond, private parcel", vi: "Kim cương đen tự nhiên, lô riêng" },
    certificate: {
      authority: "IGI",
      reportNumber: "IGI-LG2309185024",
      reportType: "IGI Laboratory Grown Diamond Report",
      issueDate: "2023-09-18",
      verifyUrl: "https://www.igi.org/verify-your-report/",
      pdfUrl: "https://www.igi.org/verify-your-report/",
    },
    tags: ["Emerald Cut", "Step Cut", "IGI Certified", "Platinum"],
    specs: {
      carat: "5.15 ct",
      dimensions: "11.2 × 8.4 × 5.9 mm",
      cut: { en: "Emerald step cut", vi: "Emerald step cut" },
      setting: { en: "Open gallery with reinforced corners", vi: "Ổ hở có gia cố bốn góc" },
      metal: { en: "Platinum 950", vi: "Platinum 950" },
      origin: { en: "Natural black diamond, private parcel", vi: "Kim cương đen tự nhiên, lô riêng" },
      certification: "IGI report + internal grading memo",
      hardness: "10 (Mohs)",
      luster: { en: "Vitreous to sub-metallic", vi: "Ánh thủy tinh đến cận ánh kim" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Even opacity across the body with edge-stable inclusions, critical for a step cut where uneven tone becomes immediately visible. The long parallel facets act as a quality mirror.",
      vi: "Độ đục đồng đều trên toàn thân đá với bao thể ổn định ở rìa — điều kiện tiên quyết với step cut, bởi bất kỳ sự thiếu đồng đều nào cũng lộ ra ngay tức thì. Các bậc facet song song dài đóng vai trò như gương kiểm tra chất lượng khắc nghiệt nhất.",
    },
    lightBehavior: {
      en: "Quiet mirror flashes appear along the long steps. The stone feels formal, measured, and deliberate. Unlike brilliant cuts, the emerald restrains light into slow, horizontal sweeps.",
      vi: "Những tia phản chiếu khẽ lướt dọc theo các bậc dài — trầm lắng, đo đạc và hoàn toàn có chủ ý. Khác với giác brilliant, emerald kiềm chế ánh sáng thành những vệt ngang chậm mang đến cảm giác trang trọng tuyệt đối.",
    },
    provenance: {
      en: "From a private parcel with traceable documentation. Best acquired with side-by-side tone comparison against untreated reference stones.",
      vi: "Từ một lô riêng với tài liệu truy xuất đầy đủ. Nên sở hữu kèm theo đối chiếu tông màu trực tiếp với mẫu đá tham chiếu chưa qua xử lý để xác nhận màu tự nhiên.",
    },
    wearability: {
      en: "The elongated form gives presence without excessive height, suitable for formal wear and collector rotation. Corner protection settings are standard.",
      vi: "Dáng kéo dài tạo sức hiện diện mạnh mẽ mà không cần chiều cao quá mức — lý tưởng cho trang phục trang trọng và luân phiên sưu tầm. Ổ bảo vệ góc là tiêu chuẩn không thỏa hiệp.",
    },
    care: {
      en: "Protect the exposed corners from hard impact. Inspect prongs every six months. The step-cut geometry makes inclusions more visible if the surface is scratched.",
      vi: "Bảo vệ các góc lộ tránh va đập mạnh — đây là điểm yếu cần ưu tiên. Kiểm tra chấu mỗi sáu tháng. Hình học step cut khuếch đại mọi vết xước bề mặt, do đó cần xử lý nhẹ nhàng.",
    },
    investmentNote: {
      en: "The emerald cut demands higher cutting discipline, making well-executed examples increasingly rare and price-stable over time.",
      vi: "Giác emerald đòi hỏi kỷ luật cắt vượt trội — những mẫu được thực hiện xuất sắc ngày càng khan hiếm, tạo nên sự ổn định giá trị bền vững theo thời gian.",
    },
    analysis: {
      en: [
        "The emerald cut restores the old catalog's architectural mood while feeling more mature than a standard product grid.",
        "Its restraint makes it a strong entry point for buyers who dislike overt jewelry theatrics.",
        "The stepped facets allow specialists to judge cutting precision quickly, making the detail page more credible.",
      ],
      vi: [
        "Giác emerald khôi phục tinh thần kiến trúc của catalog gốc, nhưng trưởng thành và sâu sắc hơn bất kỳ lưới sản phẩm thông thường nào.",
        "Sự tiết chế trở thành tuyên ngôn — đây là lựa chọn của những người không cần trang sức phô trương thay mình.",
        "Các bậc facet phơi bày chất lượng cắt không khoan nhượng, khiến trang hồ sơ trở nên đáng tin cậy với ngay cả chuyên gia khắt khe.",
      ],
    },
    acquisition: {
      en: ["Collector viewing available", "Recommended for platinum setting", "Lead time: 5–7 weeks"],
      vi: ["Có lịch xem dành riêng cho nhà sưu tầm", "Khuyến nghị ổ platinum 950", "Thời gian thực hiện: 5–7 tuần"],
    },
  },
  {
    slug: "eclipse-cushion",
    image: piece3,
    imageAlt: {
      en: "Large cushion cut black diamond ring photographed against dark background with dramatic studio lighting",
      vi: "Nhẫn kim cương đen giác cushion cỡ lớn chụp trên nền tối với ánh sáng studio kịch tính",
    },
    source: {
      label: "Pexels",
      url: "https://www.pexels.com/photo/10475948/",
    },
    name: { en: "Eclipse Cushion", vi: "Eclipse Cushion" },
    line: { en: "Museum-grade presence", vi: "Hiện vật bảo tàng" },
    summary: {
      en: "A large cushion-cut black diamond with enough softness for fine jewelry, but enough mass to remain an asset-class object. At this carat weight, the stone demands institutional documentation.",
      vi: "Kim cương đen giác cushion cỡ lớn — đủ tinh tế để trở thành trang sức cao cấp, đủ khối lượng để giữ vị thế tài sản. Ở trọng lượng này, viên đá đòi hỏi hồ sơ ngang tầm tổ chức tài chính.",
    },
    price: { amount: 24200, currency: "USD" },
    priceNote: {
      en: "Full gemological report and insurance valuation included.",
      vi: "Bao gồm báo cáo ngọc học đầy đủ và định giá bảo hiểm.",
    },
    rarityIndex: 92,
    origin: { en: "Brazilian heritage stone", vi: "Đá di sản Brazil" },
    certificate: {
      authority: "GIA",
      reportNumber: "2245678901",
      reportType: "GIA Diamond Report",
      issueDate: "2022-11-03",
      verifyUrl: "https://www.gia.edu/report-check?reportno=2245678901",
      pdfUrl: "https://www.gia.edu/report-check?reportno=2245678901",
    },
    tags: ["Cushion Cut", "Museum Grade", "Investment Asset", "GIA + Insurance"],
    specs: {
      carat: "10.20 ct",
      dimensions: "13.5 × 12.8 × 9.1 mm",
      cut: { en: "Cushion modified brilliant", vi: "Cushion biến thể brilliant" },
      setting: { en: "Protective double claw setting", vi: "Ổ chấu kép bảo vệ" },
      metal: { en: "18K yellow gold with platinum seat", vi: "Vàng vàng 18K với đế platinum" },
      origin: { en: "Brazilian heritage stone", vi: "Đá di sản Brazil" },
      certification: "Full gemological report + insurance valuation",
      hardness: "10 (Mohs)",
      luster: { en: "Sub-adamantine, strong surface reflection", vi: "Cận kim cương, phản chiếu bề mặt mạnh" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Broad black body color with small mineral concentrations near the pavilion; stable enough for a larger table. The cushion shape masks minor variations in inclusion distribution.",
      vi: "Thân màu đen đồng đều với vài cụm khoáng nhỏ tập trung gần pavilion — ổn định đủ cho một vùng table rộng. Dáng cushion tự nhiên che lấp các biến thiên nhỏ trong phân bố bao thể, một ưu thế khó tìm ở carat này.",
    },
    lightBehavior: {
      en: "The cushion shape softens the black mass, producing broad pulses of reflected light rather than sharp flashes. In diffused light, the stone reads as a single, uniform void.",
      vi: "Dáng cushion làm mềm khối đen, tạo ra những nhịp phản chiếu rộng thay vì tia chớp sắc. Dưới ánh sáng khuếch tán, viên đá hiện diện như một khoảng tối thống nhất — sâu, tĩnh và áp đảo.",
    },
    provenance: {
      en: "A documented Brazilian heritage stone with traceable acquisition chain. Recommended for clients who want a visible centerpiece with valuation support and private custody options.",
      vi: "Đá di sản Brazil được ghi chép đầy đủ với chuỗi thu mua có thể truy xuất từng bước. Lý tưởng cho khách hàng cần một viên trung tâm có sức hiện diện tuyệt đối, hỗ trợ định giá và lựa chọn lưu ký bảo mật.",
    },
    wearability: {
      en: "Best worn as a statement ring or convertible pendant because of its carat weight. The double claw setting protects the stone while allowing maximum surface exposure.",
      vi: "Phù hợp nhất khi đeo như nhẫn tuyên ngôn hoặc mặt dây chuyền chuyển đổi do trọng lượng carat vượt trội. Ổ chấu kép bảo vệ viên đá tuyệt đối trong khi vẫn phơi diễn tối đa bề mặt.",
    },
    care: {
      en: "Store separately from white diamonds and sapphires to preserve metal finishing and stone edges. Professional cleaning every six months is recommended.",
      vi: "Lưu riêng tránh tiếp xúc với kim cương trắng và sapphire để bảo toàn bề mặt kim loại và cạnh đá. Làm sạch chuyên nghiệp định kỳ sáu tháng một lần — bắt buộc với đá cỡ này.",
    },
    investmentNote: {
      en: "Above ten carats, natural black diamond supply is extremely limited. This stone qualifies for institutional-level documentation and long-term holding strategies.",
      vi: "Trên mười carat, nguồn cung kim cương đen tự nhiên cực kỳ hạn chế trên toàn thế giới. Viên đá này đủ điều kiện cho hồ sơ cấp tổ chức và chiến lược nắm giữ dài hạn trong danh mục tài sản thay thế.",
    },
    analysis: {
      en: [
        "The cushion keeps emotional warmth, which prevents a large black diamond from becoming visually harsh.",
        "At more than ten carats, the stone needs a page that reads like a dossier, not a simple product card.",
        "Gold accents echo the legacy site's luxury palette while giving the stone a ceremonial tone.",
      ],
      vi: [
        "Dáng cushion giữ lại độ ấm cảm xúc cần thiết, tránh để một viên kim cương đen lớn trở nên quá gắt và xa cách về thị giác.",
        "Vượt mười carat, viên đá không còn là sản phẩm — nó là hồ sơ. Trang chi tiết phải phản ánh điều đó.",
        "Điểm vàng khơi gợi bảng màu xa xỉ của dòng di sản, đồng thời trao cho viên đá sắc thái nghi lễ và trường tồn.",
      ],
    },
    acquisition: {
      en: ["Insurance valuation advised", "Private vaulting available", "Lead time: 10–12 weeks"],
      vi: ["Khuyến nghị định giá bảo hiểm trước khi sở hữu", "Dịch vụ lưu ký kho riêng sẵn sàng", "Thời gian thực hiện: 10–12 tuần"],
    },
  },
  {
    slug: "nova-brilliant",
    image: piece4,
    imageAlt: {
      en: "Round brilliant cut black diamond ring on white gold band against dark textured background",
      vi: "Nhẫn kim cương đen round brilliant trên vành vàng trắng trên nền kết cấu tối",
    },
    source: {
      label: "Pexels",
      url: "https://www.pexels.com/photo/11080349/",
    },
    name: { en: "Nova Brilliant", vi: "Nova Brilliant" },
    line: { en: "Daily luxury stone", vi: "Xa xỉ thường nhật" },
    summary: {
      en: "A compact round black diamond created for clients who want the BlackDiamond language in a more wearable scale. The round brilliant is the collection's most approachable entry point without sacrificing the brand's severe tone.",
      vi: "Kim cương đen round brilliant gọn tinh, dành cho người muốn mang ngôn ngữ BlackDiamond vào cuộc sống hằng ngày. Đây là cánh cửa dễ bước vào nhất của bộ sưu tập — nhưng không nhượng bộ một chút nào về tông sắc thương hiệu.",
    },
    price: { amount: 7800, currency: "USD" },
    priceNote: {
      en: "Includes sizing and internal certification.",
      vi: "Bao gồm chỉnh ni và chứng nhận nội bộ.",
    },
    rarityIndex: 74,
    origin: { en: "Natural black diamond", vi: "Kim cương đen tự nhiên" },
    certificate: null,
    tags: ["Round Brilliant", "Daily Wear", "Entry Acquisition", "White Gold"],
    specs: {
      carat: "3.40 ct",
      dimensions: "9.5 mm diameter × 5.8 mm depth",
      cut: { en: "Round brilliant", vi: "Round brilliant" },
      setting: { en: "Four-prong low crown", vi: "Ổ bốn chấu vương miện thấp" },
      metal: { en: "18K white gold", vi: "Vàng trắng 18K" },
      origin: { en: "Natural black diamond", vi: "Kim cương đen tự nhiên" },
      certification: "Internal grading + optional GIA submission",
      hardness: "10 (Mohs)",
      luster: { en: "Sub-adamantine", vi: "Cận kim cương" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Compact, visually even body color with minor mineral variation hidden by the round geometry. The brilliant cut maximizes surface luster even with moderate inclusion density.",
      vi: "Thân màu gọn và đồng đều, biến thiên khoáng nhỏ được hình học tròn che lấp tự nhiên. Giác brilliant tối đa hoá ánh bóng bề mặt ngay cả ở mật độ bao thể trung bình — ưu điểm đặc trưng của dòng này.",
    },
    lightBehavior: {
      en: "Fast surface flashes appear when the hand moves, giving the most familiar jewelry behavior in the collection. The round brilliant draws on the same geometry used for white diamonds, but absorbs rather than transmits light.",
      vi: "Những tia phản xạ nhanh và quen thuộc xuất hiện mỗi khi bàn tay chuyển động — hành vi trang sức dễ nhận biết nhất trong bộ sưu tập. Round brilliant mượn cùng hình học với kim cương trắng, nhưng hấp thụ ánh sáng thay vì truyền qua.",
    },
    provenance: {
      en: "Designed as the collection's accessible certified acquisition without weakening the dark luxury concept. An optional GIA submission can be arranged post-acquisition.",
      vi: "Được định vị như cánh cửa vào bộ sưu tập: dễ tiếp cận hơn về ngưỡng đầu tư, nhưng không nhượng bộ bất kỳ nguyên tắc nào của concept xa xỉ tối. Nộp GIA chính thức có thể được sắp xếp theo yêu cầu.",
    },
    wearability: {
      en: "Excellent for daily wear due to rounded symmetry and lower snag risk. The low crown minimizes the stone's profile for active lifestyles.",
      vi: "Lý tưởng cho đeo hằng ngày nhờ đối xứng tròn hoàn hảo và nguy cơ mắc vướng gần như bằng không. Vương miện thấp giữ profile viên đá tối giản — phù hợp với nhịp sống năng động.",
    },
    care: {
      en: "Annual polish inspection is enough for normal use. Clean monthly with a soft brush and warm water.",
      vi: "Kiểm tra bề mặt hằng năm là đủ với tần suất đeo thông thường. Vệ sinh nhẹ hằng tháng bằng bàn chải lông mềm và nước ấm để duy trì ánh bóng.",
    },
    investmentNote: {
      en: "The round brilliant is the most liquid format in black diamond trading, making it a practical choice for first-time collectors building a position.",
      vi: "Round brilliant là định dạng có tính thanh khoản cao nhất trong giao dịch kim cương đen — lựa chọn thực tế và khôn ngoan cho nhà sưu tầm lần đầu xây dựng danh mục.",
    },
    analysis: {
      en: [
        "The round brilliant gives the catalog commercial breadth without abandoning the brand's severe tone.",
        "It is the correct recommendation for first-time black diamond buyers.",
        "The detail page frames it as an entry acquisition, not as a lesser object.",
      ],
      vi: [
        "Round brilliant mang đến chiều rộng thương mại cho bộ sưu tập mà không rời bỏ tinh thần sắc lạnh của thương hiệu — sự cân bằng quan trọng.",
        "Đây là lời khuyên đúng đắn cho người lần đầu bước vào thế giới kim cương đen — dễ tiếp cận, nhưng không tầm thường.",
        "Trang hồ sơ định vị Nova Brilliant như một khởi đầu sở hữu xứng tầm — không phải lựa chọn thứ hai.",
      ],
    },
    acquisition: {
      en: ["Available for direct inquiry", "Sizing included", "Lead time: 4–5 weeks"],
      vi: ["Gửi yêu cầu trực tiếp", "Bao gồm chỉnh ni tay", "Thời gian thực hiện: 4–5 tuần"],
    },
  },
  {
    slug: "void-asscher",
    image: piece5,
    imageAlt: {
      en: "Investment-grade Asscher cut black diamond displayed on black velvet with precise geometric facets visible",
      vi: "Kim cương đen giác Asscher cấp đầu tư trưng bày trên nhung đen với các facet hình học chính xác",
    },
    source: {
      label: "Pexels",
      url: "https://www.pexels.com/photo/4937449/",
    },
    name: { en: "Void Asscher", vi: "Void Asscher" },
    line: { en: "Investment-class geometry", vi: "Hình học trường tồn — chuẩn mực đầu tư" },
    summary: {
      en: "A stepped, architectural black diamond concept for collectors who value rarity, scale, and measurable specification. The Asscher geometry transforms the stone into a spatial object — a controlled void in the finest tradition of abstract art.",
      vi: "Ý niệm kim cương đen kiến trúc bậc thang — dành cho nhà sưu tầm đặt ưu tiên vào độ hiếm, quy mô và thông số có thể đo lường. Hình học Asscher biến viên đá thành một vật thể không gian: một khoảng hư không được kiểm soát, theo truyền thống tốt nhất của nghệ thuật trừu tượng.",
    },
    price: { amount: 31000, currency: "USD" },
    priceNote: {
      en: "Custody option and insurance valuation support included.",
      vi: "Bao gồm lựa chọn lưu ký và hỗ trợ định giá bảo hiểm.",
    },
    rarityIndex: 96,
    origin: { en: "Collector-grade black diamond", vi: "Kim cương đen cấp sưu tầm" },
    certificate: {
      authority: "GIA",
      reportNumber: "5181234567",
      reportType: "GIA Diamond Report",
      issueDate: "2024-01-22",
      verifyUrl: "https://www.gia.edu/report-check?reportno=5181234567",
      pdfUrl: "https://www.gia.edu/report-check?reportno=5181234567",
    },
    tags: ["Asscher", "Step Cut", "Investment Class", "Rarity 96/100"],
    specs: {
      carat: "12.70 ct",
      dimensions: "14.0 × 14.0 × 10.2 mm",
      cut: { en: "Asscher-inspired step cut", vi: "Step cut lấy cảm hứng Asscher" },
      setting: { en: "Removable high-jewelry mount", vi: "Ổ trang sức cao cấp có thể tháo chuyển" },
      metal: { en: "Platinum and 18K yellow gold architecture", vi: "Cấu trúc platinum và vàng vàng 18K" },
      origin: { en: "Collector-grade black diamond", vi: "Kim cương đen cấp sưu tầm" },
      certification: "Full gemological report + custody option",
      hardness: "10 (Mohs)",
      luster: { en: "Metallic, mirror-like under directional light", vi: "Ánh kim, gương dưới ánh sáng định hướng" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Rare structural continuity for a deep step cut. The body is stable enough to hold broad parallel facets. No visible structural compromise detected under professional loupe examination.",
      vi: "Độ liên tục cấu trúc hiếm có cho một step cut sâu. Thân đá đủ vững để giữ các mặt cắt song song rộng mà không xảy ra bất ổn. Không phát hiện bất kỳ sự xâm phạm cấu trúc nào dưới kính loupe chuyên nghiệp.",
    },
    lightBehavior: {
      en: "Hypnotic corridor reflections. The stone organizes light into dark geometric chambers rather than sparkle points. It is among the most deliberately architectural light behaviors in the collection.",
      vi: "Phản chiếu kiểu hành lang — thôi miên và trầm sâu. Viên đá tổ chức ánh sáng thành các khoang hình học tối thay vì điểm lấp lánh. Đây là hành vi ánh sáng có chủ ý kiến trúc nhất trong toàn bộ bộ sưu tập.",
    },
    provenance: {
      en: "A candidate for vaulting, exhibition, and formal wear because the mount can be separated from the stone. Full chain-of-custody documentation available.",
      vi: "Ứng viên hoàn hảo cho lưu ký, trưng bày và trang phục trang trọng — ổ có thể tách hoàn toàn khỏi viên đá. Tài liệu chuỗi giám sát đầy đủ sẵn sàng cung cấp.",
    },
    wearability: {
      en: "Best reserved for controlled wear. The piece prioritizes presence and value over casual ergonomics. The removable mount allows the stone to be stored separately when not worn.",
      vi: "Dành cho những khoảnh khắc có chủ ý. Mẫu này ưu tiên sức hiện diện và giá trị trên tất cả — không phải sự tiện dụng hằng ngày. Ổ tháo chuyển cho phép bảo quản đá riêng biệt khi không đeo.",
    },
    care: {
      en: "Handle with gloves during inspection. Recheck removable mount tension after every formal event. Annual professional inspection mandatory for custody documentation.",
      vi: "Chỉ kiểm tra bằng tay có đeo găng. Kiểm tra lại lực siết của ổ tháo chuyển sau mỗi sự kiện trang trọng. Kiểm tra chuyên nghiệp hằng năm là bắt buộc để duy trì hiệu lực hồ sơ lưu ký.",
    },
    investmentNote: {
      en: "Rarity index 96/100. This stone represents one of the highest-tier natural black diamonds in active circulation. Supply at this carat weight and cut quality is measured in single digits globally.",
      vi: "Chỉ số hiếm 96/100. Đây là một trong những kim cương đen tự nhiên đỉnh cấp đang lưu thông trên thị trường. Nguồn cung ở trọng lượng carat và chất lượng cắt này được đếm bằng đơn vị trên toàn cầu — không phải con số thống kê.",
    },
    analysis: {
      en: [
        "Asscher language makes black diamond feel deliberate: measured, structural, and less trend-dependent.",
        "The removable mount creates a bridge between jewelry, private vaulting, and exhibition display.",
        "This is the most investment-coded piece in the catalog and should feel almost institutional on the page.",
      ],
      vi: [
        "Ngôn ngữ Asscher biến kim cương đen thành tuyên bố chủ ý: có thể đo lường, mang tính cấu trúc và vượt ra ngoài mọi xu hướng nhất thời.",
        "Ổ tháo chuyển tạo ra cầu nối độc đáo giữa trang sức đeo, lưu ký bảo mật và hiện vật trưng bày.",
        "Đây là mẫu mang mã đầu tư rõ ràng nhất trong bộ sưu tập — và trang hồ sơ phải toát ra tinh thần của một tài liệu tổ chức.",
      ],
    },
    acquisition: {
      en: ["Custody option available", "Insurance valuation support", "Lead time: by allocation"],
      vi: ["Dịch vụ lưu ký bảo mật sẵn sàng", "Hỗ trợ định giá bảo hiểm đầy đủ", "Thời gian: theo phân bổ riêng"],
    },
  },
  {
    slug: "shadow-marquise",
    image: piece6,
    imageAlt: {
      en: "Marquise cut black diamond ring with elongated blade-like silhouette against dark background",
      vi: "Nhẫn kim cương đen giác marquise với đường bóng dài như lưỡi dao trên nền tối",
    },
    source: {
      label: "Pexels",
      url: "https://www.pexels.com/photo/5370685/",
    },
    name: { en: "Shadow Marquise", vi: "Shadow Marquise" },
    line: { en: "Elongated dark elegance", vi: "Lưỡi bóng tối" },
    summary: {
      en: "A long, blade-like black diamond that creates a severe silhouette and a distinct editorial presence. The marquise returns drama to the collection without abandoning the original black-and-gold discipline.",
      vi: "Kim cương đen dài như lưỡi kiếm, tạo ra đường bóng sắc lạnh và sức hiện diện editorial không thể nhầm lẫn. Marquise đưa kịch tính trở lại bộ sưu tập mà không rời bỏ kỷ luật đen–vàng đặc trưng.",
    },
    price: { amount: 9200, currency: "USD" },
    priceNote: {
      en: "Includes V-prong setting and tip protection.",
      vi: "Bao gồm ổ chấu V và bảo vệ hai đầu mũi.",
    },
    rarityIndex: 86,
    origin: { en: "Natural black diamond", vi: "Kim cương đen tự nhiên" },
    certificate: null,
    tags: ["Marquise", "Brilliant Cut", "Rose Gold", "Editorial"],
    specs: {
      carat: "4.80 ct",
      dimensions: "18.2 × 9.1 × 5.5 mm",
      cut: { en: "Marquise brilliant", vi: "Marquise brilliant" },
      setting: { en: "V-prong minimal mount", vi: "Ổ tối giản chấu V" },
      metal: { en: "18K rose gold", vi: "Vàng hồng 18K" },
      origin: { en: "Natural black diamond", vi: "Kim cương đen tự nhiên" },
      certification: "Gemological memo + setting report",
      hardness: "10 (Mohs)",
      luster: { en: "Sub-adamantine with linear flash", vi: "Cận kim cương với tia tuyến tính" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Tip integrity is the key value driver. This selection avoids visible fractures at both points. The elongated body requires screening across the full keel length.",
      vi: "Độ toàn vẹn hai đầu nhọn là yếu tố định giá then chốt. Tuyển chọn này loại bỏ hoàn toàn các vết nứt nhìn thấy ở cả hai đầu. Thân dài đòi hỏi sàng lọc trên toàn bộ chiều dài sống đá.",
    },
    lightBehavior: {
      en: "Light travels along the long keel line, creating quick linear flashes when the piece moves. Rose gold softens the blackness just enough to make it seductive rather than harsh.",
      vi: "Ánh sáng chạy dọc theo sống dài, tạo ra những tia tuyến tính sắc nét mỗi khi mẫu chuyển động. Vàng hồng làm dịu sắc đen vừa đủ để mẫu trở nên quyến rũ thay vì gắt gỏng.",
    },
    provenance: {
      en: "A fashion-forward stone that still needs serious structural screening before setting. Gemological memo includes full tip analysis.",
      vi: "Một viên đá mang tinh thần high-fashion nhưng không bỏ qua bất kỳ bước kiểm định cấu trúc nào trước khi gắn. Memo ngọc học bao gồm phân tích đầu nhọn đầy đủ.",
    },
    wearability: {
      en: "Elongates the finger but requires protected tip settings for everyday confidence. Best for formal and editorial occasions.",
      vi: "Kéo dài và làm thon ngón tay một cách tự nhiên — nhưng cần ổ bảo vệ hai đầu nhọn để đeo tự tin hơn. Lý tưởng nhất cho các dịp trang trọng và editorial.",
    },
    care: {
      en: "Do not wear during activities that create lateral pressure on the tips. Store in a dedicated slot to prevent tip contact with other objects.",
      vi: "Tuyệt đối không đeo khi thực hiện các hoạt động tạo lực ngang lên hai đầu nhọn. Cất trong ngăn riêng chuyên dụng để tránh va chạm đầu nhọn với các vật xung quanh.",
    },
    investmentNote: {
      en: "Marquise black diamonds with intact tips and clean structural screening are among the harder pieces to source in large-carat categories.",
      vi: "Kim cương đen marquise với hai đầu nhọn nguyên vẹn và sàng lọc cấu trúc sạch thuộc diện khó tìm nguồn nhất trong phân khúc carat lớn — điều này tự nó đã là một lợi thế giá trị.",
    },
    analysis: {
      en: [
        "The marquise returns drama to the catalog without abandoning the original black-and-gold discipline.",
        "Rose gold softens the blackness just enough to make it seductive rather than harsh.",
        "It gives the collection a high-fashion silhouette that the old static grid only hinted at.",
      ],
      vi: [
        "Marquise đưa kịch tính trở lại bộ sưu tập mà không rời bỏ kỷ luật đen–vàng — đường ranh giới mỏng đó mới chính là sức hút.",
        "Vàng hồng làm dịu sắc đen đúng mức để mẫu trở nên quyến rũ thay vì áp đảo — một hiệu chỉnh tinh tế nhưng quyết định.",
        "Đây là đường bóng high-fashion mà catalog gốc chỉ mới gợi ý — và nay được thực hiện đầy đủ.",
      ],
    },
    acquisition: {
      en: ["In-person viewing recommended", "Tip protection included", "Lead time: 8 weeks"],
      vi: ["Khuyến nghị xem trực tiếp tại phòng trưng bày", "Bảo vệ hai đầu nhọn được tích hợp sẵn", "Thời gian thực hiện: 8 tuần"],
    },
  },
  {
    slug: "noir-dome",
    image: piece7,
    imageAlt: {
      en: "Domed 18K yellow gold ring with a polished cabochon black diamond centerpiece",
      vi: "Nhẫn vàng vàng 18K dáng vòm với viên kim cương đen cabochon đánh bóng ở trung tâm",
    },
    source: {
      label: "Wikimedia Commons / W.carter, CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Domed_gold_ring_with_a_black_diamond.jpg",
    },
    name: { en: "Noir Dome", vi: "Noir Dome" },
    line: { en: "Sculptural gold statement", vi: "Điêu khắc vàng ròng" },
    summary: {
      en: "A warmer, sculptural interpretation of black diamond luxury, inspired by object-led jewelry design. The dome profile shifts the conversation from brilliance to mass, touch, and silhouette.",
      vi: "Diễn giải ấm áp và giàu tính điêu khắc về sự xa xỉ kim cương đen — lấy cảm hứng từ thiết kế trang sức như vật thể nghệ thuật. Dáng vòm chuyển trọng tâm từ độ lấp lánh sang khối lượng, xúc giác và đường bóng thuần khiết.",
    },
    price: { amount: 12900, currency: "USD" },
    priceNote: {
      en: "Includes hand engraving option and made-to-measure service.",
      vi: "Bao gồm tùy chọn khắc tay và dịch vụ làm theo ni.",
    },
    rarityIndex: 76,
    origin: { en: "Curated natural black diamond", vi: "Kim cương đen tự nhiên tuyển chọn" },
    certificate: null,
    tags: ["Cabochon", "Yellow Gold", "Sculptural", "Signet-inspired"],
    specs: {
      carat: "3.80 ct",
      dimensions: "10.2 × 10.2 × 7.4 mm (domed)",
      cut: { en: "Cabochon-polished black diamond", vi: "Kim cương đen đánh bóng cabochon" },
      setting: { en: "Domed signet-inspired mount", vi: "Ổ vòm lấy cảm hứng từ signet ring" },
      metal: { en: "18K yellow gold", vi: "Vàng vàng 18K" },
      origin: { en: "Curated natural black diamond", vi: "Kim cương đen tự nhiên tuyển chọn" },
      certification: "Origin memo + studio certificate",
      hardness: "10 (Mohs)",
      luster: { en: "Continuous sub-metallic luster", vi: "Ánh kim liên tục cận ánh kim" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Uniform surface tone and a smooth dome profile, selected for tactile presence rather than facet performance. The cabochon format tolerates natural porosity without visual compromise.",
      vi: "Tông bề mặt đồng đều và dáng vòm thuần khiết — được chọn vì sức hiện diện xúc giác chứ không phải hiệu suất facet. Định dạng cabochon dung nạp độ xốp tự nhiên mà không làm tổn hại thẩm mỹ.",
    },
    lightBehavior: {
      en: "Continuous luster with no aggressive flash. It behaves more like a polished black artifact than a conventional diamond. The dome amplifies ambient light into a single, sustained glow.",
      vi: "Ánh bóng liên tục, không chớp sắc. Viên đá vận hành như một hiện vật đen được đánh bóng hơn là kim cương thông thường — điềm tĩnh và tự tin. Dáng vòm khuếch đại ánh sáng xung quanh thành một vầng sáng đơn nhất, bền vững.",
    },
    provenance: {
      en: "A strong reference for clients who want black diamond jewelry to feel warmer and more sculptural. Made-to-measure with optional hand engraving on the inner band.",
      vi: "Tham chiếu xuất sắc cho những khách hàng muốn trang sức kim cương đen toát ra hơi ấm và tính điêu khắc rõ nét. Làm theo số đo riêng với tùy chọn khắc tay trên mặt trong vành.",
    },
    wearability: {
      en: "Comfortable for formal daily wear because the dome has no exposed corners. The polished surface resists minor surface abrasion better than faceted stones.",
      vi: "Thoải mái cho đeo trang trọng hằng ngày nhờ dáng vòm không có góc nhọn lộ ra. Bề mặt cabochon kháng xước nhẹ tốt hơn đá facet — một lợi thế thực tế đáng kể.",
    },
    care: {
      en: "Polish cloth only. Avoid abrasive compounds on the gold dome. The smooth surface shows fingerprints more than faceted stones — a quick cloth maintains its appearance.",
      vi: "Chỉ dùng khăn đánh bóng chuyên dụng. Tuyệt đối tránh hợp chất mài mòn trên phần vòm vàng. Bề mặt mượt phản ánh dấu tay rõ hơn đá facet — một lần lau nhanh là đủ để khôi phục vẻ ngoài hoàn hảo.",
    },
    investmentNote: {
      en: "The sculptural format appeals to a distinct collector demographic — those who view jewelry as wearable art objects rather than asset vehicles.",
      vi: "Định dạng điêu khắc thu hút một nhóm nhà sưu tầm riêng biệt và ngày càng tăng — những người nhìn nhận trang sức như vật thể nghệ thuật có thể đeo được, không phải đơn thuần là phương tiện tài sản.",
    },
    analysis: {
      en: [
        "The dome profile shifts the conversation from brilliance to mass, touch, and silhouette.",
        "Yellow gold adds warmth and makes the black center feel ceremonial rather than purely severe.",
        "It diversifies the collection so the catalog does not become only sharp, faceted stones.",
      ],
      vi: [
        "Dáng vòm dịch chuyển câu chuyện từ độ sáng sang khối lượng, xúc giác và đường bóng — một chiều kích thường bị bỏ qua trong trang sức kim cương.",
        "Vàng vàng mang lại hơi ấm cần thiết, khiến viên đá trung tâm mang sắc thái nghi lễ thay vì chỉ lạnh lùng và nghiêm khắc.",
        "Mẫu này tạo ra chiều sâu cho bộ sưu tập — tránh để catalog trở thành một danh sách đá facet thuần túy.",
      ],
    },
    acquisition: {
      en: ["Made to measure", "Optional hand engraving", "Lead time: 8–10 weeks"],
      vi: ["Gia công theo số đo riêng", "Khắc tay tùy chọn trên vành trong", "Thời gian thực hiện: 8–10 tuần"],
    },
  },
  {
    slug: "eclipse-pair",
    image: piece8,
    imageAlt: {
      en: "Two matching diamond rings held with black leather gloves — ceremonial engagement set with black diamonds",
      vi: "Hai chiếc nhẫn đôi được giữ bằng găng tay da đen — bộ nhẫn đính hôn nghi lễ với kim cương đen",
    },
    source: {
      label: "Pexels / The Glorious Studio",
      url: "https://www.pexels.com/photo/16156894/",
    },
    name: { en: "Eclipse Pair", vi: "Eclipse Pair" },
    line: { en: "Ceremonial bridal set", vi: "Thề nguyện trên bóng tối" },
    summary: {
      en: "A matched engagement and commitment set designed for contrast: matte black presence against precise white-metal light. The pair format adds an emotional entry point to a collection that could otherwise feel too institutional.",
      vi: "Bộ nhẫn đính hôn và cam kết được thiết kế theo tương phản hoàn hảo: sắc đen lì có sức nặng đặt cạnh ánh kim trắng tinh xác. Định dạng đôi nhẫn mở ra lối vào cảm xúc cho một bộ sưu tập vốn toát ra vẻ nghiêm cẩn.",
    },
    price: { amount: 24200, currency: "USD" },
    priceNote: {
      en: "Includes private bridal consultation and custom sizing.",
      vi: "Bao gồm tư vấn cưới riêng và chỉnh ni riêng.",
    },
    rarityIndex: 90,
    origin: { en: "Mixed natural black diamond suite", vi: "Bộ kim cương đen tự nhiên phối tuyển" },
    certificate: {
      authority: "GIA",
      reportNumber: "7301928456",
      reportType: "GIA Diamond Dossier",
      issueDate: "2023-06-30",
      verifyUrl: "https://www.gia.edu/report-check?reportno=7301928456",
      pdfUrl: "https://www.gia.edu/report-check?reportno=7301928456",
    },
    tags: ["Bridal Set", "Cushion", "Halo", "GIA Certified", "Platinum"],
    specs: {
      carat: "10.20 ct total",
      dimensions: "13.2 × 12.5 mm center stone",
      cut: { en: "Cushion center with melee halo", vi: "Viên cushion trung tâm kèm halo melee" },
      setting: { en: "Two-ring ceremonial stack", vi: "Bộ hai nhẫn xếp lớp nghi lễ" },
      metal: { en: "Platinum with blackened under-gallery", vi: "Platinum với gầm ổ phủ đen" },
      origin: { en: "Mixed natural black diamond suite", vi: "Bộ kim cương đen tự nhiên phối tuyển" },
      certification: "GIA center stone + parcel report",
      hardness: "10 (Mohs)",
      luster: { en: "Matte black center with white-metal perimeter", vi: "Trung tâm đen lì với viền ánh kim trắng" },
      treatment: { en: "None — natural color", vi: "Không xử lý — màu tự nhiên" },
    },
    inclusionProfile: {
      en: "Tone-matched black diamond suite. The center stone is screened for surface stability before halo alignment. Melee stones are selected for consistent opacity.",
      vi: "Bộ kim cương đen được phối tông chặt chẽ. Viên trung tâm được kiểm định ổn định bề mặt trước khi căn chỉnh halo. Mỗi viên melee được tuyển chọn riêng để đảm bảo độ đục đồng nhất.",
    },
    lightBehavior: {
      en: "The center absorbs light while the surrounding stones create a controlled white-metal perimeter. The contrast between the black void and the platinum band produces the set's signature visual tension.",
      vi: "Viên trung tâm hấp thụ ánh sáng trong khi các viên bao quanh kiến tạo viền ánh kim trắng tinh xác. Sự tương phản giữa khoảng tối trung tâm và vành platinum tạo ra căng thẳng thị giác là linh hồn của bộ.",
    },
    provenance: {
      en: "Designed for clients who want emotional symbolism without losing the BlackDiamond asset language. Each ring comes with a private certificate of commitment.",
      vi: "Dành cho những người tìm kiếm biểu tượng cảm xúc mà không đánh mất ngôn ngữ tài sản của BlackDiamond. Mỗi nhẫn đi kèm chứng chỉ cam kết riêng biệt.",
    },
    wearability: {
      en: "Stackable, ceremonial, and suitable for milestone use rather than rough daily wear. The blackened under-gallery maintains visual grounding from all angles.",
      vi: "Có thể xếp lớp, mang đậm tính nghi lễ và phù hợp nhất với những cột mốc quan trọng. Gầm ổ phủ đen duy trì nền thị giác vững chắc từ mọi góc nhìn.",
    },
    care: {
      en: "Clean around the halo with a soft brush to prevent residue from dulling contrast. Inspect halo prongs every six months.",
      vi: "Làm sạch khu vực halo bằng bàn chải lông mềm để tránh cặn làm mờ độ tương phản. Kiểm tra chấu halo định kỳ sáu tháng — điều quan trọng với cấu trúc hai nhẫn xếp lớp.",
    },
    investmentNote: {
      en: "The bridal format carries strong emotional premium, making it one of the most stable resale categories in certified black diamond jewelry.",
      vi: "Định dạng bridal mang phần bù cảm xúc mạnh mẽ, khiến đây trở thành một trong những danh mục ổn định nhất trong thị trường trang sức kim cương đen có chứng nhận.",
    },
    analysis: {
      en: [
        "The pair format adds an emotional entry point to a collection that could otherwise feel too institutional.",
        "Blackened under-gallery detail keeps the stone visually grounded from side angles.",
        "This is the best bridge between luxury bridal and the site's investment-grade tone.",
      ],
      vi: [
        "Định dạng đôi nhẫn tạo ra lối vào cảm xúc mà bộ sưu tập cần — không để nó chỉ toát ra vẻ nghiêm cẩn của hồ sơ đầu tư.",
        "Chi tiết gầm ổ phủ đen giữ cho viên đá có nền thị giác vững chắc từ mọi góc cạnh — một chi tiết kỹ thuật tinh tế nhưng có tầm nhìn.",
        "Đây là cầu nối xuất sắc nhất giữa bridal xa xỉ và tông sắc chuẩn đầu tư của thương hiệu.",
      ],
    },
    acquisition: {
      en: ["Private bridal consultation", "Custom sizing included", "Lead time: 10–12 weeks"],
      vi: ["Tư vấn cưới riêng tư, kín đáo", "Chỉnh ni đôi nhẫn theo yêu cầu", "Thời gian thực hiện: 10–12 tuần"],
    },
  },
];

export function getCollectionPiece(slug: string) {
  return collectionPieces.find((piece) => piece.slug === slug);
}
