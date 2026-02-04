import React from "react";
import { Box, Link } from "@mui/material";
import { SectionHeading, EntryContainer, EmptySectionText } from "./Components";
import { StructuredDetails } from "./StructuredDetails";

const Volunteering = ({ experienceData }) => {
  return (
    <Box>
      <SectionHeading>Leadership</SectionHeading>
      {experienceData.map((exp, index) => {
        const companyContent = (
          <span>
            {exp.title} @{" "}
            {exp.orgUrl ? (
              <Link
                href={exp.orgUrl}
                target="_blank"
                rel="noopener"
                color="secondary"
                underline="hover"
                onClick={(e) => e.stopPropagation()}
              >
                {exp.organization}
              </Link>
            ) : (
              exp.organization
            )}
          </span>
        );

        return (
          <EntryContainer
            key={index}
            date={exp.dates}
            company={companyContent}
            caption={exp.caption || ""}
            logo={exp.logo}
          >
            <StructuredDetails details={exp.details} />
          </EntryContainer>
        );
      })}
      {experienceData.length === 0 && (
        <EmptySectionText label="No experience listed" />
      )}
    </Box>
  );
};

export default Volunteering;
