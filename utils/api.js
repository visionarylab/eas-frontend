import { GroupsApi } from 'echaloasuerte-js-sdk';

const groupsApi = new GroupsApi();
// eslint-disable-next-line import/prefer-default-export
export const loadGroupsDraw = async drawId => {
  const draw = await groupsApi.groupsRead(drawId);
  const {
    id,
    private_id: privateId,
    title,
    description,
    participants,
    number_of_groups: numberOfGroups,
    results,
  } = draw;
  const lastToss = results[0];
  return {
    id,
    title,
    description,
    participants,
    numberOfGroups,
    result: lastToss,
    isOwner: Boolean(privateId),
  };
};
