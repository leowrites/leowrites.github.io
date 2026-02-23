import { generateId } from "./utils";
import { StructuredDetails } from "./StructuredDetails";
import React from "react";
import { Box } from "@mui/material";
import {
  SectionHeading,
  EntryContainer,
  ProjectEntry,
  TooltipLink,
  MarkdownRenderer,
} from "./Components";

const Section = ({ sectionTitle, items, onSelect, selectedId }) => {
  return (
    <Box>
      <SectionHeading>{sectionTitle}</SectionHeading>
      {items.map((item, index) => {
        const id = generateId(item);
        const hasProjects = item.projects && item.projects.length > 0;
        const titleContent =
          item.url && !item.organization ? (
            <TooltipLink
              href={item.url}
              onClick={(e) => e.stopPropagation()}
              tooltipText={item.tooltipText}
            >
              {item.title}
            </TooltipLink>
          ) : (
            item.title
          );

        const orgContent = item.organization ? (
          <span>
            {" @ "}
            {item.url ? (
              <TooltipLink
                href={item.url}
                onClick={(e) => e.stopPropagation()}
                tooltipText={item.tooltipText}
              >
                {item.organization}
              </TooltipLink>
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

        const handleParentSelect = onSelect
          ? () => onSelect(id, <MarkdownRenderer content={item.content} />)
          : undefined;

        const isParentSelected = selectedId === id;
        const isChildSelected =
          hasProjects &&
          item.projects.some((p) => {
            const pId = generateId({
              ...p,
              title: p.projectName,
              organization: item.organization,
            });
            return pId === selectedId;
          });
        const isSelected = isParentSelected || isChildSelected;

        return (
          <EntryContainer
            key={index}
            id={id}
            date={item.dates}
            company={headerContent}
            caption={item.caption || ""}
            logo={item.logo}
            githubLink={item.githubLink}
            selected={isSelected}
            onSelect={handleParentSelect}
            isFolder={hasProjects}
          >
            {hasProjects ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {item.projects.map((proj, pIndex) => {
                  const projId = generateId({
                    ...proj,
                    title: proj.projectName,
                    organization: item.organization,
                  });
                  return (
                    <ProjectEntry
                      key={pIndex}
                      id={projId}
                      projectName={proj.projectName}
                      caption={proj.caption}
                      selected={selectedId === projId}
                      onSelect={
                        onSelect
                          ? () =>
                              onSelect(
                                projId,
                                proj.content ? (
                                  <MarkdownRenderer content={proj.content} />
                                ) : (
                                  <StructuredDetails details={proj.details} />
                                ),
                                proj,
                                item
                              )
                          : undefined
                      }
                    >
                      {!onSelect &&
                        (proj.content ? (
                          <MarkdownRenderer content={proj.content} />
                        ) : (
                          <StructuredDetails details={proj.details} />
                        ))}
                    </ProjectEntry>
                  );
                })}
              </Box>
            ) : (
              <MarkdownRenderer content={item.content} />
            )}
          </EntryContainer>
        );
      })}
    </Box>
  );
};

export default Section;
