# Audit Report — BlackDiamond — 2026-07-31

## Tóm tắt

Đã chạy lại toàn bộ kịch bản `TEST_SCRIPT_E2E.md` trên nhánh `feature/multilingual-i18n`: build production, 40 tổ hợp public page/locale, SEO, form Membership/Newsletter, admin auth, CRUD Collection/Blog, trang Translations, Supabase RLS và cleanup. Hai regression nghiêm trọng về mất bản dịch khi edit và để rác khi delete **đã được sửa, không tái diễn**. Phát hiện 1 vấn đề bảo mật nghiêm trọng, 4 nhóm lỗi mức trung bình và 2 vấn đề UI/quality nhẹ.

Baseline trước test: 8 sản phẩm, 6 blog, 160 translation status, 0 membership, 0 newsletter, quota 38.305 ký tự.

## Danh sách lỗi phát hiện

### [Mức độ: Nghiêm trọng] Mọi tài khoản Supabase authenticated vẫn có quyền quản trị nội dung

- **Khu vực:** Supabase RLS / Admin authorization.
- **Mô tả:** Các policy của `collection_pieces`, `blog_posts`, `exchange_rates`, `translation_status` và `translation_quota` cho role `authenticated` INSERT/UPDATE/DELETE với `USING (true)` hoặc `WITH CHECK (true)`. Không có predicate kiểm tra admin role hoặc user cụ thể.
- **Cách tái hiện:** Query `pg_policies` và chạy Supabase Security Advisor.
- **Kết quả mong đợi:** Chỉ admin đã được cấp quyền trong `app_metadata`/bảng role riêng mới được ghi hoặc xoá dữ liệu quản trị.
- **Kết quả thực tế:** Bất kỳ Supabase user authenticated nào cũng có quyền tương đương admin. Security Advisor trả nhiều cảnh báo `rls_policy_always_true`.
- **Bằng chứng:** Admin user hiện chỉ có provider email trong `app_metadata`, không có role admin riêng.
- **Đề xuất:** Tạo predicate authorization thực sự và áp dụng cho cả RLS lẫn server actions. Không coi `authenticated` đồng nghĩa với admin.
- **Remediation:** <https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy>

### [Mức độ: Trung bình] Nội dung UI tĩnh tiếng Thái còn xuất hiện ở locale khác

- **Khu vực:** Public Education, Membership, Catalog list/detail.
- **Mô tả:** Các chuỗi hard-code tiếng Thái vẫn xuất hiện trong `vi`, `lo`, `zh`, `en`.
- **Cách tái hiện:** Mở `/en/education`, `/en/membership`, `/en/catalog` hoặc `/en/catalog/obsidian-radiant`.
- **Kết quả mong đợi:** UI copy tĩnh dùng dictionary theo locale.
- **Kết quả thực tế:** Ví dụ:
  - Education: `เลื่อนเพื่อสำรวจ`, `รูปลักษณ์ทางกายภาพของเพชรดำ`, `การลงทุน`, `ความดิบเถื่อนจากธรรมชาติ`.
  - Membership: `การสั่งทำ`, `2.5 กะรัต ที่เลือก`, các option cut tiếng Thái, chức danh concierge tiếng Thái.
  - Catalog: nhãn `กะรัต`, `การเจียระไน`, `โลหะ`, `ความหายาก`, `ข้อมูลจำเพาะอัญมณี`, `ตัวเรือนและการฝัง`.
- **File/dòng liên quan:**
  - `components/sections/EducationSections.tsx:35,69,95,115`
  - `components/sections/MembershipSections.tsx:107,140,162,173,217`
  - `components/sections/CatalogSections.tsx:504-517`
  - `components/sections/CatalogDetailSections.tsx:31,38-39,149,165`

### [Mức độ: Trung bình] URL detail đã xoá là soft-404 HTTP 200

- **Khu vực:** Public Collection/Blog detail sau khi delete.
- **Mô tả:** Sau khi xoá item, nội dung được thay bằng trang `404 — This page could not be found`, nhưng HTTP response vẫn là 200 trên cả 5 locale.
- **Cách tái hiện:**
  1. Tạo và mở một product/blog public.
  2. Xoá qua admin.
  3. Request lại URL detail bằng `curl`.
- **Kết quả mong đợi:** HTTP 404.
- **Kết quả thực tế:** Body là trang 404 nhưng status vẫn 200 cho 10 URL test (`5 locale × product/blog`).
- **File/dòng liên quan:**
  - `app/[locale]/catalog/[slug]/page.tsx:71-74`
  - `app/[locale]/blog/[slug]/page.tsx:74-77`
- **Ghi chú:** Revalidation đã được sửa để gọi đủ 5 locale; lỗi còn lại là HTTP semantics/soft-404 của route SSG/ISR.

### [Mức độ: Trung bình] Tags của blog không được localize

- **Khu vực:** Blog detail đa ngôn ngữ.
- **Mô tả:** Bài blog test có title, excerpt và body đủ 5 locale, nhưng tags vẫn hiển thị tiếng Thái trong `vi/lo/zh/en`.
- **Kết quả mong đợi:** Toàn bộ nội dung do admin nhập hiển thị theo locale, hoặc tags được xác định rõ là taxonomy dùng chung.
- **Kết quả thực tế:** `เพชรดำ`, `นักสะสม`, `การตรวจสอบ` xuất hiện trên cả bốn locale khác Thái.
- **File/dòng liên quan:**
  - `app/admin/(dashboard)/blog/actions.ts:62`
  - `lib/data/blog.ts:15`
  - `components/sections/BlogPostSections.tsx:58`

### [Mức độ: Trung bình] Organization JSON-LD luôn dùng description tiếng Thái

- **Khu vực:** SEO structured data.
- **Mô tả:** `Organization` schema trên `/th` và `/en` có cùng description tiếng Thái.
- **Kết quả mong đợi:** Description theo locale hoặc dùng mô tả brand trung lập được chủ đích xác nhận.
- **Kết quả thực tế:** English page vẫn chứa description tiếng Thái trong JSON-LD.
- **File/dòng liên quan:** `lib/schema.ts:15-29`.

### [Mức độ: Nhẹ] Nội dung Help tooltip mâu thuẫn với nút retranslate-all mới

- **Khu vực:** Admin Translations.
- **Mô tả:** Nút ghi `แปลใหม่ทั้งหมด (ไม่ทับที่แก้ไขเอง)` và hành vi thực tế giữ `manual_edited`, nhưng Help tooltip vẫn nói retranslate áp dụng cả trạng thái admin-edited và có thể ghi đè.
- **Kết quả mong đợi:** Help mô tả đúng hành vi mới.
- **File/dòng liên quan:** `components/admin/TranslationsHelpContent.tsx:32-33`.

### [Mức độ: Nhẹ] Existing legacy content chưa dịch đầy đủ

- **Khu vực:** Home, existing Product/Blog.
- **Mô tả:** Một số sản phẩm/blog cũ vẫn fallback về tiếng Thái. Theo quy tắc script, đây được ghi chú riêng và không tính là regression của CRUD mới.
- **Ví dụ:** Blog `cosmic-origin-theory-black-diamonds` có title, description và body tiếng Thái ở locale `en`.

## Các mục đã kiểm tra và không có lỗi

### Build và SSG — PASS

- `npx tsc --noEmit`: PASS.
- `npx next build`: PASS sau khi cho phép network tải Google Fonts.
- Next.js 16.2.6 sinh 123 static pages.
- Tất cả public route `[locale]` là `●` SSG; không có regression sang `ƒ` dynamic.
- Admin và cron dynamic đúng thiết kế.

### Public site 5 locale — PASS có các ngoại lệ đã liệt kê

- Đã mở 40 tổ hợp: Home, About, Education, Catalog, Blog, Lifestyle, Membership, Investment × `th/vi/lo/zh/en`.
- Không có broken image hoặc horizontal overflow toàn trang trong vòng kiểm tra.
- Investment redirect đúng về blog cho cả 5 locale.
- Language switcher đã chọn lần lượt đủ 5 ngôn ngữ và giữ nguyên route `catalog/obsidian-radiant`.
- Catalog filter `Radiant`: từ 8 sản phẩm còn đúng 1 sản phẩm.
- Giá dùng đúng currency và giá trị hợp lý:
  - th: THB
  - vi: VND
  - lo: LAK
  - zh: CNY
  - en: USD
- Locale đã quy đổi có disclaimer giá tham khảo/xấp xỉ.
- Browser console sau public + admin test: 0 error, 0 warning; lỗi hydration React `#418` không tái diễn.

### SEO — PASS có cảnh báo Organization schema

- Kiểm tra Home, Product detail và Blog detail × 5 locale: đủ title, description, Open Graph, canonical và 5 hreflang.
- JSON-LD parse hợp lệ:
  - Home: Organization + WebSite.
  - Product: Organization + Product + BreadcrumbList.
  - Blog: Organization + Article + BreadcrumbList.
- `sitemap.xml`: HTTP 200, 105 URL.
- `robots.txt`: HTTP 200 và có Sitemap directive.

### Membership — ĐÃ XÁC NHẬN FIX, KHÔNG TÁI DIỄN

- Empty name/email bị native validation chặn.
- Email sai định dạng bị chặn.
- Submit hợp lệ không chuyển sang trang lỗi.
- UI hiện `Thank you! We've received your information.`
- Supabase tạo đúng row:
  - ID: `62b1333c-d64b-4bc3-ab08-cc2453be60fb`
  - Email: `codex.e2e.20260731+member@example.com`
- Bảng `membership_applications` có RLS enabled.
- Anon chỉ thấy `[]` khi SELECT và không UPDATE được row.

### Newsletter — ĐÃ XÁC NHẬN FIX, KHÔNG TÁI DIỄN

- Nút footer English hiển thị `Send`, không còn `ส่ง`.
- Đăng ký lần đầu hiển thị thông báo thành công.
- Đăng ký trùng cùng email vẫn hiển thị thành công, không có lỗi kỹ thuật.
- DB chỉ giữ một row:
  - ID: `888a800c-da30-448f-b8fa-476d79930c02`
  - Email: `codex.e2e.20260731+newsletter@example.com`
- Bảng `newsletter_subscribers` có RLS enabled.
- Anon SELECT trả mảng rỗng; UPDATE/DELETE không tác động row.

### Admin authentication — PASS

- Sai password hiển thị `อีเมลหรือรหัสผ่านไม่ถูกต้อง` và vẫn ở `/admin/login`.
- Đăng nhập bằng tài khoản được cung cấp thành công, vào `/admin`.
- Sidebar có active state, `aria-current="page"`.
- Sidebar `position: sticky`, top/bottom giữ nguyên sau scroll; logout và save luôn trong viewport.
- Logout thành công; gọi trực tiếp `/admin/blog` sau logout bị redirect về `/admin/login`.

### Collection CRUD — ĐÃ XÁC NHẬN FIX, KHÔNG TÁI DIỄN

- Tạo product đầy đủ tiếng Thái và upload ảnh thật thành công.
- Test item:
  - ID: `120811e0-bc9c-45f6-9089-7d57c16ed25c`
  - Slug: `codex-e2e-regression-20260731-product`
  - Storage: `collection/5eaf0079-119e-436b-9eee-86df544fd87c.jpg`
- Sau create:
  - 20/20 field đều có đủ `th/vi/lo/zh/en`.
  - 80/80 status là `done`.
- Chỉ sửa giá từ 425.000 lên 426.000 THB:
  - 20/20 field vẫn đủ 5 locale.
  - Name/summary và các field khác không mất bản dịch.
  - Quota không tăng vì không đổi source text.
- Public cập nhật trên đủ 5 locale và giá quy đổi đúng.
- Delete qua UI tự động xoá row, 80 status và ảnh Storage.

### Blog CRUD — ĐÃ XÁC NHẬN FIX, KHÔNG TÁI DIỄN

- Tạo blog rich text + bullet list + ảnh thật thành công.
- Test item:
  - ID: `e2741ddc-be44-4871-afe5-54265d62131f`
  - Slug: `codex-e2e-regression-20260731-blog`
  - Storage: `blog/81a73371-d9be-45ec-99eb-73e65633779c.jpg`
- Sau create, `category/title/excerpt/body` đều đủ 5 locale; 16 status là `done`.
- Chỉ sửa read time từ 6 lên 8 phút:
  - Toàn bộ locale vẫn được giữ.
  - Quota không tăng.
  - Public 5 locale hiển thị read time đúng ngôn ngữ và rich HTML/list đúng.
- Delete qua UI tự động xoá row, 16 status và ảnh Storage.

### Trang Translations — ĐÃ XÁC NHẬN FIX, KHÔNG TÁI DIỄN

- Collection: 20 field × 4 locale = 80 ô; Blog: 4 × 4 = 16 ô.
- Back link đúng `/admin/collection` và `/admin/blog`.
- Modal có nguồn Thái read-only và ô editor bản dịch.
- Save manual edit thành công và status DB là `manual_edited`.
- Collection translate-all giữ nguyên English manual, kết quả 79 `done` + 1 `manual_edited`.
- Blog translate-all giữ nguyên English manual, kết quả 15 `done` + 1 `manual_edited`.
- Không có lỗi `removeChild`, hydration hay JS console error.
- Help popover nằm trong viewport và không tạo horizontal overflow.

### Cron security — ĐÃ XÁC NHẬN FIX

- `CRON_SECRET` chưa cấu hình.
- Request không có Authorization trả HTTP 503.
- Body: `CRON_SECRET is not configured — refusing to run rather than allow unauthenticated access.`
- Job không chạy khi thiếu secret.

### Function privileges — ĐÃ XÁC NHẬN FIX

- `reserve_translation_quota`:
  - anon: không có EXECUTE.
  - PUBLIC: không có EXECUTE.
  - authenticated: có EXECUTE.
- `set_updated_at` cũng không executable bởi anon/PUBLIC.

## Nhật ký dọn dẹp dữ liệu test

- Product `120811e0-bc9c-45f6-9089-7d57c16ed25c` → xoá qua admin UI.
- 80 product translation status → delete action tự xoá.
- Product image `collection/5eaf0079-119e-436b-9eee-86df544fd87c.jpg` → delete action tự xoá khỏi Storage.
- Blog `e2741ddc-be44-4871-afe5-54265d62131f` → xoá qua admin UI.
- 16 blog translation status → delete action tự xoá.
- Blog image `blog/81a73371-d9be-45ec-99eb-73e65633779c.jpg` → delete action tự xoá khỏi Storage.
- Membership `codex.e2e.20260731+member@example.com` → xoá trực tiếp SQL theo email.
- Newsletter `codex.e2e.20260731+newsletter@example.com` → xoá trực tiếp SQL theo email.

Xác minh cuối:

| Hạng mục | Kết quả |
|---|---:|
| Collection | 8 |
| Blog | 6 |
| Translation status | 160 |
| Membership test | 0 |
| Newsletter test | 0 |
| Test content | 0 |
| Test translation status | 0 |
| Test Storage objects | 0 |
| Translation quota | 45.953 |

Quota không được hoàn lại vì đây là số ký tự Azure đã thực sự xử lý.

## Các mục không kiểm tra được

- Không ép quota lên 1.920.000 ký tự vì sẽ gây tiêu hao quota thật và thay đổi trạng thái production. Đã xác nhận quota hiện tại 45.953, còn rất xa giới hạn, và các lần tăng trong CRUD/retranslate phù hợp với lượng source được dịch.
- Không tạo thêm một tài khoản authenticated không phải admin để khai thác RLS vì script cấm tạo tài khoản test không cần thiết. Lỗ hổng authorization được xác nhận trực tiếp bằng policy và Security Advisor.
- UI chạy trên dev server đang có sẵn tại port 3000; production build được kiểm tra độc lập và pass. Lệnh `next start` riêng không bind được vì port đã bị dev server chiếm.

## Đề xuất ưu tiên xử lý

1. Siết RLS và server-action authorization bằng admin role thực sự.
2. Sửa soft-404 để URL detail đã xoá trả HTTP 404, không chỉ render trang 404.
3. Chuyển toàn bộ chuỗi hard-code Thái trong Education, Membership và Catalog sang dictionaries.
4. Quyết định và triển khai localization cho blog tags.
5. Localize Organization JSON-LD.
6. Cập nhật Help tooltip để khớp hành vi translate-all mới.

## Ghi chú repository

- Không sửa code ứng dụng trong quá trình test.
- Không commit hoặc push.
- Các thay đổi có sẵn của người dùng trong worktree được giữ nguyên.
