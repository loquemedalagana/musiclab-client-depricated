import { SampleVideoList } from "../../../app/data/yada/InhyukSampleVideoList";

const updatedVideoIds = [
  "Qid9GeGB5eE",
  "sZKQqcF7I14",
  "uCZqLkA5TxA",
  "8P7wTrCxUNk",
];
export default SampleVideoList.map(({ videoId }) => videoId).concat(
  updatedVideoIds
);
