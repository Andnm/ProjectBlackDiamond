export function TranslationsHelpContent() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="mb-1 font-bold text-white">สถานะแต่ละสี หมายถึงอะไร</p>
        <ul className="flex flex-col gap-1.5">
          <li>
            <span className="font-bold text-emerald-300">แปลอัตโนมัติแล้ว</span> — ระบบแปลให้เอง และตรงกับต้นฉบับไทยล่าสุด
            หากแก้ต้นฉบับไทยทีหลัง จะถูกแปลใหม่อัตโนมัติ
          </li>
          <li>
            <span className="font-bold text-purple-300">แก้ไขโดยแอดมิน</span> — คนแก้เอง ถูก
            <span className="font-bold"> ล็อกไว้</span> ระบบจะไม่แปลทับให้อีก แม้แก้ต้นฉบับไทยทีหลังก็ตาม
          </li>
          <li>
            <span className="font-bold text-amber-300">รอคิวแปล</span> — โควต้าเต็มตอนบันทึก รอโควต้าเปิดใหม่ หรือกด
            "แปลตอนนี้" เพื่อลองอีกครั้ง
          </li>
          <li>
            <span className="font-bold text-red-300">แปลไม่สำเร็จ</span> — เรียก API ไม่สำเร็จ ลองกด "แปลตอนนี้" ใหม่
          </li>
          <li>
            <span className="font-bold text-neutral-400">ยังไม่แปล</span> — ยังไม่เคยพยายามแปลข้อความนี้เลย
          </li>
        </ul>
      </div>
      <div>
        <p className="mb-1 font-bold text-white">วิธีใช้</p>
        <p>กดที่สถานะช่องใดก็ได้เพื่อเปิดหน้าต่างเทียบต้นฉบับไทย (ซ้าย) กับคำแปล (ขวา) แก้ไขแล้วกด "บันทึก"</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-white">ปุ่ม "แปลตอนนี้" / "แปลใหม่ทั้งหมด"</p>
        <p>
          สั่งแปลใหม่ทันที "แปลตอนนี้" ที่ช่องเดียวใช้ได้กับทุกสถานะ รวมถึง "แก้ไขโดยแอดมิน" (แปลทับคำที่แก้เองได้ถ้ากดเอง)
          แต่ปุ่ม "แปลใหม่ทั้งหมด" จะ<span className="font-bold">ข้ามช่องที่เป็น &quot;แก้ไขโดยแอดมิน&quot;</span>เสมอ
          เพื่อไม่ให้เผลอทับงานที่แก้ไขด้วยมือ
        </p>
      </div>
    </div>
  );
}
