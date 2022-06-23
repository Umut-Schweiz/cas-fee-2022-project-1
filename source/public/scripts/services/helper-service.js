export default class Helper {

  static dateFormatter(pDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(pDate).toLocaleString("de-DE", options);
    return formattedDate;
  }

  static calculateRemainingDay(pCreatedDate, pDueDate) {
    const diffInMs = new Date(pDueDate) - new Date(pCreatedDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) {
      return "Time over";
    }
    if (diffInDays === 1) {
      return "in a day";
    }
    return `in ${diffInDays.toFixed()} days`;
  }

  static importanceSymbole(importanceCaunt) {
    let symbole = "";
    for (let index = 1; index <= importanceCaunt; index++) {
      symbole += "⚠️";
    }
    return symbole;
  }
}
