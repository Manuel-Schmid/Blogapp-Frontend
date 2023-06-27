const formatDatePrecise = (date: string) => {
  let options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString(localStorage.lang, options);
};

const formatDateShort = (date: string) => {
  let options: any = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString(localStorage.lang, options);
};

const formatDateLong = (date: string) => {
  let options: any = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString(localStorage.lang, options);
};

const getImageURL = (image: string) => {
  return `${import.meta.env.VITE_MEDIA_URL}${image}`;
};

const formatFullname = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

const cleanSubscriptionSort = (sort: string) => {
  return sort.replace("author", "author__first_name");
};

export {
  formatDatePrecise,
  formatDateShort,
  formatDateLong,
  formatFullname,
  getImageURL,
  cleanSubscriptionSort,
};
