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
  ({ proj, item, selectedId, onSelect, isFirst = false }) => {
    const projId = generateId({
      ...proj,
      title: proj.projectName,
      organization: item.organization,
    });

    const handleSelect = React.useCallback(() => {
      if (onSelect) {
        onSelect(projId, <ContentRenderer item={proj} />, proj, item);
      }
    }, [onSelect, projId, proj, item]);

    return (
      <ProjectEntry
        id={projId}
        projectName={proj.projectName}
        caption={proj.caption}
        technologies={proj.tags}
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
        title={titleContent}
        company={companyContent}
        caption={item.caption || ""}
        technologies={item.tags}
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
                key={generateId({
                  ...proj,
                  title: proj.projectName,
                  organization: item.organization,
                })}
                proj={proj}
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
