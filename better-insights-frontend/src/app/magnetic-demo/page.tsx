import { MagneticCursorDemo } from "@/components/ui/magnetic-cursor-demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnetic Cursor Demo | Better Insights",
  description: "Interactive demo of 21st.dev Magnetic Cursor component using GSAP and Vecteur",
};

export default function MagneticDemoPage() {
  return <MagneticCursorDemo />;
}
