import Title from "antd/es/typography/Title";
import QuestionTable from "@/components/QuestionTable";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import "./index.css";
import BaseResponsePageQuestionVO_ = API.BaseResponsePageQuestionVO_;

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  const { q: searchText } = searchParams;
  let questionList = [];
  let total = 0;

  try {
    const questionRes: BaseResponsePageQuestionVO_ =
      await listQuestionVoByPageUsingPost({
        title: searchText,
        pageSize: 12,
        sortField: "createTime",
        sortOrder: "descend",
      });
    questionList = questionRes.data.records ?? [];
    total = questionRes.data.total ?? 0;
  } catch (e) {
    console.error("获取题目列表失败，" + (e as Error).message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <div>
        <QuestionTable
          defaultQuestionList={questionList}
          defaultTotal={total}
          defaultSearchParams={{
            title: searchText,
          }}
        />
      </div>
    </div>
  );
}
