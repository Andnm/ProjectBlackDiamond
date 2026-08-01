# Kịch bản Test Toàn Diện End-to-End — BlackDiamond

> Đây là kịch bản (prompt) dùng để giao cho một AI agent khác (hoặc một phiên Claude Code mới, độc lập với phiên đang phát triển) thực hiện kiểm thử toàn bộ website từ đầu đến cuối, và xuất kết quả thành một file báo cáo Markdown. Dán toàn bộ nội dung bên dưới vào AI đó như một prompt độc lập — nó không có ngữ cảnh của các phiên trước, nên mọi thông tin cần thiết đã được viết đầy đủ ở đây.

---

## PROMPT — DÁN TỪ ĐÂY TRỞ XUỐNG CHO AI TESTER

Bạn là một AI kiểm thử phần mềm (QA) độc lập, được giao nhiệm vụ audit toàn bộ một website thương mại điện tử xa xỉ tên **BlackDiamond** (bán kim cương đen), xây dựng bằng Next.js 16 App Router + Supabase, đa ngôn ngữ (5 locale: `th`, `vi`, `lo`, `zh`, `en`), có tích hợp dịch tự động (Azure Translator) và quy đổi tiền tệ theo locale (THB → VND/LAK/CNY/USD).

Nhiệm vụ của bạn: **kiểm thử toàn bộ luồng người dùng từ đầu đến cuối** — không chỉ tính năng đa ngôn ngữ, mà TOÀN BỘ website (public site + trang quản trị admin) — tìm bug, đánh giá mức độ nghiêm trọng, và **xuất kết quả thành một file báo cáo Markdown** theo đúng định dạng ở cuối prompt này.

### Quy tắc bắt buộc (không được vi phạm)

1. **Không được giữ lại dữ liệu test.** Bất kỳ sản phẩm, bài blog, đơn đăng ký membership, email newsletter, tài khoản, hay bản ghi nào bạn tạo ra trong lúc test đều phải bị xóa sạch khỏi database trước khi bạn kết thúc phiên làm việc. Ghi rõ trong báo cáo bạn đã tạo gì và đã xóa gì (mục "Nhật ký dọn dẹp").
2. **Không tự ý sửa code.** Nhiệm vụ của bạn là PHÁT HIỆN và BÁO CÁO bug, không phải sửa. Nếu phát hiện lỗi nghiêm trọng, ghi rõ vào báo cáo kèm file/dòng code liên quan (nếu bạn có quyền đọc source) để người khác xử lý sau.
3. **Không nhập mật khẩu, API key, hay thông tin thanh toán thật.** Nếu cần đăng nhập admin để test, hãy hỏi người vận hành phiên cung cấp qua biến môi trường hoặc để họ tự đăng nhập, bạn chỉ thao tác sau khi đã đăng nhập.
4. **Xác minh bằng bằng chứng thực tế** — đọc code, chạy SQL, hoặc test trực tiếp trên trình duyệt — không suy đoán. Nếu không thể xác minh một điểm nào đó (ví dụ thiếu quyền truy cập), ghi rõ "Không kiểm tra được — lý do X" thay vì bỏ qua im lặng.
5. **Không thực hiện thao tác phá hoại** (xóa toàn bộ bảng, force push, đổi cấu hình bảo mật, v.v.) ngoài phạm vi tạo/xóa dữ liệu test ở mục 1.

### Phạm vi kiểm thử

#### A. Public site (kiểm tra trên cả 5 locale: `/th`, `/vi`, `/lo`, `/zh`, `/en`)
1. **Trang chủ** (`/[locale]`) — hero, các section giới thiệu, sản phẩm nổi bật, load ảnh, không có text bị vỡ layout khi đổi ngôn ngữ (đặc biệt tên sản phẩm/giá dài).
2. **Chuyển đổi ngôn ngữ** — bấm nút chọn ngôn ngữ ở header, xác nhận toàn bộ nội dung trang đổi theo, URL đổi đúng locale, không có đoạn text nào bị "quên dịch" (vẫn hiện tiếng Thái ở locale khác) đối với nội dung KHÔNG phải sản phẩm/blog cũ (nội dung cũ có thể chưa dịch — không tính là bug, ghi chú riêng).
3. **Đổi tiền tệ theo locale** — xác nhận giá hiển thị đúng đơn vị (th→THB, vi→VND, lo→LAK, zh→CNY, en→USD), số liệu hợp lý (không phải giá trị 0 hoặc NaN), định dạng số đúng chuẩn locale.
4. **Trang Catalog** (`/[locale]/catalog`) — danh sách sản phẩm, lọc/load more nếu có, không bị scroll ngang toàn trang.
5. **Trang chi tiết sản phẩm** (`/[locale]/catalog/[slug]`) — ảnh, thông số kỹ thuật, giá, breadcrumb, nút liên hệ/quan tâm.
6. **Trang Blog** (`/[locale]/blog`) và **chi tiết bài viết** (`/[locale]/blog/[slug]`) — nội dung HTML render đúng, ảnh cover, ngày tháng đúng định dạng locale.
7. **Trang Education, Lifestyle, Investment, About** — nội dung tĩnh, không lỗi layout, không lỗi console.
8. **Trang Membership** (`/[locale]/membership`) — **ĐÂY LÀ TÍNH NĂNG VỪA ĐƯỢC SỬA, TEST KỸ:**
   - Điền form "Legal Name" + "Email", bấm Submit.
   - Xác nhận hiện thông báo thành công (không phải trang lỗi server).
   - Kiểm tra dữ liệu đã được lưu vào bảng `membership_applications` trong Supabase (nếu có quyền truy vấn).
   - Test case lỗi: bỏ trống field bắt buộc, nhập email sai định dạng — xác nhận có validate.
   - **Sau khi test xong, xóa bản ghi test khỏi `membership_applications`.**
9. **Form Newsletter ở footer** (xuất hiện ở mọi trang) — **CŨNG VỪA ĐƯỢC SỬA, TEST KỸ:**
   - Nhập email, bấm nút gửi (label theo locale, ví dụ "ส่ง"/"Gửi"/"Send").
   - Xác nhận thông báo thành công.
   - Kiểm tra bảng `newsletter_subscribers` có bản ghi mới.
   - Test đăng ký trùng email 2 lần — không được báo lỗi khó hiểu cho người dùng (theo thiết kế, trùng email vẫn coi là thành công).
   - **Xóa bản ghi test sau khi xong.**
10. **SEO** — kiểm tra thẻ `<title>`, meta description, Open Graph, JSON-LD structured data (`lib/schema.ts`) có xuất hiện đúng và khác nhau theo từng trang; `sitemap.xml`, `robots.txt` truy cập được.
11. **Console & Network** — trên mỗi trang, kiểm tra console không có lỗi JS (đặc biệt lỗi hydration React #418), không có request 404/500 bất thường.

#### B. Trang quản trị Admin (`/admin`)
1. **Đăng nhập** (`/admin/login`) — sai mật khẩu bị từ chối, đúng thì vào được dashboard. Sidebar phải cố định (sticky), nút đăng xuất luôn nhìn thấy khi cuộn trang dài.
2. **Quản lý Collection (sản phẩm)** — tạo mới, sửa, xóa một sản phẩm test:
   - Tạo sản phẩm test với đầy đủ thông tin + ảnh.
   - Sửa lại MỘT trường (ví dụ giá) và lưu — sau đó kiểm tra các trường KHÁC (tên các locale khác, mô tả) KHÔNG bị mất dữ liệu (đây là bug nghiêm trọng từng gặp — đã được sửa, cần xác nhận KHÔNG tái diễn).
   - Xóa sản phẩm test — xác nhận ảnh trong Storage bị xóa theo, và các dòng theo dõi trạng thái dịch (`translation_status`) liên quan cũng bị xóa (không để rác trong DB).
   - Xác nhận trang public (`/catalog/[slug]`) cập nhật đúng ngay sau khi sửa, ở ĐỦ CẢ 5 LOCALE (không chỉ tiếng Thái).
3. **Quản lý Blog** — lặp lại quy trình y hệt như Collection ở trên (tạo/sửa/xóa bài test), kiểm tra các điểm tương tự.
4. **Trang Translations** (`/admin/collection/[id]/translations` và `/admin/blog/[id]/translations`):
   - Mở bảng trạng thái dịch, xác nhận biểu tượng (?) hiển thị chú giải rõ ràng khi hover, các trạng thái (đã dịch/đang dịch/lỗi/tự sửa tay/chưa dịch) phân biệt rõ ràng bằng màu và tên, không có 2 trạng thái khác nhau nhưng nhìn giống hệt nhau.
   - Mở modal chỉnh sửa bản dịch của một trường — xác nhận layout 2 cột (trái: tiếng Thái gốc chỉ đọc, phải: ô nhập bản dịch), sửa và lưu thành công, không có lỗi `removeChild` khi đóng modal hoặc click ra ngoài.
   - Test nút "dịch lại tất cả": trước tiên sửa tay một ô (đánh dấu `manual_edited`), sau đó bấm "dịch lại tất cả" — xác nhận ô đã sửa tay KHÔNG bị ghi đè, chỉ các ô khác được dịch lại.
   - Nút "quay lại" phải đưa về danh sách, không phải quay lại trang sửa sản phẩm/bài viết.
   - Test giới hạn quota dịch (nếu có thể) — không được vượt quota một cách âm thầm.
5. **Bảo mật admin**:
   - Thử truy cập trực tiếp các route `/admin/*` khi chưa đăng nhập (dùng tab ẩn danh) — phải bị redirect về `/admin/login`.
   - Thử gọi API `/api/cron/exchange-rates` không kèm header `Authorization: Bearer <CRON_SECRET>` — phải trả về 401 (hoặc 503 nếu secret chưa cấu hình), TUYỆT ĐỐI không được chạy job mà không xác thực.

#### C. Kiểm tra kỹ thuật tổng quát
1. Chạy `npx next build` — xác nhận build thành công, không có lỗi TypeScript, và các route public vẫn ở chế độ **SSG** (ký hiệu `●`), KHÔNG bị rơi xuống **Dynamic** (`ƒ`) một cách ngoài ý muốn (dấu hiệu có chỗ nào đó gọi `cookies()`/`headers()` không cần thiết trong luồng render tĩnh).
2. Kiểm tra RLS (Row Level Security) trên Supabase — các bảng public (`membership_applications`, `newsletter_subscribers`, v.v.) chỉ cho phép `INSERT` từ `anon`/`authenticated`, không cho `SELECT`/`UPDATE`/`DELETE` từ phía client ẩn danh.
3. Kiểm tra quyền `EXECUTE` trên các Postgres function nhạy cảm (ví dụ liên quan đến quota dịch) — không được cấp cho `PUBLIC`/`anon` nếu chỉ nên gọi từ code phía server.

### Định dạng báo cáo đầu ra (BẮT BUỘC)

Xuất kết quả ra một file có tên `AUDIT_REPORT_<YYYY-MM-DD>.md` (thay bằng ngày bạn thực hiện test), theo cấu trúc:

```markdown
# Audit Report — BlackDiamond — <ngày>

## Tóm tắt
(2-3 câu: đã test gì, tình trạng tổng thể, số lượng bug theo mức độ)

## Danh sách lỗi phát hiện (nếu có), sắp xếp theo mức độ nghiêm trọng giảm dần
### [Mức độ: Nghiêm trọng / Trung bình / Nhẹ] Tên lỗi
- **Khu vực:** (VD: Admin > Collection > Xóa sản phẩm)
- **Mô tả:** ...
- **Cách tái hiện:** các bước cụ thể
- **Kết quả mong đợi vs. thực tế:** ...
- **File/dòng code liên quan (nếu biết):** ...

## Các mục đã kiểm tra và KHÔNG có lỗi (regression check)
(Liệt kê các mục ở phần B.2, B.4 (manual_edited), A.8, A.9 — xác nhận rõ ràng "ĐÃ XÁC NHẬN FIX, KHÔNG TÁI DIỄN" hoặc "VẪN CÒN LỖI")

## Nhật ký dọn dẹp dữ liệu test
- Đã tạo: ... → Đã xóa: ... (kèm ID/email cụ thể)

## Các mục không kiểm tra được
- Lý do (thiếu quyền, thiếu thông tin, v.v.)

## Đề xuất ưu tiên xử lý
1. ...
2. ...
```

Không cần chỉnh sửa code trong quá trình này — chỉ audit và báo cáo.

---

## Ghi chú cho người vận hành phiên test (không thuộc phần prompt trên)

- Nếu AI tester chạy trong Claude Code với quyền truy cập browser + Supabase MCP, nó có thể tự thực hiện gần như toàn bộ mục A và một phần mục B/C (trừ đăng nhập admin cần bạn cung cấp phiên đăng nhập sẵn hoặc tự đăng nhập giúp).
- Đăng nhập admin: **không đưa mật khẩu cho AI nhập hộ** — hãy tự đăng nhập vào `/admin` trong cùng trình duyệt trước, rồi để AI thao tác tiếp trên phiên đã đăng nhập đó.
- File báo cáo cũ tương ứng: [AUDIT_REPORT_2026-07-31.md](AUDIT_REPORT_2026-07-31.md) — nên dùng làm tài liệu tham chiếu để kiểm tra hồi quy (regression) các lỗi A1–A6 đã liệt kê ở đó.
