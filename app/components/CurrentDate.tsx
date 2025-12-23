import { Paragraph } from "tamagui";

const CurrentDate = () => {
  const formattedDate = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date() as Date);

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
