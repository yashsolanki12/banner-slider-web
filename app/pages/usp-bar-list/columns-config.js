// Column configurations for different tables

/**
 * USP Bar List Columns
 */
export const uspBarColumns = [
  {
    key: "title",
    label: "Title",
    type: "tooltip",
    maxWidth: 150,
    tooltipFontSize: "12px",
  },
  {
    key: "description",
    label: "Description",
    // align: "center",
    type: "tooltip",
    maxWidth: 400,
    tooltipFontSize: "12px",
    render: (value) => value || "-",
  },
  {
    key: "enabled",
    label: "Status",
    // align: "center",
    maxWidth: 200,
    type: "status",
  },
];

/**
 * USP Bar List Actions
 */
export const uspBarActions = [
  {
    name: "edit",
    icon: "edit",
    tooltip: "Edit",
    color: "primary",
    type: "link",
    to: (row) => `/app/usp-bar/${row._id}`,
  },
  {
    name: "duplicate",
    icon: "content_copy",
    tooltip: "Duplicate",
    color: "secondary",
    type: "action",
  },
  {
    name: "delete",
    icon: "delete",
    tooltip: "Delete",
    color: "error",
    type: "action",
  },
];

/**
 * Example: Global Color Settings Columns
 */
export const globalColorSettingsColumns = [
  {
    key: "name",
    label: "Setting Name",
    type: "tooltip",
    maxWidth: 200,
  },
  {
    key: "value",
    label: "Value",
    type: "tooltip",
    maxWidth: 300,
  },
  {
    key: "updatedAt",
    label: "Last Updated",
    align: "center",
  },
];

/**
 * Example: Global Color Settings Actions
 */
export const globalColorSettingsActions = [
  {
    name: "edit",
    icon: "edit",
    tooltip: "Edit",
    color: "primary",
    onClick: () => {},
  },
];

export default {
  uspBarColumns,
  uspBarActions,
  globalColorSettingsColumns,
  globalColorSettingsActions,
};
