"use client";
import { useRegisterStore } from "@/core/stores/register.store";
import { cancelRegisteration } from "@/app/actions";
import { Button } from "antd";
import { Download, X } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import TicketPDF from "@/components/common/ticket-pdf";
import { toast } from "react-toastify";

const ResultStep = () => {
  const {
    phoneNumber = "",
    fullName = "",
    nationalCode = "",
    registrationResult,
  } = useRegisterStore();

  const hasData = !!registrationResult;

  const tracking_code = registrationResult?.tracking_code || "—";
  const submitted_at = registrationResult?.submitted_at
    ? new Date(registrationResult.submitted_at).toLocaleString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(/،/g, "")
    : "—";

  const ramadanDay = registrationResult?.attendance?.ramadan_day ?? null;
  const attendanceDateShamsi = registrationResult?.attendance?.attendance_date_shamsi || "—";

  const family_national_codes = registrationResult?.family_national_codes || [];

  const handleDownload = async () => {
    if (!hasData) {
      toast.info("اطلاعات کامل بارگذاری نشده است");
      return;
    }

    try {
      const blob = await pdf(
        <TicketPDF
          registerer={{ phone: phoneNumber, nationalCode, fullName }}
          familyMembers={family_national_codes}
          trackingCode={tracking_code}
          ramadanDay={ramadanDay ?? undefined}
          attendanceDate={attendanceDateShamsi}
          submittedAt={submitted_at}
        />
      ).toBlob();

      saveAs(blob, `کارت-ورود-${tracking_code}.pdf`);
    } catch (err) {
      console.error(err);
      toast.error("خطا در ساخت فایل PDF");
    }
  };

  return (
    <div className="pt-6 pb-12 w-full min-h-screen bg-gradient-to-b from-[#0f2a2a] to-[#184642]">
      <div className="px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-10">

        <div className="text-center space-y-5">
          <h1 className="text-[#4EF393] font-bold text-4xl sm:text-5xl tracking-tight font-yekanbakh">
            ثبت‌نام با موفقیت انجام شد
          </h1>

          <div className="inline-flex items-center gap-3 bg-black/30 px-6 py-3 rounded-2xl border border-[#4EF393]/30">
            <span className="text-gray-300 text-lg">کد پیگیری:</span>
            <code className="bg-[#0a1f1f] text-[#e0f2fe] px-4 py-1.5 rounded-lg text-xl font-mono font-semibold">
              {tracking_code}
            </code>
          </div>
        </div>

        <div className="bg-[#112f2f] border border-[#2a5a5a]/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a3d3d] to-[#143535] px-6 py-5 border-b border-[#2a5a5a]/40">
            <h2 className="text-[#d1fae5] text-xl sm:text-2xl font-bold text-center">
              اطلاعات رزرو
            </h2>
          </div>

          <div className="p-6 sm:p-8 space-y-5 text-base sm:text-lg">
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-300">روز ماه رمضان</span>
              <span className="font-bold text-[#4EF393]">
                {ramadanDay !== null ? `روز ${ramadanDay}` : "—"}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-300">تاریخ حضور</span>
              <span className="font-medium text-white">{attendanceDateShamsi}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">زمان ثبت‌نام</span>
              <span className="text-gray-400">{submitted_at}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-7 lg:gap-10">
          <div className="bg-[#112f2f]/80 border border-[#2a5a5a]/40 rounded-xl p-6">
            <h3 className="text-[#cbd5e1] text-xl font-bold mb-5 text-center md:text-right">
              اطلاعات ثبت‌کننده
            </h3>
            <div className="space-y-4 text-base">
              <div className="flex justify-between">
                <span className="text-gray-400 min-w-[110px]">نام و نام خانوادگی</span>
                <span className="font-medium text-right">{fullName || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 min-w-[110px]">شماره همراه</span>
                <span className="font-medium">{phoneNumber || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 min-w-[110px]">کد ملی</span>
                <span className="font-medium">{nationalCode || "—"}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#112f2f]/80 border border-[#2a5a5a]/40 rounded-xl p-6">
            <h3 className="text-[#cbd5e1] text-xl font-bold mb-5 text-center md:text-right">
              همراهان / اعضای خانواده
            </h3>
            {family_national_codes.length > 0 ? (
              <div className="space-y-4">
                {family_national_codes.map((code, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-400 min-w-[140px]">کد ملی نفر {i + 1}</span>
                    <span className="font-medium">{code}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">همراهی ثبت نشده است</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-16 sm:mt-24 px-4">
          <Button
            onClick={async () => {
              if (!hasData) {
                toast.info("اطلاعات کامل نیست");
                return;
              }
              const response = await cancelRegisteration(phoneNumber);
              if (response?.ok) {
                toast.success("رزرو شما با موفقیت لغو گردید");
              } else {
                toast.error(response?.error || "لغو رزرو شما با خطا مواجه شد");
              }
            }}
            variant="solid"
            className="
              text-xl! 
              font-yekanbakh! 
              h-[56px]! sm:h-[60px]! 
              font-bold! 
              text-milky! 
              px-6! sm:px-8! 
              rounded-[20px]!
            "
            icon={<X />}
            color="red"
          >
            انصراف از رزرو
          </Button>

          <Button
            onClick={handleDownload}
            className="
              bg-transparent! 
              text-xl! 
              font-yekanbakh! 
              h-[56px]! sm:h-[60px]! 
              border-milky! 
              hover:bg-milky! 
              hover:text-black! 
              font-bold! 
              text-milky! 
              px-6! sm:px-8! 
              rounded-[20px]!
            "
            icon={<Download size={18} />}
          >
            دانلود کارت ورود
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultStep;