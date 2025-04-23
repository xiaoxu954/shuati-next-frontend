"use client";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, PopconfirmProps, Space } from "antd";
import { useRef, useState } from "react";
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
} from "@/api/userController";
import CreateModal from "@/app/admin/user/components/CreateModal";
import UpdateModal from "@/app/admin/user/components/UpdateModal";

const UserManagePage: React.FC = () => {
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  //确认删除提示
  const handleDelete = async (row: API.User) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteUserUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("删除成功");
      // 删除成功后刷新表格
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };
  const delCancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };
  const columns: ProColumns<API.User>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "账号",
      dataIndex: "userAccount",
      valueType: "text",
    },
    {
      title: "用户名",
      dataIndex: "userName",
      valueType: "text",
    },
    {
      title: "头像",
      dataIndex: "userAvatar",
      valueType: "image",
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: "简介",
      dataIndex: "userProfile",
      valueType: "textarea",
    },
    {
      title: "权限",
      dataIndex: "userRole",
      valueEnum: {
        user: {
          text: "用户",
        },
        admin: {
          text: "管理员",
        },
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </a>
          <Popconfirm
            key="deleteable"
            title="删除提示"
            description={"确定删除 " + record.userName + " ?"}
            onConfirm={() => handleDelete(record)}
            onCancel={delCancel}
            okText="确定"
            cancelText="取消"
          >
            <a key="del" style={{ color: "red" }}>
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ProTable<API.User>
        headerTitle={"查询表格"}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];

          const res = await listUserByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);
          return {
            success: res.code === 0,
            data: res.data?.records || [],
            total: Number(res.data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </div>
  );
};
export default UserManagePage;
