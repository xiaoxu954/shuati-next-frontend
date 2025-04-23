"use client";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { updateUserUsingPost } from "@/api/userController";
import React from "react";

interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserUpdateRequest) => void;
  onCancel: () => void;
}

const UpdateModal = (props: Props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;
  // 表单转换
  let initValues = { ...oldData };
  if (oldData?.tags) {
    initValues.tags = JSON.parse(oldData.tags) || [];
  }

  const handleUpdate = async (values: API.UserUpdateRequest) => {
    const hide = message.loading("正在更新");
    try {
      await updateUserUsingPost(values);
      hide();
      message.success("更新成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("更新失败，" + error.message);
      return false;
    }
  };
  return (
    <Modal
      destroyOnClose
      title={"更新"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: initValues,
        }}
        onSubmit={async (values: API.UserUpdateRequest) => {
          if (!oldData?.id || !onSubmit) {
            return;
          }
          const success = await handleUpdate({
            ...values,
            id: oldData.id,
          });
          if (success) {
            onSubmit(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
