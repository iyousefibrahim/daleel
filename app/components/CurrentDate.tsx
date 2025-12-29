import { Paragraph } from "tamagui";
import { formatDateWithWeekday } from "../lib/utils/dateUtils";

const CurrentDate = () => {
  const formattedDate = formatDateWithWeekday();
  return (
    <Paragraph
      fontFamily="$body"
      color="$gray600"
      fontSize="$3"
      marginRight="$4"
    >
      اليوم، {formattedDate}
    </Paragraph>
  );
};

export default CurrentDate;
