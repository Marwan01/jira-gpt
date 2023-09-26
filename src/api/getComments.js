import api, { route } from "@forge/api";

export const getComments = async (issueKey) => {
  // API call to get all comments of Jira issue with key 'issueKey'
  const commentsData = await api
    .asApp()
    .requestJira(route`/rest/api/3/issue/${issueKey}/comment`, {
      headers: {
        Accept: "application/json",
      },
    });

  const responseData = await commentsData.json();
  const jsonData = await responseData.comments;

  let extractedTexts = [];

  // Extracting all texts in the comments into extractedTexts array
  await jsonData.map((comment) => {
    if (comment.body && comment.body.content) {
      comment.body.content.map((contentItem) => {
        if (contentItem.type === "paragraph" && contentItem.content) {
          contentItem.content.map((textItem) => {
            if (textItem.type === "text" && textItem.text) {
              extractedTexts.push(textItem.text);
            }
          });
        }
      });
    }
  });

  return extractedTexts.join(" ");
};
