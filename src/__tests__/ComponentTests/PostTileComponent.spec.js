import { describe, it, expect } from "vitest";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import PostTileComponent from "../../components/posts-overview/PostTileComponent.vue";

describe("PostTileComponent", () => {
  it("should render post data correctly", () => {
    const wrapper = shallowMount(PostTileComponent, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
      propsData: {
        post: {
          title: "Fortes Fortuna Adiuvat",
          slug: "fortes-fortuna-adjuvat",
          image: {
            name: "images/Landscape-Color.jpg",
          },
          dateCreated: "2022-08-16T06:31:23.250000+00:00",
          likeCount: 3,
          commentCount: 2,
          category: {
            name: "Comp Sci",
            slug: "comp-sci",
          },
          owner: {
            firstName: "Arthur C.",
            lastName: "Clarke",
          },
        },
      },
    });

    expect(wrapper.findAll("p").length).toEqual(3);
    expect(wrapper.findAll("p").at(0).text()).toMatch("Fortes Fortuna Adiuvat");
    expect(wrapper.findAll("p").at(1).text()).toMatch(
      "Arthur C. Clarke - 16/08/2022"
    );
    expect(wrapper.findAll("p").at(2).text()).toMatch("Comp Sci");
    expect(wrapper.findAll("img").at(0).attributes().src).toMatch(
      "http://api.blogapp.com/media/images/Landscape-Color.jpg"
    );
  });
});
