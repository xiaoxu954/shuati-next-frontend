// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 添加题库 POST /api/questionBank/add */
export async function addQuestionBankUsingPost(
  body: API.QuestionBankAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>("/api/questionBank/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题库 POST /api/questionBank/delete */
export async function deleteQuestionBankUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>("/api/questionBank/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取题库 GET /api/questionBank/get/vo */
export async function getQuestionBankVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionBankVO_>("/api/questionBank/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取列表（仅管理员） POST /api/questionBank/list/page */
export async function listQuestionBankByPageUsingPost(
  body: API.QuestionBankQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionBank_>(
    "/api/questionBank/list/page",
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

/** 分页获取列表（封装类） POST /api/questionBank/list/page/vo */
export async function listQuestionBankVoByPageUsingPost(
  body: API.QuestionBankQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionBankVO_>(
    "/api/questionBank/list/page/vo",
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

/** 更新题库（仅管理员） POST /api/questionBank/update */
export async function updateQuestionBankUsingPost(
  body: API.QuestionBankUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>("/api/questionBank/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
