import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

Font.register({
    family: "YekanBakh",
    src: "/fonts/YekanBakhFaNum-Regular.woff",
});
Font.register({
    family: "YekanBakh",
    src: "/fonts/YekanBakhFaNum-SemiBold.woff",
    fontWeight: "semibold",
});
Font.register({
    family: "YekanBakh",
    src: "/fonts/YekanBakhFaNum-Bold.woff",
    fontWeight: "bold",
});

const styles = StyleSheet.create({
    page: {
        padding: 60,
        fontFamily: "YekanBakh",
        direction: "rtl",
        backgroundColor: "#0f2525",
        color: "#f1f5f9",
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        textAlign: "center",
        color: "#4ade80",
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        color: "#a3e635",
        marginBottom: 30,
    },
    trackingBox: {
        backgroundColor: "#0a1a1a",
        borderWidth: 1.5,
        borderColor: "#4ade80",
        borderRadius: 10,
        padding: 20,
        marginBottom: 40,
        alignItems: "center",
    },
    trackingLabel: {
        fontSize: 20,
        color: "#d1fae5",
        marginBottom: 10,
    },
    trackingCode: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ecfdf5",
        letterSpacing: 1.5,
    },
    sectionTitle: {
        fontSize: 22,
        color: "#a3e635",
        fontWeight: "bold",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#2a5a5a",
        paddingBottom: 8,
    },
    row: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginBottom: 14,
        fontSize: 18,
        paddingVertical: 4,
    },
    label: {
        width: 180,
        color: "#94a3b8",
        textAlign: "right",
    },
    value: {
        flex: 1,
        textAlign: "left",
        color: "#f8fafc",
        fontWeight: "semibold",
    },
    footer: {
        position: "absolute",
        bottom: 40,
        left: 60,
        right: 60,
        textAlign: "center",
        color: "#64748b",
        fontSize: 13,
        borderTopWidth: 1,
        borderTopColor: "#2a5a5a",
        paddingTop: 12,
    },
});

interface TicketPDFProps {
    registerer: {
        phone: string;
        nationalCode: string;
        fullName: string;
    };
    familyMembers: string[];
    trackingCode: string;
    ramadanDay?: number;
    attendanceDate?: string;     // ← جدید
    submittedAt?: string;
}

const TicketPDF: React.FC<TicketPDFProps> = ({
    registerer,
    familyMembers,
    trackingCode,
    ramadanDay,
    attendanceDate,
    submittedAt,
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>کارت ورود - ماه رمضان</Text>
                    <Text style={styles.subtitle}>ثبت‌نام با موفقیت انجام شد</Text>
                </View>

                <View style={styles.trackingBox}>
                    <Text style={styles.trackingLabel}>کد پیگیری</Text>
                    <Text style={styles.trackingCode}>{trackingCode}</Text>
                </View>

                <Text style={styles.sectionTitle}>اطلاعات رزرو</Text>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.label}>روز ماه رمضان</Text>
                        <Text style={styles.value}>
                            {ramadanDay ? `روز ${ramadanDay}` : "—"}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>تاریخ حضور</Text>
                        <Text style={styles.value}>{attendanceDate || "—"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>زمان ثبت‌نام</Text>
                        <Text style={styles.value}>{submittedAt || "—"}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>مشخصات ثبت‌کننده</Text>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.label}>نام و نام خانوادگی</Text>
                        <Text style={styles.value}>{registerer.fullName || "—"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>شماره همراه</Text>
                        <Text style={styles.value}>{registerer.phone || "—"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>کد ملی</Text>
                        <Text style={styles.value}>{registerer.nationalCode || "—"}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>همراهان / اعضای خانواده</Text>
                {familyMembers.length > 0 ? (
                    familyMembers.map((code, i) => (
                        <View key={i} style={styles.row}>
                            <Text style={styles.label}>کد ملی نفر {i + 1}</Text>
                            <Text style={styles.value}>{code}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ fontSize: 18, color: "#94a3b8", textAlign: "center", marginTop: 20 }}>
                        هیچ همراهی ثبت نشده است
                    </Text>
                )}

                <Text style={styles.footer}>
                    این کارت تنها برای احراز هویت در روز حضور معتبر است • لطفاً نسخه چاپ‌شده یا دیجیتال آن را همراه داشته باشید
                </Text>
            </Page>
        </Document>
    );
};

export default TicketPDF;