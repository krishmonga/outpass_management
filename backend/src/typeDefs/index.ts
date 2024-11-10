import { mergeTypeDefs } from "@graphql-tools/merge";
// typeDefs 

import {userTypeDef} from "./user.typeDef";
import {outpassTypeDef} from "./outpass.typeDef";

const mergedTypeDefs = mergeTypeDefs([outpassTypeDef, userTypeDef])

export default mergedTypeDefs