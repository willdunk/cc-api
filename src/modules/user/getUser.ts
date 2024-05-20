import { User } from "../../models/user";
import { isDefined } from "../../utils/ts/isDefined";

export const getUser = async (userId?: string | null) => {
    if (isDefined(userId)) {
        return await User.find({}).populate('memberProperties');
    }
    return User.find({ _id: userId }).populate('memberProperties');
}