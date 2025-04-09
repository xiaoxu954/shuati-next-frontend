"use client";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { updateQuestionBankUsingPost } from "@/api/questionBankController";

interface Props {
  oldData?: API.QuestionBank;
  visible: boolean;
  columns: ProColumns<API.QuestionBank>[];
  onSubmit: (values: API.QuestionBankUpdateRequest) => void;
  onCancel: () => void;
}

const UpdateModal = (props: Props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  const handleUpdate = async (values: API.QuestionBankUpdateRequest) => {
    const hide = message.loading("正在更新");
    try {
      await updateQuestionBankUsingPost(values);
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
          initialValues: oldData,
        }}
        onSubmit={async (values: API.QuestionBankUpdateRequest) => {
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
