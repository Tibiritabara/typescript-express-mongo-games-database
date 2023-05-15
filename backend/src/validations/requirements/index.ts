import trendsRequirements from "./trends";
import gamesRequirements from "./games";
import statsRequirements from "./stats";

export default {
    ...gamesRequirements,
    ...statsRequirements,
    ...trendsRequirements,
};
