"use client";
import { useRegisterStore } from "@/core/stores/register.store";
import { getCapacityDays } from "@/app/actions";
import { Button } from "antd";
import { Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import TicketPDF from "@/components/common/ticket-pdf";

const ResultStep = () => {
  const {
    phoneNumber,
    fullName,
    nationalCode,
    familyMembers,
    registrationResult,
  } = useRegisterStore();

  if (!registrationResult) {
    return (
      <div className="pt-20 text-center text-white text-xl">
        نتیجه ثبت‌نام یافت نشد...
      </div>
    );
  }

  const { tracking_code, registrant, family_national_codes } = registrationResult;

  const handleDownload = async () => {
    try {
      const blob = await pdf(
        <TicketPDF
          registerer={{
            phone: phoneNumber,
            nationalCode: nationalCode,
            fullName,
          }}
          familyMembers={family_national_codes || []}
          trackingCode={tracking_code}
        />
      ).toBlob();

      saveAs(blob, `کارت-ورود-${tracking_code}.pdf`);
    } catch (error) {
      console.error("خطا در ساخت PDF:", error);
      alert("متأسفانه مشکلی پیش آمد. دوباره امتحان کنید.");
    }
  };

  return (
    <div className="pt-4 w-full">
      <div className="space-y-8 sm:space-y-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 sm:space-y-8">
          <p className="text-[#4EF393] font-IranNastaliq text-4xl sm:text-5xl font-bold">
            ثبت نام تکمیل شد
          </p>

          <div className="flex items-center justify-center gap-3 text-lg sm:text-xl">
            <p>کد پیگیری:</p>
            <p>
              <code className="font-mono bg-gray-800 px-2 py-1 rounded">
                {tracking_code}
              </code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mt-12 sm:mt-16 lg:mt-20 w-full max-w-5xl mx-auto px-2 sm:px-0">
          {/* ثبت‌نام کننده */}
          <div className="space-y-8 sm:space-y-10">
            <p className="text-white font-IranNastaliq text-xl sm:text-2xl font-medium text-center md:text-right">
              اطلاعات شخص ثبت نام کننده
            </p>

            <div className="space-y-5 text-base sm:text-xl">
              <div className="flex items-center gap-4 justify-between md:justify-start sm:gap-20">
                <p className="w-[130px] sm:w-[140px] shrink-0">شماره همراه:</p>
                <p className="font-medium">{phoneNumber}</p>
              </div>

              <div className="flex items-center gap-4 justify-between md:justify-start sm:gap-20">
                <p className="w-[130px] sm:w-[140px] shrink-0">کدملی:</p>
                <p className="font-medium">{nationalCode}</p>
              </div>

              {/* اگر اطلاعات بیشتری از registrant داری می‌تونی اینجا اضافه کنی */}
              {registrant?.birthDate && (
                <div className="flex items-center gap-4 justify-between md:justify-start sm:gap-20">
                  <p className="w-[130px] sm:w-[140px] shrink-0">تاریخ تولد:</p>
                  <p className="font-medium">{registrant.birthDate}</p>
                </div>
              )}
            </div>
          </div>

          {/* اعضای خانواده / مهمان */}
          <div className="space-y-8 sm:space-y-10">
            <p className="text-white font-IranNastaliq text-xl sm:text-2xl font-medium text-center md:text-right">
              اعضای مهمان یا خانواده
            </p>

            <div className="space-y-5 text-base sm:text-xl">
              {family_national_codes?.length > 0 ? (
                family_national_codes.map((code: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 justify-between md:justify-start sm:gap-20"
                  >
                    <p className="w-[170px] sm:w-[190px] shrink-0">
                      کد ملی مهمان {i + 1}:
                    </p>
                    <p className="font-medium">{code}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center pt-4">
                  مهمانی ثبت نشده است
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 sm:mt-24 md:mt-[220px] px-4">
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