"use client";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Button, Dropdown } from "antd";
import React from "react";
import Link from "next/link";
import GlobalFooter from "@/components/Footer/GlobalFooter";
import Image from "next/image";
import { LogoutOutlined } from "@ant-design/icons";
import menus from "../../../config/menus";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        layout={"top"}
        title="面试刷题平台"
        logo={
          <Image
            src="/assets/logo.jpg"
            alt="面试题网站"
            width={32}
            height={32}
          />
        }
        location={{
          pathname,
        }}
        // 标题渲染
        headerTitleRender={(logo, title, _) => {
          return (
            <a href="https://www.mianshiya.com" target="_blank">
              {logo}
              {title}
            </a>
          );
        }}
        // 菜单项数据
        menuDataRender={() => {
          return menus;
        }}
        menu={{
          type: "group",
        }}
        avatarProps={{
          src: "/assets/logo.png",
          size: "small",
          title: "xxx",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: "center",
                paddingBlockStart: 12,
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 菜单渲染
        menuItemRender={(item, dom) => (
            <Link href={item.path || "/"} target={item.target}>{dom}</Link>
        )}

        footerRender={() => <GlobalFooter />}
      >
        <PageContainer
          breadcrumb={{
            routes: [],
          }}
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
          ]}
        >
          <ProCard
            style={{
              height: "200vh",
              minHeight: 800,
            }}
          >
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
}
