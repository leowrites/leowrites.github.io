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

const SectionProjectItem = React.memo(
  ({ proj, item, selectedId, onSelect }) => {
    const projId = generateId({
      ...proj,
      title: proj.projectName,
      organization: item.organization,
    });

    const handleSelect = React.useCallback(() => {
      if (onSelect) {
        onSelect(
          projId,
          proj.content ? (
            <MarkdownRenderer content={proj.content} />
          ) : (
            <StructuredDetails details={proj.details} />
          ),
          proj,
          item
        );
      }
    }, [onSelect, projId, proj, item]);

    return (
      <ProjectEntry
        id={projId}
        projectName={proj.projectName}
        caption={proj.caption}
        selected={selectedId === projId}
        onSelect={onSelect ? handleSelect : undefined}
      >
        {!onSelect &&
          (proj.content ? (
            <MarkdownRenderer content={proj.content} />
          ) : (
            <StructuredDetails details={proj.details} />
          ))}
      </ProjectEntry>
    );
  }
);

const SectionItem = React.memo(
  ({ item, selectedId, onSelect, showOverviewInFolder }) => {
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

    const handleParentSelect = React.useCallback(() => {
      if (onSelect) {
        onSelect(id, <MarkdownRenderer content={item.content} />);
      }
    }, [onSelect, id, item.content]);

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
        id={id}
        date={item.dates}
        company={headerContent}
        caption={item.caption || ""}
        logo={item.logo}
        githubLink={item.githubLink}
        selected={isSelected}
        onSelect={onSelect ? handleParentSelect : undefined}
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
            {showOverviewInFolder && item.content && (
              <Box sx={{ mb: 2 }}>
                <MarkdownRenderer content={item.content} />
              </Box>
            )}
            {item.projects.map((proj, pIndex) => (
              <SectionProjectItem
                key={pIndex}
                proj={proj}
                item={item}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </Box>
        ) : (
          <MarkdownRenderer content={item.content} />
        )}
      </EntryContainer>
    );
  }
);

const Section = ({
  sectionTitle,
  items,
  onSelect,
  selectedId,
  showOverviewInFolder = false,
}) => {
  return (
    <Box>
      <SectionHeading>{sectionTitle}</SectionHeading>
      {items.map((item, index) => (
        <SectionItem
          key={index}
          item={item}
          selectedId={selectedId}
          onSelect={onSelect}
          showOverviewInFolder={showOverviewInFolder}
        />
      ))}
    </Box>
  );
};

export default Section;
