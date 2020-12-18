import { InhyukSampleVideoList } from "../../../app/data/yada/InhyukSampleVideoList";

const updatedVideoIds = [
  "Qid9GeGB5eE",
  "sZKQqcF7I14",
  "uCZqLkA5TxA",
  "8P7wTrCxUNk",
  "rS5O8SHVYBM",
];
export default InhyukSampleVideoList.map(({ videoId }) => videoId).concat(
  updatedVideoIds
);
