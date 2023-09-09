export function formatUsername(username) {
  // Remove all characters that are not alphanumeric, underscore or dot
  let formatted = username.replace(/[^a-zA-Z0-9._]/g, '');

  // Remove leading and trailing underscores and dots
  formatted = formatted.replace(/^[_.]|[_.]$/g, '');

  // Replace multiple consecutive underscores or dots with a single one
  formatted = formatted.replace(/[_.]{2,}/g, '_');

  // Truncate or pad to fit the length requirement
  if (formatted.length > 20) {
    formatted = formatted.substring(0, 20);
  } else if (formatted.length < 8) {
    formatted = formatted.padEnd(8, '1');
  }

  return formatted;
}

export function formatTag(tag) {
  let formattedTag = tag;
  //remove the # from the tag
  formattedTag = formattedTag.replace('#', '');
  // replace spaces with dashes
  formattedTag = formattedTag.replace(/\s+/g, '-');

  return formattedTag;
}
