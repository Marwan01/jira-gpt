import ForgeUI, {
  render,
  Fragment,
  Text,
  IssuePanel,
  useProductContext,
  useState,
} from "@forge/ui";
import { getComments } from "./api/getComments";
import { callGpt } from "./api/gpt";
import { getIssueDescription } from "./api/getDescription";

const App = () => {
  const context = useProductContext();
  const issueKey = context.platformContext.issueKey;

  const [description] = useState(async () => {
    return await getIssueDescription(issueKey);
  });
  const [comments] = useState(async () => {
    return await getComments(issueKey);
  });
  const [details] = useState(async () => {
    return await callGpt(`description:${description} comments:${comments}`);
  });

  return (
    <Fragment>
      <Text>
        {details}
      </Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
