import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import App from "../App";
// import BasicDisplay from "../components/common/basicDisplay";

const strMsg = " rendering without crash";
export const appComponents = [
  { name: Enums.app, desc: "app", component: <App /> },
];

export const getComponentByName = (name) => {
  return appComponents.filter((comp) => comp.name === name)[0];
};

export const baseChecker = (desc, component) => {
  it(`testing ${desc} - ${strMsg}`, () => {
    shallow(component);
  });
};

export const snapshotChecker = (desc, component) => {
  it(`${desc} snapshot`, () => {
    const tree = shallow(component);
    expect(toJson(tree)).toMatchSnapshot();
    tree.unmount();
  });
};

describe("ignore", () => {
  it("ignore this", () => {
    expect(1).toEqual(1);
  });
});
