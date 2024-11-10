import { mergeResolvers } from "@graphql-tools/merge";
import  userResolvers  from "./user.resolver";
import  outpassResolvers  from "./outpass.resolver";

const mergedResolvers = mergeResolvers([userResolvers, outpassResolvers]);

export default mergedResolvers;