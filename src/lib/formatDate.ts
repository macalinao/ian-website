const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  day: "numeric",
  timeZone: "UTC",
});

export const formatDate = (date: Date) => dateFormat.format(date);
