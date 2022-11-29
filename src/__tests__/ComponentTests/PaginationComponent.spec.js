import { describe, it, expect } from "vitest/dist/index.js";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import PaginationComponent from "../../components/posts-overview/PaginationComponent.vue";

describe("PaginationComponent", () => {
  const route = {
    name: "posts",
    query: "",
  };
  const globalOptions = {
    stubs: {
      FontAwesomeIcon: true,
      RouterLink: RouterLinkStub,
    },
    mocks: {
      route,
    },
  };

  it("should render 3 pagination links (3 pages), the first page should be active", () => {
    const wrapper = shallowMount(PaginationComponent, {
      global: globalOptions,
      propsData: {
        numPostPages: 3,
        activePage: 1,
      },
    });

    const paginationItems = wrapper.findAll("div").at(1).findAll("div");
    expect(paginationItems.length).toEqual(5);
    expect(wrapper.findAll("a").length).toEqual(4);
    expect(wrapper.findAll(".invisible").length).toEqual(2);
    expect(paginationItems.at(1).findAll("a").length).toEqual(0);
    expect(paginationItems.at(1).text()).toEqual("1");
  });

  it("should render 9 pagination links (100 pages), the central pagination item should be active", () => {
    const wrapper = shallowMount(PaginationComponent, {
      global: globalOptions,
      propsData: {
        numPostPages: 100,
        activePage: 35,
      },
    });

    const paginationItems = wrapper.findAll("div").at(1).findAll("div");
    expect(paginationItems.length).toEqual(9);
    expect(wrapper.findAll("a").length).toEqual(8);
    expect(wrapper.findAll(".invisible").length).toEqual(0);
    expect(paginationItems.at(4).findAll("a").length).toEqual(0);
    expect(paginationItems.at(4).text()).toEqual("35");
  });
});
