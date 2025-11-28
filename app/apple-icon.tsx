import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
          borderRadius: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* Main card */}
        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "95px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)",
            borderRadius: "12px",
            top: "35px",
            left: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        />

        {/* Content lines */}
        <div
          style={{
            position: "absolute",
            width: "50px",
            height: "6px",
            background: "#E5E7EB",
            borderRadius: "3px",
            top: "52px",
            left: "45px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "70px",
            height: "6px",
            background: "#D1D5DB",
            borderRadius: "3px",
            top: "65px",
            left: "45px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "40px",
            height: "6px",
            background: "#E5E7EB",
            borderRadius: "3px",
            top: "78px",
            left: "45px",
          }}
        />

        {/* Checkbox checked */}
        <div
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            background: "#10B981",
            borderRadius: "3px",
            top: "95px",
            left: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "8px",
            color: "white",
          }}
        >
          ✓
        </div>

        {/* Checkbox unchecked */}
        <div
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            background: "#F3F4F6",
            border: "1px solid #D1D5DB",
            borderRadius: "3px",
            top: "95px",
            left: "63px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            background: "#F3F4F6",
            border: "1px solid #D1D5DB",
            borderRadius: "3px",
            top: "95px",
            left: "81px",
          }}
        />

        {/* Question mark badge */}
        <div
          style={{
            position: "absolute",
            width: "56px",
            height: "56px",
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
            borderRadius: "50%",
            bottom: "25px",
            right: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "bold",
            color: "white",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          ?
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
