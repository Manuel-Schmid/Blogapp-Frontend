import { describe, it, expect } from "vitest";
import {
  formatDateLong,
  formatDateShort,
  formatFullname,
  getImageURL,
} from "../../helper/helper.ts";

describe("Helper functions", () => {
  it("should return date in format 'dd/mm/yyyy'", () => {
    const formattedDateShort = formatDateShort(
      "2022-11-20T09:28:51.116911+00:00"
    );
    expect(formattedDateShort).toMatch("20/11/2022");
  });

  it("should return an invalid date", () => {
    const formattedDateShort = formatDateShort(
      "2022-11-40T09:28:51.116911+00:00"
    );
    expect(formattedDateShort).toMatch("Invalid Date");
  });

  it("should return date in format 'DD, dd/mm/yyyy'", () => {
    const formattedDateLong = formatDateLong(
      "2022-11-20T09:28:51.116911+00:00"
    );
    expect(formattedDateLong).toMatch("Sunday, 20/11/2022");
  });

  it("should return date in format 'DD, dd/mm/yyyy'", () => {
    const formattedDateLong = formatDateLong(
      "2022-11-23T09:28:51.116911+00:00"
    );
    expect(formattedDateLong).toMatch("Wednesday, 23/11/2022");
  });

  it("should return an invalid date", () => {
    const formattedDateLong = formatDateLong(
      "2022-13-20T09:28:51.116911+00:00"
    );
    expect(formattedDateLong).toMatch("Invalid Date");
  });

  it("should return a correctly formatted image url", () => {
    const imageURL = getImageURL("images/lake.jpg");
    expect(imageURL).toMatch("http://api.blogapp.com/media/images/lake.jpg");
  });

  it("should return first and last name separated by a whitespace", () => {
    const fullName = formatFullname("Winston", "Smith");
    expect(fullName).toMatch("Winston Smith");
  });

  it("should return a trimmed string of just the first name", () => {
    const fullName = formatFullname("George", "");
    expect(fullName).toEqual("George");
  });

  it("should return a trimmed string of just the last name", () => {
    const fullName = formatFullname("", "Orwell");
    expect(fullName).toEqual("Orwell");
  });
});
