"use client";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { addQuestionUsingPost } from "@/api/questionController";

interface Props {
  visible: boolean;
  columns: ProColumns<API.Question>[];
  onSubmit: (values: API.QuestionAddRequest) => void;
  onCancel: () => void;
}

const CreateModal = (props: Props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  const handleAdd = async (fields: API.QuestionAddRequest) => {
    const hide = message.loading("正在添加");
    try {
      await addQuestionUsingPost(fields);
      hide();
      message.success("创建成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("创建失败，" + error.message);
      return false;
    }
  };
  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.QuestionAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
