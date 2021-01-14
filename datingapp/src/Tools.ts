export class DateTools {
  static dateToValue(date: Date) {
    let inp = document.createElement("input");
    inp.type = "date";
    inp.valueAsDate = date as Date;
    return inp.value;
  }
}