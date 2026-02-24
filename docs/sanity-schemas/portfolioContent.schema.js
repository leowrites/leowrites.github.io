export const portfolioContent = {
  name: "portfolioContent",
  title: "Portfolio Content",
  type: "document",
  fields: [
    {
      name: "contentKey",
      title: "Content Key",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "markdown",
      title: "Markdown",
      type: "text",
      rows: 20,
      validation: (rule) => rule.required(),
    },
  ],
};
