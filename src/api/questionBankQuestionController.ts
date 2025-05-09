// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 添加题库题目关系 POST /api/questionBankQuestion/add */
export async function addQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>("/api/questionBankQuestion/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** batchDeleteQuestions POST /api/questionBankQuestion/delete/batch */
export async function batchDeleteQuestionsUsingPost(
  body: API.QuestionBatchDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    "/api/questionBankQuestion/delete/batch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除题库题目关系 POST /api/questionBankQuestion/remove */
export async function removeQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionRemoveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>("/api/questionBankQuestion/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** batchRemoveQuestionsFromBank POST /api/questionBankQuestion/remove/batch */
export async function batchRemoveQuestionsFromBankUsingPost(
  body: API.QuestionBankQuestionBatchRemoveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    "/api/questionBankQuestion/remove/batch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    },
  );
}
