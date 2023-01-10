const formatDateShort = (date: string, format: string | null = null) => {
  let options: any = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString(
    format ? format : localStorage.lang,
    options
  );
};

const formatDateLong = (date: string, format: string | null = null) => {
  let options: any = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString(
    format ? format : localStorage.lang,
    options
  );
};

const getImageURL = (image: string) => {
  if (!image) return false;
  return `${import.meta.env.VITE_MEDIA_URL}${image}`;
};

const formatFullname = (firstName: string, lastName: string) => {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
};

export { formatDateShort, formatDateLong, formatFullname, getImageURL };
