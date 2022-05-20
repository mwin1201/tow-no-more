const { Building, License, TowingCompany, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.find({ _id: context.user._id })
                    .select("-_v -password")
                    .populate("building");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        license: async (parent, {number, state}) => {
            const licenseData = await License.findOne({ number, state });
            return licenseData;
        },
        licenses: async (parent, {building}) => {
            const licenses = await License.find({ building: building });
            return licenses;
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if(!user) {
                throw new AuthenticationError("User not found.");
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials.");
            }

            const token = signToken(user);
            return { token, user };
        },
        addTowingCompany: async (parent,args, context) => {
            if (context.user) {
                const towingCompany = await TowingCompany.create({ ...args});
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { towCompany: towingCompany._id },
                    { new: true }
                );
                return towingCompany;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addBuilding: async (parent, args, context) => {
            if (context.user) {
                const building = await Building.create({...args});
                await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { building: building._id },
                    { new: true }
                );
                return building;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addLicense: async (parent, args, context) => {
            if (context.user) {
                const license = await License.create({...args});
                return license;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;