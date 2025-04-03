"use client";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Button, ConfigProvider, Dropdown, Input } from "antd";
import { usePathname } from "next/navigation";
import GlobalFooter from "@/components/GlobalFooter";
import Link from "next/link";
import "./index.css";
import React from "react";

import { menus } from "../../config/menus";

import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import {
  GithubFilled,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";

interface Props {
  children: React.ReactNode;
}

const loginUser = useSelector((state: RootState) => state.loginUser);

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  const SearchInput = () => {
    return (
      <div
        key="SearchOutlined"
        aria-hidden
        style={{
          display: "flex",
          alignItems: "center",
          marginInlineEnd: 24,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Input
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
          }}
          prefix={<SearchOutlined />}
          placeholder="搜索方案"
          variant="borderless"
        />
        <PlusCircleFilled
          style={{
            fontSize: 24,
          }}
        />
      </div>
    );
  };
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById("test-pro-layout") || document.body;
          }}
        >
          <ProLayout
            layout="top"
            title="面试刷题平台"
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
            footerRender={() => <GlobalFooter />}
            // 菜单项数据
            // 菜单项数据
            menuDataRender={() => {
              return menus;
            }}
            // 操作渲染
            actionsRender={(props) => {
              if (props.isMobile) return [];
              return [
                <SearchInput key="search" />,
                <a
                  key="github"
                  href="https://github.com/liyupi/mianshiya-next"
                  target="_blank"
                >
                  <GithubFilled key="GithubFilled" />
                </a>,
              ];
            }}
            // 菜单渲染
            menuItemRender={(item, dom) => (
              <Link href={item.path || "/"}>{dom}</Link>
            )}
            avatarProps={{
              src: loginUser.userAvatar || "/assets/logo.png",
              size: "small",
              title: loginUser.userName || "安妮",
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
          >
            <PageContainer
              extra={[
                <Button key="3">操作</Button>,
                <Button key="2">操作</Button>,
              ]}
              subTitle="简单的描述"
              footer={[
                <Button key="3">重置</Button>,
                <Button key="2" type="primary">
                  提交
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

            <SettingDrawer
              pathname={pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === "undefined") return e;
                return document.getElementById("test-pro-layout");
              }}
              disableUrlParams={false}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
}
