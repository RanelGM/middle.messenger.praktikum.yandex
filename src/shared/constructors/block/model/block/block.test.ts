import { expect } from "chai";
import Sinon from "sinon";
import { Block } from "./block";
import type { BlockProps } from "../types";

describe("Block", () => {
  let BlockComponent: typeof Block;

  before(() => {
    class Component extends Block {
      constructor(props: BlockProps) {
        super({ ...props });
      }

      render(): string {
        return /* HTML */ ` <div>{{#if text}}{{ text }}{{/if}}{{#if Component}}{{{ Component }}}{{/if}}</div> `;
      }
    }

    BlockComponent = Component;
  });

  describe("Props and render", () => {
    it("should render text", () => {
      const text = "Block expected text";
      const component = new BlockComponent({ text });
      const content = component.getContent()?.textContent;

      expect(content).to.be.eq(text);
    });

    it("should render Component with text", () => {
      const text = "Component Text";
      const componentWithText = new BlockComponent({ text });
      const component = new BlockComponent({ Component: componentWithText });
      const content = component.getContent()?.textContent;

      expect(content).to.be.eq(text);
    });

    it("should update text props", () => {
      const oldText = "Block old text";
      const component = new BlockComponent({ text: oldText });

      const updatedText = "Block updated text";
      component.setProps({ text: updatedText });

      const content = component.getContent()?.textContent;

      expect(content).to.be.eq(updatedText);
    });
  });

  describe("Lifecycle", () => {
    it("should call componentDidMount once on render", () => {
      const component = new BlockComponent({ text: "text" });
      const spy = Sinon.spy(component, "componentDidMount");

      component.dispatchComponentDidMount();

      expect(spy.callCount).to.be.eq(1);
    });

    it("should call componentDidUpdate once after props change", () => {
      const component = new BlockComponent({ text: "text" });
      const spy = Sinon.spy(component, "componentDidUpdate");

      component.setProps({ text: "updated text" });

      expect(spy.callCount).to.be.eq(1);
    });
  });

  describe("Events", () => {
    it("should listen for click event", () => {
      const handleClick = Sinon.stub();
      const component = new BlockComponent({ text: "text", events: { click: handleClick } });
      const evt = new MouseEvent("click");

      component.getContent()?.dispatchEvent(evt);

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
