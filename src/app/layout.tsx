import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/components/layout/BasicLayout";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <BasicLayout>
          <AntdRegistry>{children}</AntdRegistry>
        </BasicLayout>
      </body>
    </html>
  );
}
