import { generateId } from "./utils";
import React from "react";
import { Box } from "@mui/material";
import {
  SectionHeading,
  EntryContainer,
  ProjectEntry,
  TooltipLink,
  MarkdownRenderer,
  ContentRenderer,
} from "./Components";

const SectionProjectItem = React.memo(
  ({ proj, projId, item, selectedId, onSelect, isFirst = false }) => {
    const handleSelect = React.useCallback(() => {
      if (onSelect) {
        onSelect(projId);
      }
    }, [onSelect, projId]);

    return (
      <ProjectEntry
        id={projId}
        projectName={proj.projectName}
        selected={selectedId === projId}
        onSelect={onSelect ? handleSelect : undefined}
        nested
        isFirst={isFirst}
      >
        {!onSelect && <ContentRenderer item={proj} />}
      </ProjectEntry>
    );
  }
);
SectionProjectItem.displayName = "SectionProjectItem";

const SectionItem = React.memo(
  ({ item, itemId, selectedId, onSelect, showOverviewInFolder }) => {
    const hasProjects = item.projects && item.projects.length > 0;

    const projectIds = React.useMemo(() => {
      if (!hasProjects) return [];
      return item.projects.map((proj) =>
        generateId({
          ...proj,
          title: proj.projectName,
          organization: item.organization,
        })
      );
    }, [item, hasProjects]);

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

    const companyContent = item.organization ? (
      item.url ? (
        <TooltipLink
          href={item.url}
          onClick={(e) => e.stopPropagation()}
          tooltipText={item.tooltipText}
        >
          {item.organization}
        </TooltipLink>
      ) : (
        item.organization
      )
    ) : item.degree && item.institution ? (
      `${item.degree}, ${item.institution}`
    ) : null;

    const handleParentSelect = React.useCallback(() => {
      if (onSelect) {
        onSelect(itemId);
      }
    }, [onSelect, itemId]);

    const isParentSelected = selectedId === itemId;
    const isChildSelected =
      hasProjects && projectIds.some((pId) => pId === selectedId);
    const isSelected = isParentSelected || isChildSelected;

    return (
      <EntryContainer
        id={itemId}
        date={item.dates}
        title={titleContent}
        company={companyContent}
        selected={isSelected}
        onSelect={onSelect ? handleParentSelect : undefined}
        isFolder={hasProjects}
      >
        {hasProjects ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
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
            {item.projects.map((proj, index) => (
              <SectionProjectItem
                key={projectIds[index]}
                proj={proj}
                projId={projectIds[index]}
                item={item}
                selectedId={selectedId}
                onSelect={onSelect}
                isFirst={index === 0}
              />
            ))}
          </Box>
        ) : (
          <ContentRenderer item={item} />
        )}
      </EntryContainer>
    );
  }
);
SectionItem.displayName = "SectionItem";

const Section = ({
  sectionTitle,
  items,
  onSelect,
  selectedId,
  showOverviewInFolder = false,
  sectionId,
}) => {
  return (
    <Box id={sectionId} sx={{ scrollMarginTop: "4.5rem" }}>
      <SectionHeading>{sectionTitle}</SectionHeading>
      {items.map((item) => {
        const id = generateId(item);
        return (
          <SectionItem
            key={id}
            itemId={id}
            item={item}
            selectedId={selectedId}
            onSelect={onSelect}
            showOverviewInFolder={showOverviewInFolder}
          />
        );
      })}
    </Box>
  );
};

export { Section };
export default Section;
