import type { Locale } from "@/i18n/routing";

/**
 * Public BlogPost shape used by components & schema.
 * `body` is rich-text content (sanitized HTML) per locale, as authored via
 * the admin's WYSIWYG editor and stored in Supabase — e.g. `{ vi: "<p>…</p>" }`.
 */
export type BlogPost = {
  slug: string;
  category: Record<Locale, string>;
  date: string; // ISO date string
  readMinutes: number;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
  coverImage?: string | null;
  tags: string[];
};

/**
 * Legacy structured-body shape (heading + paragraphs blocks) used only as the
 * one-off seed source for migrating existing posts into Supabase. The
 * migration script converts each block list into an HTML string before
 * inserting into the `blog_posts.body` JSONB column.
 */
type LegacyBodyBlock = { heading?: string; paragraphs: string[] };
type LegacySeedBlogPost = Omit<BlogPost, "body"> & {
  body: Record<Locale, LegacyBodyBlock[]>;
};

export const legacySeedBlogPosts: LegacySeedBlogPost[] = [
  {
    slug: "cosmic-origin-theory-black-diamonds",
    category: { en: "Science", vi: "Khoa học" },
    date: "2024-11-20",
    readMinutes: 8,
    title: {
      en: "The Cosmic Origin Theory: Why Black Diamonds May Be Older Than Earth",
      vi: "Lý Thuyết Nguồn Gốc Vũ Trụ: Tại Sao Kim Cương Đen Có Thể Già Hơn Trái Đất",
    },
    excerpt: {
      en: "Unlike any other diamond on Earth, black diamonds are never found near kimberlite pipes. This single fact has driven scientists toward a radical hypothesis: these stones arrived from outer space.",
      vi: "Khác với mọi loại kim cương trên Trái Đất, kim cương đen không bao giờ xuất hiện gần ống kimberlite. Sự thật này đã thúc đẩy các nhà khoa học đến một giả thuyết táo bạo: những viên đá này đến từ ngoài vũ trụ.",
    },
    body: {
      en: [
        {
          heading: "The Problem with Kimberlite",
          paragraphs: [
            "Every colorless diamond ever mined has been found in or near a kimberlite pipe — a volcanic formation that carries material from deep in the Earth's mantle to the surface. It is, effectively, the delivery system for traditional diamonds.",
            "Black diamonds, or carbonado, follow none of these rules. They are found exclusively in Brazil and the Central African Republic, in alluvial deposits — loose sediment carried by ancient rivers — with no kimberlite association whatsoever. This geographic anomaly is the starting point for the cosmic origin theory.",
          ],
        },
        {
          heading: "Evidence from Spectroscopy",
          paragraphs: [
            "In 2006, researchers publishing in Astrophysical Journal Letters presented infrared spectroscopy data showing that carbonado contains hydrogen-carbon bonds similar to those found in interstellar diamond dust. The same signature appears in material analyzed from presolar grains — particles that pre-date our solar system.",
            "Further analysis identified polycyclic aromatic hydrocarbons (PAHs) within black diamonds. These compounds are abundant in space but rare in Earth's geological record, adding another data point to the extraterrestrial hypothesis.",
          ],
        },
        {
          heading: "What This Means for Collectors",
          paragraphs: [
            "If the cosmic theory is correct, a natural black diamond is not simply a rare gemstone — it is a piece of presolar material that survived a journey of billions of years and a violent planetary impact. This provenance narrative is unlike anything available in the world of colored stones.",
            "From a collector's perspective, the origin story adds a layer of meaning that transcends market value. Each carbonado specimen is, in a literal sense, older than the planet it rests on.",
          ],
        },
      ],
      vi: [
        {
          heading: "Vấn đề với Kimberlite",
          paragraphs: [
            "Mọi viên kim cương không màu từng được khai thác đều được tìm thấy trong hoặc gần ống kimberlite — một cấu trúc núi lửa mang vật liệu từ sâu trong lớp phủ Trái Đất lên bề mặt. Đây là hệ thống phân phối của kim cương truyền thống.",
            "Kim cương đen, hay carbonado, không tuân theo bất kỳ quy tắc nào trong số này. Chúng chỉ được tìm thấy tại Brazil và Cộng hòa Trung Phi, trong các mỏ phù sa — trầm tích được vận chuyển bởi các con sông cổ — hoàn toàn không liên quan đến kimberlite. Bất thường địa lý này là điểm khởi đầu cho lý thuyết nguồn gốc vũ trụ.",
          ],
        },
        {
          heading: "Bằng Chứng từ Quang Phổ",
          paragraphs: [
            "Năm 2006, các nhà nghiên cứu công bố trên Astrophysical Journal Letters dữ liệu quang phổ hồng ngoại cho thấy carbonado chứa các liên kết hydro-carbon tương tự như những gì tìm thấy trong bụi kim cương liên sao. Cùng dấu hiệu xuất hiện trong vật liệu từ các hạt tiền mặt trời — các hạt có trước hệ mặt trời của chúng ta.",
            "Phân tích thêm còn xác định các hydrocarbon thơm đa vòng (PAH) bên trong kim cương đen. Những hợp chất này phổ biến trong vũ trụ nhưng hiếm gặp trong hồ sơ địa chất của Trái Đất, bổ sung thêm bằng chứng cho giả thuyết ngoài Trái Đất.",
          ],
        },
        {
          heading: "Ý Nghĩa với Nhà Sưu Tầm",
          paragraphs: [
            "Nếu lý thuyết vũ trụ là đúng, một viên kim cương đen tự nhiên không chỉ là một viên đá quý hiếm — đó là một mảnh vật liệu tiền mặt trời đã sống sót qua cuộc hành trình hàng tỷ năm và một vụ va chạm hành tinh dữ dội. Câu chuyện xuất xứ này không giống bất cứ thứ gì có sẵn trong thế giới đá màu.",
            "Từ góc nhìn của nhà sưu tầm, câu chuyện nguồn gốc bổ sung thêm một tầng ý nghĩa vượt qua giá trị thị trường. Mỗi mẫu carbonado, theo nghĩa đen, cổ hơn chính hành tinh mà nó đang nằm trên.",
          ],
        },
      ],
    },
    tags: ["Origins", "Carbonado", "Science", "Cosmic Theory"],
  },
  {
    slug: "how-to-evaluate-black-diamond",
    category: { en: "Guide", vi: "Hướng dẫn" },
    date: "2024-10-15",
    readMinutes: 12,
    title: {
      en: "Collector's Guide: How to Evaluate a Natural Black Diamond",
      vi: "Hướng Dẫn Nhà Sưu Tầm: Cách Thẩm Định Kim Cương Đen Tự Nhiên",
    },
    excerpt: {
      en: "The 4Cs framework that governs colorless diamonds is largely irrelevant for black diamonds. Here is the framework that actually matters — and what separates a collector-grade stone from the ordinary.",
      vi: "Khung tiêu chí 4C dùng cho kim cương không màu hầu như không áp dụng được cho kim cương đen. Đây là khung đánh giá thực sự quan trọng — và điều gì phân biệt đá đạt chuẩn sưu tầm với loại bình thường.",
    },
    body: {
      en: [
        {
          heading: "Why the 4Cs Do Not Apply",
          paragraphs: [
            "Color, clarity, cut, and carat — the four criteria used to grade colorless diamonds — were developed to measure brilliance and light performance. A black diamond, being completely opaque, has no light performance to speak of. Applying the 4Cs to carbonado is like evaluating a piece of architecture using a recipe for soufflé.",
            "The professional evaluation of a natural black diamond centers on five distinct criteria: surface luster, inclusion density, structural integrity, surface character, and provenance documentation.",
          ],
        },
        {
          heading: "Surface Luster: The Primary Indicator",
          paragraphs: [
            "Luster is the most immediately visible quality marker in a black diamond. It exists on a spectrum from matte (dull, chalky) to sub-adamantine (a soft glow) to metallic (a mirror-like reflectivity). Metallic luster is the rarest and most desirable, commanding a significant premium in collector markets.",
            "When viewing a stone, hold it under a focused light source and observe how the surface responds. A collector-grade stone will show distinct, clean reflections. A lower-quality stone will scatter light diffusely with no defined reflection point.",
          ],
        },
        {
          heading: "Structural Integrity and Inclusion Density",
          paragraphs: [
            "Unlike single-crystal diamonds, carbonado is polycrystalline — it consists of millions of tiny diamond crystals bound together by graphite, hematite, and other mineral inclusions. This structure makes assessment under magnification essential.",
            "Under 10× magnification, a collector examines the grain boundary stability (are the crystal boundaries visible and clean, or are they separating?), and the inclusion distribution (are graphite and hematite evenly spread, or concentrated in patches that create visual inconsistency?).",
          ],
        },
        {
          heading: "What Documentation Should Accompany a Purchase",
          paragraphs: [
            "A legitimate natural black diamond should come with a grading report from GIA or IGI, a provenance record indicating its country of origin (Brazil or Central African Republic), and — for collector-grade stones — a curatorial analysis describing the specific characteristics of that individual specimen.",
            "Be cautious of treated black diamonds, which are colorless or near-colorless stones that have been irradiated or heat-treated to achieve a black color. These stones are significantly less valuable and should be disclosed explicitly in any reputable sale documentation.",
          ],
        },
      ],
      vi: [
        {
          heading: "Tại Sao 4C Không Áp Dụng Được",
          paragraphs: [
            "Màu sắc, độ tinh khiết, giác cắt và carat — bốn tiêu chí dùng để phân loại kim cương không màu — được phát triển để đo độ sáng và hiệu suất ánh sáng. Kim cương đen, hoàn toàn đục, không có hiệu suất ánh sáng để nói đến. Áp dụng 4C vào carbonado giống như đánh giá một công trình kiến trúc bằng công thức làm bánh.",
            "Việc đánh giá chuyên nghiệp một viên kim cương đen tự nhiên tập trung vào năm tiêu chí riêng biệt: ánh bóng bề mặt, mật độ bao thể, tính toàn vẹn cấu trúc, đặc tính bề mặt và tài liệu nguồn gốc.",
          ],
        },
        {
          heading: "Ánh Bóng Bề Mặt: Chỉ Số Hàng Đầu",
          paragraphs: [
            "Ánh bóng là tiêu chí chất lượng dễ nhận thấy nhất của kim cương đen. Nó tồn tại trên một phổ từ matte (mờ đục, phấn) đến cận kim cương (ánh sáng mềm) đến ánh kim (phản xạ như gương). Ánh kim là hiếm nhất và được ưa chuộng nhất, đạt mức giá cao đáng kể trên thị trường sưu tầm.",
            "Khi xem xét một viên đá, hãy giữ nó dưới nguồn sáng tập trung và quan sát cách bề mặt phản ứng. Đá đạt chuẩn sưu tầm sẽ thể hiện các phản xạ rõ ràng. Đá chất lượng thấp hơn sẽ tán xạ ánh sáng khuếch tán mà không có điểm phản xạ xác định.",
          ],
        },
        {
          heading: "Tính Toàn Vẹn Cấu Trúc và Mật Độ Bao Thể",
          paragraphs: [
            "Khác với kim cương đơn tinh thể, carbonado là đa tinh thể — bao gồm hàng triệu tinh thể kim cương nhỏ được gắn kết bởi graphite, hematite và các bao thể khoáng vật khác. Cấu trúc này khiến việc kiểm tra dưới kính phóng đại trở nên cần thiết.",
            "Dưới kính 10×, nhà sưu tầm kiểm tra độ ổn định ranh giới hạt (ranh giới tinh thể có rõ ràng và sạch không, hay đang tách ra?) và phân bố bao thể (graphite và hematite có phân bố đều không, hay tập trung thành từng mảng tạo ra sự không nhất quán thị giác?).",
          ],
        },
        {
          heading: "Tài Liệu Cần Có Khi Mua",
          paragraphs: [
            "Một viên kim cương đen tự nhiên hợp lệ phải đi kèm báo cáo phân loại từ GIA hoặc IGI, hồ sơ nguồn gốc ghi rõ quốc gia khai thác (Brazil hoặc Cộng hòa Trung Phi), và — với đá đạt chuẩn sưu tầm — phân tích giám tuyển mô tả đặc điểm riêng của mẫu vật đó.",
            "Cần thận trọng với kim cương đen đã xử lý, là những viên không màu hoặc gần không màu được chiếu xạ hoặc xử lý nhiệt để đạt màu đen. Những viên đá này có giá trị thấp hơn đáng kể và phải được công bố rõ ràng trong bất kỳ tài liệu bán hàng uy tín nào.",
          ],
        },
      ],
    },
    tags: ["Guide", "Grading", "Collecting", "Luster", "GIA"],
  },
  {
    slug: "gia-certification-black-diamonds",
    category: { en: "Certification", vi: "Chứng nhận" },
    date: "2024-09-08",
    readMinutes: 6,
    title: {
      en: "GIA Certification for Black Diamonds: What the Report Actually Tells You",
      vi: "Chứng Nhận GIA Cho Kim Cương Đen: Báo Cáo Thực Sự Cho Bạn Biết Điều Gì",
    },
    excerpt: {
      en: "A GIA report for a black diamond looks quite different from one issued for a colorless stone. Understanding what it covers — and what it deliberately omits — is essential for any serious buyer.",
      vi: "Báo cáo GIA cho kim cương đen trông khá khác so với loại dành cho đá không màu. Hiểu được nội dung của nó — và những gì nó cố ý bỏ qua — là điều cần thiết cho bất kỳ người mua nghiêm túc nào.",
    },
    body: {
      en: [
        {
          heading: "The GIA Colored Diamond Identification and Origin Report",
          paragraphs: [
            "For natural black diamonds, GIA issues a Colored Diamond Identification and Origin Report rather than the standard Diamond Grading Report used for colorless stones. This distinction matters enormously — it reflects the fact that the evaluation criteria are fundamentally different.",
            "The report confirms the stone's identity as a natural diamond, establishes that the color is natural (not treated), and notes the color description as 'Fancy Black.' It also includes carat weight, measurements, and shape. It does not grade cut quality, clarity, or color intensity on the standard GIA scale.",
          ],
        },
        {
          heading: "What 'Natural Color' Means in Practice",
          paragraphs: [
            "The most critical designation on a GIA report for a black diamond is the confirmation of natural color. Treated black diamonds — those irradiated or heated to induce the black color — are significantly less valuable and should not be sold at collector prices.",
            "GIA uses spectroscopic testing and microscopic examination to distinguish natural from treated color. A stone confirmed as 'natural color' by GIA carries a scientific validation of its authenticity that no verbal assurance can replace.",
          ],
        },
        {
          heading: "How to Verify a GIA Report",
          paragraphs: [
            "Every GIA report includes a unique report number. This number can be entered into GIA's Report Check tool at gia.edu/report-check to verify the report's authenticity and view a digital version of the original document.",
            "If a seller cannot provide a verifiable GIA report number, or if the report check returns no result, treat the documentation with significant skepticism. Legitimate natural black diamonds of collector grade will always be accompanied by verifiable third-party certification.",
          ],
        },
      ],
      vi: [
        {
          heading: "Báo Cáo Nhận Dạng và Nguồn Gốc Kim Cương Màu GIA",
          paragraphs: [
            "Đối với kim cương đen tự nhiên, GIA cấp Báo cáo Nhận dạng và Nguồn gốc Kim cương Màu thay vì Báo cáo Phân loại Kim cương tiêu chuẩn dùng cho đá không màu. Sự phân biệt này rất quan trọng — nó phản ánh thực tế rằng các tiêu chí đánh giá hoàn toàn khác nhau.",
            "Báo cáo xác nhận danh tính của viên đá là kim cương tự nhiên, xác lập rằng màu sắc là tự nhiên (không được xử lý), và ghi chú mô tả màu là 'Fancy Black'. Nó cũng bao gồm trọng lượng carat, kích thước và hình dạng. Nó không đánh giá chất lượng giác cắt, độ tinh khiết hay cường độ màu theo thang GIA tiêu chuẩn.",
          ],
        },
        {
          heading: "Ý Nghĩa Thực Tế của 'Màu Tự Nhiên'",
          paragraphs: [
            "Chỉ định quan trọng nhất trên báo cáo GIA cho kim cương đen là xác nhận màu tự nhiên. Kim cương đen đã qua xử lý — loại được chiếu xạ hoặc nung nóng để tạo màu đen — có giá trị thấp hơn đáng kể và không nên được bán theo giá sưu tầm.",
            "GIA sử dụng kiểm tra quang phổ và kiểm tra hiển vi để phân biệt màu tự nhiên và màu đã xử lý. Một viên đá được GIA xác nhận là 'màu tự nhiên' mang theo xác nhận khoa học về tính xác thực mà không có đảm bảo bằng lời nào có thể thay thế.",
          ],
        },
        {
          heading: "Cách Xác Minh Báo Cáo GIA",
          paragraphs: [
            "Mỗi báo cáo GIA bao gồm một số báo cáo duy nhất. Số này có thể được nhập vào công cụ Report Check của GIA tại gia.edu/report-check để xác minh tính xác thực của báo cáo và xem phiên bản kỹ thuật số của tài liệu gốc.",
            "Nếu người bán không thể cung cấp số báo cáo GIA có thể xác minh, hoặc nếu kiểm tra báo cáo không trả về kết quả, hãy hoài nghi đáng kể với tài liệu đó. Kim cương đen tự nhiên đạt chuẩn sưu tầm luôn đi kèm chứng nhận bên thứ ba có thể xác minh.",
          ],
        },
      ],
    },
    tags: ["GIA", "Certification", "Authentication", "Guide"],
  },
  {
    slug: "black-diamond-market-analysis",
    category: { en: "Market", vi: "Thị trường" },
    date: "2024-08-22",
    readMinutes: 10,
    title: {
      en: "Black Diamonds in Alternative Asset Portfolios: What the Market Shows",
      vi: "Kim Cương Đen Trong Danh Mục Tài Sản Thay Thế: Thị Trường Cho Thấy Điều Gì",
    },
    excerpt: {
      en: "As traditional equity markets face increasing volatility, collectors and family offices are revisiting physical gemstones as a store of value. Black diamonds occupy a specific — and defensible — position in this conversation.",
      vi: "Khi thị trường cổ phiếu truyền thống đối mặt với biến động ngày càng tăng, các nhà sưu tầm và family office đang xem xét lại đá quý vật lý như một kho lưu giữ giá trị. Kim cương đen chiếm một vị trí cụ thể — và có thể bảo vệ được — trong cuộc thảo luận này.",
    },
    body: {
      en: [
        {
          heading: "The Supply Constraint is Real",
          paragraphs: [
            "Natural black diamonds are found in exactly two regions of the world: Brazil (primarily the state of Bahia) and the Central African Republic. Unlike most colored gemstones, no new significant deposits have been discovered in decades. The supply is not only limited — it is contracting as existing alluvial sources are gradually exhausted.",
            "This supply profile is distinct from even other rare gemstones, where new deposits are occasionally found. The finite and declining supply of collector-grade carbonado creates a structural scarcity that is independent of market sentiment.",
          ],
        },
        {
          heading: "Uncorrelated to Equity Performance",
          paragraphs: [
            "Physical gemstones, including black diamonds, have historically shown low correlation to equity market performance. During the 2020 market disruption, while equity indices dropped sharply, prices for certified, collector-grade black diamonds remained stable. During periods of high inflation, physical assets with inherent scarcity have tended to retain or increase purchasing power.",
            "This uncorrelated behavior is the primary argument for gemstones in a diversified portfolio — not as a primary growth vehicle, but as a hedge and a store of value in a tangible, portable, and internationally liquid asset class.",
          ],
        },
        {
          heading: "Due Diligence Before Any Acquisition",
          paragraphs: [
            "The gemstone market, unlike regulated financial markets, has limited standardization in pricing and significant variability in quality. Due diligence for any black diamond acquisition should include: independent GIA or IGI certification, a documented provenance chain, an independent appraisal, and clear ownership documentation.",
            "Collectors who treat black diamond acquisition with the same rigor as a direct investment — verifying documentation, engaging independent valuers, and maintaining proper insurance — are in the best position to realize the long-term value of these assets.",
          ],
        },
      ],
      vi: [
        {
          heading: "Hạn Chế Nguồn Cung là Thực Tế",
          paragraphs: [
            "Kim cương đen tự nhiên chỉ được tìm thấy tại đúng hai vùng trên thế giới: Brazil (chủ yếu là bang Bahia) và Cộng hòa Trung Phi. Khác với hầu hết đá quý màu, không có mỏ đáng kể nào được phát hiện trong nhiều thập kỷ. Nguồn cung không chỉ bị giới hạn — nó đang thu hẹp khi các nguồn phù sa hiện có dần cạn kiệt.",
            "Hồ sơ nguồn cung này khác biệt với ngay cả các đá quý hiếm khác, nơi mỏ mới đôi khi được tìm thấy. Sự khan hiếm có tính cấu trúc của carbonado đạt chuẩn sưu tầm độc lập với tâm lý thị trường.",
          ],
        },
        {
          heading: "Không Tương Quan với Hiệu Suất Cổ Phiếu",
          paragraphs: [
            "Đá quý vật lý, bao gồm kim cương đen, trong lịch sử cho thấy mức tương quan thấp với hiệu suất thị trường cổ phiếu. Trong giai đoạn gián đoạn thị trường 2020, khi các chỉ số cổ phiếu giảm mạnh, giá kim cương đen đạt chuẩn sưu tầm được chứng nhận vẫn ổn định. Trong các giai đoạn lạm phát cao, tài sản vật lý có sự khan hiếm vốn có có xu hướng duy trì hoặc tăng sức mua.",
            "Hành vi không tương quan này là lập luận chính cho đá quý trong danh mục đa dạng hóa — không phải như phương tiện tăng trưởng chính, mà là hàng rào và kho lưu giữ giá trị trong một lớp tài sản hữu hình, di động và có tính thanh khoản quốc tế.",
          ],
        },
        {
          heading: "Thẩm Định Trước Bất Kỳ Giao Dịch Nào",
          paragraphs: [
            "Thị trường đá quý, khác với thị trường tài chính được quản lý, có tiêu chuẩn hóa giá hạn chế và biến động chất lượng đáng kể. Thẩm định cho bất kỳ giao dịch kim cương đen nào phải bao gồm: chứng nhận GIA hoặc IGI độc lập, chuỗi nguồn gốc được ghi lại, định giá độc lập và tài liệu sở hữu rõ ràng.",
            "Các nhà sưu tầm đối xử với việc mua kim cương đen với cùng sự chặt chẽ như đầu tư trực tiếp — xác minh tài liệu, thuê người định giá độc lập và duy trì bảo hiểm thích hợp — ở vị trí tốt nhất để nhận ra giá trị dài hạn của những tài sản này.",
          ],
        },
      ],
    },
    tags: ["Investment", "Market", "Portfolio", "Alternative Assets"],
  },
  {
    slug: "famous-black-diamonds-history",
    category: { en: "History", vi: "Lịch sử" },
    date: "2024-07-10",
    readMinutes: 7,
    title: {
      en: "The Most Famous Black Diamonds in History",
      vi: "Những Viên Kim Cương Đen Nổi Tiếng Nhất Trong Lịch Sử",
    },
    excerpt: {
      en: "From the cursed Black Orlov to the Amsterdam Diamond, a handful of black diamonds have shaped public perception of these stones — and left a trail of remarkable stories across centuries.",
      vi: "Từ viên Black Orlov mang lời nguyền đến Amsterdam Diamond, một số ít kim cương đen đã định hình nhận thức của công chúng về những viên đá này — và để lại những câu chuyện đáng chú ý qua nhiều thế kỷ.",
    },
    body: {
      en: [
        {
          heading: "The Black Orlov (67.50 carats)",
          paragraphs: [
            "Perhaps the most famous black diamond in the world, the Black Orlov — also known as the Eye of Brahma — is a 67.50-carat cushion-cut stone with a history stretching back to 19th-century India. According to legend, it was stolen from a statue of the Hindu god Brahma, earning a reputation as cursed.",
            "The stone passed through several owners in the 20th century, some of whom died under mysterious circumstances, which only deepened the legend. It was eventually re-cut from its original 195-carat rough to break the supposed curse, and today resides in private hands, having last appeared at auction in the early 2000s.",
          ],
        },
        {
          heading: "The Amsterdam Diamond (33.74 carats)",
          paragraphs: [
            "The Amsterdam Diamond is a pear-shaped natural black diamond weighing 33.74 carats, named after the city where it was first publicly exhibited. It is considered one of the most significant examples of a natural black diamond in a jewelry setting — a pear-cut form that showcases the stone's distinctive metallic luster.",
            "Unlike many historic black diamonds whose provenance involves unverified legend, the Amsterdam Diamond has a documented exhibition history and represents a benchmark in the presentation of black diamonds as serious, high-value gemstones.",
          ],
        },
        {
          heading: "The Spirit of de Grisogono (312.24 carats)",
          paragraphs: [
            "The Spirit of de Grisogono is, by weight, the largest cut black diamond in the world at 312.24 carats. It was found in West Africa and cut by the Swiss jeweler de Grisogono, who set it in a white gold ring surrounded by 702 white diamonds.",
            "The stone's scale — greater than many of the world's most famous colorless diamonds by multiple factors — illustrates one of the key characteristics of natural black diamonds: they are found at carat weights that would be extraordinary, even impossible, for other fancy colors.",
          ],
        },
      ],
      vi: [
        {
          heading: "Black Orlov (67,50 carat)",
          paragraphs: [
            "Có lẽ là viên kim cương đen nổi tiếng nhất thế giới, Black Orlov — còn được gọi là Mắt của Brahma — là viên đá 67,50 carat giác cushion với lịch sử kéo dài từ Ấn Độ thế kỷ 19. Theo truyền thuyết, nó bị đánh cắp từ tượng thần Hindu Brahma, tạo nên danh tiếng bị nguyền rủa.",
            "Viên đá trải qua nhiều chủ sở hữu trong thế kỷ 20, một số trong họ chết trong hoàn cảnh bí ẩn, điều này chỉ khiến truyền thuyết thêm sâu sắc. Cuối cùng nó được giác cắt lại từ viên thô 195 carat ban đầu để phá lời nguyền được cho là có thật, và ngày nay thuộc sở hữu tư nhân, lần cuối xuất hiện trong phiên đấu giá đầu những năm 2000.",
          ],
        },
        {
          heading: "Amsterdam Diamond (33,74 carat)",
          paragraphs: [
            "Amsterdam Diamond là viên kim cương đen tự nhiên hình quả lê nặng 33,74 carat, được đặt tên theo thành phố nơi nó được trưng bày công khai lần đầu. Đây được coi là một trong những ví dụ quan trọng nhất về kim cương đen tự nhiên trong thiết kế trang sức — hình pear cut thể hiện ánh bóng kim loại đặc trưng của viên đá.",
            "Khác với nhiều kim cương đen lịch sử có xuất xứ liên quan đến truyền thuyết chưa được xác minh, Amsterdam Diamond có lịch sử triển lãm được ghi chép và đại diện cho tiêu chuẩn trong việc trình bày kim cương đen như những viên đá quý nghiêm túc, có giá trị cao.",
          ],
        },
        {
          heading: "Spirit of de Grisogono (312,24 carat)",
          paragraphs: [
            "Spirit of de Grisogono là viên kim cương đen được cắt lớn nhất thế giới về trọng lượng với 312,24 carat. Nó được tìm thấy ở Tây Phi và được giác cắt bởi thợ kim hoàn Thụy Sĩ de Grisogono, người đã đặt nó trong nhẫn vàng trắng được bao quanh bởi 702 viên kim cương trắng.",
            "Kích thước của viên đá — lớn hơn nhiều viên kim cương không màu nổi tiếng nhất thế giới nhiều lần — minh họa một trong những đặc điểm chính của kim cương đen tự nhiên: chúng được tìm thấy ở trọng lượng carat mà sẽ là đặc biệt, thậm chí không thể có, đối với các màu fancy khác.",
          ],
        },
      ],
    },
    tags: ["History", "Famous Diamonds", "Black Orlov", "Amsterdam Diamond"],
  },
  {
    slug: "black-diamond-care-maintenance",
    category: { en: "Care", vi: "Bảo quản" },
    date: "2024-06-05",
    readMinutes: 5,
    title: {
      en: "Black Diamond Care and Maintenance: The Definitive Guide",
      vi: "Bảo Quản Kim Cương Đen: Hướng Dẫn Toàn Diện",
    },
    excerpt: {
      en: "Black diamonds are the hardest natural substance on Earth, but their polycrystalline structure introduces care considerations that do not apply to colorless stones. Here is what every owner needs to know.",
      vi: "Kim cương đen là vật liệu tự nhiên cứng nhất trên Trái Đất, nhưng cấu trúc đa tinh thể của chúng tạo ra các lưu ý bảo quản không áp dụng cho đá không màu. Đây là điều mọi chủ sở hữu cần biết.",
    },
    body: {
      en: [
        {
          heading: "Understanding the Polycrystalline Structure",
          paragraphs: [
            "While black diamonds score 10 on the Mohs hardness scale — the same as colorless diamonds — their polycrystalline nature means they are structurally different. A single-crystal diamond has defined cleavage planes, making it predictably strong in some directions and vulnerable in others. Carbonado, with its interlocking crystal matrix, is actually more resistant to cleavage — but the graphite-filled pores that give it its color create microscopic porosity that requires specific care.",
          ],
        },
        {
          heading: "Cleaning",
          paragraphs: [
            "Clean a black diamond with warm water, a small amount of mild dish soap, and a soft-bristled brush (a dedicated jewelry brush or a clean, soft toothbrush). Gently scrub the stone and setting, rinse thoroughly with clean warm water, and pat dry with a lint-free cloth.",
            "Avoid ultrasonic cleaners for black diamonds. The vibrations can cause stress fractures in the polycrystalline matrix, particularly in stones that already have visible grain boundaries or surface porosity. Steam cleaners should also be avoided for the same reason.",
          ],
        },
        {
          heading: "Storage",
          paragraphs: [
            "Store black diamond pieces individually, wrapped in a soft cloth or in a separate compartment in a lined jewelry box. Despite their hardness, black diamonds can scratch other gemstones and be scratched by the settings of other diamond pieces. Individual storage prevents surface contact damage.",
            "Avoid storing black diamonds in extreme temperature environments. While the diamond itself is thermally stable, repeated thermal cycling can eventually stress the bond between the stone and its setting — particularly in bezel and channel settings where the metal expands and contracts around the stone.",
          ],
        },
        {
          heading: "Wear and Handling",
          paragraphs: [
            "Black diamonds can be worn daily, but common-sense precautions apply. Remove jewelry before activities involving heavy impact, chemicals (including household cleaners, chlorine, and hair products), or abrasive surfaces. When not worn, secure the piece in its storage case.",
            "Inspect the setting periodically — every 12 months at minimum — for any loosening of prongs, wear in bezel edges, or movement of the stone. The polycrystalline nature of black diamonds means a loose stone in a prong setting faces higher risk than a single-crystal diamond of the same size, as the stone's surface may provide less grip.",
          ],
        },
      ],
      vi: [
        {
          heading: "Hiểu Về Cấu Trúc Đa Tinh Thể",
          paragraphs: [
            "Mặc dù kim cương đen đạt điểm 10 trên thang Mohs — giống kim cương không màu — nhưng bản chất đa tinh thể của chúng có nghĩa là chúng khác biệt về mặt cấu trúc. Kim cương đơn tinh thể có các mặt phẳng tách nhau xác định, khiến nó dự đoán được độ bền theo một số hướng. Carbonado, với ma trận tinh thể đan xen, thực sự kháng tách tốt hơn — nhưng các lỗ chứa graphite tạo nên màu đen của nó tạo ra độ xốp vi mô đòi hỏi sự bảo quản cụ thể.",
          ],
        },
        {
          heading: "Vệ Sinh",
          paragraphs: [
            "Làm sạch kim cương đen bằng nước ấm, một lượng nhỏ xà phòng rửa chén nhẹ và bàn chải lông mềm. Chà nhẹ nhàng viên đá và ổ đặt, tráng sạch bằng nước ấm và lau khô bằng khăn không có sợi.",
            "Tránh dùng máy siêu âm làm sạch cho kim cương đen. Rung động có thể gây ra vết nứt ứng suất trong ma trận đa tinh thể, đặc biệt ở những viên đá đã có ranh giới hạt hoặc độ xốp bề mặt có thể nhìn thấy. Máy hơi nước cũng nên tránh vì lý do tương tự.",
          ],
        },
        {
          heading: "Bảo Quản",
          paragraphs: [
            "Bảo quản từng món trang sức kim cương đen riêng lẻ, bọc trong vải mềm hoặc trong ngăn riêng trong hộp đựng trang sức có lót. Mặc dù cứng, kim cương đen có thể làm xước đá quý khác và bị xước bởi ổ đặt của các món trang sức kim cương khác.",
            "Tránh bảo quản kim cương đen trong môi trường nhiệt độ cực đoan. Mặc dù bản thân viên đá ổn định nhiệt, các chu kỳ nhiệt lặp đi lặp lại cuối cùng có thể gây ứng suất cho liên kết giữa viên đá và ổ của nó.",
          ],
        },
        {
          heading: "Đeo và Xử Lý",
          paragraphs: [
            "Kim cương đen có thể đeo hàng ngày, nhưng cần tuân theo các biện pháp phòng ngừa thông thường. Tháo trang sức trước các hoạt động có va đập mạnh, hóa chất (kể cả chất tẩy rửa gia đình, clo và sản phẩm tóc), hoặc bề mặt mài mòn.",
            "Kiểm tra ổ đặt định kỳ — tối thiểu mỗi 12 tháng — để phát hiện bất kỳ sự lỏng lẻo nào của ghim giữ, mòn ở cạnh bezel, hoặc chuyển động của viên đá. Bản chất đa tinh thể của kim cương đen có nghĩa là viên đá lỏng trong ổ ghim giữ đối mặt với rủi ro cao hơn so với kim cương đơn tinh thể cùng kích thước.",
          ],
        },
      ],
    },
    tags: ["Care", "Maintenance", "Cleaning", "Storage", "Guide"],
  },
];

export function legacyBodyToHtml(blocks: LegacyBodyBlock[]): string {
  return blocks
    .map((block) => {
      const heading = block.heading ? `<h2>${block.heading}</h2>` : "";
      const paragraphs = block.paragraphs.map((p) => `<p>${p}</p>`).join("");
      return heading + paragraphs;
    })
    .join("");
}

export function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(
    locale === "vi" ? "vi-VN" : "en-GB",
    { day: "2-digit", month: "long", year: "numeric" }
  );
}
