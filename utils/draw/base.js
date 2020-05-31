export const getBaseFields = ({ values, isPublic }) => {
  const { title, description } = values;
  return {
    title: isPublic && title ? title : null,
    description: isPublic && description ? description : null,
    metadata: [{ client: 'web', key: 'isQuickDraw', value: !isPublic }],
  };
};

const getIsQuickDraw = draw => {
  const { metadata } = draw;
  const isQuickDrawData = metadata.find(item => item.key === 'isQuickDraw');
  return isQuickDrawData ? isQuickDrawData.value === 'true' : false;
};

export const getBaseProps = draw => {
  const { private_id: privateId, title, description, results } = draw;
  const isQuickDraw = getIsQuickDraw(draw);
  const commonValues = { results, isQuickDraw };
  if (isQuickDraw) {
    return { ...commonValues, privateId, values: {} };
  }
  return { ...commonValues, values: { title, description } };
};
