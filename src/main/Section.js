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
          proj.content || proj.contentKey ? (
            <MarkdownRenderer
              content={proj.content}
              contentKey={proj.contentKey}
            />
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
        technologies={proj.tags || proj.technologies}
        selected={selectedId === projId}
        onSelect={onSelect ? handleSelect : undefined}
      >
        {!onSelect &&
          (proj.content || proj.contentKey ? (
            <MarkdownRenderer
              content={proj.content}
              contentKey={proj.contentKey}
            />
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
        onSelect(
          id,
          <MarkdownRenderer
            content={item.content}
            contentKey={item.contentKey}
          />
        );
      }
    }, [onSelect, id, item.content, item.contentKey]);

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
        technologies={item.tags || item.technologies}
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
              gap: "0.5rem",
            }}
          >
            {showOverviewInFolder && (item.content || item.contentKey) && (
              <Box>
                <MarkdownRenderer
                  content={item.content}
                  contentKey={item.contentKey}
                />
              </Box>
            )}
            {item.projects.map((proj) => (
              <SectionProjectItem
                key={generateId({
                  ...proj,
                  title: proj.projectName,
                  organization: item.organization,
                })}
                proj={proj}
                item={item}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </Box>
        ) : (
          <MarkdownRenderer
            content={item.content}
            contentKey={item.contentKey}
          />
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
      {items.map((item) => (
        <SectionItem
          key={generateId(item)}
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
