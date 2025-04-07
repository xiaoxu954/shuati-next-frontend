"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/components/layout/BasicLayout";
import React from "react";
import store from "@/stores";
import { Provider } from "react-redux";
import AccessLayout from "@/components/layout/AccessLayout";
import InitLayout from "@/components/layout/InitLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <AccessLayout>
                <BasicLayout>{children}</BasicLayout>
              </AccessLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
