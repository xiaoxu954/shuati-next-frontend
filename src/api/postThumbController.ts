// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 点赞 / 取消点赞 POST /api/post_thumb/ */
export async function doThumbUsingPost(
  body: API.PostThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>("/api/post_thumb/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
