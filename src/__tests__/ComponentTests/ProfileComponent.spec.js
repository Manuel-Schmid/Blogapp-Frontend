import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ProfileComponent from "../../components/ProfileComponent.vue";

describe("ProfileComponent", () => {
  const defaultProps = {
    userData: {
      id: "1",
      username: "admin",
      email: "admin@example.lo",
      firstName: "Winston",
      lastName: "Smith",
      userStatus: {
        verified: true,
        archived: false,
        secondaryEmail: null,
        isAuthor: false,
      },
    },
    authorRequest: null,
    firstNameEditable: false,
    lastNameEditable: false,
    emailChangeEmailSent: false,
  };

  const mountOptions = {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    propsData: defaultProps,
  };

  it("should display the user data in a table", () => {
    const wrapper = shallowMount(ProfileComponent, mountOptions);

    expect(wrapper.findAll("table").length).toEqual(1);
    expect(wrapper.findAll("div").at(3).text()).contains(
      "UsernameadminFirst nameWinston Last nameSmith Emailadmin@example.lo"
    );
  });

  it("should display that the user has author permissions", () => {
    const customProps = JSON.parse(JSON.stringify(defaultProps));
    customProps.userData.userStatus.isAuthor = true;
    const customMountOptions = JSON.parse(JSON.stringify(mountOptions));
    customMountOptions.propsData = customProps;
    const wrapper = shallowMount(ProfileComponent, customMountOptions);

    expect(wrapper.findAll("div").length).toEqual(10);
    expect(wrapper.findAll("div").at(5).text()).toMatch("You are an author");
  });

  it("should display an option to request author permissions", () => {
    const wrapper = shallowMount(ProfileComponent, mountOptions);

    expect(wrapper.findAll("div").length).toEqual(7);
    expect(wrapper.findAll("div").at(2).text()).toMatch("Become an author");
  });

  it("should display info about the pending author request including its creation date", () => {
    const customProps = JSON.parse(JSON.stringify(defaultProps));
    customProps.authorRequest = {
      dateOpened: "2022-11-18T09:28:51.116911+00:00",
      dateClosed: null,
      status: "PENDING",
    };
    const customMountOptions = JSON.parse(JSON.stringify(mountOptions));
    customMountOptions.propsData = customProps;
    const wrapper = shallowMount(ProfileComponent, customMountOptions);

    expect(wrapper.findAll("div").length).toEqual(10);
    expect(wrapper.findAll("div").at(2).text()).toMatch(
      "Your author request was submitted on 18/11/2022 and is still pending"
    );
  });

  it("should inform the user about his rejected author request including the date of the rejection", () => {
    const customProps = JSON.parse(JSON.stringify(defaultProps));
    customProps.authorRequest = {
      dateOpened: "2022-11-18T09:28:51.116911+00:00",
      dateClosed: "2022-11-20T09:28:51.116911+00:00",
      status: "REJECTED",
    };
    const customMountOptions = JSON.parse(JSON.stringify(mountOptions));
    customMountOptions.propsData = customProps;
    const wrapper = shallowMount(ProfileComponent, customMountOptions);

    expect(wrapper.findAll("div").length).toEqual(10);
    expect(wrapper.findAll("div").at(2).text()).toMatch(
      "Your author request was rejected on 20/11/2022"
    );
  });
});