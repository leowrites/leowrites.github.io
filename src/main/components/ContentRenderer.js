import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { StructuredDetails } from "../StructuredDetails";

export const ContentRenderer = ({ item }) => {
  return item.content || item.contentKey ? (
    <MarkdownRenderer content={item.content} contentKey={item.contentKey} />
  ) : (
    <StructuredDetails details={item.details} />
  );
};
