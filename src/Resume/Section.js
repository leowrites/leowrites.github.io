import React from "react";
import { Box, Link } from "@mui/material";
import { SectionHeading, EntryContainer, EmptySectionText } from "./Components";
import { StructuredDetails } from "./StructuredDetails";

const Section = ({ sectionTitle, items }) => {
  return (
    <Box>
      <SectionHeading>{sectionTitle}</SectionHeading>
      {items.map((item, index) => {
        const titleContent =
          item.url && !item.organization ? (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener"
              color="secondary"
              underline="hover"
              onClick={(e) => e.stopPropagation()}
            >
              {item.title}
            </Link>
          ) : (
            item.title
          );

        const orgContent = item.organization ? (
          <span>
            {" @ "}
            {item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener"
                color="secondary"
                underline="hover"
                onClick={(e) => e.stopPropagation()}
              >
                {item.organization}
              </Link>
            ) : (
              item.organization
            )}
          </span>
        ) : null;

        const headerContent = (
          <span>
            {titleContent}
            {orgContent}
          </span>
        );

        return (
          <EntryContainer
            key={index}
            date={item.dates}
            company={headerContent}
            caption={item.caption || ""}
            logo={item.logo}
          >
            <StructuredDetails details={item.details} />
          </EntryContainer>
        );
      })}
      {items.length === 0 && (
        <EmptySectionText label={`No ${sectionTitle.toLowerCase()} listed`} />
      )}
    </Box>
  );
};

export default Section;
