"use client";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { updateQuestionUsingPost } from "@/api/questionController";

interface Props {
  oldData?: API.Question;
  visible: boolean;
  columns: ProColumns<API.Question>[];
  onSubmit: (values: API.QuestionUpdateRequest) => void;
  onCancel: () => void;
}

const UpdateModal = (props: Props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;
  // 表单转换
  let initValues: typeof props.oldData = { ...props.oldData }; // 显式类型声明
  if (props.oldData?.tags) {
    try {
      initValues.tags = JSON.parse(oldData.tags) || [];
    } catch (e) {
      initValues.tags = []; // 异常时置空
      console.error("解析 tags 失败:", e);
    }
  }
  const handleUpdate = async (values: API.QuestionUpdateRequest) => {
    const hide = message.loading("正在更新");
    try {
      await updateQuestionUsingPost(values);
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
        onSubmit={async (values: API.QuestionUpdateRequest) => {
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
