"use strict";

import logger from "../../logger";
import config from "../../../config";

import passport from "passport";

import helper from "../helper";

let FacebookStrategy = require("passport-facebook").Strategy;
let User = require("../../../models/User/User");

// https://developers.facebook.com/apps/
module.exports = function () {
	if (
		config.authKeys.facebook.clientID &&
		config.authKeys.facebook.clientSecret
	) {
		passport.use(
			"facebook",
			new FacebookStrategy(
				{
					clientID: config.authKeys.facebook.clientID,
					clientSecret: config.authKeys.facebook.clientSecret,
					callbackURL: "/auth/facebook/callback",
					profileFields: [
						"name",
						"email",
						"link",
						"locale",
						"timezone",
					],
					passReqToCallback: true,
				},
				function (req, accessToken, refreshToken, profile, done) {
					//logger.info("Received profile: ", profile);

					helper.linkToSocialAccount({
						req,
						accessToken,
						refreshToken,
						profile,
						done,

						provider: "facebook",
						email: profile._json.email,
						userData: {
							name:
								profile.name.givenName +
								" " +
								profile.name.familyName,
							gender: profile._json.gender,
							picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
							location: profile._json.location
								? profile._json.location.name
								: null,
						},
					});
				}
			)
		);
	}
};
