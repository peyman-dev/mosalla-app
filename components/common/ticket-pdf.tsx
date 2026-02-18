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
        padding: 50,
        fontFamily: "YekanBakh",
        direction: "rtl",
        backgroundColor: "#184642",
        color: "#f1f5f9",
    },
    title: {
        fontSize: 38,
        textAlign: "center",
        color: "#4EF393",
        marginTop: 40,
        marginBottom: 20,
        fontWeight: "bold",
    },
    trackingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
        fontSize: 22,
    },
    trackingLabel: {
        color: "#e2e8f0",
        paddingLeft: "6px",
        paddingRight: "6px",
    },
    codeBox: {
        backgroundColor: "#0f2a2a",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 12,
    },
    codeText: {
        fontSize: 22,
        color: "#e0f2fe",
        fontWeight: "semibold",
    },
    sectionTitle: {
        fontSize: 26,
        color: "#cbd5e1",
        marginTop: 40,
        marginBottom: 16,
        textAlign: "right",
        fontWeight: "bold",
    },
    infoRow: {
        flexDirection: "row-reverse",          // مهم ← اینجا جهت را برعکس کردیم
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 14,
        fontSize: 20,
    },
    label: {
        width: 160,
        color: "#94a3b8",
        textAlign: "right",
        marginLeft: 20,                        // فاصله از مقدار
    },
    value: {
        flex: 1,
        textAlign: "left",                     // مقدار سمت چپ (در چیدمان RTL طبیعی است)
        fontWeight: "semibold",
        color: "#f8fafc",
    },
    familyRow: {
        flexDirection: "row-reverse",          // مهم
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 12,
        fontSize: 20,
    },
    emptyMessage: {
        fontSize: 20,
        color: "#94a3b8",
        textAlign: "center",
        marginTop: 20,
    },
});

interface TicketPDFProps {
    registerer: {
        phone: string;
        nationalCode: string;
        fullName: string;     // اضافه شد
    };
    familyMembers: string[];
    trackingCode: string;
}

const TicketPDF: React.FC<TicketPDFProps> = ({
    registerer,
    familyMembers,
    trackingCode,
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>ثبت نام تکمیل شد</Text>

                <View style={styles.trackingContainer}>
                    <View style={styles.codeBox}>
                        <Text style={styles.codeText}>{trackingCode}</Text>
                    </View>
                    <Text style={styles.trackingLabel}>کد پیگیری</Text>
                </View>

                <Text style={styles.sectionTitle}>اطلاعات شخص ثبت نام کننده</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>نام و نام خانوادگی</Text>
                    <Text style={styles.value}>{registerer.fullName}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>شماره همراه</Text>
                    <Text style={styles.value}>{registerer.phone}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>کدملی</Text>
                    <Text style={styles.value}>{registerer.nationalCode}</Text>
                </View>

                <Text style={styles.sectionTitle}>اعضای مهمان یا خانواده</Text>

                {familyMembers.length > 0 ? (
                    familyMembers.map((code, index) => (
                        <View key={index} style={styles.familyRow}>
                            <Text style={styles.label}>کد ملی مهمان {index + 1}</Text>
                            <Text style={styles.value}>{code}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>مهمانی ثبت نشده است</Text>
                )}
            </Page>
        </Document>
    );
};

export default TicketPDF;