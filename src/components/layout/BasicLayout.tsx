"use client";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { Dropdown, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { menus } from "../../../config/menus";
import { userLogoutUsingPost } from "@/api/userController";
import { DEFAULT_USER, setLoginUser } from "@/stores/loginUser";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

  const loginUser = useSelector((state: RootState) => state.loginUser);
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + (e as Error).message);
    }
    return;
  };

  return (
    <div
      id="BasicLayout"
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
          src: loginUser.userAvatar || "/assets/logo.jpg",
          size: "small",
          title: loginUser.userName || "测试号",
          render: (props, dom) => {
            return loginUser.id ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      userLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            ) : (
              <div onClick={() => router.push("/user/login")}>{dom}</div>
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
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
        //底部
        // footerRender={() => <GlobalFooter />}
      >
        <PageContainer
          breadcrumb={{
            routes: [],
          }}
        >
          <ProCard>
            {children}
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
}
